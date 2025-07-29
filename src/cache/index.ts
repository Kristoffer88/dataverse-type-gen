import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import crypto from 'crypto'

/**
 * Get cache configuration from environment variables
 */
function getCacheConfig() {
  return {
    baseDir: process.env.DATAVERSE_CACHE_DIR || path.join(os.homedir(), '.dataverse-type-gen', 'safe-cache'),
    ttlHours: process.env.DATAVERSE_CACHE_TTL_HOURS ? parseInt(process.env.DATAVERSE_CACHE_TTL_HOURS, 10) : 2,
    maxSizeBytes: process.env.DATAVERSE_CACHE_MAX_SIZE_MB ? parseInt(process.env.DATAVERSE_CACHE_MAX_SIZE_MB, 10) * 1024 * 1024 : 100 * 1024 * 1024,
    enabled: process.env.DATAVERSE_CACHE_ENABLED === 'true'
  }
}

/**
 * Cached response structure - identical to HTTP Response
 */
interface CachedResponse {
  url: string
  status: number
  statusText: string
  headers: Record<string, string>
  body: string
  timestamp: number
  checksum: string
}

/**
 * Generate deterministic cache key from request parameters
 */
function generateCacheKey(url: string, options: RequestInit = {}): string {
  const normalizedUrl = url.toLowerCase().trim()
  const method = (options.method || 'GET').toUpperCase()
  
  // Only include headers that affect response
  const relevantHeaders: Record<string, string> = {}
  if (options.headers) {
    const headers = options.headers as Record<string, string>
    // Include authentication and content negotiation headers
    for (const [key, value] of Object.entries(headers)) {
      const lowerKey = key.toLowerCase()
      if (lowerKey.includes('authorization') || 
          lowerKey.includes('accept') || 
          lowerKey.includes('prefer')) {
        relevantHeaders[lowerKey] = value
      }
    }
  }
  
  // Hour-based timestamp for cache invalidation
  const hourTimestamp = Math.floor(Date.now() / (1000 * 60 * 60))
  
  const keyData = {
    url: normalizedUrl,
    method,
    headers: relevantHeaders,
    timestamp: hourTimestamp
  }
  
  return crypto.createHash('sha256')
    .update(JSON.stringify(keyData))
    .digest('hex')
}

/**
 * Generate checksum for response body integrity
 */
function generateChecksum(body: string): string {
  return crypto.createHash('sha256').update(body).digest('hex')
}

/**
 * Ensure cache directory exists
 */
async function ensureCacheDir(): Promise<void> {
  try {
    const config = getCacheConfig()
    await fs.mkdir(config.baseDir, { recursive: true })
  } catch {
    // Directory might already exist, ignore error
  }
}

/**
 * Get cache file path for a key
 */
function getCacheFilePath(key: string): string {
  const config = getCacheConfig()
  return path.join(config.baseDir, `${key}.json`)
}

/**
 * Check if cached response is still valid
 */
function isCacheValid(cached: CachedResponse): boolean {
  const config = getCacheConfig()
  const now = Date.now()
  const ageHours = (now - cached.timestamp) / (1000 * 60 * 60)
  
  if (ageHours > config.ttlHours) {
    return false
  }
  
  // Verify checksum integrity
  const expectedChecksum = generateChecksum(cached.body)
  if (cached.checksum !== expectedChecksum) {
    console.debug('Cache integrity check failed for cached response')
    return false
  }
  
  return true
}

/**
 * Get response from cache if available and valid
 */
export async function getFromCache(url: string, options: RequestInit = {}): Promise<Response | null> {
  const config = getCacheConfig()
  if (!config.enabled) {
    return null
  }
  
  try {
    await ensureCacheDir()
    
    const cacheKey = generateCacheKey(url, options)
    const cacheFile = getCacheFilePath(cacheKey)
    
    try {
      const cachedData = await fs.readFile(cacheFile, 'utf-8')
      const cached: CachedResponse = JSON.parse(cachedData)
      
      if (!isCacheValid(cached)) {
        // Remove invalid cache file
        await fs.unlink(cacheFile).catch(() => {})
        return null
      }
      
      // Cache hit - no logging needed for clean output
      
      // Return exact same Response object structure
      return new Response(cached.body, {
        status: cached.status,
        statusText: cached.statusText,
        headers: new Headers(cached.headers)
      })
      
    } catch {
      // Cache file doesn't exist or is invalid
      return null
    }
    
  } catch (error) {
    // Any cache error = fall back to API
    console.debug('Cache error, using live API:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

/**
 * Save successful response to cache
 */
export async function saveToCache(url: string, options: RequestInit = {}, response: Response): Promise<void> {
  const config = getCacheConfig()
  if (!config.enabled || !response.ok || response.status !== 200) {
    return
  }
  
  try {
    await ensureCacheDir()
    
    const cacheKey = generateCacheKey(url, options)
    const cacheFile = getCacheFilePath(cacheKey)
    
    // Read response body
    const body = await response.text()
    
    // Convert headers to plain object
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })
    
    const cached: CachedResponse = {
      url,
      status: response.status,
      statusText: response.statusText,
      headers,
      body,
      timestamp: Date.now(),
      checksum: generateChecksum(body)
    }
    
    await fs.writeFile(cacheFile, JSON.stringify(cached, null, 2))
    
    // Response cached successfully - no logging needed for clean output
    
  } catch (error) {
    // Cache save failure should not affect the application
    console.debug('Failed to save to cache:', error instanceof Error ? error.message : 'Unknown error')
  }
}

/**
 * Clear all cache files
 */
export async function clearCache(): Promise<void> {
  const config = getCacheConfig()
  try {
    await ensureCacheDir()
    
    const files = await fs.readdir(config.baseDir)
    const cacheFiles = files.filter(file => file.endsWith('.json'))
    
    for (const file of cacheFiles) {
      await fs.unlink(path.join(config.baseDir, file))
    }
    
    console.log(`✅ Cleared ${cacheFiles.length} cache files`)
    
  } catch (error) {
    console.error('Failed to clear cache:', error instanceof Error ? error.message : 'Unknown error')
  }
}

/**
 * Get cache status and statistics
 */
export async function getCacheStatus(): Promise<{
  enabled: boolean
  cacheDir: string
  fileCount: number
  totalSize: number
  oldestFile?: { name: string; age: string }
  newestFile?: { name: string; age: string }
}> {
  const config = getCacheConfig()
  try {
    await ensureCacheDir()
    
    const files = await fs.readdir(config.baseDir)
    const cacheFiles = files.filter(file => file.endsWith('.json'))
    
    let totalSize = 0
    let oldestTime = Date.now()
    let newestTime = 0
    let oldestFile = ''
    let newestFile = ''
    
    for (const file of cacheFiles) {
      const filePath = path.join(config.baseDir, file)
      const stats = await fs.stat(filePath)
      
      totalSize += stats.size
      
      if (stats.mtime.getTime() < oldestTime) {
        oldestTime = stats.mtime.getTime()
        oldestFile = file
      }
      
      if (stats.mtime.getTime() > newestTime) {
        newestTime = stats.mtime.getTime()
        newestFile = file
      }
    }
    
    const formatAge = (timestamp: number): string => {
      const ageMs = Date.now() - timestamp
      const ageHours = Math.floor(ageMs / (1000 * 60 * 60))
      const ageMinutes = Math.floor((ageMs % (1000 * 60 * 60)) / (1000 * 60))
      return `${ageHours}h ${ageMinutes}m ago`
    }
    
    return {
      enabled: config.enabled,
      cacheDir: config.baseDir,
      fileCount: cacheFiles.length,
      totalSize,
      oldestFile: oldestFile ? { name: oldestFile, age: formatAge(oldestTime) } : undefined,
      newestFile: newestFile ? { name: newestFile, age: formatAge(newestTime) } : undefined
    }
    
  } catch {
    return {
      enabled: config.enabled,
      cacheDir: config.baseDir,
      fileCount: 0,
      totalSize: 0
    }
  }
}

/**
 * Clean up expired cache files
 */
export async function cleanupExpiredCache(): Promise<number> {
  const config = getCacheConfig()
  if (!config.enabled) {
    return 0
  }
  
  try {
    await ensureCacheDir()
    
    const files = await fs.readdir(config.baseDir)
    const cacheFiles = files.filter(file => file.endsWith('.json'))
    
    let removedCount = 0
    
    for (const file of cacheFiles) {
      try {
        const filePath = path.join(config.baseDir, file)
        const cachedData = await fs.readFile(filePath, 'utf-8')
        const cached: CachedResponse = JSON.parse(cachedData)
        
        if (!isCacheValid(cached)) {
          await fs.unlink(filePath)
          removedCount++
        }
      } catch {
        // If file is corrupted, remove it
        const filePath = path.join(config.baseDir, file)
        await fs.unlink(filePath).catch(() => {})
        removedCount++
      }
    }
    
    return removedCount
    
  } catch (error) {
    console.debug('Failed to cleanup expired cache:', error instanceof Error ? error.message : 'Unknown error')
    return 0
  }
}