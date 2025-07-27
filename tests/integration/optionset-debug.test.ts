/**
 * Integration test to debug optionset/picklist attribute structure
 * This test will help us understand the exact API response structure
 */

import { describe, it } from 'vitest'
import { validateIntegrationEnvironment } from '../setup-integration.js'
import { fetchEntityMetadata } from '../../src/client/index.js'

// Setup integration test environment
validateIntegrationEnvironment()

describe('OptionSet Debug Tests', () => {
  it('should fetch and examine pum_program entity with picklist attributes', async () => {
    console.log('🔍 Debugging pum_program entity for optionset structure...')
    
    const entityMetadata = await fetchEntityMetadata('pum_program', {
      includeAttributes: true
    })
    
    if (!entityMetadata) {
      throw new Error('Entity metadata not found')
    }
    
    console.log('✅ Entity metadata fetched successfully')
    console.log(`   Entity: ${entityMetadata.LogicalName}`)
    console.log(`   Attributes: ${entityMetadata.Attributes?.length || 0}`)
    
    // Find pum_programstatus attribute specifically
    const programStatusAttr = entityMetadata.Attributes?.find(attr => 
      attr.LogicalName === 'pum_programstatus'
    )
    
    if (programStatusAttr) {
      console.log('\n🎯 Found pum_programstatus attribute:')
      console.log('   LogicalName:', programStatusAttr.LogicalName)
      console.log('   AttributeType:', programStatusAttr.AttributeType)
      console.log('   @odata.type:', (programStatusAttr as any)['@odata.type'])
      
      // Check if it's a picklist attribute
      if ((programStatusAttr as any)['@odata.type']?.includes('Picklist')) {
        console.log('   ✅ Confirmed as Picklist attribute')
        
        // Check for OptionSet property
        const optionSet = (programStatusAttr as any).OptionSet
        console.log('   OptionSet exists:', !!optionSet)
        
        if (optionSet) {
          console.log('   OptionSet structure:')
          console.log('     Name:', optionSet.Name)
          console.log('     IsGlobal:', optionSet.IsGlobal)
          console.log('     Options count:', optionSet.Options?.length || 0)
          
          if (optionSet.Options && optionSet.Options.length > 0) {
            console.log('   First few options:')
            optionSet.Options.slice(0, 3).forEach((option: any, index: number) => {
              console.log(`     Option ${index}:`)
              console.log(`       Value: ${option.Value}`)
              console.log(`       Label: ${option.Label?.UserLocalizedLabel?.Label || 'No label'}`)
              if (option.Color) {
                console.log(`       Color: ${option.Color}`)
              }
            })
          }
        }
        
        // Check for GlobalOptionSet property
        const globalOptionSet = (programStatusAttr as any).GlobalOptionSet
        console.log('   GlobalOptionSet exists:', !!globalOptionSet)
        
        if (globalOptionSet) {
          console.log('   GlobalOptionSet structure:')
          console.log('     Name:', globalOptionSet.Name)
          console.log('     Options count:', globalOptionSet.Options?.length || 0)
        }
      } else {
        console.log('   ❌ Not identified as Picklist attribute')
        console.log('   Full attribute structure:')
        console.log(JSON.stringify(programStatusAttr, null, 2))
      }
    } else {
      console.log('\n❌ pum_programstatus attribute not found')
      
      // List all attributes to see what's available
      console.log('Available attributes:')
      entityMetadata.Attributes?.slice(0, 10).forEach(attr => {
        console.log(`   - ${attr.LogicalName} (${attr.AttributeType}, ${(attr as any)['@odata.type']})`)
      })
    }
    
    // Also check for any other picklist attributes
    const picklistAttributes = entityMetadata.Attributes?.filter(attr => 
      (attr as any)['@odata.type']?.includes('Picklist')
    ) || []
    
    console.log(`\n🔍 Found ${picklistAttributes.length} total picklist attributes:`)
    picklistAttributes.forEach(attr => {
      console.log(`   - ${attr.LogicalName} (${(attr as any)['@odata.type']})`)
    })
  })
  
  it('should test existing fetchEntityAttributes function', async () => {
    console.log('🧪 Testing existing fetchEntityAttributes function...')
    
    // Import the fetchEntityAttributes function
    const { fetchEntityAttributes } = await import('../../src/client/index.js')
    
    try {
      const attributes = await fetchEntityAttributes('pum_program')
      
      console.log(`✅ fetchEntityAttributes returned ${attributes.length} attributes`)
      
      // Find the pum_programstatus attribute
      const programStatusAttr = attributes.find(attr => attr.LogicalName === 'pum_programstatus')
      
      if (programStatusAttr) {
        console.log('\n🎯 Found pum_programstatus via fetchEntityAttributes:')
        console.log('   LogicalName:', programStatusAttr.LogicalName)
        console.log('   AttributeType:', programStatusAttr.AttributeType)
        console.log('   @odata.type:', (programStatusAttr as any)['@odata.type'])
        
        const optionSet = (programStatusAttr as any).OptionSet
        console.log('   OptionSet exists:', !!optionSet)
        
        if (optionSet) {
          console.log('   ✅ SUCCESS! OptionSet found via fetchEntityAttributes')
          console.log('   OptionSet name:', optionSet.Name)
          console.log('   Options count:', optionSet.Options?.length || 0)
          
          if (optionSet.Options && optionSet.Options.length > 0) {
            console.log('   First option:')
            const firstOption = optionSet.Options[0]
            console.log(`     Value: ${firstOption.Value}`)
            console.log(`     Label: ${firstOption.Label?.UserLocalizedLabel?.Label || 'No label'}`)
          }
        }
      } else {
        console.log('❌ pum_programstatus not found in fetchEntityAttributes results')
      }
      
    } catch (error) {
      console.log('❌ Error with fetchEntityAttributes:', error)
    }
  })
})