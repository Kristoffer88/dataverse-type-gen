/**
 * Integration tests specifically for URL generation correctness
 * Validates that URLs are properly formatted for the ssopowerppm.crm4.dynamics.com instance
 */

import { describe, test, expect, beforeAll } from 'vitest'
import { 
  DataverseUrls,
  configureDataverseUrls
} from '../../src/query/index.js'
import type { EntityMetadata } from '../../src/query/types.js'

// Test configuration
const DATAVERSE_URL = 'https://ssopowerppm.crm4.dynamics.com'
const API_VERSION = 'v9.1'

beforeAll(() => {
  configureDataverseUrls({
    instanceUrl: DATAVERSE_URL,
    apiVersion: API_VERSION
  })
})

/**
 * Helper function to check if a URL contains expected content (accounting for URL encoding)
 */
function expectUrlToContain(url: string, expected: string): void {
  expect(decodeURIComponent(url)).toContain(expected)
}

describe('URL Generation Validation', () => {
  
  const testEntities = [
    {
      name: 'pum_initiative',
      metadata: {
        logicalName: 'pum_initiative',
        schemaName: 'pum_Initiative',
        entitySetName: 'pum_initiatives',
        collectionName: 'pum_initiatives',
        displayName: 'Initiative',
        primaryIdAttribute: 'pum_initiativeid',
        primaryNameAttribute: 'pum_name',
        isCustomEntity: true,
        entityType: 'pum_initiative',
        attributeCount: 0,
        optionSetCount: 0,
        primaryKey: {
          logicalName: 'pum_initiativeid',
          attributeType: 'Uniqueidentifier',
          displayName: 'Initiative ID'
        }
      } as EntityMetadata,
      expectedPlural: 'pum_initiatives'
    },
    {
      name: 'pum_program',
      metadata: {
        logicalName: 'pum_program',
        schemaName: 'pum_Program',
        entitySetName: 'pum_programs',
        collectionName: 'pum_programs',
        displayName: 'Program',
        primaryIdAttribute: 'pum_programid',
        primaryNameAttribute: 'pum_name',
        isCustomEntity: true,
        entityType: 'pum_program',
        attributeCount: 0,
        optionSetCount: 0,
        primaryKey: {
          logicalName: 'pum_programid',
          attributeType: 'Uniqueidentifier',
          displayName: 'Program ID'
        }
      } as EntityMetadata,
      expectedPlural: 'pum_programs'
    },
    {
      name: 'pum_portfolio',
      metadata: {
        logicalName: 'pum_portfolio',
        schemaName: 'pum_Portfolio',
        entitySetName: 'pum_portfolios',
        collectionName: 'pum_portfolios',
        displayName: 'Portfolio',
        primaryIdAttribute: 'pum_portfolioid',
        primaryNameAttribute: 'pum_name',
        isCustomEntity: true,
        entityType: 'pum_portfolio',
        attributeCount: 0,
        optionSetCount: 0,
        primaryKey: {
          logicalName: 'pum_portfolioid',
          attributeType: 'Uniqueidentifier',
          displayName: 'Portfolio ID'
        }
      } as EntityMetadata,
      expectedPlural: 'pum_portfolios'
    }
  ]
  
  describe('Basic URL Structure', () => {
    testEntities.forEach(entity => {
      test(`should generate correct base URL for ${entity.name}`, () => {
        const url = DataverseUrls.entitySet(entity.metadata)
        
        const expectedBase = `${DATAVERSE_URL}/api/data/${API_VERSION}/${entity.expectedPlural}`
        expect(url).toBe(expectedBase)
        
        console.log(`✅ ${entity.name} base URL: ${url}`)
      })
    })
  })
  
  describe('Query Parameter Encoding', () => {
    testEntities.forEach(entity => {
      test(`should properly encode $select parameters for ${entity.name}`, () => {
        const url = DataverseUrls.entitySet(entity.metadata, {
          $select: ['pum_name', 'pum_description', 'statecode', 'createdon']
        })
        
        expectUrlToContain(url, '$select=pum_name,pum_description,statecode,createdon')
        expect(url).not.toContain(' ') // No spaces in URL
        
        console.log(`🔍 ${entity.name} $select URL: ${url}`)
      })
      
      test(`should properly encode $top and $skip parameters for ${entity.name}`, () => {
        const url = DataverseUrls.entitySet(entity.metadata, {
          $top: 25,
          $skip: 50
        })
        
        expect(decodeURIComponent(url)).toContain('$top=25')
        expect(decodeURIComponent(url)).toContain('$skip=50')
        
        console.log(`📄 ${entity.name} pagination URL: ${url}`)
      })
      
      test(`should properly encode $orderby parameters for ${entity.name}`, () => {
        const url = DataverseUrls.entitySet(entity.metadata, {
          $orderby: { 
            pum_name: 'asc',
            createdon: 'desc'
          }
        })
        
        expect(decodeURIComponent(url)).toContain('$orderby=pum_name asc,createdon desc')
        
        console.log(`↕️ ${entity.name} $orderby URL: ${url}`)
      })
    })
  })
  
  describe('Filter Parameter Encoding', () => {
    testEntities.forEach(entity => {
      test(`should encode simple equality filters for ${entity.name}`, () => {
        const url = DataverseUrls.entitySet(entity.metadata, {
          $filter: {
            statecode: 0,
            pum_name: 'Test Project'
          }
        })
        
        expect(decodeURIComponent(url)).toContain('$filter=')
        expect(decodeURIComponent(url)).toContain('statecode eq 0')
        expect(decodeURIComponent(url)).toContain("pum_name eq 'Test Project'")
        
        console.log(`🎯 ${entity.name} simple filter URL: ${url}`)
      })
      
      test(`should encode complex operator filters for ${entity.name}`, () => {
        const url = DataverseUrls.entitySet(entity.metadata, {
          $filter: {
            pum_name: { $contains: 'project' },
            createdon: { $gt: '2024-01-01' },
            statecode: { $in: [0, 1] }
          }
        })
        
        expect(url).toContain('$filter=')
        expect(url).toContain("contains(pum_name,'project')")
        expect(url).toContain("createdon gt '2024-01-01'")
        expect(url).toContain('statecode in (0,1)')
        
        console.log(`🔧 ${entity.name} operator filter URL: ${url}`)
      })
      
      test(`should encode logical AND/OR filters for ${entity.name}`, () => {
        const url = DataverseUrls.entitySet(entity.metadata, {
          $filter: {
            $and: [
              { statecode: 0 },
              {
                $or: [
                  { pum_name: { $contains: 'project' } },
                  { pum_name: { $contains: 'initiative' } }
                ]
              }
            ]
          }
        })
        
        expect(url).toContain('$filter=')
        expect(url).toContain('and')
        expect(url).toContain('or')
        expect(url).toContain('contains')
        
        console.log(`🔀 ${entity.name} logical filter URL: ${url}`)
      })
    })
  })
  
  describe('Single Entity URLs', () => {
    const testGuid = '123e4567-e89b-12d3-a456-426614174000'
    
    testEntities.forEach(entity => {
      test(`should generate correct single entity URL for ${entity.name}`, () => {
        const url = DataverseUrls.entity(entity.metadata, testGuid)
        
        const expectedUrl = `${DATAVERSE_URL}/api/data/${API_VERSION}/${entity.expectedPlural}(${testGuid})`
        expect(url).toBe(expectedUrl)
        
        console.log(`🎯 ${entity.name} single entity URL: ${url}`)
      })
      
      test(`should generate single entity URL with $select for ${entity.name}`, () => {
        const url = DataverseUrls.entity(entity.metadata, testGuid, {
          $select: ['pum_name', 'pum_description']
        })
        
        expect(url).toContain(`/${entity.expectedPlural}(${testGuid})`)
        expect(url).toContain('$select=pum_name,pum_description')
        
        console.log(`🔍 ${entity.name} single entity with $select URL: ${url}`)
      })
      
      test(`should generate single entity URL with $expand for ${entity.name}`, () => {
        const url = DataverseUrls.entity(entity.metadata, testGuid, {
          $expand: ['pum_createdby', 'pum_ownerid']
        })
        
        expect(url).toContain(`/${entity.expectedPlural}(${testGuid})`)
        expect(url).toContain('$expand=pum_createdby,pum_ownerid')
        
        console.log(`🔗 ${entity.name} single entity with $expand URL: ${url}`)
      })
    })
  })
  
  describe('Count URLs', () => {
    testEntities.forEach(entity => {
      test(`should generate correct count URL for ${entity.name}`, () => {
        const url = DataverseUrls.count(entity.metadata)
        
        const expectedUrl = `${DATAVERSE_URL}/api/data/${API_VERSION}/${entity.expectedPlural}/$count`
        expect(url).toBe(expectedUrl)
        
        console.log(`🔢 ${entity.name} count URL: ${url}`)
      })
      
      test(`should generate count URL with filters for ${entity.name}`, () => {
        const url = DataverseUrls.count(entity.metadata, {
          $filter: {
            statecode: 0,
            pum_name: { $contains: 'active' }
          }
        })
        
        expect(url).toContain('/$count')
        expect(url).toContain('$filter=')
        expect(url).toContain('statecode eq 0')
        expect(url).toContain("contains(pum_name,'active')")
        
        console.log(`🎯 ${entity.name} filtered count URL: ${url}`)
      })
    })
  })
  
  describe('Related Entity URLs', () => {
    const testGuid = '123e4567-e89b-12d3-a456-426614174000'
    
    test('should generate correct related entity URLs for hierarchical relationships', () => {
      // Portfolio -> Programs
      const portfolioToPrograms = DataverseUrls.related(
        testEntities[2].metadata, // portfolio
        testGuid,
        'pum_portfolio_pum_program',
        {
          $select: ['pum_name', 'pum_description'],
          $top: 10
        }
      )
      
      expect(portfolioToPrograms).toContain(`/pum_portfolios(${testGuid})/pum_portfolio_pum_program`)
      expect(portfolioToPrograms).toContain('$select=pum_name,pum_description')
      expect(portfolioToPrograms).toContain('$top=10')
      
      console.log(`🔗 Portfolio to Programs URL: ${portfolioToPrograms}`)
      
      // Program -> Initiatives
      const programToInitiatives = DataverseUrls.related(
        testEntities[1].metadata, // program
        testGuid,
        'pum_program_pum_initiative',
        {
          $select: ['pum_name', 'pum_status'],
          $filter: { statecode: 0 }
        }
      )
      
      expect(programToInitiatives).toContain(`/pum_programs(${testGuid})/pum_program_pum_initiative`)
      expect(programToInitiatives).toContain('$select=pum_name,pum_status')
      expect(programToInitiatives).toContain('$filter=statecode eq 0')
      
      console.log(`🔗 Program to Initiatives URL: ${programToInitiatives}`)
    })
  })
  
  describe('URL Character Encoding', () => {
    testEntities.forEach(entity => {
      test(`should properly handle special characters in filters for ${entity.name}`, () => {
        const url = DataverseUrls.entitySet(entity.metadata, {
          $filter: {
            pum_name: { $contains: "Test & Co's Project" },
            pum_description: { $contains: '100% Complete' }
          }
        })
        
        // Should properly encode special characters
        expect(url).toContain('$filter=')
        expect(url).not.toContain('&') // Should be encoded
        expect(url).not.toContain("'") // Should be escaped/encoded
        
        console.log(`🎭 ${entity.name} special characters URL: ${url}`)
      })
      
      test(`should handle null values in filters for ${entity.name}`, () => {
        const url = DataverseUrls.entitySet(entity.metadata, {
          $filter: {
            pum_description: { $eq: null },
            pum_duedate: { $ne: null }
          }
        })
        
        expect(url).toContain('pum_description eq null')
        expect(url).toContain('pum_duedate ne null')
        
        console.log(`🤷 ${entity.name} null values URL: ${url}`)
      })
    })
  })
  
  describe('URL Validation Against Dataverse Patterns', () => {
    test('should follow OData v4 URL patterns', () => {
      const entity = testEntities[0] // Use initiative as example
      
      // Test various OData patterns
      const patterns = [
        {
          description: 'Basic entity set',
          url: DataverseUrls.entitySet(entity.metadata),
          pattern: new RegExp(`^${DATAVERSE_URL}/api/data/${API_VERSION}/${entity.expectedPlural}$`)
        },
        {
          description: 'Entity set with query options',
          url: DataverseUrls.entitySet(entity.metadata, { $top: 10, $select: ['pum_name'] }),
          pattern: new RegExp(`^${DATAVERSE_URL}/api/data/${API_VERSION}/${entity.expectedPlural}\\?`)
        },
        {
          description: 'Single entity by key',
          url: DataverseUrls.entity(entity.metadata, '123e4567-e89b-12d3-a456-426614174000'),
          pattern: new RegExp(`^${DATAVERSE_URL}/api/data/${API_VERSION}/${entity.expectedPlural}\\([a-f0-9-]{36}\\)$`)
        },
        {
          description: 'Count endpoint',
          url: DataverseUrls.count(entity.metadata),
          pattern: new RegExp(`^${DATAVERSE_URL}/api/data/${API_VERSION}/${entity.expectedPlural}/\\$count$`)
        }
      ]
      
      patterns.forEach(({ description, url, pattern }) => {
        expect(url).toMatch(pattern)
        console.log(`✅ ${description}: ${url}`)
      })
    })
    
    test('should validate query parameter order and formatting', () => {
      const entity = testEntities[0]
      
      const url = DataverseUrls.entitySet(entity.metadata, {
        $select: ['pum_name', 'pum_description'],
        $filter: { statecode: 0 },
        $orderby: { pum_name: 'asc' },
        $top: 10,
        $skip: 5,
        $count: true
      })
      
      // Verify URL structure
      expect(url).toContain('?')
      expect(url.split('?')[0]).toMatch(new RegExp(`${entity.expectedPlural}$`))
      
      // Verify all parameters are present
      const queryString = url.split('?')[1]
      expect(queryString).toContain('$select=')
      expect(queryString).toContain('$filter=')
      expect(queryString).toContain('$orderby=')
      expect(queryString).toContain('$top=')
      expect(queryString).toContain('$skip=')
      expect(queryString).toContain('$count=true')
      
      console.log(`🔍 Complete query URL: ${url}`)
    })
  })
})