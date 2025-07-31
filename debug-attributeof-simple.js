// Simple debug script to test a specific API call for AttributeOf
const https = require('https');
const { exec } = require('child_process');

// Helper to make authenticated API call using the CLI's auth
function makeApiCall() {
  return new Promise((resolve, reject) => {
    // Use the CLI binary to get an access token and make the call
    const cmd = `export DATAVERSE_INSTANCE=https://krapowerppm.crm4.dynamics.com && node -e "
      const { createAuthenticatedFetcher } = require('./dist/bin/cli.cjs');
      
      async function test() {
        try {
          const fetch = createAuthenticatedFetcher();
          const url = '/api/data/v9.2/EntityDefinitions(LogicalName=\\'account\\')/Attributes?\\$select=LogicalName,SchemaName,DisplayName,AttributeOf&\\$filter=contains(LogicalName,\\'name\\')&\\$top=10';
          
          console.log('📡 Testing AttributeOf on account entity...');
          const response = await fetch(url, { method: 'GET' });
          
          if (!response.ok) {
            console.error('❌ API Error:', response.status, response.statusText);
            return;
          }
          
          const data = await response.json();
          console.log('📊 Results:');
          
          for (const attr of data.value) {
            const hasAttributeOf = attr.AttributeOf !== null && attr.AttributeOf !== undefined;
            const indicator = hasAttributeOf ? '🔗' : '📝';
            console.log('\\t' + indicator + ' ' + attr.LogicalName + ' -> AttributeOf: ' + (attr.AttributeOf || 'null'));
          }
          
          const auxiliaryCount = data.value.filter(attr => attr.AttributeOf).length;
          console.log('\\n📈 Auxiliary attributes found:', auxiliaryCount, 'out of', data.value.length);
          
        } catch (error) {
          console.error('💥 Error:', error.message);
        }
      }
      
      test();
    "`;
    
    exec(cmd, { shell: true, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        console.log(stdout);
        if (stderr) console.error('Stderr:', stderr);
        resolve(stdout);
      }
    });
  });
}

makeApiCall();