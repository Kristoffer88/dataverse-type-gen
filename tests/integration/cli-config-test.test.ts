import { describe, it, expect } from 'vitest'
import { loadConfiguration, toCodeGenConfig } from '../../src/config/index.js'
import { fetchEntityMetadata } from '../../src/client/index.js'
import { processEntityMetadata } from '../../src/processors/index.js'
import { generateEntityFile } from '../../src/generators/index.js'

describe('CLI Configuration Test', () => {
  it('should use configuration from dataverse.config.json and filter auxiliary attributes', async () => {
    console.log('🔍 Testing CLI configuration flow...')
    
    // Load configuration exactly like the CLI does
    const config = await loadConfiguration('dataverse.config.json')
    console.log('📋 Loaded config excludeAuxiliaryAttributes:', config.typeGeneration.excludeAuxiliaryAttributes)
    
    const codeGenConfig = toCodeGenConfig(config)
    console.log('🛠️  CodeGen config excludeAuxiliaryAttributes:', codeGenConfig.typeGenerationOptions?.excludeAuxiliaryAttributes)
    
    // Fetch metadata for account entity (has known auxiliary attributes)
    const rawMetadata = await fetchEntityMetadata('account', { includeAttributes: true })
    expect(rawMetadata).toBeTruthy()
    
    const processed = processEntityMetadata(rawMetadata!)
    
    // Find auxiliary attributes
    const auxiliaryAttributes = processed.attributes.filter(attr => attr.attributeOf)
    console.log(`🔗 Found ${auxiliaryAttributes.length} auxiliary attributes`)
    
    // Generate file using the same options as CLI, but disable binding types to avoid missing entity errors
    const generationOptions = { 
      ...codeGenConfig.typeGenerationOptions!, 
      includeBindingTypes: false 
    }
    const generatedCode = generateEntityFile(processed, generationOptions, [])
    
    console.log('\n🔍 Checking generated interface for auxiliary attributes...')
    
    // Test a few known auxiliary attributes
    const testAuxiliaryAttrs = ['createdbyname', 'createdbyyominame', 'modifiedbyname']
    
    for (const auxAttr of testAuxiliaryAttrs) {
      const isInInterface = generatedCode.interfaces.includes(`/** ${auxAttr} `)
      console.log(`   ${auxAttr}: ${isInInterface ? '❌ Present' : '✅ Filtered out'}`)
      
      if (codeGenConfig.typeGenerationOptions?.excludeAuxiliaryAttributes) {
        expect(generatedCode.interfaces).not.toContain(`/** ${auxAttr} `)
      } else {
        expect(generatedCode.interfaces).toContain(`/** ${auxAttr} `)
      }
    }
    
    console.log('\n✅ CLI configuration test completed!')
    
  }, 30000) // 30 second timeout for API calls
})