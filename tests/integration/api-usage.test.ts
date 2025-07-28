import '../setup-integration.js' // Validate environment before running tests
import { describe, it, expect } from 'vitest'
import { generateMultipleEntityTypes } from '../../src/codegen/index.js'
import { fetchEntityMetadata } from '../../src/client/index.js'
import { processEntityMetadata } from '../../src/processors/index.js'

describe('API Usage Pattern Test', () => {
  const dataverseInstance = process.env.DATAVERSE_INSTANCE
  
  // Skip tests if no Dataverse instance configured
  const skipCondition = !dataverseInstance
  const describeOrSkip = skipCondition ? describe.skip : describe

  describeOrSkip('generateMultipleEntityTypes API', () => {
    it('should support the exact usage pattern: import { generateMultipleEntityTypes } from "dataverse-type-gen"', async () => {
      // Test that the function exists and is callable
      expect(generateMultipleEntityTypes).toBeDefined()
      expect(typeof generateMultipleEntityTypes).toBe('function')
      
      try {
        console.log('🔍 Testing the exact API usage pattern from the user...')
        
        // Fetch and process entities like a user would
        const entityName = 'systemuser' // Always available
        console.log(`📥 Fetching metadata for ${entityName}...`)
        
        const rawMetadata = await fetchEntityMetadata(entityName, {
          includeAttributes: true
        })
        
        expect(rawMetadata).toBeTruthy()
        
        const processed = processEntityMetadata(rawMetadata!)
        const processedEntities = [processed]
        
        console.log(`✅ Processed ${entityName} (${processed.attributes.length} attributes)`)
        
        // Generate types for specific entities (the EXACT usage pattern from the user's message)
        const result = await generateMultipleEntityTypes(processedEntities, {
          outputDir: './test-types-api',
          fileExtension: '.ts',
          typeGenerationOptions: {
            includeComments: true,
            includeMetadata: true,
            includeValidation: true
          }
        })
        
        // Verify results
        expect(result).toBeDefined()
        expect(result.totalFiles).toBeGreaterThan(0)
        expect(result.successfulFiles).toBeGreaterThan(0)
        expect(result.failedFiles).toBe(0)
        expect(result.totalSize).toBeGreaterThan(0)
        expect(result.duration).toBeGreaterThan(0)
        
        console.log('📊 Generation Results:')
        console.log(`   Total files: ${result.totalFiles}`)
        console.log(`   Successful: ${result.successfulFiles}`)
        console.log(`   Failed: ${result.failedFiles}`)
        console.log(`   Total size: ${Math.round(result.totalSize / 1024)}KB`)
        console.log(`   Duration: ${result.duration}ms`)
        
        // Verify files were created
        expect(result.files.length).toBeGreaterThan(0)
        
        let successfulFiles = 0
        for (const file of result.files) {
          if (file.success) {
            successfulFiles++
            console.log(`   ✅ ${file.filePath} (${Math.round(file.size / 1024)}KB)`)
            expect(file.filePath).toBeTruthy()
            expect(file.size).toBeGreaterThan(0)
          } else {
            console.log(`   ❌ ${file.filePath} - ${file.error}`)
          }
        }
        
        expect(successfulFiles).toBeGreaterThan(0)
        
        console.log('🎉 User\'s exact API usage pattern works perfectly!')
        
      } catch (error) {
        console.error('❌ API test failed:', error)
        throw error
      }
    }, 45000) // 45 second timeout for API calls
  })
})