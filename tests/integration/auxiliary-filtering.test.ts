import { describe, it, expect } from 'vitest'
import { fetchEntityMetadata } from '../../src/client/index.js'
import { processEntityMetadata } from '../../src/processors/index.js'
import { generateEntityInterface } from '../../src/generators/index.js'

describe('Auxiliary Attribute Filtering', () => {
  it('should filter out auxiliary attributes when excludeAuxiliaryAttributes is true', async () => {
    console.log('🔍 Testing auxiliary attribute filtering...')
    
    // Fetch metadata for account entity
    const rawMetadata = await fetchEntityMetadata('account', { includeAttributes: true })
    expect(rawMetadata).toBeTruthy()
    
    const processed = processEntityMetadata(rawMetadata!)
    
    // Find some auxiliary attributes that should be filtered
    const auxiliaryAttributes = processed.attributes.filter(attr => attr.attributeOf)
    const primaryAttributes = processed.attributes.filter(attr => !attr.attributeOf)
    
    console.log(`📊 Total attributes: ${processed.attributes.length}`)
    console.log(`📝 Primary attributes: ${primaryAttributes.length}`)
    console.log(`🔗 Auxiliary attributes: ${auxiliaryAttributes.length}`)
    
    // Generate interface WITH filtering (default)
    const interfaceWithFiltering = generateEntityInterface(processed, {
      excludeAuxiliaryAttributes: true,
      includeComments: true
    })
    
    // Generate interface WITHOUT filtering
    const interfaceWithoutFiltering = generateEntityInterface(processed, {
      excludeAuxiliaryAttributes: false,
      includeComments: true
    })
    
    console.log('\n🔍 Checking for auxiliary attributes in generated interfaces...')
    
    // Check that auxiliary attributes are NOT in the filtered interface
    const auxiliaryAttributeNames = auxiliaryAttributes.map(attr => attr.logicalName)
    for (const auxAttrName of auxiliaryAttributeNames.slice(0, 5)) { // Check first 5
      console.log(`   Testing ${auxAttrName}...`)
      expect(interfaceWithFiltering).not.toContain(`/** ${auxAttrName} `)
      expect(interfaceWithoutFiltering).toContain(`/** ${auxAttrName} `)
    }
    
    // Verify that primary attributes ARE in both interfaces
    const primaryAttributeNames = primaryAttributes.map(attr => attr.logicalName)
    for (const primaryAttrName of primaryAttributeNames.slice(0, 3)) { // Check first 3
      console.log(`   Primary attribute ${primaryAttrName} should be in both`)
      expect(interfaceWithFiltering).toContain(`/** ${primaryAttrName} `)
      expect(interfaceWithoutFiltering).toContain(`/** ${primaryAttrName} `)
    }
    
    console.log(`\n✅ Filtering test passed!`)
    console.log(`   - Filtered interface excludes auxiliary attributes`)
    console.log(`   - Unfiltered interface includes auxiliary attributes`)
    console.log(`   - Both interfaces include primary attributes`)
    
  }, 30000) // 30 second timeout for API calls
})