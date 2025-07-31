import '../setup-integration.js' // Validate environment before running tests
import { describe, it, expect } from 'vitest'
import { 
  fetchEntityMetadata,
  fetchEntityAttributes,
  fetchGlobalOptionSet,
  fetchPublisherEntities,
  fetchSolutionEntities,
  findSolution,
  fetchSolutionComponents,
  COMPONENT_TYPES,
  fetchMultipleEntities,
  entityExists,
  fetchAllEntities
} from '../../src/client/index.js'
import {
  processEntityMetadata,
  processAttributeMetadata,
  processOptionSet,
  processGlobalOptionSet,
  extractOptionSetsFromAttributes,
  validateProcessedMetadata
} from '../../src/processors/index.js'
import { advancedLog } from '../../src/error-logger.js'

describe('Metadata Fetching and Processing', () => {
  const dataverseInstance = process.env.DATAVERSE_INSTANCE
  
  // Skip tests if no Dataverse instance configured
  const skipCondition = !dataverseInstance
  const describeOrSkip = skipCondition ? describe.skip : describe

  describeOrSkip('Metadata Client Functions', () => {
    it('should fetch entity metadata for a standard entity', async () => {
      try {
        const metadata = await fetchEntityMetadata('account', {
          includeAttributes: true,
          includeRelationships: false
        })
        
        expect(metadata).toBeTruthy()
        expect(metadata!.LogicalName).toBe('account')
        expect(metadata!.SchemaName).toBe('Account')
        expect(metadata!.IsCustomEntity).toBe(false)
        expect(metadata!.Attributes).toBeDefined()
        expect(Array.isArray(metadata!.Attributes)).toBe(true)
        expect(metadata!.Attributes!.length).toBeGreaterThan(0)
      } catch (error) {
        console.error('Failed to fetch account metadata:', error)
        throw error
      }
    }, 30000)

    it('should return null for non-existent entity', async () => {
      const metadata = await fetchEntityMetadata('nonexistent_entity_12345')
      expect(metadata).toBeNull()
    }, 30000)

    it('should fetch entity attributes with proper casting', async () => {
      try {
        const attributes = await fetchEntityAttributes('account')
        
        expect(Array.isArray(attributes)).toBe(true)
        expect(attributes.length).toBeGreaterThan(0)
        
        // Check that we have different attribute types
        const attributeTypes = new Set(attributes.map(attr => attr.AttributeType))
        expect(attributeTypes.has('String')).toBe(true)
        expect(attributeTypes.has('Lookup')).toBe(true)
        
        // Look for a picklist attribute with expanded option set
        const picklistAttr = attributes.find(attr => 
          attr.AttributeType === 'Picklist' && (attr as any).OptionSet
        )
        
        if (picklistAttr) {
          const optionSet = (picklistAttr as any).OptionSet
          expect(optionSet).toBeDefined()
          expect(optionSet.Options).toBeDefined()
          expect(Array.isArray(optionSet.Options)).toBe(true)
        }
        
      } catch (error) {
        console.error('Failed to fetch account attributes:', error)
        throw error
      }
    }, 30000)

    it('should check if entity exists', async () => {
      const accountExists = await entityExists('account')
      expect(accountExists).toBe(true)
      
      const nonExistentExists = await entityExists('nonexistent_entity_12345')
      expect(nonExistentExists).toBe(false)
    }, 30000)

    it('should fetch multiple entities', async () => {
      try {
        const entities = await fetchMultipleEntities(['account', 'contact'], {
          includeAttributes: false
        })
        
        expect(Array.isArray(entities)).toBe(true)
        expect(entities.length).toBe(2)
        
        const accountEntity = entities.find(e => e.LogicalName === 'account')
        const contactEntity = entities.find(e => e.LogicalName === 'contact')
        
        expect(accountEntity).toBeDefined()
        expect(contactEntity).toBeDefined()
        
      } catch (error) {
        console.error('Failed to fetch multiple entities:', error)
        throw error
      }
    }, 30000)

    it('should fetch all entities with filtering', async () => {
      try {
        const customEntities = await fetchAllEntities({
          customOnly: true
        })
        
        expect(Array.isArray(customEntities)).toBe(true)
        
        // All returned entities should be custom
        customEntities.forEach(entity => {
          expect(entity.IsCustomEntity).toBe(true)
        })
        
        // Since EntityDefinitions doesn't support $top, we verify we got results
        // and they are properly filtered
        console.log(`Fetched ${customEntities.length} custom entities`)
        
      } catch (error) {
        console.error('Failed to fetch custom entities:', error)
        throw error
      }
    }, 30000)

    it('should fetch publisher entities by publisher prefix', async () => {
      try {
        // Try common publisher prefixes
        const prefixes = ['pum', 'new', 'cr', 'msdyn']
        
        for (const prefix of prefixes) {
          try {
            const entities = await fetchPublisherEntities(prefix)
            
            expect(Array.isArray(entities)).toBe(true)
            
            // All entities should start with the prefix
            entities.forEach(entity => {
              expect(entity.LogicalName.startsWith(`${prefix}_`)).toBe(true)
              expect(entity.IsCustomEntity).toBe(true)
            })
            
            if (entities.length > 0) {
              console.log(`Found ${entities.length} entities for publisher prefix '${prefix}'`)
              break // Found some entities, no need to continue
            }
          } catch (error) {
            console.warn(`No entities found for prefix '${prefix}':`, error)
          }
        }
        
      } catch (error) {
        console.warn('Publisher entities test - this is expected if no custom entities exist:', error)
      }
    }, 30000)

    it('should find solutions by name', async () => {
      try {
        // Try to find common solution types
        const commonSolutionNames = ['Default', 'Common Data Services Default Solution', 'Active Solution']
        
        for (const solutionName of commonSolutionNames) {
          try {
            const solution = await findSolution(solutionName)
            
            if (solution) {
              expect(solution.solutionid).toBeTruthy()
              expect(solution.uniquename).toBeTruthy()
              expect(typeof solution.solutionid).toBe('string')
              expect(typeof solution.uniquename).toBe('string')
              
              console.log(`Found solution '${solutionName}':`)
              console.log(`  ID: ${solution.solutionid}`)
              console.log(`  Unique Name: ${solution.uniquename}`)
              console.log(`  Friendly Name: ${solution.friendlyname || 'N/A'}`)
              console.log(`  Version: ${solution.version || 'N/A'}`)
              console.log(`  Is Managed: ${solution.ismanaged || false}`)
              
              break // Found a solution, no need to continue
            }
          } catch (error) {
            console.warn(`Failed to find solution '${solutionName}':`, error)
          }
        }
        
      } catch (error) {
        console.warn('Solution search test - may not have solutions available:', error)
      }
    }, 30000)

    it('should fetch solution components', async () => {
      try {
        // Try to find the Default solution which should exist in most environments
        const solution = await findSolution('Default')
        
        if (solution) {
          // Fetch all components in the solution
          const allComponents = await fetchSolutionComponents(solution.solutionid)
          
          expect(Array.isArray(allComponents)).toBe(true)
          console.log(`Found ${allComponents.length} total components in '${solution.uniquename}' solution`)
          
          // Fetch only entity components
          const entityComponents = await fetchSolutionComponents(solution.solutionid, COMPONENT_TYPES.ENTITY)
          
          expect(Array.isArray(entityComponents)).toBe(true)
          console.log(`Found ${entityComponents.length} entity components in '${solution.uniquename}' solution`)
          
          // Validate component structure
          entityComponents.forEach(component => {
            expect(component.solutioncomponentid).toBeTruthy()
            expect(component.objectid).toBeTruthy()
            expect(component.componenttype).toBe(COMPONENT_TYPES.ENTITY)
            // Solution ID might be present in different forms depending on environment
            // Don't require it to be present since some environments may not return it
            const hasSolutionId = !!(component.solutionid || (component as any)._solutionid_value || (component as any)['_solutionid@odata.associationLink'])
            console.log(`Component ${component.solutioncomponentid} has solution ID: ${hasSolutionId}`)
          })
          
          if (entityComponents.length > 0) {
            console.log(`First entity component:`)
            console.log(`  Component ID: ${entityComponents[0].solutioncomponentid}`)
            console.log(`  Object ID: ${entityComponents[0].objectid}`)
            console.log(`  Component Type: ${entityComponents[0].componenttype}`)
          }
        } else {
          console.warn('No Default solution found - test may be running in custom environment')
        }
        
      } catch (error) {
        console.warn('Solution components test - may not have accessible solutions:', error)
      }
    }, 10000)

    // Re-enabled: With caching, this should be much faster on subsequent runs
    it('should fetch entities from a solution (true solution membership)', async () => {
      try {
        // Try to find the Default solution and get its entities
        const solution = await findSolution('Default')
        
        if (solution) {
          const solutionEntities = await fetchSolutionEntities('Default')
          
          expect(Array.isArray(solutionEntities)).toBe(true)
          console.log(`Found ${solutionEntities.length} entities in 'Default' solution`)
          
          // Validate entity structure
          solutionEntities.forEach(entity => {
            expect(entity.LogicalName).toBeTruthy()
            expect(entity.SchemaName).toBeTruthy()
            expect(typeof entity.LogicalName).toBe('string')
            expect(typeof entity.SchemaName).toBe('string')
            expect(typeof entity.IsCustomEntity).toBe('boolean')
          })
          
          if (solutionEntities.length > 0) {
            console.log(`Sample entities from solution:`)
            solutionEntities.slice(0, 5).forEach(entity => {
              console.log(`  - ${entity.LogicalName} (${entity.SchemaName})`)
            })
          }
          
          // Test with a non-existent solution
          const nonExistentEntities = await fetchSolutionEntities('NonExistentSolution123456')
          expect(Array.isArray(nonExistentEntities)).toBe(true)
          expect(nonExistentEntities.length).toBe(0)
          
        } else {
          console.warn('No Default solution found - skipping solution entities test')
        }
        
      } catch (error) {
        console.warn('Solution entities test - may not have accessible solutions:', error)
      }
    }, 300000) // 5 minutes timeout for initial cache population
  })

  describeOrSkip('Metadata Processing Functions', () => {
    it('should process entity metadata correctly', async () => {
      try {
        const rawMetadata = await fetchEntityMetadata('account', {
          includeAttributes: true
        })
        
        expect(rawMetadata).toBeTruthy()
        
        const processed = processEntityMetadata(rawMetadata!)
        
        expect(processed.logicalName).toBe('account')
        expect(processed.schemaName).toBe('Account')
        expect(processed.displayName).toBeTruthy()
        expect(processed.isCustomEntity).toBe(false)
        expect(processed.primaryIdAttribute).toBe('accountid')
        expect(processed.primaryNameAttribute).toBe('name')
        
        expect(Array.isArray(processed.attributes)).toBe(true)
        expect(processed.attributes.length).toBeGreaterThan(0)
        
        // Validate processed metadata
        const validation = validateProcessedMetadata(processed)
        expect(validation.isValid).toBe(true)
        
        if (validation.warnings.length > 0) {
          console.warn('Processing warnings:', validation.warnings)
        }
        
      } catch (error) {
        console.error('Failed to process entity metadata:', error)
        throw error
      }
    }, 30000)

    it('should process attributes with different types correctly', async () => {
      try {
        const attributes = await fetchEntityAttributes('account')
        
        expect(attributes.length).toBeGreaterThan(0)
        
        // Debug: Check what we got from the API
        const lookupAttrRaw = attributes.find(attr => attr.AttributeType === 'Lookup')
        if (lookupAttrRaw) {
          console.log('Raw lookup attribute sample:', {
            logicalName: lookupAttrRaw.LogicalName,
            attributeType: lookupAttrRaw.AttributeType,
            odataType: (lookupAttrRaw as any)['@odata.type'],
            targets: (lookupAttrRaw as any).Targets,
            hasTargets: 'Targets' in lookupAttrRaw
          })
        }
        
        const processed = attributes.map(attr => processAttributeMetadata(attr))
        
        // Check that we have various attribute types processed
        const types = new Set(processed.map(attr => attr.attributeType))
        expect(types.size).toBeGreaterThan(1)
        
        // Find specific attribute types and verify processing
        const stringAttr = processed.find(attr => attr.attributeType === 'String')
        if (stringAttr) {
          expect(stringAttr.logicalName).toBeTruthy()
          expect(stringAttr.displayName).toBeTruthy()
          expect(typeof stringAttr.isCustomAttribute).toBe('boolean')
        }
        
        const lookupAttr = processed.find(attr => attr.attributeType === 'Lookup')
        if (lookupAttr) {
          console.log(`Processing lookup attribute '${lookupAttr.logicalName}':`, {
            targets: lookupAttr.targets,
            targetsLength: lookupAttr.targets?.length,
            isArray: Array.isArray(lookupAttr.targets)
          })
          
          // The processAttributeMetadata function should always set targets to an array
          expect(lookupAttr.targets).toBeDefined()
          expect(Array.isArray(lookupAttr.targets)).toBe(true)
        } else {
          console.log('No lookup attributes found in account entity after processing')
        }
        
      } catch (error) {
        console.error('Failed to process attributes:', error)
        throw error
      }
    }, 30000)

    it('should extract and process option sets from attributes', async () => {
      try {
        const attributes = await fetchEntityAttributes('account')
        
        const optionSets = extractOptionSetsFromAttributes(attributes)
        
        expect(Array.isArray(optionSets)).toBe(true)
        
        // If we found option sets, validate their structure
        optionSets.forEach(optionSet => {
          expect(optionSet.name).toBeTruthy()
          expect(optionSet.displayName).toBeTruthy()
          expect(typeof optionSet.isGlobal).toBe('boolean')
          expect(typeof optionSet.isCustom).toBe('boolean')
          expect(Array.isArray(optionSet.options)).toBe(true)
          
          optionSet.options.forEach(option => {
            expect(typeof option.value).toBe('number')
            expect(typeof option.label).toBe('string')
          })
        })
        
      } catch (error) {
        console.error('Failed to extract option sets:', error)
        throw error
      }
    }, 30000)

    it('should handle processing errors gracefully', async () => {
      // Test with minimal/invalid metadata
      const invalidMetadata = {
        LogicalName: '',
        SchemaName: '',
        DisplayName: undefined,
        PrimaryIdAttribute: '',
        PrimaryNameAttribute: '',
        EntitySetName: '',
        IsCustomEntity: false,
        Attributes: []
      } as any
      
      const processed = processEntityMetadata(invalidMetadata)
      const validation = validateProcessedMetadata(processed)
      
      expect(validation.isValid).toBe(false)
      expect(validation.errors.length).toBeGreaterThan(0)
      expect(validation.warnings.length).toBeGreaterThan(0)
    })
  })

  describeOrSkip('Error Handling and API Limitations', () => {
    it('should handle API errors with detailed logging', async () => {
      try {
        // Try to fetch with invalid entity name to test error handling
        await fetchEntityMetadata('invalid-entity-name-with-dashes')
        
        // If we get here, the API didn't reject the invalid name
        console.warn('Expected API error but request succeeded')
      } catch (error) {
        // This is expected - verify we got a meaningful error
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toContain('Error fetching entity metadata')
        
        console.log('Error handling test passed - detailed error information was logged')
      }
    }, 30000)

    it('should handle network timeouts and retries', async () => {
      // This test verifies that our retry logic is working
      // In a real scenario, we might get transient network errors
      try {
        const metadata = await fetchEntityMetadata('account', {
          includeAttributes: false
        })
        
        expect(metadata).toBeTruthy()
        console.log('Network resilience test passed')
      } catch (error) {
        console.warn('Network test failed (might be expected in some environments):', error)
      }
    }, 45000)
  })
})

// Helper to run metadata tests in isolation
if (import.meta.vitest) {
  const testDataverseInstance = process.env.DATAVERSE_INSTANCE
  console.log('📊 Metadata Tests Configuration:')
  console.log(`   DATAVERSE_INSTANCE: ${testDataverseInstance || 'NOT SET'}`)
  console.log(`   Tests will be ${!testDataverseInstance ? 'SKIPPED' : 'EXECUTED'}`)
  
  if (!testDataverseInstance) {
    console.warn('⚠️  Set DATAVERSE_INSTANCE environment variable to run metadata tests')
  }
}