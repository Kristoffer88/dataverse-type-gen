import { describe, it, expect } from 'vitest'
import { fetchEntityAttributes } from '../../src/client/index.js'
import { processAttributeMetadata } from '../../src/processors/index.js'

describe('AttributeOf Field Debug', () => {
  it('should show AttributeOf values for auxiliary attributes', async () => {
    console.log('🔍 Debugging AttributeOf field for account entity...')
    
    // Fetch attributes for a standard entity (account) which should have auxiliary attributes
    const attributes = await fetchEntityAttributes('account')
    
    console.log(`📊 Found ${attributes.length} total attributes`)
    
    // Look for attributes that contain 'name' which are likely auxiliary
    const nameAttributes = attributes.filter(attr => 
      attr.LogicalName.includes('name') || attr.LogicalName.includes('yominame')
    )
    
    console.log(`\n🔍 Attributes containing 'name' or 'yominame':`)
    for (const attr of nameAttributes) {
      const processedAttr = processAttributeMetadata(attr)
      const hasAttributeOf = processedAttr.attributeOf !== null && processedAttr.attributeOf !== undefined
      const indicator = hasAttributeOf ? '🔗' : '📝'
      
      console.log(`${indicator} ${attr.LogicalName}`)
      console.log(`   SchemaName: ${attr.SchemaName}`)
      console.log(`   AttributeOf: ${processedAttr.attributeOf || 'null/undefined'}`)
      console.log(`   Raw AttributeOf: ${(attr as any).AttributeOf || 'null/undefined'}`)
      console.log(`   AttributeType: ${attr.AttributeType}`)
      console.log(`   IsCustomAttribute: ${attr.IsCustomAttribute}`)
      console.log('')
    }
    
    // Count auxiliary vs primary attributes
    const auxiliaryCount = nameAttributes.filter(attr => {
      const processed = processAttributeMetadata(attr)
      return processed.attributeOf
    }).length
    
    console.log(`📈 Summary for 'name' attributes:`)
    console.log(`   Primary attributes: ${nameAttributes.length - auxiliaryCount}`)
    console.log(`   Auxiliary attributes: ${auxiliaryCount}`)
    console.log(`   Total: ${nameAttributes.length}`)
    
    // Test specifically createdbyname which should be auxiliary
    const createdByName = nameAttributes.find(attr => attr.LogicalName === 'createdbyname')
    if (createdByName) {
      const processed = processAttributeMetadata(createdByName)
      console.log(`\n🎯 Testing 'createdbyname' specifically:`)
      console.log(`   Raw AttributeOf from API: ${(createdByName as any).AttributeOf}`)
      console.log(`   Processed attributeOf: ${processed.attributeOf}`)
      console.log(`   Should have AttributeOf = 'createdby'`)
      
      // This should be true if working correctly
      expect(processed.attributeOf).toBe('createdby')
    } else {
      console.log(`\n⚠️  'createdbyname' attribute not found`)
    }
  }, 30000) // 30 second timeout for API calls
})