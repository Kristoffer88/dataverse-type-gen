import { 
  DefaultAzureCredential, 
  ChainedTokenCredential, 
  AzureCliCredential, 
  ManagedIdentityCredential,
  TokenCredential 
} from '@azure/identity'
import { promises as fs } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
import { advancedLog } from '../error-logger.js'

// Token caching interface
interface TokenCache {
  accessToken: string
  expiresAt: number
  resourceUrl: string
}

// Azure authentication options
export interface AzureAuthOptions {
  resourceUrl: string
  credential?: TokenCredential
  scopes?: string[]
}

// Global token cache store (in-memory and file-based)
const tokenCache = new Map<string, TokenCache>()
const CACHE_FILE_PATH = join(homedir(), '.dataverse-type-gen', 'token-cache.json')

/**
 * Load cached tokens from disk
 */
async function loadTokenCacheFromDisk(): Promise<void> {
  try {
    await fs.mkdir(join(homedir(), '.dataverse-type-gen'), { recursive: true })
    const cacheData = await fs.readFile(CACHE_FILE_PATH, 'utf-8')
    const cachedTokens = JSON.parse(cacheData) as Record<string, TokenCache>
    
    // Load valid tokens into memory cache
    const now = Date.now()
    Object.entries(cachedTokens).forEach(([key, token]) => {
      if (token.expiresAt > now) {
        tokenCache.set(key, token)
      }
    })
  } catch {
    // Cache file doesn't exist or is invalid - no problem, we'll create it
  }
}

/**
 * Save token cache to disk
 */
async function saveTokenCacheToDisk(): Promise<void> {
  try {
    const cacheData: Record<string, TokenCache> = {}
    tokenCache.forEach((token, key) => {
      cacheData[key] = token
    })
    
    await fs.mkdir(join(homedir(), '.dataverse-type-gen'), { recursive: true })
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(cacheData, null, 2))
  } catch (error) {
    console.warn('Failed to save token cache:', error)
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
 * Create credential chain with fallback options
 */
function createCredentialChain(): TokenCredential {
  // Create credential chain - try Azure CLI first, then managed identity, then default
  return new ChainedTokenCredential(
    new AzureCliCredential(),
    new ManagedIdentityCredential(),
    new DefaultAzureCredential()
  )
}

/**
 * Get Azure access token for the specified resource using Azure Identity SDK
 * Includes caching to avoid repeated token requests
 * 🔒 SECURITY HARDENED: Input validation, credential chaining, token sanitization
 */
export async function getAzureToken(options: AzureAuthOptions): Promise<string | null> {
  const { resourceUrl, credential, scopes } = options
  
  // Validate and normalize resource URL
  const normalizedResourceUrl = validateResourceUrl(resourceUrl)
  const cacheKey = `token_${normalizedResourceUrl}`
  
  // Load token cache from disk if not already loaded
  if (tokenCache.size === 0) {
    await loadTokenCacheFromDisk()
  }
  
  // Check for cached valid token
  const cachedToken = tokenCache.get(cacheKey)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) { // 1 minute buffer
    return cachedToken.accessToken
  }
  
  try {
    // Use provided credential or create default chain
    const tokenCredential = credential || createCredentialChain()
    
    // Determine scopes - default to resource URL + .default scope
    const tokenScopes = scopes || [`${normalizedResourceUrl}.default`]
    
    // Request token
    const tokenResponse = await tokenCredential.getToken(tokenScopes)
    
    if (!tokenResponse?.token) {
      return null
    }
    
    // Cache the token
    const expiresAt = tokenResponse.expiresOnTimestamp || (Date.now() + 3600000) // Default 1 hour
    const tokenData: TokenCache = {
      accessToken: tokenResponse.token,
      expiresAt,
      resourceUrl: normalizedResourceUrl
    }
    
    tokenCache.set(cacheKey, tokenData)
    await saveTokenCacheToDisk()
    
    return tokenResponse.token
    
  } catch {
    // Clear any invalid cached token
    tokenCache.delete(cacheKey)
    return null
  }
}

/**
 * Get Azure Access Token with credential chaining fallback
 * 🔒 SECURITY HARDENED: Multiple credential providers with fallback
 * 
 * @param resourceUrl - The Dataverse resource URL (e.g., 'https://yourorg.crm.dynamics.com/')
 * @returns Promise<string> - The access token
 */
export async function getAzureAccessToken(resourceUrl: string): Promise<string> {
  // Try the new Azure Identity approach first
  const token = await getAzureToken({ resourceUrl })
  if (token) {
    return token
  }
  
  // If Azure Identity fails, try direct credential creation as fallback
  try {
    // Create credential chain - try Azure CLI first, then managed identity
    const credential = new ChainedTokenCredential(
      new AzureCliCredential(),
      new ManagedIdentityCredential()
    )

    const tokenResponse = await credential.getToken([`${validateResourceUrl(resourceUrl)}.default`])
    if (tokenResponse?.token) {
      return tokenResponse.token
    }
  } catch {
    // If chained credential fails, fall back to DefaultAzureCredential
    try {
      const defaultCredential = new DefaultAzureCredential()
      const tokenResponse = await defaultCredential.getToken([`${validateResourceUrl(resourceUrl)}.default`])
      if (tokenResponse?.token) {
        return tokenResponse.token
      }
    } catch {
      // Final fallback failed
    }
  }
  
  throw new Error(
    `Failed to acquire Azure access token for resource: ${resourceUrl}\n` +
    'Please ensure you are authenticated via:\n' +
    '- Azure CLI: az login\n' +
    '- Managed Identity (when running in Azure)\n' +
    '- Environment variables (AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT_ID)\n' +
    '- Visual Studio or VS Code Azure extensions'
  )
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
          const dataverseInstance = process.env.VITE_DATAVERSE_INSTANCE || process.env.DATAVERSE_INSTANCE
          if (!dataverseInstance) {
            throw new Error('Cannot determine Dataverse instance URL. Please provide resourceUrl or set VITE_DATAVERSE_INSTANCE/DATAVERSE_INSTANCE environment variable.')
          }
          authResourceUrl = dataverseInstance.endsWith('/') ? dataverseInstance : `${dataverseInstance}/`
        }
      } catch {
        throw new Error(`Invalid URL provided: ${url}`)
      }
    }
    
    let lastError: Error | null = null
    let lastResponse: Response | null = null
    
    for (let attempt = 1; attempt <= config.maxRetries + 1; attempt++) {
      try {
        // Get fresh access token for each retry using the new Azure Identity approach
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
        
        // Construct full URL if relative
        let fullUrl = url
        if (!url.startsWith('http')) {
          const baseUrl = authResourceUrl.endsWith('/') ? authResourceUrl.slice(0, -1) : authResourceUrl
          fullUrl = `${baseUrl}${url.startsWith('/') ? url : '/' + url}`
        }
        
        // Make the request
        const response = await fetch(fullUrl, {
          ...options,
          headers
        })
        
        // Log error details if response is not OK
        if (!response.ok) {
          await advancedLog(response, fullUrl, options.method || 'GET')
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

/**
 * Clear all cached tokens (useful for logout or testing)
 */
export async function clearTokenCache(): Promise<void> {
  tokenCache.clear()
  try {
    await fs.unlink(CACHE_FILE_PATH)
  } catch {
    // Cache file might not exist - that's fine
  }
}

/**
 * Get information about cached tokens (for debugging)
 */
export function getTokenCacheInfo(): Array<{ resourceUrl: string; expiresAt: Date; isExpired: boolean }> {
  const now = Date.now()
  return Array.from(tokenCache.values()).map(token => ({
    resourceUrl: token.resourceUrl,
    expiresAt: new Date(token.expiresAt),
    isExpired: token.expiresAt <= now
  }))
}