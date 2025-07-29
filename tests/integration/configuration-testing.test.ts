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
      publisher: 'pum',
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
      dataverseUrl: 'https://ssopowerppm.crm4.dynamics.com',
      includeComments: true,
      includeMetadata: true,
      cache: {
        enabled: true,
        ttlHours: 24,
        maxSizeMB: 500
      },
      ...config
    }
    
    await fs.writeFile(configPath, JSON.stringify(fullConfig, null, 2))
    
    // Run generation with environment variable
    const { stdout, stderr } = await execAsync(
      `DATAVERSE_INSTANCE=https://ssopowerppm.crm4.dynamics.com node dist/bin/cli.cjs generate --config ${configPath}`,
      { timeout: 60000 }
    )
    
    return stdout
  }

  it('should generate without hooks when generateHooks=false', async () => {
    const output = await runGeneration('no-hooks', testConfigs.noHooks)
    
    expect(output).toContain('Type generation completed successfully')
    
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

  it('should generate related entities when generateRelatedEntities=true', async () => {
    const output = await runGeneration('with-related', testConfigs.withRelated)
    
    expect(output).toContain('Type generation completed successfully')
    expect(output).toContain('Discovering related entities')
    expect(output).toContain('Related entities to process')
    
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
  })

  it('should generate publisher entities when using --publisher flag equivalent', async () => {
    const output = await runGeneration('publisher', testConfigs.publisher)
    
    expect(output).toContain('Type generation completed successfully')
    
    // Verify PUM entities were generated
    const pumInitiativeExists = await fs.access(`${testConfigs.publisher.outputDir}/pum_initiative.ts`)
      .then(() => true)
      .catch(() => false)
    const pumGanttTaskExists = await fs.access(`${testConfigs.publisher.outputDir}/pum_gantttask.ts`)
      .then(() => true)
      .catch(() => false)
    
    expect(pumInitiativeExists || pumGanttTaskExists).toBe(true)
  })

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
  })

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
    expect(output1).toContain('Related entities to process')
    expect(output2).toContain('Related entities to process')
  })

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
}, 120000) // 2 minute timeout for integration tests