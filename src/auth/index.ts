import { DefaultAzureCredential, TokenCredential } from '@azure/identity'
import { advancedLog } from '../error-logger.js'
import { getFromCache, saveToCache } from '../cache/index.js'
import { getTokenManager } from './token-manager.js'

// Azure authentication options
export interface AzureAuthOptions {
  resourceUrl: string
  credential?: TokenCredential
}

/**
 * Simple authentication using DefaultAzureCredential
 * Supports Azure CLI, Environment Variables, Managed Identity, etc.
 */
export async function getAzureToken(options: AzureAuthOptions): Promise<string | null> {
  const { resourceUrl, credential } = options
  
  try {
    const normalizedUrl = validateResourceUrl(resourceUrl)
    const useCredential = credential || new DefaultAzureCredential()
    
    // Construct proper scope
    const baseUrl = normalizedUrl.endsWith('/') ? normalizedUrl.slice(0, -1) : normalizedUrl
    const scope = `${baseUrl}/.default`
    
    const tokenResponse = await useCredential.getToken([scope])
    return tokenResponse?.token || null
  } catch (error) {
    throw new Error(
      `Failed to acquire Azure access token for resource: ${resourceUrl}\n` +
      `Error: ${error instanceof Error ? error.message : String(error)}\n\n` +
      `Please authenticate via one of these methods:\n` +
      `  • Azure CLI: az login\n` +
      `  • Environment variables: AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT_ID\n` +
      `  • Managed Identity (when running in Azure)`
    )
  }
}

/**
 * Validate and normalize resource URL
 */
function validateResourceUrl(resourceUrl: string): string {
  if (!resourceUrl) {
    throw new Error('Resource URL is required for authentication')
  }
  
  try {
    const url = new URL(resourceUrl)
    return `${url.protocol}//${url.host}`
  } catch {
    throw new Error(`Invalid resource URL: ${resourceUrl}`)
  }
}

/**
 * Create an authenticated fetch function for making API calls
 */
export function createAuthenticatedFetcher(
  resourceUrl: string,
  options: { 
    maxRetries?: number
    baseDelay?: number
    credential?: TokenCredential
  } = {}
) {
  const { maxRetries = 3, baseDelay = 1000, credential } = options
  
  return async function authenticatedFetch(
    url: string,
    requestOptions: RequestInit = {}
  ): Promise<Response> {
    // Handle both absolute and relative URLs
    const fullUrl = url.startsWith('http') ? url : `${resourceUrl.replace(/\/$/, '')}${url}`
    
    let lastError: Error | null = null
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        
        // Get cached token (much faster - no repeated authentication!)
        const tokenManager = getTokenManager(credential)
        const accessToken = await tokenManager.getToken(resourceUrl)
        
        if (!accessToken) {
          throw new Error('Failed to acquire access token')
        }
        
        // Check cache first (only for GET requests)
        if (!requestOptions.method || requestOptions.method.toUpperCase() === 'GET') {
          const cachedResponse = await getFromCache(fullUrl, requestOptions)
          if (cachedResponse) {
            return cachedResponse
          }
        }
        
        // Make the request with authentication
        const headers = new Headers(requestOptions.headers)
        headers.set('Authorization', `Bearer ${accessToken}`)
        headers.set('Accept', 'application/json')
        headers.set('Content-Type', 'application/json')
        headers.set('Prefer', 'odata.include-annotations="*"')
        
        const response = await fetch(fullUrl, {
          ...requestOptions,
          headers
        })
        
        // Response parsing optimization
        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
          // Large responses are handled automatically
        }
        
        // Save successful GET responses to cache
        if (response.ok && (!requestOptions.method || requestOptions.method.toUpperCase() === 'GET')) {
          await saveToCache(fullUrl, requestOptions, response.clone())
        }
        
        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('Retry-After') || '5') * 1000
          if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, retryAfter))
            continue
          }
        }
        
        
        if (!response.ok) {
          await advancedLog(response, fullUrl, requestOptions.method || 'GET', requestOptions.body as string)
        }
        
        return response
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        if (attempt < maxRetries) {
          // Exponential backoff
          const delay = baseDelay * Math.pow(2, attempt)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }
    
    throw lastError || new Error('Authentication failed after all retries')
  }
}