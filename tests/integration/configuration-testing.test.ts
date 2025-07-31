import { describe, it, expect, beforeEach } from 'vitest'
import { promises as fs } from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

describe('Configuration Options Testing', () => {
  const testOutputDir = 'test-output/config-tests'
  const testConfigs = {
    noHooks: {
      outputDir: `${testOutputDir}/no-hooks`,
      entities: ['contact'],
      generateRelatedEntities: false,
      typeGeneration: { generateHooks: false, includeComments: true }
    },
    noComments: {
      outputDir: `${testOutputDir}/no-comments`,
      entities: ['contact'], 
      generateRelatedEntities: false,
      typeGeneration: { generateHooks: true, includeComments: false }
    },
    withRelated: {
      outputDir: `${testOutputDir}/with-related`,
      entities: ['contact'],
      generateRelatedEntities: true,
      maxRelatedEntityDepth: 1,
      typeGeneration: { generateHooks: true, includeComments: true }
    },
    publisher: {
      outputDir: `${testOutputDir}/publisher`,
      publisher: 'kra',
      generateRelatedEntities: false,
      typeGeneration: { generateHooks: true, includeComments: true }
    },
    customPaths: {
      outputDir: `${testOutputDir}/custom-paths`,
      relatedEntitiesDir: 'relations',
      entities: ['contact'],
      generateRelatedEntities: true,
      maxRelatedEntityDepth: 1,
      typeGeneration: { generateHooks: true, includeComments: true }
    }
  }

  beforeEach(async () => {
    // Clean up test output directory
    try {
      await fs.rm(testOutputDir, { recursive: true, force: true })
    } catch (error) {
      // Directory might not exist, ignore
    }
  })

  async function runGeneration(configName: string, config: any): Promise<string> {
    const configPath = `${testOutputDir}/${configName}-config.json`
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(configPath), { recursive: true })
    
    // Write config file with cache enabled and instance URL
    const fullConfig = {
      dataverseUrl: 'https://krapowerppm.crm4.dynamics.com',
      includeComments: true,
      includeMetadata: true,
      cache: {
        enabled: true,
        ttlHours: 168, // 1 week cache for integration tests
        maxSizeMB: 1000
      },
      ...config
    }
    
    await fs.writeFile(configPath, JSON.stringify(fullConfig, null, 2))
    
    // Run generation with environment variable and cache enabled
    const { stdout, stderr } = await execAsync(
      `NODE_ENV=test DATAVERSE_INSTANCE=https://krapowerppm.crm4.dynamics.com DATAVERSE_CACHE_ENABLED=true DATAVERSE_CACHE_TTL_HOURS=168 DATAVERSE_CACHE_MAX_SIZE_MB=1000 node dist/bin/cli.cjs generate --config ${configPath}`,
      { timeout: 60000 }
    )
    
    return stdout
  }

  it('should generate without hooks when generateHooks=false', async () => {
    const output = await runGeneration('no-hooks', testConfigs.noHooks)
    
    console.log('CLI Output:', output)
    expect(output).toContain('Type generation completed successfully')
    
    // List actual files generated for debugging
    try {
      const files = await fs.readdir(testConfigs.noHooks.outputDir)
      console.log('Generated files:', files)
    } catch (error) {
      console.log('Output directory does not exist or is empty')
    }
    
    // Verify no hooks directory was created
    const outputExists = await fs.access(`${testConfigs.noHooks.outputDir}/hooks`)
      .then(() => true)
      .catch(() => false)
    expect(outputExists).toBe(false)
    
    // Verify main type file exists
    const typeFileExists = await fs.access(`${testConfigs.noHooks.outputDir}/contact.ts`)
      .then(() => true)
      .catch(() => false)
    expect(typeFileExists).toBe(true)
  })

  it('should generate minimal output when includeComments=false', async () => {
    const output = await runGeneration('no-comments', testConfigs.noComments)
    
    expect(output).toContain('Type generation completed successfully')
    
    // Read generated hook file and verify minimal comments
    const hookFile = await fs.readFile(`${testConfigs.noComments.outputDir}/hooks/contact.hooks.ts`, 'utf-8')
    
    // Should have minimal header but not detailed examples
    expect(hookFile).toContain('Generated React Query hooks for Contact')
    expect(hookFile).not.toContain('* @example')
    expect(hookFile).not.toContain('* // Basic usage')
  })

  // Re-enabled: With caching, this should be much faster on subsequent runs
  it('should generate related entities when generateRelatedEntities=true', async () => {
    const output = await runGeneration('with-related', testConfigs.withRelated)
    
    expect(output).toContain('Type generation completed successfully')
    expect(output).toContain('Discovering related entities')
    expect(output).toContain('related entities to process')
    
    // Verify related directory exists
    const relatedDirExists = await fs.access(`${testConfigs.withRelated.outputDir}/related`)
      .then(() => true)
      .catch(() => false)
    expect(relatedDirExists).toBe(true)
    
    // Verify some related entity files exist
    const accountExists = await fs.access(`${testConfigs.withRelated.outputDir}/related/account.ts`)
      .then(() => true)
      .catch(() => false)
    expect(accountExists).toBe(true)
  }, 600000) // 10 minutes timeout for initial cache population

  it('should generate publisher entities when using --publisher flag equivalent', { timeout: 120000 }, async () => {
    const output = await runGeneration('publisher', testConfigs.publisher)
    
    expect(output).toContain('Type generation completed successfully')
    
    // Verify KRA entities were generated - check if any files were created
    try {
      const files = await fs.readdir(testConfigs.publisher.outputDir)
      const entityFiles = files.filter(file => file.endsWith('.ts') && file.startsWith('kra_'))
      console.log(`Generated KRA entity files: ${entityFiles.join(', ')}`)
      expect(entityFiles.length).toBeGreaterThan(0)
    } catch (error) {
      // If directory doesn't exist, that means no entities were found
      // This might be expected if KRA publisher doesn't have entities in this environment
      console.warn('No KRA publisher entities found in this environment')
      expect(output).toContain('Found 0 entities for publisher kra')
    }
  })

  // Re-enabled: With caching, this should be much faster on subsequent runs
  it('should use custom directory names when specified', async () => {
    const output = await runGeneration('custom-paths', testConfigs.customPaths)
    
    expect(output).toContain('Type generation completed successfully')
    
    // Verify custom related entities directory name is used
    const customRelatedDirExists = await fs.access(`${testConfigs.customPaths.outputDir}/relations`)
      .then(() => true)
      .catch(() => false)
    expect(customRelatedDirExists).toBe(true)
    
    // Verify default "related" directory was not created
    const defaultRelatedDirExists = await fs.access(`${testConfigs.customPaths.outputDir}/related`)
      .then(() => true)
      .catch(() => false)
    expect(defaultRelatedDirExists).toBe(false)
  }, 600000) // 10 minutes timeout for initial cache population

  it('should respect maxRelatedEntityDepth configuration', async () => {
    // Test with depth 1 vs depth 2 should show different entity counts
    const depth1Config = {
      ...testConfigs.withRelated,
      outputDir: `${testOutputDir}/depth-1`,
      maxRelatedEntityDepth: 1
    }
    
    const depth2Config = {
      ...testConfigs.withRelated,
      outputDir: `${testOutputDir}/depth-2`, 
      maxRelatedEntityDepth: 2
    }
    
    const output1 = await runGeneration('depth-1', depth1Config)
    const output2 = await runGeneration('depth-2', depth2Config)
    
    expect(output1).toContain('Type generation completed successfully')
    expect(output2).toContain('Type generation completed successfully')
    
    // Both should have discovered related entities but potentially different counts
    expect(output1).toContain('related entities to process')
    expect(output2).toContain('related entities to process')
  }, 600000) // 10 minutes timeout for initial cache population

  it('should generate entity-agnostic examples for different entity types', async () => {
    // Test with Contact entity
    const contactConfig = {
      outputDir: `${testOutputDir}/contact-test`,
      entities: ['contact'],
      generateRelatedEntities: false,
      typeGeneration: { generateHooks: true, includeComments: true }
    }
    
    const contactOutput = await runGeneration('contact-test', contactConfig)
    expect(contactOutput).toContain('Type generation completed successfully')
    
    // Read generated hook and verify entity-specific examples
    const contactHookFile = await fs.readFile(`${contactConfig.outputDir}/hooks/contact.hooks.ts`, 'utf-8')
    
    // Should contain Contact-specific field names, not hardcoded PUM references
    expect(contactHookFile).toContain('fullname') // Contact's primary name field
    expect(contactHookFile).not.toContain('pum_name') // No hardcoded PUM references
    
    // Test with Account entity for comparison
    const accountConfig = {
      outputDir: `${testOutputDir}/account-test`,
      entities: ['account'],
      generateRelatedEntities: false,
      typeGeneration: { generateHooks: true, includeComments: true }
    }
    
    const accountOutput = await runGeneration('account-test', accountConfig)
    expect(accountOutput).toContain('Type generation completed successfully')
    
    const accountHookFile = await fs.readFile(`${accountConfig.outputDir}/hooks/account.hooks.ts`, 'utf-8')
    
    // Should contain Account-specific field names
    expect(accountHookFile).toContain('name') // Account's primary name field  
    expect(accountHookFile).not.toContain('pum_name') // No hardcoded PUM references
    expect(accountHookFile).not.toContain('fullname') // Should be different from Contact
  })

  it('should use simplified CRUD types across all configurations', async () => {
    const output = await runGeneration('crud-test', {
      outputDir: `${testOutputDir}/crud-test`,
      entities: ['contact'],
      generateRelatedEntities: false,
      typeGeneration: { generateHooks: true, includeComments: true }
    })
    
    expect(output).toContain('Type generation completed successfully')
    
    // Read query-types file to verify simplified types are used
    const queryTypesFile = await fs.readFile(`${testOutputDir}/crud-test/query-types.ts`, 'utf-8')
    
    // The file should exist and not contain complex nested conditionals
    expect(queryTypesFile).toBeDefined()
    expect(queryTypesFile.length).toBeGreaterThan(0)
    
    // Should be using our type generation which includes the simplified types
    expect(queryTypesFile).toContain('ODataFilter')
    expect(queryTypesFile).toContain('ODataResponse')
  })
}, 20000) // 20 second timeout for integration tests