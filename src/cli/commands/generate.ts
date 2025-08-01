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
import { promptForDataverseUrl } from '../prompts/user-prompts.js'
import { DEFAULT_CLI_CONFIG, convertToCliConfig, type CLIConfig } from '../config/cli-config.js'

/**
 * Generate command implementation
 */
export async function generateCommand(options: Record<string, unknown>): Promise<void> {
  const commandStartTime = Date.now()
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
    
    // Load configuration using the proper config system (unless --no-config-file is specified)
    const skipConfigFile = options.configFile === false
    if (skipConfigFile) {
      logger.debugLog('⚠️  Skipping configuration file loading (--no-config-file)')
    }
    
    let configFromFile: Partial<CLIConfig>
    if (skipConfigFile) {
      configFromFile = {} // Empty config when skipping config file - use only defaults + CLI
    } else {
      const loadedConfig = await loadConfiguration(options.config as string)
      configFromFile = convertToCliConfig(loadedConfig)
    }
    
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
    
    // Parse CLI-specific options that need type conversion
    if (options.fullMetadata !== undefined) {
      config.fullMetadata = Boolean(options.fullMetadata)
    }
    
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

    // Determine entity processing strategy
    let processedEntities: ProcessedEntityMetadata[] = []
    let allEntitiesForLookup: ProcessedEntityMetadata[] = []
    
    if (config.fullMetadata) {
      // FULL METADATA APPROACH: Fetch ALL entities for complete type safety
      logger.info(`🌍 Using full metadata mode - fetching ALL entities for complete type safety...`)
      logger.info(`⚠️  This will take several minutes due to API rate limiting (respecting Dataverse limits)`)
      
      const allEntityMetadata = await fetchAllEntityMetadata({
        includeAttributes: true,
        includeRelationships: true,
        onProgress: (current, total, entityName) => {
          if (!loggerOptions.quiet) {
            logger.progress(current, total, `Fetching: ${entityName}`)
          }
        }
      })
      
      // Process all entities
      logger.info(`📝 Processing ${allEntityMetadata.length} entities...`)
      for (let i = 0; i < allEntityMetadata.length; i++) {
        const entityMetadata = allEntityMetadata[i]
        if (!loggerOptions.quiet && (i % 25 === 0 || i === allEntityMetadata.length - 1)) { // Show progress every 25 entities
          logger.progress(i + 1, allEntityMetadata.length, entityMetadata.LogicalName)
        }
        
        try {
          // Apply special configuration for systemuser to exclude system audit relationships
          const processingOptions = entityMetadata.LogicalName === 'systemuser' 
            ? { excludeSystemAuditRelationships: true }
            : undefined
          
          const processed = processEntityMetadata(entityMetadata, processingOptions)
          allEntitiesForLookup.push(processed)
          
          // Keep track of primary entities (the ones user specifically requested)
          if (entitiesToProcess.includes(entityMetadata.LogicalName)) {
            processedEntities.push(processed)
          }
          
        } catch (error) {
          logger.warning(`Failed to process ${entityMetadata.LogicalName}: ${error instanceof Error ? error.message : String(error)}`)
        }
      }
      
      logger.success(`Successfully processed ${allEntitiesForLookup.length} total entities (${processedEntities.length} primary entities)`)
      
    } else {
      // ORIGINAL APPROACH: Fetch only specified entities + related entities if enabled
      logger.info(`📥 Fetching metadata for ${entitiesToProcess.length} specified entities...`)
      
      for (let i = 0; i < entitiesToProcess.length; i++) {
        const entityName = entitiesToProcess[i]
        if (!loggerOptions.quiet) {
          logger.progress(i + 1, entitiesToProcess.length, entityName)
        }
        
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
            logger.verboseDebug(`✅ Processed ${entityName} (${processed.attributes.length} attributes)`)
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
        logger.info(`🔗 Discovering related entities...`)
        
        // Collect all unique related entity logical names
        const relatedEntityNames = new Set<string>()
        const processedEntityNames = new Set(processedEntities.map(e => e.logicalName))
        
        for (const entity of processedEntities) {
          Object.values(entity.relatedEntities).forEach(relatedInfo => {
            // Only add if not already processed as a primary entity
            if (!processedEntityNames.has(relatedInfo.targetEntityLogicalName) && 
                !relatedEntityNames.has(relatedInfo.targetEntityLogicalName)) {
              relatedEntityNames.add(relatedInfo.targetEntityLogicalName)
            }
          })
        }
        
        if (relatedEntityNames.size > 0) {
          logger.info(`📥 Found ${relatedEntityNames.size} related entities to process...`)
          
          const relatedEntityNamesArray = Array.from(relatedEntityNames)
          
          // Use the new batch processing with OR-filter optimization
          const relatedEntities = await fetchMultipleEntities(relatedEntityNamesArray, {
            includeAttributes: true,
            onProgress: loggerOptions.quiet ? undefined : ((current: number, total: number, entityName?: string) => {
              logger.progress(current, total, `Related: ${entityName}`)
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
                logger.verboseDebug(`✅ Processed related entity ${rawMetadata.LogicalName} (${processed.attributes.length} attributes)`)
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
    }

    if (processedEntities.length === 0) {
      logger.error('No primary entities were successfully processed')
      process.exit(1)
    }

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
    
    // Convert back to DataverseTypeGenConfig format and use the proper transformation  
    const baseConfig = skipConfigFile ? DEFAULT_CONFIG : await loadConfiguration(options.config as string)
    const finalDataverseConfig: DataverseTypeGenConfig = {
      ...baseConfig,
      // Override with any CLI options that were provided
      outputDir: config.outputDir,
      fileExtension: config.fileExtension,
      entities: entitiesToProcess.length > 0 ? entitiesToProcess : baseConfig.entities,
      publisher: config.publisher,
      solution: config.solution,
      fullMetadata: config.fullMetadata,
      typeGeneration: {
        ...baseConfig.typeGeneration,
        includeComments: config.includeComments,
        includeMetadata: config.includeMetadata,
        includeValidation: config.includeValidation,
      }
    }
    
    const codeGenConfig: Partial<CodeGenConfig> = toCodeGenConfig(finalDataverseConfig)
    
    // For the generate function, we need to separate primary entities from related entities
    // In full metadata mode, all entities except primary ones are "related entities"
    const relatedEntities = allEntitiesForLookup.filter(entity => 
      !processedEntities.some(primary => primary.logicalName === entity.logicalName)
    )
    
    const result = await generateMultipleEntityTypes(processedEntities, codeGenConfig, relatedEntities, (current, total, item) => {
      if (!loggerOptions.quiet) {
        logger.progress(current, total, item)
      }
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
      logger.info(`   └─ Duration: ${(stats.durationMs / 1000).toFixed(1)}s`)
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