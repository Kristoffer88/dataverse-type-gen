import { clearMemoryCache, getMemoryCacheStatus } from '../../cache/index.js'
import { SimpleLogger } from '../output/formatters.js'

/**
 * Cache status command implementation - shows in-memory cache status only
 */
export async function cacheStatusCommand(options: Record<string, unknown>): Promise<void> {
  const loggerOptions = {
    verbose: Boolean(options.verbose),
    debug: Boolean(options.debug),
    outputFormat: (options.outputFormat as 'text' | 'json') || 'text'
  }
  const logger = new SimpleLogger(loggerOptions)
  
  try {
    logger.info('Memory Cache Status')
    
    const status = getMemoryCacheStatus()
    
    if (loggerOptions.outputFormat === 'json') {
      const output = logger.getJsonOutput()
      output.push({ level: 'cache_status', ...status, timestamp: new Date().toISOString() })
    } else {
      logger.info(`   |`)
      logger.info(`   - Type: In-memory only`)
      logger.info(`   - Entries: ${status.entryCount}`)
      logger.info(`   - Session cache (cleared on restart)`)
    }
    
  } catch (error) {
    logger.error(`Failed to get cache status: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  } finally {
    if (loggerOptions.outputFormat === 'json') {
      logger.outputJson()
    }
  }
}

/**
 * Cache clear command implementation - clears in-memory cache only
 */
export async function cacheClearCommand(options: Record<string, unknown>): Promise<void> {
  const loggerOptions = {
    verbose: Boolean(options.verbose),
    debug: Boolean(options.debug),
    outputFormat: (options.outputFormat as 'text' | 'json') || 'text'
  }
  const logger = new SimpleLogger(loggerOptions)
  
  try {
    logger.info('[CLEAR] Clearing memory cache...')
    
    const clearedCount = clearMemoryCache()
    
    logger.success(`Cleared ${clearedCount} entries from memory cache`)
    
  } catch (error) {
    logger.error(`Failed to clear cache: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  } finally {
    if (loggerOptions.outputFormat === 'json') {
      logger.outputJson()
    }
  }
}