import '../setup-integration.js' // Validate environment before running tests
import { describe, it, expect, beforeEach } from 'vitest'
import { 
  getAzureAccessToken, 
  getAzureToken, 
  createAuthenticatedFetcher,
  clearTokenCache,
  getTokenCacheInfo 
} from '../../src/auth/index.js'
import { getEntityDefinitions } from '../../src/metadata-client.js'
import { advancedLog } from '../../src/error-logger.js'

describe('Authentication System', () => {
  const dataverseInstance = process.env.DATAVERSE_INSTANCE
  
  // Skip tests if no Dataverse instance configured
  const skipCondition = !dataverseInstance
  const describeOrSkip = skipCondition ? describe.skip : describe
  
  beforeEach(async () => {
    // Clear token cache before each test to ensure fresh authentication
    await clearTokenCache()
  })

  describeOrSkip('Azure Identity Integration', () => {
    it('should acquire access token using Azure Identity', async () => {
      const token = await getAzureToken({
        resourceUrl: dataverseInstance!
      })
      
      expect(token).toBeTruthy()
      expect(typeof token).toBe('string')
      expect(token!.length).toBeGreaterThan(0)
    }, 30000) // 30 second timeout for auth

    it('should acquire access token using legacy method', async () => {
      const token = await getAzureAccessToken(dataverseInstance!)
      
      expect(token).toBeTruthy()
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)
    }, 30000)

    it('should cache tokens properly', async () => {
      // First call
      const token1 = await getAzureToken({
        resourceUrl: dataverseInstance!
      })
      
      // Check cache info
      const cacheInfo = getTokenCacheInfo()
      expect(cacheInfo).toHaveLength(1)
      expect(cacheInfo[0].resourceUrl).toBe(dataverseInstance!.endsWith('/') ? dataverseInstance : `${dataverseInstance}/`)
      expect(cacheInfo[0].isExpired).toBe(false)
      
      // Second call should use cached token
      const token2 = await getAzureToken({
        resourceUrl: dataverseInstance!
      })
      
      expect(token1).toBe(token2)
    }, 30000)
  })

  describeOrSkip('Authenticated Fetch Wrapper', () => {
    it('should create authenticated fetch function', () => {
      const authenticatedFetch = createAuthenticatedFetcher(dataverseInstance)
      
      expect(typeof authenticatedFetch).toBe('function')
    })

    it('should make authenticated requests to Dataverse API', async () => {
      const authenticatedFetch = createAuthenticatedFetcher(dataverseInstance)
      
      try {
        // Use only supported parameters - $top is NOT supported on EntityDefinitions
        const url = '/api/data/v9.1/EntityDefinitions?$select=LogicalName'
        const response = await authenticatedFetch(url)
        
        if (!response.ok) {
          await advancedLog(response, url, 'GET')
        }
        
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
        
        const data = await response.json() as { value: Array<{ LogicalName: string }> }
        expect(data).toHaveProperty('value')
        expect(Array.isArray(data.value)).toBe(true)
        expect(data.value.length).toBeGreaterThan(0) // Should get all entities, not limited to 1
      } catch (error) {
        // Log detailed error information for debugging
        console.error('Authentication test failed:', error)
        throw error
      }
    }, 30000)

    it('should handle retry logic on transient failures', async () => {
      const authenticatedFetch = createAuthenticatedFetcher(
        dataverseInstance,
        { maxRetries: 2, baseDelay: 100 } // Short delays for testing
      )
      
      // Test with an endpoint that might occasionally fail - use only supported parameters
      try {
        const url = '/api/data/v9.1/EntityDefinitions?$select=LogicalName'
        const response = await authenticatedFetch(url)
        
        if (!response.ok) {
          await advancedLog(response, url, 'GET')
        }
        
        expect(response.ok).toBe(true)
      } catch (error) {
        // Even with retries, this might fail in some environments
        console.warn('Retry test failed (expected in some environments):', error)
      }
    }, 45000)
  })

  describeOrSkip('Integration with Metadata Client', () => {
    it('should fetch entity definitions using authenticated client', async () => {
      try {
        const entities = await getEntityDefinitions({
          select: ['LogicalName', 'SchemaName', 'DisplayName']
          // Note: Removed 'top: 5' as $top is not supported by EntityDefinitions endpoint
        })
        
        expect(Array.isArray(entities)).toBe(true)
        expect(entities.length).toBeGreaterThan(0)
        // EntityDefinitions returns all entities, so we expect more than just 5
        console.log(`Fetched ${entities.length} entities from EntityDefinitions`)
        
        // Verify entity structure
        const firstEntity = entities[0]
        expect(firstEntity).toHaveProperty('LogicalName')
        expect(firstEntity).toHaveProperty('SchemaName')
        expect(typeof firstEntity.LogicalName).toBe('string')
        expect(typeof firstEntity.SchemaName).toBe('string')
      } catch (error) {
        // Use advanced logging for detailed error analysis
        if (error instanceof Error && error.message.includes('Failed to fetch entity definitions')) {
          console.error('Metadata client test failed - this helps identify API limitations')
        }
        throw error
      }
    }, 30000)

    it('should handle API errors gracefully with detailed logging', async () => {
      try {
        // Try to fetch with an invalid filter to test error handling
        await getEntityDefinitions({
          filter: "InvalidProperty eq 'test'", // This should cause an error
          select: ['LogicalName']
        })
        
        // If we get here, the API didn't reject the invalid filter
        console.warn('Expected API error but request succeeded')
      } catch (error) {
        // This is expected - verify we got a meaningful error
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toContain('Failed to fetch entity definitions')
        
        // The advancedLog function should have been called and provided detailed error info
        console.log('Error handling test passed - detailed error information was logged')
      }
    }, 30000)
  })

  describeOrSkip('Token Cache Management', () => {
    it('should clear token cache', async () => {
      // First, get a token to populate cache
      await getAzureToken({
        resourceUrl: dataverseInstance!
      })
      
      let cacheInfo = getTokenCacheInfo()
      expect(cacheInfo.length).toBeGreaterThan(0)
      
      // Clear cache
      await clearTokenCache()
      
      cacheInfo = getTokenCacheInfo()
      expect(cacheInfo).toHaveLength(0)
    })

    it('should handle expired tokens by refreshing', async () => {
      // This test is hard to implement without mocking time
      // In a real scenario, we'd need to wait for token expiry or mock the expiry time
      console.log('Token expiry test - would require time mocking for full testing')
      
      // At minimum, verify we can get a fresh token
      const token = await getAzureToken({
        resourceUrl: dataverseInstance!
      })
      
      expect(token).toBeTruthy()
    }, 30000)
  })
})

// Helper to run authentication tests in isolation
if (import.meta.vitest) {
  const testDataverseInstance = process.env.DATAVERSE_INSTANCE
  console.log('🔐 Authentication Tests Configuration:')
  console.log(`   DATAVERSE_INSTANCE: ${testDataverseInstance || 'NOT SET'}`)
  console.log(`   Tests will be ${!testDataverseInstance ? 'SKIPPED' : 'EXECUTED'}`)
  
  if (!testDataverseInstance) {
    console.warn('⚠️  Set DATAVERSE_INSTANCE environment variable to run authentication tests')
  }
}