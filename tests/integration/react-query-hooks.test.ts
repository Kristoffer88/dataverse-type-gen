/**
 * Integration tests for React Query hooks generation
 * Tests the complete flow from metadata to working React Query hooks
 */

import { describe, test, expect, beforeAll } from 'vitest'
import { 
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
})

describe('React Query Hooks Integration', () => {
  
  describe('Hook Generation Validation', () => {
    test('should generate all hook functions for each entity', () => {
      const entities = [
        { hooks: usepum_Initiative, metadata: pum_InitiativeMetadata, name: 'Initiative' },
        { hooks: usepum_Program, metadata: pum_ProgramMetadata, name: 'Program' },
        { hooks: usepum_Portfolio, metadata: pum_PortfolioMetadata, name: 'Portfolio' }
      ]
      
      entities.forEach(entity => {
        console.log(`📋 Validating ${entity.name} hooks...`)
        
        // Verify hook functions exist
        expect(entity.hooks.useEntity).toBeTypeOf('function')
        expect(entity.hooks.useEntityList).toBeTypeOf('function')
        expect(entity.hooks.useEntityCount).toBeTypeOf('function')
        expect(entity.hooks.useRelatedEntities).toBeTypeOf('function')
        
        // Verify metadata is attached
        expect(entity.hooks.metadata).toEqual(entity.metadata)
        
        // Verify metadata has essential properties
        expect(entity.metadata.logicalName).toBeTruthy()
        expect(entity.metadata.primaryIdAttribute).toBeTruthy()
        expect(entity.metadata.primaryNameAttribute).toBeTruthy()
        expect(entity.metadata.entitySetName).toBeTruthy()
        expect(entity.metadata.isCustomEntity).toBe(true)
        
        console.log(`✅ ${entity.name}: primaryName=${entity.metadata.primaryNameAttribute}, entitySet=${entity.metadata.entitySetName}`)
      })
    })
  })
  
  describe('Live API Integration', () => {
    test('should successfully fetch data using generated metadata (portfolio)', async () => {
      console.log('🔍 Testing live API calls with pum_portfolio...')
      
      const authenticatedFetch = createAuthenticatedFetcher()
      
      // Test 1: Basic entity list (no $select to avoid field issues)
      const listUrl = DataverseUrls.entitySet(pum_PortfolioMetadata, { $top: 3 })
      console.log('🔗 List URL:', listUrl)
      
      const listResponse = await authenticatedFetch(listUrl)
      expect(listResponse.ok).toBe(true)
      
      const listData = await listResponse.json() as ODataResponse<Record<string, unknown>>
      expect(listData).toHaveProperty('value')
      expect(Array.isArray(listData.value)).toBe(true)
      console.log(`📊 Retrieved ${listData.value?.length || 0} portfolio records`)
      
      // Test 2: Entity count (simple, no filters)
      const countUrl = DataverseUrls.count(pum_PortfolioMetadata)
      console.log('🔗 Count URL:', countUrl)
      
      const countResponse = await authenticatedFetch(countUrl)
      expect(countResponse.ok).toBe(true)
      
      const countText = await countResponse.text()
      const count = parseInt(countText, 10)
      expect(count).toBeGreaterThanOrEqual(0)
      console.log(`📊 Total portfolio count: ${count}`)
      
      // Test 3: Specific field selection with primaryNameAttribute
      const selectUrl = DataverseUrls.entitySet(pum_PortfolioMetadata, {
        $top: 1,
        $select: [pum_PortfolioMetadata.primaryNameAttribute, pum_PortfolioMetadata.primaryIdAttribute]
      })
      console.log('🔗 Select URL:', selectUrl)
      
      const selectResponse = await authenticatedFetch(selectUrl)
      expect(selectResponse.ok).toBe(true)
      
      const selectData = await selectResponse.json() as ODataResponse<Record<string, unknown>>
      if (selectData.value && selectData.value.length > 0) {
        const record = selectData.value[0]
        expect(record).toHaveProperty(pum_PortfolioMetadata.primaryNameAttribute)
        expect(record).toHaveProperty(pum_PortfolioMetadata.primaryIdAttribute)
        console.log(`✅ Fields retrieved: ${Object.keys(record).join(', ')}`)
      }
    })
    
    test('should handle different entity types without hardcoded assumptions', async () => {
      console.log('🔍 Testing multiple entities with their actual metadata...')
      
      const authenticatedFetch = createAuthenticatedFetcher()
      const entities = [
        { metadata: pum_InitiativeMetadata, name: 'Initiative' },
        { metadata: pum_ProgramMetadata, name: 'Program' },
      ]
      
      for (const entity of entities) {
        console.log(`📋 Testing ${entity.name} (${entity.metadata.logicalName})...`)
        
        // Simple count test - most likely to succeed
        const countUrl = DataverseUrls.count(entity.metadata)
        const countResponse = await authenticatedFetch(countUrl)
        
        if (countResponse.ok) {
          const count = parseInt(await countResponse.text(), 10)
          console.log(`✅ ${entity.name}: ${count} records exist`)
        } else {
          console.log(`⚠️  ${entity.name}: Entity might not exist in this environment (${countResponse.status})`)
        }
        
        // Test URL generation works
        const listUrl = DataverseUrls.entitySet(entity.metadata, { $top: 1 })
        expect(listUrl).toContain(entity.metadata.entitySetName)
        expect(listUrl).toContain('%24top=1') // URL encoded $top=1
      }
    })
  })
  
  describe('Error Handling', () => {
    test('should handle invalid entity requests gracefully', async () => {
      const authenticatedFetch = createAuthenticatedFetcher()
      
      // Test with invalid GUID
      const invalidUrl = DataverseUrls.entity(pum_PortfolioMetadata, 'invalid-guid')
      const invalidResponse = await authenticatedFetch(invalidUrl)
      
      expect(invalidResponse.ok).toBe(false)
      expect(invalidResponse.status).toBeGreaterThanOrEqual(400)
      console.log(`✅ Invalid GUID handled correctly (${invalidResponse.status}: ${invalidResponse.statusText})`)
    })
  })
  
  describe('URL Generation', () => {
    test('should generate correct URL patterns for all entities', () => {
      const entities = [
        { metadata: pum_InitiativeMetadata, expected: 'pum_initiatives' },
        { metadata: pum_ProgramMetadata, expected: 'pum_programs' },
        { metadata: pum_PortfolioMetadata, expected: 'pum_portfolios' }
      ]
      
      entities.forEach(entity => {
        const url = DataverseUrls.entitySet(entity.metadata, { $top: 5 })
        expect(url).toContain(`/api/data/v9.1/${entity.expected}`)
        expect(url).toContain('%24top=5') // URL encoded $top=5
        console.log(`✅ ${entity.metadata.logicalName} → ${entity.expected}`)
      })
    })
  })
})