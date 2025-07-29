# Safe API Cache Layer for Testing

## Core Principle: Zero False Results
The cache must be completely transparent - cached results should be **identical** to fresh API results.

## Implementation Strategy

### 1. Cache Design Philosophy
- **Read-Only Cache**: Only cache GET requests with successful responses (200 status)
- **Exact Response Caching**: Store complete HTTP response including headers, status, body
- **Transparent Operation**: Cache should be invisible to the application logic
- **Fail-Safe**: Any cache error should fall back to live API call
- **Easy Disable**: Single environment variable to completely bypass cache

### 2. What Gets Cached (Safe Operations Only)
```typescript
// SAFE TO CACHE (idempotent, stable data)
- EntityDefinitions metadata
- Entity attributes metadata  
- GlobalOptionSetDefinitions
- Entity relationships
- Solution information

// NEVER CACHE (dynamic or sensitive)
- Authentication tokens (already handled separately)
- POST/PUT/DELETE requests
- Error responses
- Rate limit responses (429)
```

### 3. Cache Key Strategy (Deterministic)
```typescript
// Cache key = SHA256 hash of:
const cacheKey = hash({
  url: normalizeUrl(fullUrl),
  method: 'GET',
  headers: relevantHeaders, // Only headers that affect response
  timestamp: Math.floor(Date.now() / (1000 * 60 * 60)) // Hour-based invalidation
})
```

### 4. Safety Measures
- **Identical Response Structure**: Cache stores exact response object with all properties
- **Header Preservation**: Maintain all response headers that could affect processing
- **Status Code Matching**: Cache only 200 OK responses
- **Checksum Validation**: Verify cached data integrity before use
- **Auto-Expiration**: All cache entries expire after 2 hours (metadata rarely changes)

### 5. Implementation (Minimal Impact)
```typescript
// Modify only the fetch wrapper, zero changes to business logic
export function createAuthenticatedFetcher() {
  return async function authenticatedFetch(url: string, options: RequestInit = {}) {
    // Only attempt cache for GET requests
    if (process.env.DATAVERSE_CACHE_ENABLED === 'true' && 
        (!options.method || options.method === 'GET')) {
      
      const cachedResponse = await getFromCache(url, options)
      if (cachedResponse) {
        // Return exact same Response object structure
        return new Response(cachedResponse.body, {
          status: cachedResponse.status,
          statusText: cachedResponse.statusText,
          headers: cachedResponse.headers
        })
      }
    }
    
    // Make live API call (existing code unchanged)
    const response = await originalFetch(url, options)
    
    // Cache successful responses only
    if (process.env.DATAVERSE_CACHE_ENABLED === 'true' && 
        response.ok && response.status === 200) {
      await saveToCache(url, options, response.clone())
    }
    
    return response
  }
}
```

### 6. Cache Storage (Simple & Safe)
- **Location**: `~/.dataverse-type-gen/safe-cache/`
- **Format**: Each response as separate JSON file
- **Structure**: Exact HTTP response structure preserved
- **Expiration**: 2-hour TTL for all entries (conservative)
- **Size Limit**: 100MB max, LRU eviction

### 7. Testing Validation
- **Cache Bypass Mode**: `DATAVERSE_CACHE_ENABLED=false` (default)
- **Cache Hit Logging**: Debug logs show "CACHE HIT" vs "API CALL"
- **Response Comparison**: In debug mode, compare cached vs fresh responses
- **Integrity Checks**: Validate cached response structure matches expected format

### 8. Error Handling (Fail-Safe)
```typescript
try {
  const cached = await getFromCache(key)
  if (cached && isValid(cached)) {
    return cached
  }
} catch (error) {
  // Any cache error = fall back to API
  console.debug('Cache error, using live API:', error.message)
}
// Always proceed with live API call
```

### 9. Clear Benefits for Testing
- **Reduce API Calls**: `nestedExpand` mode drops from 875 API calls to ~10 on subsequent runs
- **Faster Iteration**: Test directory structure changes in seconds, not minutes
- **Rate Limit Safe**: Avoid 429 errors during development
- **Consistent Results**: Same metadata = same generated code

### 10. Usage
```bash
# Enable cache for testing
export DATAVERSE_CACHE_ENABLED=true
node dist/bin/cli.cjs generate --config dataverse.config.json --nested-expand

# Clear cache when needed
node dist/bin/cli.cjs cache clear

# Disable cache (default)
unset DATAVERSE_CACHE_ENABLED
```

This approach ensures the cache is purely a performance optimization that cannot introduce false results - the generated code will be identical whether using cache or live API.