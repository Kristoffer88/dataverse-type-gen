// Debug script to check AttributeOf field
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { createAuthenticatedFetcher } = require('./dist/index.js');

// Create authenticated fetcher instance
const authenticatedFetch = createAuthenticatedFetcher();

async function debugAttributeOf() {
  try {
    console.log('🔍 Debugging AttributeOf field...');
    
    // Test with the pum_initiative entity to see auxiliary attributes
    const url = `/api/data/v9.2/EntityDefinitions(LogicalName='pum_initiative')/Attributes?$select=LogicalName,SchemaName,DisplayName,AttributeOf&$filter=contains(LogicalName,'name')&$top=10`;
    
    console.log('📡 Fetching from:', url);
    
    const response = await authenticatedFetch(url, { method: 'GET' });
    
    if (!response.ok) {
      console.error('❌ API Error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return;
    }
    
    const data = await response.json();
    
    console.log(`\n📊 Found ${data.value.length} attributes with 'name' in LogicalName:\n`);
    
    for (const attr of data.value) {
      const hasAttributeOf = attr.AttributeOf !== null && attr.AttributeOf !== undefined;
      const indicator = hasAttributeOf ? '🔗' : '📝';
      
      console.log(`${indicator} ${attr.LogicalName} (${attr.SchemaName})`);
      if (hasAttributeOf) {
        console.log(`   ↳ AttributeOf: ${attr.AttributeOf}`);
      } else {
        console.log(`   ↳ AttributeOf: null/undefined`);
      }
    }
    
    // Count auxiliary vs primary attributes
    const auxiliaryCount = data.value.filter(attr => attr.AttributeOf).length;
    const primaryCount = data.value.length - auxiliaryCount;
    
    console.log(`\n📈 Summary for attributes with 'name':`);
    console.log(`   Primary attributes: ${primaryCount}`);
    console.log(`   Auxiliary attributes: ${auxiliaryCount}`);
    console.log(`   Total: ${data.value.length}`);
    
  } catch (error) {
    console.error('💥 Error:', error);
  }
}

debugAttributeOf();