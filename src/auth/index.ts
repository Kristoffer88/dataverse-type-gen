import { 
  DefaultAzureCredential, 
  ChainedTokenCredential, 
  AzureCliCredential, 
  ManagedIdentityCredential,
  TokenCredential 
} from '@azure/identity'
import { advancedLog } from '../error-logger.js'
import { getFromCache, saveToCache } from '../cache/index.js'


// Azure authentication options
export interface AzureAuthOptions {
  resourceUrl: string
  credential?: TokenCredential
  scopes?: string[]
}

// Token cache interface
interface TokenCache {
  token: string
  expiresOn: Date
}

/**
 * Singleton credential manager to avoid spawning multiple Azure CLI processes
 * Implements application-level token caching and request deduplication
 */
class CredentialManager {
  private static instance: CredentialManager
  private credential: TokenCredential
  private tokenCache = new Map<string, TokenCache>()
  private pendingRequests = new Map<string, Promise<string>>()

  private constructor() {
    // Create credential chain with optimal ordering for local development
    // AzureCliCredential first (fast for local dev), then managed identity (production), then default fallback
    this.credential = new ChainedTokenCredential(
      new AzureCliCredential(), // Fast for local development
      new ManagedIdentityCredential(), // For production environments
      new DefaultAzureCredential() // Final fallback
    )
  }

  static getInstance(): CredentialManager {
    if (!CredentialManager.instance) {
      CredentialManager.instance = new CredentialManager()
    }
    return CredentialManager.instance
  }

  async getToken(resourceUrl: string): Promise<string> {
    const normalizedUrl = validateResourceUrl(resourceUrl)
    const cacheKey = normalizedUrl
    const cached = this.tokenCache.get(cacheKey)
    
    // Check if cached token is still valid (with 5-minute buffer to avoid edge cases)
    if (cached && cached.expiresOn.getTime() > Date.now() + 5 * 60 * 1000) {
      return cached.token
    }

    // Check if there's already a pending request for this resource
    const pendingRequest = this.pendingRequests.get(cacheKey)
    if (pendingRequest) {
      // Wait for the existing request to complete and return its result
      return await pendingRequest
    }

    // Create a new token request and store the promise to prevent duplicate requests
    const tokenPromise = this.fetchFreshToken(normalizedUrl, cacheKey)
    this.pendingRequests.set(cacheKey, tokenPromise)

    try {
      const token = await tokenPromise
      return token
    } finally {
      // Clean up the pending request regardless of success/failure
      this.pendingRequests.delete(cacheKey)
    }
  }

  private async fetchFreshToken(normalizedUrl: string, cacheKey: string): Promise<string> {
    try {
      // First try direct Azure CLI call to avoid @azure/identity spawning multiple processes
      const { spawn } = await import('child_process')
      const { promisify } = await import('util')
      
      return new Promise<string>((resolve, reject) => {
        const azProcess = spawn('az', [
          'account',
          'get-access-token',
          '--resource',
          normalizedUrl,
          '--output',
          'json'
        ], { stdio: 'pipe' })

        let stdout = ''
        let stderr = ''

        azProcess.stdout?.on('data', (data) => {
          stdout += data.toString()
        })

        azProcess.stderr?.on('data', (data) => {
          stderr += data.toString()
        })

        azProcess.on('close', (code) => {
          if (code === 0) {
            try {
              const tokenData = JSON.parse(stdout)
              const token = tokenData.accessToken
              const expiresOn = tokenData.expiresOn ? new Date(tokenData.expiresOn) : new Date(Date.now() + 60 * 60 * 1000)
              
              this.tokenCache.set(cacheKey, {
                token,
                expiresOn
              })
              
              resolve(token)
            } catch (parseError) {
              reject(new Error(`Failed to parse Azure CLI token response: ${parseError}`))
            }
          } else {
            reject(new Error(`Azure CLI failed with code ${code}: ${stderr}`))
          }
        })

        azProcess.on('error', (error) => {
          reject(new Error(`Failed to spawn Azure CLI: ${error.message}`))
        })
      })
    } catch (directCliError) {
      // Fallback to @azure/identity if direct CLI call fails
      console.warn('Direct Azure CLI call failed, falling back to @azure/identity:', directCliError)
      
      const tokenResponse = await this.credential.getToken([`${normalizedUrl}.default`])
      if (tokenResponse) {
        this.tokenCache.set(cacheKey, {
          token: tokenResponse.token,
          expiresOn: tokenResponse.expiresOnTimestamp ? new Date(tokenResponse.expiresOnTimestamp) : new Date(Date.now() + 60 * 60 * 1000)
        })
        return tokenResponse.token
      }

      throw new Error(`Failed to acquire token for ${normalizedUrl}`)
    }
  }

  /**
   * Clear the token cache (useful for testing or when authentication fails)
   */
  clearCache(): void {
    this.tokenCache.clear()
    this.pendingRequests.clear()
  }
}

/**
 * Validate and sanitize resource URL
 */
function validateResourceUrl(resourceUrl: string): string {
  if (!resourceUrl || typeof resourceUrl !== 'string') {
    throw new Error('Resource URL must be a non-empty string')
  }
  
  try {
    const url = new URL(resourceUrl)
    if (!url.protocol.startsWith('https')) {
      throw new Error('Resource URL must use HTTPS protocol')
    }
    return url.href.endsWith('/') ? url.href : `${url.href}/`
  } catch {
    throw new Error(`Invalid resource URL: ${resourceUrl}`)
  }
}

/**
 * Get Azure access token for the specified resource using Azure Identity SDK
 * 🔒 SECURITY HARDENED: Input validation, credential chaining, with singleton caching
 */
export async function getAzureToken(options: AzureAuthOptions): Promise<string | null> {
  const { resourceUrl, credential } = options
  
  try {
    if (credential) {
      // If a custom credential is provided, use it directly (no caching for custom credentials)
      const normalizedResourceUrl = validateResourceUrl(resourceUrl)
      const tokenScopes = [`${normalizedResourceUrl}.default`]
      const tokenResponse = await credential.getToken(tokenScopes)
      return tokenResponse?.token || null
    } else {
      // Use the singleton credential manager for default authentication (with caching)
      return await CredentialManager.getInstance().getToken(resourceUrl)
    }
  } catch {
    return null
  }
}

/**
 * Get Azure Access Token with credential chaining fallback
 * 🔒 SECURITY HARDENED: Uses singleton credential manager to avoid spawning multiple Azure CLI processes
 * 
 * @param resourceUrl - The Dataverse resource URL (e.g., 'https://yourorg.crm.dynamics.com/')
 * @returns Promise<string> - The access token
 */
export async function getAzureAccessToken(resourceUrl: string): Promise<string> {
  try {
    // Use the singleton credential manager for optimal performance and caching
    return await CredentialManager.getInstance().getToken(resourceUrl)
  } catch (error) {
    throw new Error(
      `Failed to acquire Azure access token for resource: ${resourceUrl}\n` +
      `Error: ${error instanceof Error ? error.message : String(error)}\n` +
      'Please ensure you are authenticated via:\n' +
      '- Azure CLI: az login\n' +
      '- Managed Identity (when running in Azure)\n' +
      '- Environment variables (AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT_ID)\n' +
      '- Visual Studio or VS Code Azure extensions'
    )
  }
}

/**
 * Clear the token cache (useful for testing or when authentication fails)
 * @deprecated Use CredentialManager.getInstance().clearCache() directly if needed
 */
export function clearTokenCache(): void {
  CredentialManager.getInstance().clearCache()
}

/**
 * Retry logic configuration
 */
interface RetryConfig {
  maxRetries: number
  baseDelay: number
  maxDelay: number
  retryCondition?: (error: Error, response?: Response) => boolean
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  retryCondition: (error: Error, response?: Response) => {
    // Retry on network errors or specific HTTP status codes
    if (!response) return true // Network error
    return response.status >= 500 || response.status === 429 // Server errors or rate limiting
  }
}

/**
 * Exponential backoff delay calculation
 */
function calculateDelay(attempt: number, config: RetryConfig): number {
  const delay = config.baseDelay * Math.pow(2, attempt - 1)
  return Math.min(delay, config.maxDelay)
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Create an authenticated fetch wrapper with retry logic
 * 🔒 SECURITY HARDENED: Azure Identity integration with comprehensive retry logic
 * 
 * @param resourceUrl - Base resource URL for authentication (optional, will be derived from request URL)
 * @param retryConfig - Retry configuration (optional)
 * @param credential - Custom Azure credential (optional, uses default chain if not provided)
 * @returns Authenticated fetch function with retry logic
 */
export function createAuthenticatedFetcher(
  resourceUrl?: string,
  retryConfig: Partial<RetryConfig> = {},
  credential?: TokenCredential
): (url: string, options?: RequestInit) => Promise<Response> {
  
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig }
  
  return async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Determine resource URL from the request URL if not provided
    let authResourceUrl = resourceUrl
    if (!authResourceUrl) {
      try {
        const urlObj = new URL(url, 'https://example.com') // Handle relative URLs
        if (urlObj.hostname !== 'example.com') {
          authResourceUrl = `${urlObj.protocol}//${urlObj.hostname}/`
        } else {
          // For relative URLs, we need a way to determine the base URL
          // This would typically come from configuration or environment
          const dataverseInstance = process.env.DATAVERSE_INSTANCE
          if (!dataverseInstance) {
            throw new Error('Cannot determine Dataverse instance URL. Please provide resourceUrl or set DATAVERSE_INSTANCE environment variable.')
          }
          authResourceUrl = dataverseInstance.endsWith('/') ? dataverseInstance : `${dataverseInstance}/`
        }
      } catch {
        throw new Error(`Invalid URL provided: ${url}`)
      }
    }
    
    // Construct full URL if relative (needed for caching key generation)
    let fullUrl = url
    if (!url.startsWith('http')) {
      const baseUrl = authResourceUrl.endsWith('/') ? authResourceUrl.slice(0, -1) : authResourceUrl
      fullUrl = `${baseUrl}${url.startsWith('/') ? url : '/' + url}`
    }
    
    // Only attempt cache for GET requests
    if (process.env.DATAVERSE_CACHE_ENABLED === 'true' && 
        (!options.method || options.method.toUpperCase() === 'GET')) {
      
      const cachedResponse = await getFromCache(fullUrl, options)
      if (cachedResponse) {
        return cachedResponse
      }
    }
    
    let lastError: Error | null = null
    let lastResponse: Response | null = null
    
    for (let attempt = 1; attempt <= config.maxRetries + 1; attempt++) {
      try {
        // Get fresh access token for each retry using Azure Identity approach
        const accessToken = await getAzureToken({ 
          resourceUrl: authResourceUrl, 
          credential 
        })
        
        if (!accessToken) {
          throw new Error('Failed to acquire access token')
        }
        
        // Prepare headers with authentication
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${accessToken}`)
        headers.set('Accept', 'application/json')
        headers.set('Content-Type', 'application/json')
        headers.set('Consistency', 'Strong')
        headers.set('Prefer', 'odata.include-annotations="*"')
        
        // Make the request
        const response = await fetch(fullUrl, {
          ...options,
          headers
        })
        
        // Log error details if response is not OK
        if (!response.ok) {
          await advancedLog(response, fullUrl, options.method || 'GET')
        }
        
        // Cache successful responses only
        if (process.env.DATAVERSE_CACHE_ENABLED === 'true' && 
            response.ok && response.status === 200 &&
            (!options.method || options.method.toUpperCase() === 'GET')) {
          await saveToCache(fullUrl, options, response.clone())
        }
        
        // Check if we should retry
        if (!response.ok && attempt <= config.maxRetries) {
          const shouldRetry = config.retryCondition?.(new Error(`HTTP ${response.status}`), response) ?? false
          
          if (shouldRetry) {
            lastResponse = response
            lastError = new Error(`HTTP ${response.status}: ${response.statusText}`)
            
            // Wait before retrying
            const delay = calculateDelay(attempt, config)
            await sleep(delay)
            continue
          }
        }
        
        return response
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        // Check if we should retry
        if (attempt <= config.maxRetries) {
          const shouldRetry = config.retryCondition?.(lastError) ?? false
          
          if (shouldRetry) {
            // Wait before retrying
            const delay = calculateDelay(attempt, config)
            await sleep(delay)
            continue
          }
        }
        
        // No more retries or shouldn't retry
        break
      }
    }
    
    // All retries exhausted
    if (lastResponse) {
      return lastResponse
    }
    
    throw lastError || new Error('Request failed after all retries')
  }
}


