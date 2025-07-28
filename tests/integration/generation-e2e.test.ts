import '../setup-integration.js' // Validate environment before running tests
import { describe, it, expect } from 'vitest'
import { 
  fetchEntityMetadata,
  fetchEntityAttributes 
} from '../../src/client/index.js'
import {
  processEntityMetadata,
  processAttributeMetadata
} from '../../src/processors/index.js'
import {
  generateEntityInterface,
  generateOptionSetConstants,
  generateMetadataObject,
  generateEntityFile
} from '../../src/generators/index.js'
import {
  writeEntityTypeDeclaration,
  generateMultipleEntityTypes,
  validateGeneratedCode,
  getGeneratedFileStats
} from '../../src/codegen/index.js'
import { promises as fs } from 'fs'
import { join } from 'path'

describe('Full Generation Pipeline Integration Tests', () => {
  const dataverseInstance = process.env.DATAVERSE_INSTANCE
  
  // Skip tests if no Dataverse instance configured
  const skipCondition = !dataverseInstance
  const describeOrSkip = skipCondition ? describe.skip : describe

  describeOrSkip('End-to-End Type Generation', () => {
    it('should generate complete TypeScript definitions from real metadata', async () => {
      try {
        // Fetch real entity metadata
        const rawMetadata = await fetchEntityMetadata('account', {
          includeAttributes: true
        })
        
        expect(rawMetadata).toBeTruthy()
        
        // Process the metadata
        const processed = processEntityMetadata(rawMetadata!)
        expect(processed.logicalName).toBe('account')
        expect(processed.attributes.length).toBeGreaterThan(0)
        
        // Generate TypeScript code
        const generatedCode = generateEntityFile(processed, {
          includeComments: true,
          includeMetadata: true,
          includeValidation: true
        })
        
        // Verify generated code structure
        expect(generatedCode.interfaces).toContain('export interface Account')
        expect(generatedCode.interfaces).toContain('accountid')
        expect(generatedCode.interfaces).toContain('name')
        
        // Check that option sets were generated if any exist
        if (processed.optionSets.length > 0) {
          expect(generatedCode.constants).toBeTruthy()
          expect(generatedCode.constants.length).toBeGreaterThan(0)
        }
        
        // Check utility types (now empty since Create/Update types are removed)
        expect(generatedCode.types).toBe('')
        
        // Check metadata object (interfaces now includes metadata)
        expect(generatedCode.interfaces).toContain('AccountMetadata')
        expect(generatedCode.interfaces).toContain('logicalName: "account"')
        
        console.log('✅ Generated complete TypeScript definitions for account entity')
        
      } catch (error) {
        console.error('Failed to generate types from real metadata:', error)
        throw error
      }
    }, 45000)

    it('should generate and write TypeScript file to disk', async () => {
      try {
        // Fetch and process contact entity (smaller than account)
        const rawMetadata = await fetchEntityMetadata('contact', {
          includeAttributes: true
        })
        
        expect(rawMetadata).toBeTruthy()
        
        const processed = processEntityMetadata(rawMetadata!)
        
        // Generate and write to temporary directory
        const tempDir = join(process.cwd(), 'tmp', 'test-generated')
        await fs.mkdir(tempDir, { recursive: true })
        
        const result = await writeEntityTypeDeclaration(processed, {
          outputDir: tempDir,
          fileExtension: '.ts',
          prettier: true,
          overwrite: true,
          typeGenerationOptions: {
            includeComments: true,
            includeMetadata: true
          }
        })
        
        expect(result.success).toBe(true)
        expect(result.size).toBeGreaterThan(0)
        expect(result.filePath).toContain('contact.ts')
        
        // Verify file was actually written
        const fileExists = await fs.access(result.filePath).then(() => true).catch(() => false)
        expect(fileExists).toBe(true)
        
        // Read and verify content
        const content = await fs.readFile(result.filePath, 'utf8')
        expect(content).toContain('export interface Contact')
        expect(content).toContain('contactid')
        expect(content).toContain('firstname')
        expect(content).toContain('lastname')
        
        // Validate the generated code
        const validation = await validateGeneratedCode(result.filePath)
        expect(validation.isValid).toBe(true)
        expect(validation.errors).toHaveLength(0)
        
        // Clean up
        await fs.unlink(result.filePath).catch(() => {})
        await fs.rmdir(tempDir).catch(() => {})
        
        console.log('✅ Successfully generated and validated contact.ts file')
        
      } catch (error) {
        console.error('Failed to generate and write TypeScript file:', error)
        throw error
      }
    }, 45000)

    it('should generate multiple entity types in batch', async () => {
      try {
        // Fetch multiple entities
        const entityNames = ['account', 'contact']
        const processedEntities = []
        
        for (const entityName of entityNames) {
          try {
            const rawMetadata = await fetchEntityMetadata(entityName, {
              includeAttributes: true
            })
            
            if (rawMetadata) {
              const processed = processEntityMetadata(rawMetadata)
              processedEntities.push(processed)
            }
          } catch (error) {
            console.warn(`Failed to fetch ${entityName}:`, error)
          }
        }
        
        expect(processedEntities.length).toBeGreaterThan(0)
        
        // Generate all types
        const tempDir = join(process.cwd(), 'tmp', 'test-batch-generated')
        await fs.mkdir(tempDir, { recursive: true })
        
        const result = await generateMultipleEntityTypes(processedEntities, {
          outputDir: tempDir,
          fileExtension: '.ts',
          indexFile: true,
          overwrite: true
        })
        
        // Should have at least as many successful files as entities (plus any global option sets)
        expect(result.successfulFiles).toBeGreaterThanOrEqual(processedEntities.length)
        expect(result.failedFiles).toBe(0)
        expect(result.totalSize).toBeGreaterThan(0)
        expect(result.indexFile?.success).toBe(true)
        
        // Verify files exist
        for (const file of result.files) {
          if (file.success) {
            const fileExists = await fs.access(file.filePath).then(() => true).catch(() => false)
            expect(fileExists).toBe(true)
          }
        }
        
        // Verify index file
        if (result.indexFile) {
          const indexExists = await fs.access(result.indexFile.filePath).then(() => true).catch(() => false)
          expect(indexExists).toBe(true)
          
          const indexContent = await fs.readFile(result.indexFile.filePath, 'utf8')
          expect(indexContent).toContain('export * from')
        }
        
        // Get stats
        const stats = await getGeneratedFileStats(tempDir)
        expect(stats.totalFiles).toBeGreaterThan(0)
        expect(stats.totalSize).toBeGreaterThan(0)
        
        // Clean up
        const files = await fs.readdir(tempDir).catch(() => [])
        for (const file of files) {
          await fs.unlink(join(tempDir, file)).catch(() => {})
        }
        await fs.rmdir(tempDir).catch(() => {})
        
        console.log(`✅ Successfully generated ${result.successfulFiles} entity type files`)
        
      } catch (error) {
        console.error('Failed to generate multiple entity types:', error)
        throw error
      }
    }, 60000)
  })

  describeOrSkip('Individual Generator Functions with Real Data', () => {
    it('should generate entity interface with proper TypeScript syntax', async () => {
      try {
        const rawMetadata = await fetchEntityMetadata('account', {
          includeAttributes: true
        })
        
        expect(rawMetadata).toBeTruthy()
        
        const processed = processEntityMetadata(rawMetadata!)
        
        const interfaceCode = generateEntityInterface(processed, {
          includeComments: true,
          useExactTypes: true
        })
        
        // Verify interface structure
        expect(interfaceCode).toContain('export interface Account {')
        expect(interfaceCode).toContain('accountid')
        expect(interfaceCode).toContain('name')
        expect(interfaceCode).toContain('}')
        
        // Check for proper optional markers
        expect(interfaceCode).toMatch(/accountid:\s*string;/) // Required field
        expect(interfaceCode).toMatch(/\w+\?\s*:\s*\w+/) // Optional fields
        
        // Check for comments
        expect(interfaceCode).toContain('/**')
        expect(interfaceCode).toContain('*/')
        
        console.log('✅ Generated valid TypeScript interface')
        
      } catch (error) {
        console.error('Failed to generate entity interface:', error)
        throw error
      }
    }, 30000)

    it('should generate option set constants if entity has picklists', async () => {
      try {
        // Try to find an entity with option sets
        const entities = ['account', 'contact', 'lead', 'opportunity']
        
        for (const entityName of entities) {
          try {
            const rawMetadata = await fetchEntityMetadata(entityName, {
              includeAttributes: true
            })
            
            if (!rawMetadata) continue
            
            const processed = processEntityMetadata(rawMetadata)
            
            if (processed.optionSets.length > 0) {
              // Generate constants for the first option set
              const optionSet = processed.optionSets[0]
              const constantsCode = generateOptionSetConstants(optionSet, {
                includeComments: true
              })
              
              expect(constantsCode).toContain('export const')
              expect(constantsCode).toContain('} as const;')
              expect(constantsCode).toContain('export type')
              expect(constantsCode).toContain('Value')
              expect(constantsCode).toContain('Label')
              
              // Check that options are properly formatted
              for (const option of optionSet.options) {
                expect(constantsCode).toContain(`Value: ${option.value}`)
                expect(constantsCode).toContain(`Label: "${option.label}"`)
              }
              
              console.log(`✅ Generated option set constants for ${optionSet.name}`)
              break
            }
          } catch (error) {
            console.warn(`Failed to process ${entityName} for option sets:`, error)
          }
        }
        
      } catch (error) {
        console.error('Failed to generate option set constants:', error)
        throw error
      }
    }, 45000)


    it('should generate metadata object with runtime information', async () => {
      try {
        const rawMetadata = await fetchEntityMetadata('contact', {
          includeAttributes: true
        })
        
        expect(rawMetadata).toBeTruthy()
        
        const processed = processEntityMetadata(rawMetadata!)
        
        const metadataCode = generateMetadataObject(processed, {
          includeComments: true,
          includeValidation: true
        })
        
        // Basic validation that metadata was generated
        expect(metadataCode).toBeTruthy()
        expect(metadataCode.length).toBeGreaterThan(50)
        expect(metadataCode).toContain('Contact')
        
        console.log('✅ Generated metadata object with runtime information')
        
      } catch (error) {
        console.error('Failed to generate metadata object:', error)
        throw error
      }
    }, 30000)
  })
})

// Helper to run integration tests in isolation
if (import.meta.vitest) {
  const testDataverseInstance = process.env.DATAVERSE_INSTANCE
  console.log('🎯 Full Generation Pipeline Tests Configuration:')
  console.log(`   DATAVERSE_INSTANCE: ${testDataverseInstance || 'NOT SET'}`)
  console.log(`   Tests will be ${!testDataverseInstance ? 'SKIPPED' : 'EXECUTED'}`)
  
  if (!testDataverseInstance) {
    console.warn('⚠️  Set DATAVERSE_INSTANCE environment variable to run integration tests')
  }
}