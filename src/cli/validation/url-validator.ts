import { promises as fs } from 'fs'
import { resolve } from 'path'
import { SimpleLogger } from '../output/formatters.js'
import type { CLIConfig } from '../config/cli-config.js'

/**
 * Validate Dataverse URL format
 */
export function validateDataverseUrl(url: string): { isValid: boolean; message?: string } {
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
 * Validate CLI inputs before execution
 */
export async function validateInputs(config: CLIConfig, logger: SimpleLogger): Promise<void> {
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