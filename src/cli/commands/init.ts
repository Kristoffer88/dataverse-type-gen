import { promises as fs } from 'fs'
import { join } from 'path'
import { SimpleLogger } from '../output/formatters.js'

/**
 * Init command implementation
 */
export async function initCommand(options: Record<string, unknown>): Promise<void> {
  const loggerOptions = {
    verbose: Boolean(options.verbose),
    debug: Boolean(options.debug || false),
    outputFormat: 'text' as const
  }
  const logger = new SimpleLogger(loggerOptions)
  
  try {
    logger.info('🚀 Initializing Dataverse type generator...')
    
    // Create configuration file
    const configPath = (options.config as string) || 'dataverse.config.json'
    const config = {
      "outputDir": "./generated",
      "fileExtension": ".ts",
      "includeComments": true,
      "includeMetadata": true,
      "includeValidation": true,
      "entities": [
        "// Add specific entity logical names here",
        "// Example: \"account\", \"contact\", \"opportunity\""
      ],
      "publisher": "// Your publisher prefix (e.g., 'pum') - for filtering by naming convention",
      "solution": "// Your solution name (e.g., 'MySolution') - for filtering by actual solution membership",
      "cache": {
        "enabled": false,
        "ttlHours": 2,
        "maxSizeMB": 100
      },
      "typeGenerationOptions": {
        "useExactTypes": true
      }
    }
    
    await fs.writeFile(configPath, JSON.stringify(config, null, 2))
    logger.success(`Created configuration file: ${configPath}`)
    
    // Create output directory
    const outputDir = (options.outputDir as string) || './generated'
    await fs.mkdir(outputDir, { recursive: true })
    logger.success(`Created output directory: ${outputDir}`)
    
    // Create .gitignore
    const gitignorePath = join(outputDir, '.gitignore')
    const gitignoreContent = `# Generated TypeScript files
*.ts
*.d.ts
!*.test.ts
!*.spec.ts

# Keep directory
!.gitignore
`
    
    await fs.writeFile(gitignorePath, gitignoreContent)
    logger.success(`Created .gitignore: ${gitignorePath}`)
    
    logger.info(``)
    logger.info(`🎯 Next steps:`)
    logger.info(`   1. Configure your Dataverse connection:`)
    logger.info(`      export DATAVERSE_INSTANCE="https://yourorg.crm.dynamics.com"`)
    logger.info(`   2. Edit ${configPath} to specify entities, publisher, or solution`)
    logger.info(`   3. Run: npx dataverse-type-gen generate`)
    logger.info(``)
    logger.success('🎉 Initialization completed!')
    
  } catch (error) {
    logger.error(`Initialization failed: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  }
}