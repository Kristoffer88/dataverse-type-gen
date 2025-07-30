import type { TypeGenerationOptions } from '../generators/index.js'

// Re-export all main functions
export { generateMultipleEntityTypes, DEFAULT_CODEGEN_CONFIG } from './orchestrator.js'
export { 
  writeGlobalOptionSetDeclaration,
  writeEntityHooksFile,
  writeEntityQueryBuildersFile,
  writeEntityTypeDeclaration,
  writeQueryTypesFile
} from './file-writer.js'
export { 
  isPrimaryEntity,
  getEntityDirectory,
  createOutputDirectory,
  cleanGeneratedFiles,
  getGeneratedFileStats
} from './directory-manager.js'
export { 
  combineGeneratedCode,
  formatCode,
  validateGeneratedCode
} from './formatter.js'
export { 
  generateIndexFile,
  calculateGenerationResults
} from './result-tracking.js'

/**
 * Code generation configuration
 */
export interface CodeGenConfig {
  outputDir: string
  fileExtension: '.ts' | '.d.ts'
  indexFile: boolean
  prettier: boolean
  eslint: boolean
  overwrite: boolean
  generateHooks: boolean
  relatedEntitiesDir?: string
  primaryEntities?: string[]
  typeGenerationOptions: TypeGenerationOptions
  debug?: boolean
}

/**
 * Generated file result
 */
export interface GeneratedFileResult {
  filePath: string
  content: string
  size: number
  success: boolean
  error?: string
}

/**
 * Code generation session result
 */
export interface CodeGenResult {
  files: GeneratedFileResult[]
  indexFile?: GeneratedFileResult
  totalFiles: number
  successfulFiles: number
  failedFiles: number
  totalSize: number
  duration: number
}


















