#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { promises as fs } from 'fs'
import { join, resolve } from 'path'
import { createInterface } from 'readline'
import { 
  fetchEntityMetadata,
  fetchPublisherEntities,
  fetchSolutionEntities,
  fetchAllEntities 
} from '../client/index.js'
import { processEntityMetadata } from '../processors/index.js'
import { 
  generateMultipleEntityTypes,
  type CodeGenConfig 
} from '../codegen/index.js'

/**
 * CLI configuration interface
 */
interface CLIConfig {
  dataverseUrl?: string
  outputDir: string
  entities?: string[] | string
  publisher?: string
  solution?: string
  fileExtension: '.ts' | '.d.ts'
  includeComments: boolean
  includeMetadata: boolean
  includeValidation: boolean
  overwrite: boolean
  verbose: boolean
  debug: boolean
  quiet: boolean
  dryRun: boolean
  outputFormat: 'text' | 'json'
  config?: string
}

/**
 * Default CLI configuration
 */
const DEFAULT_CLI_CONFIG: CLIConfig = {
  outputDir: './generated',
  fileExtension: '.ts',
  includeComments: true,
  includeMetadata: true,
  includeValidation: true,
  overwrite: true,
  verbose: false,
  debug: false,
  quiet: false,
  dryRun: false,
  outputFormat: 'text'
}

/**
 * Prompt user for input
 */
async function promptUser(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

/**
 * Validate Dataverse URL format
 */
function validateDataverseUrl(url: string): { isValid: boolean; message?: string } {
  if (!url) {
    return { isValid: false, message: 'URL cannot be empty' }
  }

  try {
    const parsedUrl = new URL(url)
    
    // Must be HTTPS
    if (parsedUrl.protocol !== 'https:') {
      return { isValid: false, message: 'URL must use HTTPS protocol' }
    }

    // Must be a Dataverse domain pattern
    const hostname = parsedUrl.hostname.toLowerCase()
    const validPatterns = [
      /\.crm\d*\.dynamics\.com$/,
      /\.crm\d*\.microsoftdynamics\.com$/,
      /\.crm\d*\.dynamics\.cn$/,
      /\.crm\d*\.microsoftdynamics\.de$/,
      /\.crm\d*\.microsoftdynamics\.us$/
    ]

    const isValidDomain = validPatterns.some(pattern => pattern.test(hostname))
    if (!isValidDomain) {
      return { 
        isValid: false, 
        message: 'URL must be a valid Dataverse instance (e.g., https://yourorg.crm.dynamics.com)' 
      }
    }

    return { isValid: true }
  } catch {
    return { isValid: false, message: 'Invalid URL format' }
  }
}

/**
 * Interactively prompt for Dataverse URL
 */
async function promptForDataverseUrl(logger: SimpleLogger): Promise<string> {
  logger.info('Dataverse URL is required but not configured.')
  logger.info('You can set it via:')
  logger.info('  • Environment variable: DATAVERSE_INSTANCE=https://yourorg.crm.dynamics.com')
  logger.info('  • Command line option: --dataverse-url https://yourorg.crm.dynamics.com')
  logger.info('  • Configuration file')
  console.log()

  let url = ''
  let attempts = 0
  const maxAttempts = 3

  while (attempts < maxAttempts) {
    url = await promptUser('Please enter your Dataverse instance URL: ')
    
    if (url.toLowerCase() === 'exit' || url.toLowerCase() === 'quit') {
      logger.info('Cancelled by user')
      process.exit(0)
    }

    const validation = validateDataverseUrl(url)
    if (validation.isValid) {
      logger.success(`Valid Dataverse URL: ${url}`)
      return url
    }

    attempts++
    logger.error(`Invalid URL: ${validation.message}`)
    
    if (attempts < maxAttempts) {
      logger.info(`Please try again (${maxAttempts - attempts} attempts remaining, or type 'exit' to cancel)`)
    }
  }

  logger.error('Too many invalid attempts. Please check your Dataverse URL and try again.')
  process.exit(1)
}

/**
 * Simple CLI logging
 */
class SimpleLogger {
  private verbose: boolean
  private debug: boolean
  private quiet: boolean
  private outputFormat: 'text' | 'json'
  private jsonOutput: Array<{
    level: string
    message?: string
    timestamp: string
    [key: string]: unknown
  }> = []

  constructor(options: { verbose?: boolean; debug?: boolean; quiet?: boolean; outputFormat?: 'text' | 'json' } = {}) {
    this.verbose = options.verbose || false
    this.debug = options.debug || false
    this.quiet = options.quiet || false
    this.outputFormat = options.outputFormat || 'text'
  }

  info(message: string): void {
    if (this.quiet && this.outputFormat === 'text') return
    if (this.outputFormat === 'json') {
      this.jsonOutput.push({ level: 'info', message, timestamp: new Date().toISOString() })
    } else {
      console.log(`ℹ️  ${message}`)
    }
  }

  success(message: string): void {
    if (this.quiet && this.outputFormat === 'text') return
    if (this.outputFormat === 'json') {
      this.jsonOutput.push({ level: 'success', message, timestamp: new Date().toISOString() })
    } else {
      console.log(`✅ ${message}`)
    }
  }

  warning(message: string): void {
    if (this.outputFormat === 'json') {
      this.jsonOutput.push({ level: 'warning', message, timestamp: new Date().toISOString() })
    } else {
      console.log(`⚠️  ${message}`)
    }
  }

  error(message: string, actionableHint?: string): void {
    const fullMessage = actionableHint ? `${message}\n💡 Suggestion: ${actionableHint}` : message
    if (this.outputFormat === 'json') {
      this.jsonOutput.push({ level: 'error', message: fullMessage, timestamp: new Date().toISOString() })
    } else {
      console.error(`❌ ${fullMessage}`)
    }
  }

  debugLog(message: string): void {
    if (this.debug) {
      if (this.outputFormat === 'json') {
        this.jsonOutput.push({ level: 'debug', message, timestamp: new Date().toISOString() })
      } else {
        console.log(`🔍 [DEBUG] ${message}`)
      }
    }
  }

  verboseDebug(message: string): void {
    if (this.verbose) {
      this.debugLog(message)
    }
  }

  getJsonOutput(): Array<{ level: string; message?: string; timestamp: string; [key: string]: unknown }> {
    return this.jsonOutput
  }

  outputJson(): void {
    if (this.outputFormat === 'json') {
      console.log(JSON.stringify(this.jsonOutput, null, 2))
    }
  }

  progress(current: number, total: number, item?: string): void {
    if (this.quiet && this.outputFormat === 'text') return
    
    const percentage = Math.round((current / total) * 100)
    const itemText = item ? ` - ${item}` : ''
    const progressBar = this.createProgressBar(percentage)
    
    if (this.outputFormat === 'json') {
      this.jsonOutput.push({
        level: 'progress',
        current,
        total,
        percentage,
        item,
        timestamp: new Date().toISOString()
      })
    } else {
      console.log(`📝 ${progressBar} ${current}/${total} (${percentage}%)${itemText}`)
    }
  }
  
  private createProgressBar(percentage: number): string {
    const width = 20
    const filled = Math.round((percentage / 100) * width)
    const empty = width - filled
    return `[${'█'.repeat(filled)}${'░'.repeat(empty)}]`
  }
}

/**
 * Load configuration from file
 */
async function loadConfig(configPath?: string): Promise<Partial<CLIConfig>> {
  const possiblePaths = [
    configPath,
    'dataverse.config.js',
    'dataverse.config.ts',
    '.dataverserc.json',
    '.dataverserc'
  ].filter(Boolean) as string[]

  for (const path of possiblePaths) {
    try {
      const fullPath = resolve(path)
      await fs.access(fullPath)
      
      if (path.endsWith('.json')) {
        const content = await fs.readFile(fullPath, 'utf8')
        return JSON.parse(content)
      }
      
      // For JS/TS config files, we'd need dynamic import
      // For now, just support JSON
      console.warn(`Config file ${path} found but JS/TS config loading not implemented yet`)
      
    } catch {
      // File doesn't exist, continue to next
    }
  }

  return {}
}

/**
 * Validate CLI inputs before execution
 */
async function validateInputs(config: CLIConfig, logger: SimpleLogger): Promise<void> {
  logger.debugLog('Validating CLI inputs...')
  
  // Check if output directory parent exists and is writable
  try {
    const parentDir = resolve(config.outputDir, '..')
    await fs.access(parentDir, fs.constants.W_OK)
  } catch {
    throw new Error(`Output directory parent '${resolve(config.outputDir, '..')}' is not writable or doesn't exist`)
  }
  
  // Validate entity names format if provided
  if (config.entities && Array.isArray(config.entities)) {
    for (const entity of config.entities) {
      if (typeof entity === 'string' && !/^[a-z_][a-z0-9_]*$/i.test(entity)) {
        throw new Error(`Invalid entity name '${entity}'. Entity names should contain only letters, numbers, and underscores.`)
      }
    }
  }
  
  // Validate file extension
  if (config.fileExtension !== '.ts' && config.fileExtension !== '.d.ts') {
    throw new Error(`Invalid file extension '${config.fileExtension}'. Must be '.ts' or '.d.ts'`)
  }
  
  logger.debugLog('Input validation completed successfully')
}

/**
 * Generate command implementation
 */
async function generateCommand(options: Record<string, unknown>): Promise<void> {
  const loggerOptions = {
    verbose: Boolean(options.verbose),
    debug: Boolean(options.debug),
    quiet: Boolean(options.quiet),
    outputFormat: (options.outputFormat as 'text' | 'json') || 'text'
  }
  const logger = new SimpleLogger(loggerOptions)
  
  try {
    logger.info('🚀 Starting Dataverse type generation...')
    
    if (options.dryRun) {
      logger.info('🔍 Running in dry-run mode - no files will be generated')
    }
    
    // Load configuration
    const config = { ...DEFAULT_CLI_CONFIG, ...(await loadConfig(options.config as string)), ...options }
    
    // Validate inputs before proceeding
    await validateInputs(config, logger)
    
    logger.debugLog(`Configuration: ${JSON.stringify(config, null, 2)}`)

    // Validate and ensure Dataverse URL is available
    if (!process.env.DATAVERSE_INSTANCE && !config.dataverseUrl) {
      // Interactively prompt for URL
      config.dataverseUrl = await promptForDataverseUrl(logger)
    }
    
    // Set the environment variable for the auth system to use
    if (config.dataverseUrl) {
      process.env.DATAVERSE_INSTANCE = config.dataverseUrl
      logger.debugLog(`Set DATAVERSE_INSTANCE to: ${config.dataverseUrl}`)
    }

    let entitiesToProcess: string[] = []

    // Determine which entities to generate
    if (config.entities?.length) {
      // Handle both comma-separated strings and arrays
      if (Array.isArray(config.entities)) {
        entitiesToProcess = config.entities.flatMap(entity => 
          typeof entity === 'string' ? entity.split(',').map((e: string) => e.trim()).filter((e: string) => e) : [String(entity)]
        )
      } else if (typeof config.entities === 'string') {
        entitiesToProcess = config.entities.split(',').map((e: string) => e.trim()).filter((e: string) => e)
      } else {
        entitiesToProcess = [String(config.entities)]
      }
      
      if (entitiesToProcess.length > 0) {
        logger.info(`📋 Generating types for specified entities: ${entitiesToProcess.join(', ')}`)
      }
      
    } else if (config.publisher) {
      logger.info(`🔍 Discovering entities for publisher: ${config.publisher}`)
      const publisherEntities = await fetchPublisherEntities(config.publisher)
      entitiesToProcess = publisherEntities.map(e => e.LogicalName)
      logger.success(`Found ${entitiesToProcess.length} entities for publisher ${config.publisher}`)
      
      if (config.debug && entitiesToProcess.length > 0) {
        logger.debugLog(`Entities to process: ${entitiesToProcess.slice(0, 10).join(', ')}${entitiesToProcess.length > 10 ? '...' : ''}`)
      }
      
    } else if (config.solution) {
      logger.info(`🔍 Discovering entities for solution: ${config.solution}`)
      const solutionEntities = await fetchSolutionEntities(config.solution)
      entitiesToProcess = solutionEntities.map(e => e.LogicalName)
      logger.success(`Found ${entitiesToProcess.length} entities for solution ${config.solution}`)
      
    } else {
      logger.warning('No specific entities, publisher, or solution specified. Use --entities, --publisher, or --solution to limit scope.')
      logger.info('🔍 Fetching all custom entities...')
      const allEntities = await fetchAllEntities({ customOnly: true })
      entitiesToProcess = allEntities.map(e => e.LogicalName)
      logger.info(`Found ${entitiesToProcess.length} custom entities`)
    }

    if (entitiesToProcess.length === 0) {
      logger.warning('⚠️  No entities found to process')
      
      if (config.debug) {
        logger.debugLog('Debugging entity discovery:')
        if (config.entities) {
          logger.debugLog(`  - Searched for specific entities: ${JSON.stringify(config.entities)}`)
        } else if (config.publisher) {
          logger.debugLog(`  - Searched for publisher prefix: '${config.publisher}'`)
          logger.debugLog(`  - Expected entities to start with: '${config.publisher}_'`)
        } else if (config.solution) {
          logger.debugLog(`  - Searched for solution: '${config.solution}'`)
        } else {
          logger.debugLog('  - Searched for all custom entities')
        }
      }
      
      return
    }

    // Fetch and process entities
    logger.info(`📥 Fetching metadata for ${entitiesToProcess.length} entities...`)
    const processedEntities = []
    
    for (let i = 0; i < entitiesToProcess.length; i++) {
      const entityName = entitiesToProcess[i]
      if (!loggerOptions.quiet) {
        logger.progress(i + 1, entitiesToProcess.length, entityName)
      }
      
      try {
        const rawMetadata = await fetchEntityMetadata(entityName, {
          includeAttributes: true,
          includeRelationships: false
        })
        
        if (rawMetadata) {
          const processed = processEntityMetadata(rawMetadata)
          processedEntities.push(processed)
          logger.verboseDebug(`✅ Processed ${entityName} (${processed.attributes.length} attributes)`)
        } else {
          logger.warning(`Entity ${entityName} not found`)
        }
        
      } catch (error) {
        logger.error(`Failed to process ${entityName}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    if (processedEntities.length === 0) {
      logger.error('No entities were successfully processed')
      process.exit(1)
    }

    logger.success(`Successfully processed ${processedEntities.length} entities`)

    // Generate TypeScript files
    if (config.dryRun) {
      logger.info(`📋 Dry run: Would generate ${processedEntities.length} TypeScript files in ${config.outputDir}`)
      logger.info('📊 Dry run summary:')
      for (const entity of processedEntities) {
        logger.info(`   - ${entity.logicalName}.${config.fileExtension} (${entity.attributes.length} attributes)`)
      }
      logger.success('🎉 Dry run completed successfully!')
      return
    }
    
    logger.info(`📝 Generating TypeScript files in ${config.outputDir}...`)
    
    const codeGenConfig: Partial<CodeGenConfig> = {
      outputDir: config.outputDir,
      fileExtension: config.fileExtension,
      indexFile: true,
      overwrite: config.overwrite,
      typeGenerationOptions: {
        includeComments: config.includeComments,
        includeMetadata: config.includeMetadata,
        includeValidation: config.includeValidation,
        includeLookupValues: (config as { typeGeneration?: { includeLookupValues?: boolean } }).typeGeneration?.includeLookupValues ?? true,
        includeBindingTypes: (config as { typeGeneration?: { includeBindingTypes?: boolean } }).typeGeneration?.includeBindingTypes ?? true,
      }
    }
    
    const result = await generateMultipleEntityTypes(processedEntities, codeGenConfig)
    
    // Report results
    logger.success(`Generated ${result.successfulFiles} TypeScript files`)
    
    if (result.failedFiles > 0) {
      logger.warning(`${result.failedFiles} files failed to generate`)
      
      for (const file of result.files) {
        if (!file.success && file.error) {
          logger.error(`${file.filePath}: ${file.error}`)
        }
      }
    }
    
    if (result.indexFile?.success) {
      logger.success(`Generated index file: ${result.indexFile.filePath}`)
    }
    
    // Enhanced statistics reporting
    const stats = {
      totalFiles: result.totalFiles,
      successful: result.successfulFiles,
      failed: result.failedFiles,
      totalSizeKB: Math.round(result.totalSize / 1024),
      durationMs: result.duration
    }
    
    if (loggerOptions.outputFormat === 'json') {
      const output = logger.getJsonOutput()
      output.push({ level: 'statistics', ...stats, timestamp: new Date().toISOString() })
    } else {
      logger.info(`📊 Generation Statistics:`)
      logger.info(`   │`)
      logger.info(`   ├─ Total files: ${stats.totalFiles}`)
      logger.info(`   ├─ Successful: ✅ ${stats.successful}`)
      logger.info(`   ├─ Failed: ${stats.failed > 0 ? `❌ ${stats.failed}` : '✅ 0'}`)
      logger.info(`   ├─ Total size: ${stats.totalSizeKB}KB`)
      logger.info(`   └─ Duration: ${stats.durationMs}ms`)
    }
    
    logger.success('🎉 Type generation completed successfully!')
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    let actionableHint: string | undefined
    
    // Provide actionable hints for common errors
    if (errorMessage.includes('ENOENT')) {
      actionableHint = 'Check that the specified paths exist'
    } else if (errorMessage.includes('EACCES') || errorMessage.includes('not writable')) {
      actionableHint = 'Check directory permissions or run with appropriate privileges'
    } else if (errorMessage.includes('Invalid entity name')) {
      actionableHint = 'Use valid Dataverse entity logical names (lowercase, underscore separated)'
    } else if (errorMessage.includes('Connection failed')) {
      actionableHint = 'Verify your Dataverse URL and authentication. Run `dataverse-type-gen validate` to test connection'
    }
    
    logger.error(`Fatal error: ${errorMessage}`, actionableHint)
    
    if (logger.getJsonOutput().length > 0) {
      logger.outputJson()
    }
    
    process.exit(1)
  } finally {
    if (loggerOptions.outputFormat === 'json') {
      logger.outputJson()
    }
  }
}

/**
 * Init command implementation
 */
async function initCommand(options: Record<string, unknown>): Promise<void> {
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

/**
 * Validate command implementation
 */
async function validateCommand(options: Record<string, unknown>): Promise<void> {
  const loggerOptions = {
    verbose: Boolean(options.verbose),
    debug: Boolean(options.debug),
    outputFormat: (options.outputFormat as 'text' | 'json') || 'text'
  }
  const logger = new SimpleLogger(loggerOptions)
  
  try {
    logger.info('🔍 Validating Dataverse connection and configuration...')
    
    // Check environment variables
    const dataverseUrl = process.env.DATAVERSE_INSTANCE
    if (!dataverseUrl) {
      logger.error('DATAVERSE_INSTANCE environment variable not set')
      process.exit(1)
    }
    
    logger.success(`Dataverse URL configured: ${dataverseUrl}`)
    
    // Test connection by fetching a few entities
    logger.info('🔗 Testing Dataverse connection...')
    
    try {
      const testEntities = await fetchAllEntities({ select: ['LogicalName', 'DisplayName'] })
      
      if (testEntities.length > 0) {
        logger.success(`Connection successful - found ${testEntities.length} entities`)
        
        for (const entity of testEntities.slice(0, 5)) { // Show only first 5
          const displayName = entity.DisplayName?.UserLocalizedLabel?.Label || entity.LogicalName
          logger.info(`   - ${entity.LogicalName} (${displayName})`)
        }
      } else {
        logger.warning('Connection successful but no entities found')
      }
      
    } catch (error) {
      logger.error(`Connection failed: ${error instanceof Error ? error.message : String(error)}`)
      process.exit(1)
    }
    
    // Validate configuration file if exists
    const config = await loadConfig(options.config as string)
    if (Object.keys(config).length > 0) {
      logger.success('Configuration file loaded successfully')
      
      if (options.verbose) {
        logger.verboseDebug(`Configuration: ${JSON.stringify(config, null, 2)}`)
      }
    } else {
      logger.info('No configuration file found (using defaults)')
    }
    
    logger.success('🎉 Validation completed successfully!')
    
  } catch (error) {
    logger.error(`Validation failed: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  }
}

/**
 * Main CLI setup
 */
export function setupCLI(): Command {
  const program = new Command()
  
  program
    .name('dataverse-type-gen')
    .description('Generate TypeScript types from Dataverse metadata')
    .version('1.0.0')
  
  // Generate command
  program
    .command('generate')
    .description('Generate TypeScript types from Dataverse entities')
    .option('-o, --output-dir <dir>', 'Output directory for generated files', './generated')
    .option('-e, --entities <entities>', 'Comma-separated entity logical names (e.g. account,contact,opportunity)')
    .option('-p, --publisher <prefix>', 'Publisher prefix to filter entities (naming convention based)')
    .option('-s, --solution <name>', 'Solution name to filter entities (actual solution membership)')
    .option('--dataverse-url <url>', 'Dataverse instance URL (e.g. https://yourorg.crm.dynamics.com)')
    .option('--file-extension <ext>', 'File extension (.ts or .d.ts)', '.ts')
    .option('--no-comments', 'Exclude comments from generated code')
    .option('--no-metadata', 'Exclude metadata objects')
    .option('--no-validation', 'Exclude validation functions')
    .option('--no-overwrite', 'Do not overwrite existing files')
    .option('-c, --config <path>', 'Configuration file path')
    .option('-v, --verbose', 'Verbose output')
    .option('--debug', 'Enable debug mode with detailed logging')
    .option('-q, --quiet', 'Suppress non-error output')
    .option('--dry-run', 'Preview what would be generated without creating files')
    .option('--output-format <format>', 'Output format: text or json', 'text')
    .addHelpText('after', `
Examples:
  $ dataverse-type-gen generate --entities account,contact,opportunity
  $ dataverse-type-gen generate --publisher your_prefix --dry-run
  $ dataverse-type-gen generate --solution MySolution --quiet
  $ dataverse-type-gen generate --entities account --output-dir ./src/types --debug
  $ dataverse-type-gen generate --dataverse-url https://yourorg.crm.dynamics.com --publisher prefix
  $ dataverse-type-gen generate --solution "My Custom Solution" --output-format json
  $ dataverse-type-gen generate --config ./custom-config.json --verbose`)
    .action(generateCommand)
  
  // Init command
  program
    .command('init')
    .description('Initialize Dataverse type generator configuration')
    .option('-o, --output-dir <dir>', 'Output directory for generated files', './generated')
    .option('-c, --config <path>', 'Configuration file path', 'dataverse.config.json')
    .option('-v, --verbose', 'Verbose output')
    .addHelpText('after', `
Examples:
  $ dataverse-type-gen init
  $ dataverse-type-gen init --config ./my-config.json
  $ dataverse-type-gen init --output-dir ./src/generated`)
    .action(initCommand)
  
  // Validate command
  program
    .command('validate')
    .description('Validate Dataverse connection and configuration')
    .option('-c, --config <path>', 'Configuration file path')
    .option('-v, --verbose', 'Verbose output')
    .option('--debug', 'Enable debug mode')
    .option('--output-format <format>', 'Output format: text or json', 'text')
    .addHelpText('after', `
Examples:
  $ dataverse-type-gen validate
  $ dataverse-type-gen validate --config ./dataverse.config.json
  $ dataverse-type-gen validate --verbose`)
    .action(validateCommand)
  
  // Info command
  program
    .command('info')
    .description('Show information about the type generator')
    .action(() => {
      console.log(chalk.blue('📋 Dataverse Type Generator'))
      console.log('')
      console.log('🔗 Environment Variables:')
      console.log(`   DATAVERSE_INSTANCE: ${process.env.DATAVERSE_INSTANCE || 'Not set'}`)
      console.log('')
      console.log('📁 Current Directory:', process.cwd())
      console.log('📦 Node Version:', process.version)
      console.log('')
      console.log('📚 For more information:')
      console.log('   - Run: dataverse-type-gen --help')
      console.log('   - Run: dataverse-type-gen init')
      console.log('   - Run: dataverse-type-gen validate')
    })
  
  return program
}

// CLI setup is now handled by src/bin/cli.ts
// This file only exports the CLI functions for testing and reuse

export { generateCommand, initCommand, validateCommand, SimpleLogger }