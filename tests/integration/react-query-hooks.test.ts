/**
 * Integration tests for React Query hooks generation
 * Tests the complete flow from metadata to working React Query hooks using generated hooks
 */

import { describe, test, expect, beforeAll } from 'vitest'
import { 
  configureFetch,
  DataverseUrls,
  configureDataverseUrls,
  createAuthenticatedFetcher
} from '../../src/query/index.js'
import { setupDataverse } from '../setup-integration.js'
import type { 
  ODataResponse
} from '../../src/query/types.js'

// Import generated hooks for PUM entities
import { usepum_Initiative } from '../../test-output/pum-hooks/hooks/pum_initiative.hooks.js'
import { usepum_Program } from '../../test-output/pum-hooks/hooks/pum_program.hooks.js' 
import { usepum_Portfolio } from '../../test-output/pum-hooks/hooks/pum_portfolio.hooks.js'

// Import generated metadata
import { pum_InitiativeMetadata } from '../../test-output/pum-hooks/pum_initiative.js'
import { pum_ProgramMetadata } from '../../test-output/pum-hooks/pum_program.js'
import { pum_PortfolioMetadata } from '../../test-output/pum-hooks/pum_portfolio.js'

// Configure Dataverse instance
const DATAVERSE_URL = 'https://krapowerppm.crm4.dynamics.com'

beforeAll(async () => {
  await setupDataverse()
  
  // Configure URL builder
  configureDataverseUrls({
    instanceUrl: DATAVERSE_URL,
    apiVersion: 'v9.1'
  })
  
  // Configure authenticated fetch
  const authenticatedFetch = createAuthenticatedFetcher()
  configureFetch(authenticatedFetch as (input: string | URL | Request, init?: RequestInit) => Promise<Response>)
})

describe('React Query Hooks Integration', () => {
  
  describe('pum_initiative table', () => {
    
    test('should have generated hooks available', () => {
      expect(usepum_Initiative).toBeDefined()
      expect(usepum_Initiative.useEntity).toBeTypeOf('function')
      expect(usepum_Initiative.useEntityList).toBeTypeOf('function')
      expect(usepum_Initiative.useEntityCount).toBeTypeOf('function')
      expect(usepum_Initiative.useRelatedEntities).toBeTypeOf('function')
      expect(usepum_Initiative.metadata).toEqual(pum_InitiativeMetadata)
    })
    
    test('should have generated metadata with correct properties', () => {
      expect(pum_InitiativeMetadata.logicalName).toBe('pum_initiative')
      expect(pum_InitiativeMetadata.schemaName).toBe('pum_Initiative')  
      expect(pum_InitiativeMetadata.entitySetName).toBe('pum_initiatives')
      expect(pum_InitiativeMetadata.displayName).toBe('Initiative')
      expect(pum_InitiativeMetadata.primaryIdAttribute).toBe('pum_initiativeid')
      expect(pum_InitiativeMetadata.primaryNameAttribute).toBe('pum_name')
      expect(pum_InitiativeMetadata.isCustomEntity).toBe(true)
      expect(pum_InitiativeMetadata.entityType).toBe('pum_initiative')
    })
    
    test('should generate correct URLs for entity operations', () => {
      // Test basic entity set URL
      const listUrl = DataverseUrls.entitySet(pum_InitiativeMetadata, {
        $top: 10,
        $select: ['pum_name', 'pum_description']
      })
      
      expect(listUrl).toContain('/api/data/v9.1/pum_initiatives')
      expect(listUrl).toContain('$top=10')
      expect(listUrl).toContain('$select=pum_name,pum_description')
      
      // Test single entity URL
      const testId = '123e4567-e89b-12d3-a456-426614174000'
      const singleUrl = DataverseUrls.entity(pum_InitiativeMetadata, testId, {
        $select: ['pum_name', 'pum_description']
      })
      
      expect(singleUrl).toContain(`/api/data/v9.1/pum_initiatives(${testId})`)
      expect(singleUrl).toContain('$select=pum_name,pum_description')
      
      // Test count URL
      const countUrl = DataverseUrls.count(pum_InitiativeMetadata, {
        $filter: { statecode: 0 }
      })
      
      expect(countUrl).toContain('/api/data/v9.1/pum_initiatives/$count')
      expect(countUrl).toContain('$filter=statecode eq 0')
    })
    
    test('should make successful API calls for entity list', async () => {
      const url = DataverseUrls.entitySet(pum_InitiativeMetadata, {
        $top: 5,
        $select: ['pum_name', 'pum_description', 'statecode']
      })
      
      const authenticatedFetch = createAuthenticatedFetcher()
      const response = await authenticatedFetch(url)
      
      expect(response.ok).toBe(true)
      
      const data = await response.json() as ODataResponse<Record<string, unknown>>
      expect(data).toHaveProperty('value')
      expect(Array.isArray(data.value)).toBe(true)
      
      // Log results for verification
      console.log(`✅ Retrieved ${data.value?.length || 0} pum_initiative records`)
      console.log(`🔗 API URL: ${url}`)
      
      if (data.value && data.value.length > 0) {
        const sample = data.value[0]
        expect(sample).toHaveProperty('pum_name')
        console.log('📋 Sample pum_initiative:', {
          name: sample.pum_name,
          description: sample.pum_description,
          statecode: sample.statecode
        })
      }
    })
    
    test('should make successful API calls for entity count', async () => {
      const url = DataverseUrls.count(pum_InitiativeMetadata, {
        $filter: { statecode: 0 }
      })
      
      const authenticatedFetch = createAuthenticatedFetcher()
      const response = await authenticatedFetch(url)
      
      expect(response.ok).toBe(true)
      
      const countText = await response.text()
      const count = parseInt(countText, 10)
      
      expect(count).toBeGreaterThanOrEqual(0)
      console.log(`📊 Active pum_initiative count: ${count}`)
      console.log(`🔗 Count API URL: ${url}`)
    })
    
    test('should handle filters correctly in URLs', () => {
      const complexUrl = DataverseUrls.entitySet(pum_InitiativeMetadata, {
        $filter: {
          $and: [
            { statecode: 0 },
            { 
              $or: [
                { pum_name: { $contains: 'test' } },
                { pum_name: { $contains: 'project' } }
              ]
            }
          ]
        },
        $orderby: { pum_name: 'asc' },
        $top: 10
      })
      
      expect(complexUrl).toContain('$filter=')
      expect(complexUrl).toContain('and')
      expect(complexUrl).toContain('or')
      expect(complexUrl).toContain('contains')
      expect(complexUrl).toContain('$orderby=pum_name asc')
      
      console.log('🔍 Complex filter URL:', complexUrl)
    })
  })
  
  describe('pum_program table', () => {
    
    test('should have generated hooks available', () => {
      expect(usepum_Program).toBeDefined()
      expect(usepum_Program.useEntity).toBeTypeOf('function')
      expect(usepum_Program.useEntityList).toBeTypeOf('function')
      expect(usepum_Program.useEntityCount).toBeTypeOf('function')
      expect(usepum_Program.useRelatedEntities).toBeTypeOf('function')
      expect(usepum_Program.metadata).toEqual(pum_ProgramMetadata)
    })
    
    test('should have generated metadata with correct properties', () => {
      expect(pum_ProgramMetadata.logicalName).toBe('pum_program')
      expect(pum_ProgramMetadata.schemaName).toBe('pum_Program')
      expect(pum_ProgramMetadata.entitySetName).toBe('pum_programs')
      expect(pum_ProgramMetadata.displayName).toBe('Program')
      expect(pum_ProgramMetadata.primaryIdAttribute).toBe('pum_programid')
      expect(pum_ProgramMetadata.primaryNameAttribute).toBe('pum_name')
      expect(pum_ProgramMetadata.isCustomEntity).toBe(true)
      expect(pum_ProgramMetadata.entityType).toBe('pum_program')
    })
    
    test('should generate correct URLs for program operations', () => {
      const listUrl = DataverseUrls.entitySet(pum_ProgramMetadata, {
        $top: 10,
        $select: ['pum_name', 'pum_description']
      })
      
      expect(listUrl).toContain('/api/data/v9.1/pum_programs')
      expect(listUrl).toContain('$top=10')
      expect(listUrl).toContain('$select=pum_name,pum_description')
    })
    
    test('should make successful API calls for program list', async () => {
      const url = DataverseUrls.entitySet(pum_ProgramMetadata, {
        $top: 5,
        $select: ['pum_name', 'pum_description', 'statecode']
      })
      
      const authenticatedFetch = createAuthenticatedFetcher()
      const response = await authenticatedFetch(url)
      
      expect(response.ok).toBe(true)
      
      const data = await response.json() as ODataResponse<Record<string, unknown>>
      expect(data).toHaveProperty('value')
      expect(Array.isArray(data.value)).toBe(true)
      
      console.log(`✅ Retrieved ${data.value?.length || 0} pum_program records`)
      console.log(`🔗 API URL: ${url}`)
      
      if (data.value && data.value.length > 0) {
        const sample = data.value[0]
        expect(sample).toHaveProperty('pum_name')
        console.log('📋 Sample pum_program:', {
          name: sample.pum_name,
          description: sample.pum_description,
          statecode: sample.statecode
        })
      }
    })
    
    test('should test related entities URL generation', () => {
      const testId = '123e4567-e89b-12d3-a456-426614174000'
      const relatedUrl = DataverseUrls.related(pum_ProgramMetadata, testId, 'pum_program_pum_initiative', {
        $select: ['pum_name', 'pum_description'],
        $top: 10
      })
      
      expect(relatedUrl).toContain(`/api/data/v9.1/pum_programs(${testId})/pum_program_pum_initiative`)
      expect(relatedUrl).toContain('$select=pum_name,pum_description')
      expect(relatedUrl).toContain('$top=10')
      
      console.log('🔗 Related entities URL:', relatedUrl)
    })
  })
  
  describe('pum_portfolio table', () => {
    
    test('should have generated hooks available', () => {
      expect(usepum_Portfolio).toBeDefined()
      expect(usepum_Portfolio.useEntity).toBeTypeOf('function')
      expect(usepum_Portfolio.useEntityList).toBeTypeOf('function')
      expect(usepum_Portfolio.useEntityCount).toBeTypeOf('function')
      expect(usepum_Portfolio.useRelatedEntities).toBeTypeOf('function')
      expect(usepum_Portfolio.metadata).toEqual(pum_PortfolioMetadata)
    })
    
    test('should have generated metadata with correct properties', () => {
      expect(pum_PortfolioMetadata.logicalName).toBe('pum_portfolio')
      expect(pum_PortfolioMetadata.schemaName).toBe('pum_Portfolio')
      expect(pum_PortfolioMetadata.entitySetName).toBe('pum_portfolios')
      expect(pum_PortfolioMetadata.displayName).toBe('Portfolio')
      expect(pum_PortfolioMetadata.primaryIdAttribute).toBe('pum_portfolioid')
      expect(pum_PortfolioMetadata.primaryNameAttribute).toBe('pum_name')
      expect(pum_PortfolioMetadata.isCustomEntity).toBe(true)
      expect(pum_PortfolioMetadata.entityType).toBe('pum_portfolio')
    })
    
    test('should generate correct URLs for portfolio operations', () => {
      const listUrl = DataverseUrls.entitySet(pum_PortfolioMetadata, {
        $top: 10,
        $select: ['pum_name', 'pum_description']
      })
      
      expect(listUrl).toContain('/api/data/v9.1/pum_portfolios')
      expect(listUrl).toContain('$top=10')
      expect(listUrl).toContain('$select=pum_name,pum_description')
    })
    
    test('should make successful API calls for portfolio list', async () => {
      const url = DataverseUrls.entitySet(pum_PortfolioMetadata, {
        $top: 5,
        $select: ['pum_name', 'pum_description', 'statecode']
      })
      
      const authenticatedFetch = createAuthenticatedFetcher()
      const response = await authenticatedFetch(url)
      
      expect(response.ok).toBe(true)
      
      const data = await response.json() as ODataResponse<Record<string, unknown>>
      expect(data).toHaveProperty('value')
      expect(Array.isArray(data.value)).toBe(true)
      
      console.log(`✅ Retrieved ${data.value?.length || 0} pum_portfolio records`)
      console.log(`🔗 API URL: ${url}`)
      
      if (data.value && data.value.length > 0) {
        const sample = data.value[0]
        expect(sample).toHaveProperty('pum_name')
        console.log('📋 Sample pum_portfolio:', {
          name: sample.pum_name,
          description: sample.pum_description,
          statecode: sample.statecode
        })
      }
    })
    
    test('should test count API calls for portfolio', async () => {
      const url = DataverseUrls.count(pum_PortfolioMetadata, {
        $filter: { statecode: 0 }
      })
      
      const authenticatedFetch = createAuthenticatedFetcher()
      const response = await authenticatedFetch(url)
      
      expect(response.ok).toBe(true)
      
      const countText = await response.text()
      const count = parseInt(countText, 10)
      
      expect(count).toBeGreaterThanOrEqual(0)
      console.log(`📊 Active pum_portfolio count: ${count}`)
      console.log(`🔗 Count API URL: ${url}`)
    })
  })
  
  describe('Cross-entity URL validation', () => {
    test('should generate unique URLs for different entities', () => {
      const initiativeUrl = DataverseUrls.entitySet(pum_InitiativeMetadata, { $top: 5 })
      const programUrl = DataverseUrls.entitySet(pum_ProgramMetadata, { $top: 5 })
      const portfolioUrl = DataverseUrls.entitySet(pum_PortfolioMetadata, { $top: 5 })
      
      // Ensure all URLs are unique
      expect(initiativeUrl).toContain('pum_initiatives')
      expect(programUrl).toContain('pum_programs')  
      expect(portfolioUrl).toContain('pum_portfolios')
      
      expect(initiativeUrl).not.toEqual(programUrl)
      expect(programUrl).not.toEqual(portfolioUrl)
      expect(initiativeUrl).not.toEqual(portfolioUrl)
      
      console.log('🌐 Generated URLs:')
      console.log('  Initiative:', initiativeUrl)
      console.log('  Program:', programUrl)
      console.log('  Portfolio:', portfolioUrl)
    })
    
    test('should validate URL formatting for all entities', () => {
      const entities = [
        { metadata: pum_InitiativeMetadata, plural: 'pum_initiatives' },
        { metadata: pum_ProgramMetadata, plural: 'pum_programs' },
        { metadata: pum_PortfolioMetadata, plural: 'pum_portfolios' }
      ]
      
      entities.forEach(entity => {
        const url = DataverseUrls.entitySet(entity.metadata, {
          $select: ['pum_name'],
          $top: 1
        })
        
        // Validate URL structure
        expect(url).toMatch(new RegExp(`^${DATAVERSE_URL}/api/data/v9\\.1/${entity.plural}`))
        expect(url).toContain('$select=pum_name')
        expect(url).toContain('$top=1')
      })
    })
  })
  
  describe('Error handling', () => {
    test('should handle invalid entity ID gracefully', async () => {
      const invalidId = 'invalid-guid-format'
      const url = DataverseUrls.entity(pum_InitiativeMetadata, invalidId)
      
      const authenticatedFetch = createAuthenticatedFetcher()
      const response = await authenticatedFetch(url)
      
      // Should return a 4xx error for invalid GUID
      expect(response.ok).toBe(false)
      expect(response.status).toBeGreaterThanOrEqual(400)
      expect(response.status).toBeLessThan(500)
      
      console.log(`❌ Expected error for invalid ID (${response.status}): ${response.statusText}`)
      console.log(`🔗 Invalid ID URL: ${url}`)
    })
    
    test('should handle non-existent entity gracefully', async () => {
      // Create metadata for a non-existent entity
      const nonExistentMetadata = {
        ...pum_InitiativeMetadata,
        logicalName: 'nonexistent_entity',
        schemaName: 'NonexistentEntity',
        entitySetName: 'nonexistent_entities',
        entityType: 'nonexistent_entity',
      }
      
      const url = DataverseUrls.entitySet(nonExistentMetadata, { $top: 1 })
      
      const authenticatedFetch = createAuthenticatedFetcher()
      const response = await authenticatedFetch(url)
      
      // Should return a 4xx error for non-existent entity
      expect(response.ok).toBe(false)
      expect(response.status).toBeGreaterThanOrEqual(400)
      
      console.log(`❌ Expected error for non-existent entity (${response.status}): ${response.statusText}`)
      console.log(`🔗 Non-existent entity URL: ${url}`)
    })
  })
})