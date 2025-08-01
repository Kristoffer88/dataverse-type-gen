import crypto from 'crypto'

/**
 * In-memory cache to avoid duplicate requests during single session
 */
interface CachedResponse {
  body: string
  status: number
  statusText: string
  headers: Record<string, string>
}

const memoryCache = new Map<string, CachedResponse>()

/**
 * Generate deterministic cache key from request parameters
 */
function generateCacheKey(url: string, options: RequestInit = {}): string {
  const normalizedUrl = url.toLowerCase().trim()
  const method = (options.method || 'GET').toUpperCase()
  
  // Only include headers that affect response (exclude authorization since tokens change frequently)
  const relevantHeaders: Record<string, string> = {}
  if (options.headers) {
    const headers = options.headers as Record<string, string>
    // Include content negotiation headers but NOT authorization (tokens change)
    for (const [key, value] of Object.entries(headers)) {
      const lowerKey = key.toLowerCase()
      if (lowerKey.includes('accept') || 
          lowerKey.includes('prefer')) {
        relevantHeaders[lowerKey] = value
      }
    }
  }
  
  const keyData = {
    url: normalizedUrl,
    method,
    headers: relevantHeaders
  }
  
  return crypto.createHash('sha256')
    .update(JSON.stringify(keyData))
    .digest('hex')
}

/**
 * Get response from memory cache if available
 */
export async function getFromCache(url: string, options: RequestInit = {}): Promise<Response | null> {
  const cacheKey = generateCacheKey(url, options)
  
  const memoryHit = memoryCache.get(cacheKey)
  if (memoryHit) {
    // Return new Response from cached data
    return new Response(memoryHit.body, {
      status: memoryHit.status,
      statusText: memoryHit.statusText,
      headers: new Headers(memoryHit.headers)
    })
  }

  return null
}

/**
 * Save successful response to memory cache
 */
export async function saveToCache(url: string, options: RequestInit = {}, response: Response): Promise<void> {
  const cacheKey = generateCacheKey(url, options)
  
  if (response.ok && response.status === 200) {
    // Read the body and save to cache
    const body = await response.clone().text()
    
    // Convert headers to plain object
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })
    
    const cachedResponse: CachedResponse = {
      body,
      status: response.status,
      statusText: response.statusText,
      headers
    }
    
    memoryCache.set(cacheKey, cachedResponse)
  }
}

/**
 * Clear memory cache
 */
export function clearMemoryCache(): number {
  const clearedCount = memoryCache.size
  memoryCache.clear()
  return clearedCount
}

/**
 * Get memory cache status
 */
export function getMemoryCacheStatus(): {
  entryCount: number
} {
  return {
    entryCount: memoryCache.size
  }
}