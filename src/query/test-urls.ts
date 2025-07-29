/**
 * Test file to verify URL builders work with actual Dataverse data
 * This can be run directly to test against the real API
 */

import { DataverseUrls, configureDataverseUrls } from './standalone.js'
import { createEntityHooks } from './hooks.js'
import { createAuthenticatedFetcher } from '../auth/index.js'

// Import the generated types and metadata
import type { pum_Initiative } from '../../test-output/pum-publisher/pum_initiative.js'
import { 
  pum_InitiativeMetadata,
  PumInitiativeStatecode
} from '../../test-output/pum-publisher/pum_initiative.js'

// Configure the URLs to use the actual Dataverse instance
configureDataverseUrls({
  instanceUrl: 'https://ssopowerppm.crm4.dynamics.com',
  apiVersion: 'v9.1'
})

// Create authenticated fetch for API calls
const authenticatedFetch = createAuthenticatedFetcher()

/**
 * Test the URL builders with the actual Initiative entity
 */
export async function testUrlBuilders(): Promise<{
  basicUrl: string
  filteredUrl: string
  complexUrl: string
  countUrl: string
  singleUrl: string
}> {
  console.log('🧪 Testing Dataverse URL Builders')
  
  // Test 1: Basic entity set URL
  const basicUrl = DataverseUrls.entitySet(pum_InitiativeMetadata, {
    $top: 10,
    $select: ['pum_name', 'pum_description', 'statecode']
  })
  
  console.log('✅ Basic entity set URL:', basicUrl)
  
  // Test 2: Filtered URL with option sets
  const filteredUrl = DataverseUrls.entitySet<pum_Initiative>(pum_InitiativeMetadata, {
    $filter: {
      statecode: PumInitiativeStatecode.Active.Value,
      pum_name: { $contains: 'project' }
    },
    $select: ['pum_name', 'pum_description', 'pum_status'],
    $orderby: { pum_name: 'asc' },
    $top: 5
  })
  
  console.log('✅ Filtered URL with option sets:', filteredUrl)
  
  // Test 3: Complex filter with multiple conditions
  const complexUrl = DataverseUrls.entitySet<pum_Initiative>(pum_InitiativeMetadata, {
    $filter: {
      $and: [
        { statecode: PumInitiativeStatecode.Active.Value },
        { 
          $or: [
            { pum_name: { $contains: 'development' } },
            { pum_name: { $contains: 'project' } }
          ]
        }
      ]
    },
    $select: ['pum_name', 'pum_description', 'createdon'],
    $orderby: { createdon: 'desc' },
    $top: 10
  })
  
  console.log('✅ Complex filtered URL:', complexUrl)
  
  // Test 4: Count URL
  const countUrl = DataverseUrls.count<pum_Initiative>(pum_InitiativeMetadata, {
    $filter: {
      statecode: PumInitiativeStatecode.Active.Value
    }
  })
  
  console.log('✅ Count URL:', countUrl)
  
  // Test 5: Single entity URL (using a placeholder ID)
  const singleUrl = DataverseUrls.entity<pum_Initiative>(pum_InitiativeMetadata, '123e4567-e89b-12d3-a456-426614174000', {
    $select: ['pum_name', 'pum_description', 'pum_status'],
    $expand: ['pum_program', 'pum_portfolio']
  })
  
  console.log('✅ Single entity URL:', singleUrl)
  
  return {
    basicUrl,
    filteredUrl,
    complexUrl,
    countUrl,
    singleUrl
  }
}

/**
 * Test actual API calls (requires authentication)
 */
export async function testApiCalls(): Promise<{ value?: Array<Record<string, unknown>>; '@odata.count'?: number } | null> {
  console.log('🌐 Testing actual API calls')
  
  try {
    // Test basic entity list call
    const url = DataverseUrls.entitySet<pum_Initiative>(pum_InitiativeMetadata, {
      $top: 5,
      $select: ['pum_name', 'pum_description', 'statecode', 'createdon']
    })
    
    console.log('📡 Fetching from:', url)
    
    const response = await authenticatedFetch(url)
    
    if (response.ok) {
      const data = await response.json() as { value?: Array<Record<string, unknown>>; '@odata.count'?: number }
      console.log('✅ API call successful!')
      console.log(`📊 Retrieved ${data.value?.length || 0} initiatives`)
      
      if (data.value && data.value.length > 0) {
        console.log('📋 Sample initiative:', {
          name: data.value[0].pum_name,
          description: data.value[0].pum_description,
          status: data.value[0].statecode
        })
      }
      
      return data
    } else {
      console.error('❌ API call failed:', response.status, response.statusText)
      const errorData = await response.text()
      console.error('Error details:', errorData)
      return null
    }
  } catch (error) {
    console.error('❌ Exception during API call:', error)
    return null
  }
}

/**
 * Test React Query hooks
 */
export async function testReactQueryHooks(): Promise<ReturnType<typeof createEntityHooks<pum_Initiative>> | null> {
  console.log('⚛️  Testing React Query hooks creation')
  
  try {
    // Create hooks for the Initiative entity
    const initiativeHooks = createEntityHooks<pum_Initiative>(pum_InitiativeMetadata)
    
    console.log('✅ Created hooks for Initiative entity')
    console.log('🎯 Available hooks:', Object.keys(initiativeHooks))
    
    // Test query key generation
    console.log('🔑 Sample query keys:')
    console.log('- Single entity:', ['dataverse', 'pum_initiative', 'single', '123e4567-e89b-12d3-a456-426614174000'])
    console.log('- Entity list:', ['dataverse', 'pum_initiative', 'list', { filters: { statecode: 0 } }])
    console.log('- Count:', ['dataverse', 'pum_initiative', 'count'])
    
    return initiativeHooks
  } catch (error) {
    console.error('❌ Error creating hooks:', error)
    return null
  }
}

/**
 * Run all tests
 */
export async function runAllTests(): Promise<{
  urls: Awaited<ReturnType<typeof testUrlBuilders>>
  hooks: Awaited<ReturnType<typeof testReactQueryHooks>>
}> {
  console.log('🚀 Starting Dataverse URL Builder Tests\n')
  
  // Test URL builders
  const urls = await testUrlBuilders()
  console.log('')
  
  // Test React Query hooks
  const hooks = await testReactQueryHooks()
  console.log('')
  
  // Test API calls (comment out if authentication not set up)
  // const apiData = await testApiCalls()
  // console.log('')
  
  console.log('✨ All tests completed!')
  
  return {
    urls,
    hooks,
    // apiData
  }
}

// Export for direct execution
export {
  pum_InitiativeMetadata,
  PumInitiativeStatecode
}