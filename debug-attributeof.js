import { createAuthenticatedFetcher } from './dist/index.js';

// Create authenticated fetcher instance
const authenticatedFetch = createAuthenticatedFetcher();

async function debugAttributeOf() {
  try {
    console.log('🔍 Debugging AttributeOf field...');
    
    // Test with a simple entity like 'account'
    const url = `/api/data/v9.2/EntityDefinitions(LogicalName='account')/Attributes?$select=LogicalName,SchemaName,DisplayName,AttributeOf&$top=20`;
    
    console.log('📡 Fetching from:', url);
    
    const response = await authenticatedFetch(url, { method: 'GET' });
    
    if (!response.ok) {
      console.error('❌ API Error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return;
    }
    
    const data = await response.json();
    
    console.log(`\n📊 Found ${data.value.length} attributes for 'account' entity:\n`);
    
    for (const attr of data.value) {
      const hasAttributeOf = attr.AttributeOf !== null && attr.AttributeOf !== undefined;
      const indicator = hasAttributeOf ? '🔗' : '📝';
      
      console.log(`${indicator} ${attr.LogicalName} (${attr.SchemaName})`);
      if (hasAttributeOf) {
        console.log(`   ↳ AttributeOf: ${attr.AttributeOf}`);
      }
    }
    
    // Count auxiliary vs primary attributes
    const auxiliaryCount = data.value.filter(attr => attr.AttributeOf).length;
    const primaryCount = data.value.length - auxiliaryCount;
    
    console.log(`\n📈 Summary:`);
    console.log(`   Primary attributes: ${primaryCount}`);
    console.log(`   Auxiliary attributes: ${auxiliaryCount}`);
    console.log(`   Total: ${data.value.length}`);
    
  } catch (error) {
    console.error('💥 Error:', error);
  }
}

debugAttributeOf();