import { promises as fs } from 'fs'
import { resolve } from 'path'
import type { TypeGenerationOptions } from '../generators/index.js'
import type { CodeGenConfig } from '../codegen/index.js'

/**
 * Dataverse type generator configuration
 */
export interface DataverseTypeGenConfig {
  /** Dataverse instance URL (optional, can use environment variables) */
  dataverseUrl?: string
  
  /** Output directory for generated files */
  outputDir: string
  
  /** File extension for generated files */
  fileExtension: '.ts' | '.d.ts'
  
  /** Specific entity logical names to generate */
  entities?: string[]
  
  /** Publisher prefix to filter entities */
  publisher?: string
  
  /** Solution name (unique name or friendly name) to filter entities by actual solution membership */
  solution?: string
  
  
  /** Authentication configuration */
  auth?: {
    clientId?: string
    tenantId?: string
    scopes?: string[]
  }
  
  /** Type generation options */
  typeGeneration: TypeGenerationOptions & {
    /** Entity prefix for generated interfaces */
    entityPrefix?: string
    /** Include barrel export index file */
    indexFile?: boolean
  }
  
  
  
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: DataverseTypeGenConfig = {
  outputDir: './generated',
  fileExtension: '.ts',
  typeGeneration: {
    includeComments: true,
    includeValidation: true,
    includeMetadata: true,
    useExactTypes: true,
    includeLookupValues: true,
    includeBindingTypes: true,
    indexFile: true
  }
}

/**
 * Configuration file names to search for
 */
const CONFIG_FILE_NAMES = [
  'dataverse.config.ts',
  'dataverse.config.js',
  'dataverse.config.mjs',
  'dataverse.config.json',
  '.dataverserc.json',
  '.dataverserc',
  'dataverse.json'
]

/**
 * Load configuration from file system
 */
export async function loadConfiguration(
  configPath?: string
): Promise<DataverseTypeGenConfig> {
  let config = { ...DEFAULT_CONFIG }
  
  // Try to load configuration file
  const loadedConfig = await loadConfigFile(configPath)
  if (loadedConfig) {
    config = mergeConfigurations(config, loadedConfig)
  }
  
  
  // Apply environment variable overrides
  config = applyEnvironmentVariables(config)
  
  return config
}

/**
 * Load configuration from file
 */
async function loadConfigFile(configPath?: string): Promise<Partial<DataverseTypeGenConfig> | null> {
  // If specific path provided, try only that
  if (configPath) {
    try {
      return await loadSingleConfigFile(resolve(configPath))
    } catch (error) {
      throw new Error(`Failed to load config file at ${configPath}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  // Search for config files in order of preference
  for (const fileName of CONFIG_FILE_NAMES) {
    try {
      const fullPath = resolve(fileName)
      const config = await loadSingleConfigFile(fullPath)
      if (config) {
        console.log(`📄 Loaded configuration from: ${fileName}`)
        return config
      }
    } catch {
      // File doesn't exist or can't be loaded, continue to next
    }
  }
  
  return null
}

/**
 * Load single configuration file
 */
async function loadSingleConfigFile(filePath: string): Promise<Partial<DataverseTypeGenConfig> | null> {
  try {
    await fs.access(filePath)
  } catch {
    return null // File doesn't exist
  }
  
  if (filePath.endsWith('.json')) {
    const content = await fs.readFile(filePath, 'utf8')
    return JSON.parse(content)
  }
  
  if (filePath.endsWith('.js') || filePath.endsWith('.mjs') || filePath.endsWith('.ts')) {
    // For JS/TS files, we would need dynamic import
    // For now, show a helpful message
    console.warn(`⚠️  JavaScript/TypeScript config files (${filePath}) are not yet supported. Please use JSON format.`)
    return null
  }
  
  // Try to parse as JSON for .dataverserc files
  try {
    const content = await fs.readFile(filePath, 'utf8')
    return JSON.parse(content)
  } catch {
    return null
  }
}

/**
 * Merge two configuration objects deeply
 */
function mergeConfigurations(
  base: DataverseTypeGenConfig, 
  override: Partial<DataverseTypeGenConfig>
): DataverseTypeGenConfig {
  const result = { ...base }
  
  for (const [key, value] of Object.entries(override)) {
    if (value === null || value === undefined) {
      continue
    }
    
    if (typeof value === 'object' && !Array.isArray(value) && typeof result[key as keyof DataverseTypeGenConfig] === 'object') {
      // Deep merge objects
      (result as Record<string, unknown>)[key] = {
        ...(result[key as keyof DataverseTypeGenConfig] as Record<string, unknown>),
        ...value
      }
    } else {
      // Direct assignment for primitives and arrays
      (result as Record<string, unknown>)[key] = value
    }
  }
  
  return result
}

/**
 * Apply environment variable overrides
 */
function applyEnvironmentVariables(config: DataverseTypeGenConfig): DataverseTypeGenConfig {
  const result = { ...config }
  
  // Dataverse URL
  if (process.env.DATAVERSE_INSTANCE) {
    result.dataverseUrl = process.env.DATAVERSE_INSTANCE
  }
  
  // Output directory
  if (process.env.DATAVERSE_OUTPUT_DIR) {
    result.outputDir = process.env.DATAVERSE_OUTPUT_DIR
  }
  
  // File extension
  if (process.env.DATAVERSE_FILE_EXTENSION) {
    const ext = process.env.DATAVERSE_FILE_EXTENSION
    if (ext === '.ts' || ext === '.d.ts') {
      result.fileExtension = ext
    }
  }
  
  // Publisher prefix
  if (process.env.DATAVERSE_PUBLISHER) {
    result.publisher = process.env.DATAVERSE_PUBLISHER
  }
  
  // Solution name
  if (process.env.DATAVERSE_SOLUTION) {
    result.solution = process.env.DATAVERSE_SOLUTION
  }
  
  // Azure authentication
  if (process.env.VITE_AZURE_CLIENT_ID || process.env.AZURE_CLIENT_ID) {
    result.auth = {
      ...result.auth,
      clientId: process.env.VITE_AZURE_CLIENT_ID || process.env.AZURE_CLIENT_ID
    }
  }
  
  if (process.env.VITE_AZURE_TENANT_ID || process.env.AZURE_TENANT_ID) {
    result.auth = {
      ...result.auth,
      tenantId: process.env.VITE_AZURE_TENANT_ID || process.env.AZURE_TENANT_ID
    }
  }
  
  // Boolean flags
  if (process.env.DATAVERSE_VERBOSE === 'true') {
    // Add verbose flag if needed
  }
  
  
  return result
}

/**
 * Validate configuration
 */
export function validateConfiguration(config: DataverseTypeGenConfig): {
  isValid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []
  
  // Required fields
  if (!config.outputDir) {
    errors.push('outputDir is required')
  }
  
  if (!config.fileExtension || (config.fileExtension !== '.ts' && config.fileExtension !== '.d.ts')) {
    errors.push('fileExtension must be ".ts" or ".d.ts"')
  }
  
  // Dataverse connection
  if (!config.dataverseUrl && !process.env.DATAVERSE_INSTANCE) {
    errors.push('Dataverse URL must be configured via config.dataverseUrl or environment variables')
  }
  
  // Entity selection
  if (!config.entities && !config.publisher && !config.solution) {
    warnings.push('No entities, publisher, or solution specified - will generate for all custom entities')
  }
  
  // Publisher and solution cannot both be specified
  if (config.publisher && config.solution) {
    errors.push('Cannot specify both publisher and solution - choose one discovery method')
  }
  
  // Output directory validation
  if (config.outputDir && config.outputDir.includes('..')) {
    warnings.push('outputDir contains relative path segments - ensure this is intentional')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Convert DataverseTypeGenConfig to CodeGenConfig
 */
export function toCodeGenConfig(config: DataverseTypeGenConfig): CodeGenConfig {
  return {
    outputDir: config.outputDir,
    fileExtension: config.fileExtension,
    indexFile: config.typeGeneration.indexFile ?? true,
    prettier: true, // Default to prettier
    eslint: false, // Default to no eslint
    overwrite: true, // Default to overwrite
    typeGenerationOptions: {
      entityPrefix: config.typeGeneration.entityPrefix,
      includeComments: config.typeGeneration.includeComments,
      includeValidation: config.typeGeneration.includeValidation,
      includeMetadata: config.typeGeneration.includeMetadata,
      useExactTypes: config.typeGeneration.useExactTypes,
      includeLookupValues: config.typeGeneration.includeLookupValues,
      includeBindingTypes: config.typeGeneration.includeBindingTypes,
    }
  }
}

/**
 * Save configuration to file
 */
export async function saveConfiguration(
  config: DataverseTypeGenConfig,
  filePath: string = 'dataverse.config.json'
): Promise<void> {
  const content = JSON.stringify(config, null, 2)
  await fs.writeFile(filePath, content, 'utf8')
}

/**
 * Get current environment
 */
export function getCurrentEnvironment(): string {
  return process.env.NODE_ENV || process.env.DATAVERSE_ENV || 'development'
}

/**
 * Create sample configuration
 */
export function createSampleConfig(): DataverseTypeGenConfig {
  return {
    ...DEFAULT_CONFIG,
    entities: ['account', 'contact', 'opportunity'],
    publisher: 'your_publisher_prefix',
    solution: 'your_solution_name',
    typeGeneration: {
      ...DEFAULT_CONFIG.typeGeneration,
      entityPrefix: 'CRM',
      includeComments: true,
      includeMetadata: true
    }
  }
}

