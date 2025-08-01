import type { DataverseTypeGenConfig } from '../../config/index.js'

/**
 * CLI configuration interface
 */
export interface CLIConfig {
  dataverseUrl?: string
  outputDir: string
  entities?: string[] | string
  publisher?: string
  solution?: string
  fileExtension: '.ts' | '.d.ts'
  includeComments: boolean
  includeMetadata: boolean
  includeValidation: boolean
  fullMetadata: boolean
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
export const DEFAULT_CLI_CONFIG: CLIConfig = {
  outputDir: './generated',
  fileExtension: '.ts',
  includeComments: true,
  includeMetadata: true,
  includeValidation: true,
  fullMetadata: false, // Default to false for performance
  overwrite: true,
  verbose: false,
  debug: false,
  quiet: false,
  dryRun: false,
  outputFormat: 'text'
}

/**
 * Convert DataverseTypeGenConfig to CLI-compatible format
 */
export function convertToCliConfig(config: DataverseTypeGenConfig): Partial<CLIConfig> {
  return {
    dataverseUrl: config.dataverseUrl,
    outputDir: config.outputDir,
    entities: config.entities,
    publisher: config.publisher,
    solution: config.solution,
    fileExtension: config.fileExtension,
    includeComments: config.typeGeneration.includeComments ?? true,
    includeMetadata: config.typeGeneration.includeMetadata ?? true,
    includeValidation: config.typeGeneration.includeValidation ?? true,
    fullMetadata: config.fullMetadata ?? false,
    overwrite: true, // Always overwrite for CLI
    verbose: false,
    debug: false,
    quiet: false,
    dryRun: false,
    outputFormat: 'text'
  }
}