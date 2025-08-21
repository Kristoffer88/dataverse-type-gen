import { 
  fetchEntityMetadata,
  fetchMultipleEntities,
  fetchPublisherEntities,
  fetchSolutionEntities,
  fetchAllEntities,
  fetchAllEntityMetadata,
  type ProgressCallback
} from '../../client/index.js'
import { processEntityMetadata, type ProcessedEntityMetadata } from '../../processors/index.js'
import { 
  generateMultipleEntityTypes,
  type CodeGenConfig 
} from '../../codegen/index.js'
import { 
  loadConfiguration,
  toCodeGenConfig,
  DEFAULT_CONFIG,
  type DataverseTypeGenConfig 
} from '../../config/index.js'
import { SimpleLogger } from '../output/formatters.js'
import { validateInputs } from '../validation/url-validator.js'
import { promptForDataverseUrl, confirmFullMetadata } from '../prompts/user-prompts.js'
import { DEFAULT_CLI_CONFIG, convertToCliConfig, type CLIConfig } from '../config/cli-config.js'
import { globalRequestQueue } from '../../client/concurrent-queue.js'

/**
 * Generate command implementation
 */
export async function generateCommand(options: Record<string, unknown>): Promise<void> {
  const commandStartTime = Date.now()
  const loggerOptions = {
    verbose: Boolean(options.verbose),
    debug: false, // Debug mode removed
    quiet: false, // Quiet mode removed
    outputFormat: 'text' as 'text' | 'json' // Always use text format
  }
  const logger = new SimpleLogger(loggerOptions)
  
  try {
    logger.info('Starting Dataverse type generation...')
    
    if (options.dryRun) {
      logger.info('Running in dry-run mode - no files will be generated')
    }
    
    // Always load configuration file (no --no-config-file option)
    const loadedConfig = await loadConfiguration(options.config as string)
    const configFromFile = convertToCliConfig(loadedConfig)
    
    // Merge: defaults < config file < explicit CLI options  
    // Only include CLI options that were explicitly provided (not undefined)
    const explicitCliOptions: Partial<CLIConfig> = {}
    Object.keys(options).forEach(key => {
      const value = options[key]
      if (value !== undefined) {
        (explicitCliOptions as Record<string, unknown>)[key] = value
      }
    })
    
    const config = { ...DEFAULT_CLI_CONFIG, ...configFromFile, ...explicitCliOptions }
    
    // Handle hook generation options (only --no-hooks disables)
    if (options.hooks === false || options.noHooks === true) {
      config.generateHooks = false
    }
    
    // Validate inputs before proceeding
    await validateInputs(config, logger)

    // Validate and ensure Dataverse URL is available
    if (!process.env.DATAVERSE_INSTANCE && !config.dataverseUrl) {
      // Interactively prompt for URL
      config.dataverseUrl = await promptForDataverseUrl(logger)
    }
    
    // Set the environment variable for the auth system to use
    if (config.dataverseUrl) {
      process.env.DATAVERSE_INSTANCE = config.dataverseUrl
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
        logger.info(`Generating types for specified entities: ${entitiesToProcess.join(', ')}`)
      }
      
    } else if (config.publisher) {
      logger.info(`Discovering entities for publisher: ${config.publisher}`)
      const publisherEntities = await fetchPublisherEntities(config.publisher)
      entitiesToProcess = publisherEntities.map(e => e.LogicalName)
      logger.success(`Found ${entitiesToProcess.length} entities for publisher ${config.publisher}`)
      
    } else if (config.solution) {
      logger.info(`Discovering entities for solution: ${config.solution}`)
      const solutionEntities = await fetchSolutionEntities(config.solution)
      entitiesToProcess = solutionEntities.map(e => e.LogicalName)
      logger.success(`Found ${entitiesToProcess.length} entities for solution ${config.solution}`)
      
    } else {
      logger.warning('No specific entities, publisher, or solution specified. Use --entities, --publisher, or --solution to limit scope.')
      logger.info('Fetching all custom entities...')
      const allEntities = await fetchAllEntities({ customOnly: true })
      entitiesToProcess = allEntities.map(e => e.LogicalName)
      logger.info(`Found ${entitiesToProcess.length} custom entities`)
    }

    if (entitiesToProcess.length === 0) {
      logger.warning('No entities found to process')
      return
    }

    // Fetch only specified entities + related entities
    let processedEntities: ProcessedEntityMetadata[] = []
    let allEntitiesForLookup: ProcessedEntityMetadata[] = []
    
    logger.info(`Fetching metadata for ${entitiesToProcess.length} specified entities...`)
    
    for (let i = 0; i < entitiesToProcess.length; i++) {
      const entityName = entitiesToProcess[i]
      logger.progress(i + 1, entitiesToProcess.length, entityName)
        
      try {
        const rawMetadata = await fetchEntityMetadata(entityName, {
          includeAttributes: true,
          includeRelationships: true
        })
        
        if (rawMetadata) {
          // Apply special configuration for systemuser to exclude system audit relationships
          const processingOptions = rawMetadata.LogicalName === 'systemuser' 
            ? { excludeSystemAuditRelationships: true }
            : undefined
          
          const processed = processEntityMetadata(rawMetadata, processingOptions)
          processedEntities.push(processed)
          logger.verboseDebug(`Processed ${entityName} (${processed.attributes.length} attributes)`)
        } else {
          logger.warning(`Entity ${entityName} not found`)
        }
        
      } catch (error) {
        logger.error(`Failed to process ${entityName}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

      // Copy primary entities to allEntitiesForLookup
      allEntitiesForLookup = [...processedEntities]

      // Process related entities (always enabled in v1 for better type safety)
      if (processedEntities.length > 0) {
        logger.info(`Discovering related entities...`)
        
        // Collect all unique related entity logical names
        const relatedEntityNames = new Set<string>()
        const processedEntityNames = new Set(processedEntities.map(e => e.logicalName))
        
        
        // Ultra-fast approach: collect all targets first, then deduplicate in one pass
        const allTargets: string[] = []
        
        for (const entity of processedEntities) {
          const relationshipTargets = Object.values(entity.relatedEntities)
          
          // Just collect all targets - no Set operations in hot loop
          for (const relatedInfo of relationshipTargets) {
            allTargets.push(relatedInfo.targetEntityLogicalName)
          }
        }
        
        // Single pass deduplication - much faster than checking Sets repeatedly
        for (const targetName of allTargets) {
          if (!processedEntityNames.has(targetName)) {
            relatedEntityNames.add(targetName)
          }
        }
        
        
        if (relatedEntityNames.size > 0) {
          logger.info(`Found ${relatedEntityNames.size} related entities to process...`)
          
          const relatedEntityNamesArray = Array.from(relatedEntityNames)
          
          // Use the new batch processing with OR-filter optimization
          const relatedEntities = await fetchMultipleEntities(relatedEntityNamesArray, {
            includeAttributes: true,
            onProgress: ((current: number, total: number, entityName?: string) => {
              logger.progress(current, total, entityName)
            }) as ProgressCallback
          })
          
          // Process the batched results
          for (const rawMetadata of relatedEntities) {
            try {
              if (rawMetadata) {
                // Apply special configuration for systemuser to exclude system audit relationships
                const processingOptions = rawMetadata.LogicalName === 'systemuser' 
                  ? { excludeSystemAuditRelationships: true }
                  : undefined
                
                const processed = processEntityMetadata(rawMetadata, processingOptions)
                allEntitiesForLookup.push(processed)
                logger.verboseDebug(`Processed related entity ${rawMetadata.LogicalName} (${processed.attributes.length} attributes)`)
              }
              
            } catch (error) {
              logger.warning(`Failed to process related entity ${rawMetadata?.LogicalName || 'unknown'}: ${error instanceof Error ? error.message : String(error)}`)
            }
          }
          
          logger.success(`Successfully processed ${allEntitiesForLookup.length - processedEntities.length} related entities`)
        } else {
          logger.info('No related entities found to process')
        }
      }

    if (processedEntities.length === 0) {
      logger.error('No primary entities were successfully processed')
      process.exit(1)
    }

    // Generate TypeScript files
    if (config.dryRun) {
      logger.info(`Dry run: Would generate ${processedEntities.length} TypeScript files in ${config.outputDir}`)
      logger.info('Dry run summary:')
      for (const entity of processedEntities) {
        logger.info(`   - ${entity.logicalName}.${config.fileExtension} (${entity.attributes.length} attributes)`)
      }
      logger.success('Dry run completed successfully!')
      return
    }
    
    logger.info(`Generating TypeScript files in ${config.outputDir}...`)
    
    // Convert back to DataverseTypeGenConfig format and use the proper transformation  
    const baseConfig = await loadConfiguration(options.config as string)
    const finalDataverseConfig: DataverseTypeGenConfig = {
      ...baseConfig,
      // Override with any CLI options that were provided
      outputDir: config.outputDir,
      fileExtension: config.fileExtension,
      entities: entitiesToProcess.length > 0 ? entitiesToProcess : baseConfig.entities,
      publisher: config.publisher,
      solution: config.solution,
      fullMetadata: false, // Full metadata mode removed
      typeGeneration: {
        ...baseConfig.typeGeneration,
        includeComments: true, // Always include comments
        includeMetadata: true, // Always include metadata
        includeValidation: true, // Always include validation
        generateHooks: config.generateHooks,
      }
    }
    
    const codeGenConfig: Partial<CodeGenConfig> = toCodeGenConfig(finalDataverseConfig)
    
    // For the generate function, we need to separate primary entities from related entities
    // In full metadata mode, all entities except primary ones are "related entities"
    const relatedEntities = allEntitiesForLookup.filter(entity => 
      !processedEntities.some(primary => primary.logicalName === entity.logicalName)
    )
    
    const result = await generateMultipleEntityTypes(processedEntities, codeGenConfig, relatedEntities, (current, total, item) => {
      logger.progress(current, total, item)
    })
    
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
    const totalDurationMs = Date.now() - commandStartTime
    const stats = {
      totalFiles: result.totalFiles,
      successful: result.successfulFiles,
      failed: result.failedFiles,
      totalSizeKB: Math.round(result.totalSize / 1024),
      durationMs: totalDurationMs,
      codeGenDurationMs: result.duration  // Keep the original for debugging if needed
    }
    
    // Always use text format (JSON output removed)
    logger.info(`Generation Statistics:`)
    logger.info(`   │`)
    logger.info(`   - Total files: ${stats.totalFiles}`)
    logger.info(`   - Successful: [OK] ${stats.successful}`)
    logger.info(`   - Failed: ${stats.failed > 0 ? `❌ ${stats.failed}` : '✅ 0'}`)
    logger.info(`   - Total size: ${stats.totalSizeKB}KB`)
    logger.info(`   - Duration: ${(stats.durationMs / 1000).toFixed(1)}s`)
    
    // Log final API request statistics
    globalRequestQueue.logFinalStats()
    
    logger.success('Type generation completed successfully!')
    
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
    
    process.exit(1)
  }
}