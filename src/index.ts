// Core types and interfaces
export * from './types.js'
export * from './metadata-client.js'
export * from './error-logger.js'

// Authentication and API client
export * from './auth/index.js'
export * from './client/index.js'

// Metadata processing and type generation
export * from './processors/index.js'
export * from './generators/index.js'
export * from './codegen/index.js'

// Configuration and CLI
export * from './config/index.js'
export * from './cli/index.js'

// Query utilities and React Query hooks
export * from './query/types.js'
export * from './query/url-builders.js'
export * from './query/hooks.js'
export * from './query/standalone.js'

// Main public API functions
import { 
  fetchEntityMetadata,
  fetchPublisherEntities,
  fetchSolutionEntities
} from './client/index.js'
import { processEntityMetadata } from './processors/index.js'
import { generateMultipleEntityTypes } from './codegen/index.js'
import { toCodeGenConfig } from './config/index.js'
import type { DataverseTypeGenConfig } from './config/index.js'

/**
 * Simplified API options for type generation
 */
export interface GenerateTypesOptions {
  /** Specific entities to generate (logical names) */
  entities?: string[]
  /** Publisher prefix to filter entities */
  publisher?: string
  /** Solution name (unique name or friendly name) to filter entities by actual solution membership */
  solution?: string
  /** Output directory */
  outputDir?: string
  /** Dataverse instance URL */
  dataverseUrl?: string
  /** Include comments in generated code */
  includeComments?: boolean
  /** Include metadata objects */
  includeMetadata?: boolean
}

/**
 * Generate TypeScript types for Dataverse entities
 * Main public API function
 * 
 * @param options - Generation options
 * @returns Promise with generation results
 */
export async function generateTypes(options: GenerateTypesOptions = {}): Promise<{
  files: Array<{ filePath: string; success: boolean; size: number; error?: string }>
  indexFile?: { filePath: string; success: boolean; size: number; error?: string }
  totalFiles: number
  successfulFiles: number
  failedFiles: number
  totalSize: number
  duration: number
  processedEntities: number
}> {
  // Create simplified configuration from options
  const config: DataverseTypeGenConfig = {
    outputDir: options.outputDir || './generated',
    fileExtension: '.ts',
    entities: options.entities,
    publisher: options.publisher,
    solution: options.solution,
    dataverseUrl: options.dataverseUrl,
    typeGeneration: {
      includeComments: options.includeComments ?? true,
      includeValidation: true,
      includeMetadata: options.includeMetadata ?? false,
 
      useExactTypes: true,
      indexFile: true
    }
  }
  
  // Validate basic configuration
  if (!config.entities && !config.publisher && !config.solution) {
    throw new Error('Must specify either entities, publisher, or solution')
  }
  
  // Publisher and solution cannot both be specified
  if (config.publisher && config.solution) {
    throw new Error('Cannot specify both publisher and solution - choose one discovery method')
  }
  
  if (!config.dataverseUrl && !process.env.DATAVERSE_INSTANCE) {
    throw new Error('Dataverse URL must be configured via dataverseUrl option or environment variables')
  }
  
  // Determine entities to process
  let entitiesToProcess: string[] = []
  
  if (config.entities && config.entities.length > 0) {
    entitiesToProcess = config.entities
  } else if (config.publisher) {
    const publisherEntities = await fetchPublisherEntities(config.publisher)
    entitiesToProcess = publisherEntities.map(e => e.LogicalName)
  } else if (config.solution) {
    const solutionEntities = await fetchSolutionEntities(config.solution)
    entitiesToProcess = solutionEntities.map(e => e.LogicalName)
  }
  
  if (entitiesToProcess.length === 0) {
    throw new Error('No entities found to process')
  }
  
  // Fetch and process entities
  const processedEntities = []
  
  for (const entityName of entitiesToProcess) {
    try {
      const rawMetadata = await fetchEntityMetadata(entityName, {
        includeAttributes: true
      })
      
      if (rawMetadata) {
        const processed = processEntityMetadata(rawMetadata)
        processedEntities.push(processed)
      }
    } catch (error) {
      console.warn(`Failed to process entity ${entityName}:`, error)
    }
  }
  
  if (processedEntities.length === 0) {
    throw new Error('No entities were successfully processed')
  }
  
  // Generate TypeScript files
  const codeGenConfig = toCodeGenConfig(config)
  const result = await generateMultipleEntityTypes(processedEntities, codeGenConfig)
  
  return {
    ...result,
    processedEntities: processedEntities.length
  }
}


