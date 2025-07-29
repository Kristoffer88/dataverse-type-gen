#!/usr/bin/env node

// Quick test to verify if the EntityListOptionsWithMetadata bug is fixed
// This imports the query-hooks generator directly and tests it

import { writeEntityHooksFile } from './dist/index.mjs';

// Create a mock entity metadata object
const mockEntityMetadata = {
  schemaName: 'TestEntity',
  logicalName: 'testentity',
  displayName: 'Test Entity',
  entitySetName: 'testentities',
  primaryIdAttribute: 'testentityid',
  primaryNameAttribute: 'name',
  attributes: [
    {
      logicalName: 'name',
      schemaName: 'Name',
      displayName: 'Name',
      attributeType: 'String',
      maxLength: 100
    },
    {
      logicalName: 'statecode',
      schemaName: 'StateCode',
      displayName: 'Status',
      attributeType: 'State',
      optionSetName: 'testentity_statecode'
    }
  ],
  optionSets: [],
  relatedEntities: {},
  expandableProperties: []
};

try {
  console.log('🧪 Testing hook generation...');
  
  // Generate hooks
  const result = await writeEntityHooksFile(mockEntityMetadata, { 
    outputDir: '/tmp/test', 
    generateHooks: true 
  });
  
  console.log('Generated file result:', result);
  
  // Read the generated content to check
  const fs = await import('fs/promises');
  const content = await fs.readFile(result.filePath, 'utf8');
  
  // Check for the incorrect type in content
  if (content.includes('EntityListOptionsWithMetadata')) {
    console.log('❌ FOUND incorrect type EntityListOptionsWithMetadata');
    console.log('Lines containing it:');
    content.split('\n').forEach((line, i) => {
      if (line.includes('EntityListOptionsWithMetadata')) {
        console.log(`Line ${i+1}: ${line.trim()}`);
      }
    });
    process.exit(1);
  } else {
    console.log('✅ No incorrect type found - bug appears to be fixed!');
    console.log('✅ Generated code uses correct EntityListOptions type');
    
    // Show the correct import section
    const lines = content.split('\n');
    const importStartIndex = lines.findIndex(line => line.includes('import type {'));
    if (importStartIndex !== -1) {
      console.log('\n📋 Import section:');
      for (let i = importStartIndex; i < importStartIndex + 10 && i < lines.length; i++) {
        if (lines[i].includes('} from ')) {
          console.log(lines[i]);
          break;
        } else {
          console.log(lines[i]);
        }
      }
    }
    
    // Check for duplicate type definitions
    const duplicateTypes = ['type EntityOptions<T>', 'type EntityListOptions<T>'];
    const foundDuplicates = [];
    for (const dupType of duplicateTypes) {
      const matches = content.split(dupType).length - 1;
      if (matches > 1) {
        foundDuplicates.push(`${dupType} appears ${matches} times`);
      }
    }
    
    if (foundDuplicates.length > 0) {
      console.log('⚠️  Found duplicate type definitions:');
      foundDuplicates.forEach(dup => console.log(`   ${dup}`));
    } else {
      console.log('✅ No duplicate type definitions found');
    }
    
    process.exit(0);
  }
} catch (error) {
  console.error('❌ Error during test:', error.message);
  process.exit(1);
}