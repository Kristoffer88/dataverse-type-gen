import { clearCache, getCacheStatus, cleanupExpiredCache } from '../../cache/index.js'
import { SimpleLogger } from '../output/formatters.js'

/**
 * Cache status command implementation
 */
export async function cacheStatusCommand(options: Record<string, unknown>): Promise<void> {
  const loggerOptions = {
    verbose: Boolean(options.verbose),
    debug: Boolean(options.debug),
    outputFormat: (options.outputFormat as 'text' | 'json') || 'text'
  }
  const logger = new SimpleLogger(loggerOptions)
  
  try {
    logger.info('📊 Cache Status')
    
    const status = await getCacheStatus()
    
    if (loggerOptions.outputFormat === 'json') {
      const output = logger.getJsonOutput()
      output.push({ level: 'cache_status', ...status, timestamp: new Date().toISOString() })
    } else {
      logger.info(`   │`)
      logger.info(`   ├─ Enabled: ${status.enabled ? '✅ Yes' : '❌ No'}`)
      logger.info(`   ├─ Cache directory: ${status.cacheDir}`)
      logger.info(`   ├─ Files: ${status.fileCount}`)
      logger.info(`   ├─ Total size: ${Math.round(status.totalSize / 1024)}KB`)
      
      if (status.oldestFile) {
        logger.info(`   ├─ Oldest file: ${status.oldestFile.name} (${status.oldestFile.age})`)
      }
      
      if (status.newestFile) {
        logger.info(`   └─ Newest file: ${status.newestFile.name} (${status.newestFile.age})`)
      } else {
        logger.info(`   └─ No files found`)
      }
    }
    
    if (!status.enabled) {
      logger.info('')
      logger.info('💡 To enable caching, set: export DATAVERSE_CACHE_ENABLED=true')
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
 * Cache clear command implementation
 */
export async function cacheClearCommand(options: Record<string, unknown>): Promise<void> {
  const loggerOptions = {
    verbose: Boolean(options.verbose),
    debug: Boolean(options.debug),
    outputFormat: (options.outputFormat as 'text' | 'json') || 'text'
  }
  const logger = new SimpleLogger(loggerOptions)
  
  try {
    logger.info('🗑️  Clearing cache...')
    
    await clearCache()
    
    logger.success('Cache cleared successfully')
    
  } catch (error) {
    logger.error(`Failed to clear cache: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  } finally {
    if (loggerOptions.outputFormat === 'json') {
      logger.outputJson()
    }
  }
}

/**
 * Cache cleanup command implementation
 */
export async function cacheCleanupCommand(options: Record<string, unknown>): Promise<void> {
  const loggerOptions = {
    verbose: Boolean(options.verbose),
    debug: Boolean(options.debug),
    outputFormat: (options.outputFormat as 'text' | 'json') || 'text'
  }
  const logger = new SimpleLogger(loggerOptions)
  
  try {
    logger.info('🧹 Cleaning up expired cache files...')
    
    const removedCount = await cleanupExpiredCache()
    
    if (removedCount > 0) {
      logger.success(`Removed ${removedCount} expired cache files`)
    } else {
      logger.info('No expired cache files found')
    }
    
  } catch (error) {
    logger.error(`Failed to cleanup cache: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  } finally {
    if (loggerOptions.outputFormat === 'json') {
      logger.outputJson()
    }
  }
}