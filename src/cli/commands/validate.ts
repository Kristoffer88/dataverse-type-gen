import { fetchAllEntities } from '../../client/index.js'
import { loadConfiguration } from '../../config/index.js'
import { SimpleLogger } from '../output/formatters.js'

/**
 * Validate command implementation
 */
export async function validateCommand(options: Record<string, unknown>): Promise<void> {
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
    try {
      const dataverseConfig = await loadConfiguration(options.config as string)
      logger.success('Configuration file loaded successfully')
      
      if (options.verbose) {
        logger.verboseDebug(`Configuration: ${JSON.stringify(dataverseConfig, null, 2)}`)
      }
    } catch (error) {
      logger.info(`No configuration file found (using defaults): ${error instanceof Error ? error.message : String(error)}`)
    }
    
    logger.success('🎉 Validation completed successfully!')
    
  } catch (error) {
    logger.error(`Validation failed: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  }
}