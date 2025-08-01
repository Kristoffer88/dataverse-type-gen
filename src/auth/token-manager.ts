import { DefaultAzureCredential, TokenCredential } from '@azure/identity'

// Cached token information
interface CachedToken {
  token: string
  expiresAt: number // Unix timestamp in milliseconds
  resourceUrl: string
}

/**
 * Token manager that aggressively caches tokens to avoid repeated authentication
 * This is crucial for performance - getting a token takes 6-8 seconds!
 */
export class TokenManager {
  private tokenCache = new Map<string, CachedToken>()
  private readonly credential: TokenCredential
  private readonly bufferTimeMs = 5 * 60 * 1000 // Refresh 5 minutes before expiry

  constructor(credential?: TokenCredential) {
    this.credential = credential || new DefaultAzureCredential()
  }

  /**
   * Get a cached token or acquire a new one
   * This method is the key to performance - it ensures we only get 1 token per resource per run
   */
  async getToken(resourceUrl: string): Promise<string> {
    const normalizedUrl = this.normalizeResourceUrl(resourceUrl)
    const cacheKey = normalizedUrl
    
    // Check if we have a valid cached token
    const cached = this.tokenCache.get(cacheKey)
    if (cached && this.isTokenValid(cached)) {
      // Using cached token
      return cached.token
    }

    // Acquire new token
    
    try {
      const baseUrl = normalizedUrl.endsWith('/') ? normalizedUrl.slice(0, -1) : normalizedUrl
      const scope = `${baseUrl}/.default`
      
      const tokenResponse = await this.credential.getToken([scope])
      if (!tokenResponse?.token) {
        throw new Error('No token received from credential')
      }

      // Token acquired successfully

      // Cache the token
      const cachedToken: CachedToken = {
        token: tokenResponse.token,
        expiresAt: tokenResponse.expiresOnTimestamp,
        resourceUrl: normalizedUrl
      }
      this.tokenCache.set(cacheKey, cachedToken)

      return tokenResponse.token

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
   * Pre-acquire token for a resource to avoid delays during API calls
   */
  async preAcquireToken(resourceUrl: string): Promise<void> {
    await this.getToken(resourceUrl)
  }

  /**
   * Check if a cached token is still valid (with buffer time)
   */
  private isTokenValid(cached: CachedToken): boolean {
    const now = Date.now()
    const expiresWithBuffer = cached.expiresAt - this.bufferTimeMs
    return now < expiresWithBuffer
  }

  /**
   * Normalize resource URL for consistent caching
   */
  private normalizeResourceUrl(resourceUrl: string): string {
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
   * Clear all cached tokens (useful for testing)
   */
  clearCache(): void {
    this.tokenCache.clear()
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { totalTokens: number; validTokens: number } {
    const totalTokens = this.tokenCache.size
    let validTokens = 0
    
    for (const cached of this.tokenCache.values()) {
      if (this.isTokenValid(cached)) {
        validTokens++
      }
    }

    return { totalTokens, validTokens }
  }
}

// Global token manager instance
let globalTokenManager: TokenManager | null = null

/**
 * Get the global token manager instance
 */
export function getTokenManager(credential?: TokenCredential): TokenManager {
  if (!globalTokenManager) {
    globalTokenManager = new TokenManager(credential)
  }
  return globalTokenManager
}

/**
 * Pre-acquire token using the global token manager
 */
export async function preAcquireGlobalToken(resourceUrl: string, credential?: TokenCredential): Promise<void> {
  const manager = getTokenManager(credential)
  await manager.preAcquireToken(resourceUrl)
}