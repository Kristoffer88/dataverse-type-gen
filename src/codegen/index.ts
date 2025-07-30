import { promises as fs } from 'fs'
import { join, dirname, relative } from 'path'
import { fileURLToPath } from 'url'
import { Project, ScriptTarget, ModuleKind } from 'ts-morph'
import type { GeneratedCode, TypeGenerationOptions } from '../generators/index.js'
import { generateEntityFile, generateImports, generateGlobalOptionSetFile } from '../generators/index.js'
import { generateEntityHooks, generateEntityHooksFile, generateEntityQueryBuildersFile } from '../generators/query-hooks.js'
import type { ProcessedEntityMetadata, ProcessedOptionSet } from '../processors/index.js'

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

/**
 * Default code generation configuration
 */
const DEFAULT_CONFIG: CodeGenConfig = {
  outputDir: './generated',
  fileExtension: '.ts',
  indexFile: true,
  prettier: true,
  eslint: false,
  overwrite: true,
  generateHooks: true,
  relatedEntitiesDir: 'related',
  primaryEntities: [],
  typeGenerationOptions: {
    includeComments: true,
    includeValidation: true,
    includeMetadata: true,
    useExactTypes: true
  }
}

/**
 * Helper function to determine if an entity is a primary entity
 */
function isPrimaryEntity(entityLogicalName: string, primaryEntities: string[] = []): boolean {
  return primaryEntities.includes(entityLogicalName)
}

/**
 * Helper function to get the correct directory path for an entity
 */
function getEntityDirectory(entityLogicalName: string, config: CodeGenConfig): string {
  // Check if directory organization should be enabled
  const shouldOrganizeDirectories = config.relatedEntitiesDir && 
    (config.typeGenerationOptions.nestedExpand || config.primaryEntities?.length);
  
  if (!shouldOrganizeDirectories || isPrimaryEntity(entityLogicalName, config.primaryEntities)) {
    return config.outputDir // Primary entities go in root
  }
  return join(config.outputDir, config.relatedEntitiesDir!) // Related entities go in subdirectory
}

/**
 * Write TypeScript declaration file for a global option set
 */
export async function writeGlobalOptionSetDeclaration(
  optionSet: ProcessedOptionSet,
  config: Partial<CodeGenConfig> = {}
): Promise<GeneratedFileResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  try {
    // Generate the code
    const content = generateGlobalOptionSetFile(optionSet, finalConfig.typeGenerationOptions)
    
    // Format the code if prettier is enabled
    const formattedContent = finalConfig.prettier 
      ? await formatCode(content)
      : content

    // Determine file path - create in global-choices subdirectory
    const fileName = `${optionSet.name.toLowerCase()}${finalConfig.fileExtension}`
    const filePath = join(finalConfig.outputDir, 'global-choices', fileName)

    // Ensure output directory exists
    await fs.mkdir(dirname(filePath), { recursive: true })

    // Check if file exists and overwrite setting
    if (!finalConfig.overwrite) {
      try {
        await fs.access(filePath)
        return {
          filePath,
          content: formattedContent,
          size: Buffer.byteLength(formattedContent, 'utf8'),
          success: false,
          error: 'File exists and overwrite is disabled'
        }
      } catch {
        // File doesn't exist, proceed with writing
      }
    }

    // Write the file
    await fs.writeFile(filePath, formattedContent, 'utf8')

    return {
      filePath,
      content: formattedContent,
      size: Buffer.byteLength(formattedContent, 'utf8'),
      success: true
    }

  } catch (error) {
    return {
      filePath: join(finalConfig.outputDir, 'global-choices', `${optionSet.name.toLowerCase()}${finalConfig.fileExtension}`),
      content: '',
      size: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

/**
 * Write React Query hooks file for an entity
 */
export async function writeEntityHooksFile(
  entityMetadata: ProcessedEntityMetadata,
  config: Partial<CodeGenConfig> = {}
): Promise<GeneratedFileResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  try {
    // Generate the actual hooks content first
    const hooksContent = generateEntityHooks(entityMetadata, finalConfig.typeGenerationOptions)
    
    // Generate the complete hooks file with header and content
    const content = generateEntityHooksFile(entityMetadata, finalConfig.typeGenerationOptions, hooksContent)
    
    // Format the code if prettier is enabled
    const formattedContent = finalConfig.prettier 
      ? await formatCode(content)
      : content

    // Determine file path - hooks files go in hooks subdirectory with related entities in hooks/related
    const fileName = `${entityMetadata.logicalName}.hooks${finalConfig.fileExtension}`
    const hooksBaseDir = join(finalConfig.outputDir, 'hooks')
    
    // Check if directory organization should be enabled
    const shouldOrganizeDirectories = finalConfig.relatedEntitiesDir && 
      (finalConfig.typeGenerationOptions.nestedExpand || finalConfig.primaryEntities?.length);
    
    // Directory structure logic is working correctly
    
    const hooksDir = !shouldOrganizeDirectories || isPrimaryEntity(entityMetadata.logicalName, finalConfig.primaryEntities) 
      ? hooksBaseDir 
      : join(hooksBaseDir, finalConfig.relatedEntitiesDir || 'related')
    const filePath = join(hooksDir, fileName)

    // Ensure output directory exists
    await fs.mkdir(dirname(filePath), { recursive: true })

    // Check if file exists and overwrite setting
    if (!finalConfig.overwrite) {
      try {
        await fs.access(filePath)
        return {
          filePath,
          content: formattedContent,
          size: Buffer.byteLength(formattedContent, 'utf8'),
          success: false,
          error: 'File exists and overwrite is disabled'
        }
      } catch {
        // File doesn't exist, proceed with writing
      }
    }

    // Write the file
    await fs.writeFile(filePath, formattedContent, 'utf8')

    return {
      filePath,
      content: formattedContent,
      size: Buffer.byteLength(formattedContent, 'utf8'),
      success: true
    }

  } catch (error) {
    const hooksBaseDir = join(finalConfig.outputDir, 'hooks')
    
    // Check if directory organization should be enabled
    const shouldOrganizeDirectories = finalConfig.relatedEntitiesDir && 
      (finalConfig.typeGenerationOptions.nestedExpand || finalConfig.primaryEntities?.length);
    
    const hooksDir = !shouldOrganizeDirectories || isPrimaryEntity(entityMetadata.logicalName, finalConfig.primaryEntities) 
      ? hooksBaseDir 
      : join(hooksBaseDir, finalConfig.relatedEntitiesDir || 'related')
    return {
      filePath: join(hooksDir, `${entityMetadata.logicalName}.hooks${finalConfig.fileExtension}`),
      content: '',
      size: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}


/**
 * Write query builders file for an entity
 */
export async function writeEntityQueryBuildersFile(
  entityMetadata: ProcessedEntityMetadata,
  config: Partial<CodeGenConfig> = {}
): Promise<GeneratedFileResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  try {
    // Generate the query builders code
    const content = generateEntityQueryBuildersFile(entityMetadata, finalConfig.typeGenerationOptions)
    
    // Format the code if prettier is enabled
    const formattedContent = finalConfig.prettier 
      ? await formatCode(content)
      : content

    // Determine file path - query builders files go in queries subdirectory with related entities in queries/related
    const fileName = `${entityMetadata.logicalName}.queries${finalConfig.fileExtension}`
    const queriesBaseDir = join(finalConfig.outputDir, 'queries')
    
    // Check if directory organization should be enabled
    const shouldOrganizeDirectories = finalConfig.relatedEntitiesDir && 
      (finalConfig.typeGenerationOptions.nestedExpand || finalConfig.primaryEntities?.length);
    
    const queriesDir = !shouldOrganizeDirectories || isPrimaryEntity(entityMetadata.logicalName, finalConfig.primaryEntities) 
      ? queriesBaseDir 
      : join(queriesBaseDir, finalConfig.relatedEntitiesDir || 'related')
    const filePath = join(queriesDir, fileName)

    // Ensure output directory exists
    await fs.mkdir(dirname(filePath), { recursive: true })

    // Check if file exists and overwrite setting
    if (!finalConfig.overwrite) {
      try {
        await fs.access(filePath)
        return {
          filePath,
          content: formattedContent,
          size: Buffer.byteLength(formattedContent, 'utf8'),
          success: false,
          error: 'File exists and overwrite is disabled'
        }
      } catch {
        // File doesn't exist, proceed with writing
      }
    }

    // Write the file
    await fs.writeFile(filePath, formattedContent, 'utf8')

    return {
      filePath,
      content: formattedContent,
      size: Buffer.byteLength(formattedContent, 'utf8'),
      success: true
    }

  } catch (error) {
    const queriesBaseDir = join(finalConfig.outputDir, 'queries')
    
    // Check if directory organization should be enabled
    const shouldOrganizeDirectories = finalConfig.relatedEntitiesDir && 
      (finalConfig.typeGenerationOptions.nestedExpand || finalConfig.primaryEntities?.length);
    
    const queriesDir = !shouldOrganizeDirectories || isPrimaryEntity(entityMetadata.logicalName, finalConfig.primaryEntities) 
      ? queriesBaseDir 
      : join(queriesBaseDir, finalConfig.relatedEntitiesDir || 'related')
    return {
      filePath: join(queriesDir, `${entityMetadata.logicalName}.queries${finalConfig.fileExtension}`),
      content: '',
      size: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

/**
 * Write TypeScript declaration file for an entity
 */
export async function writeEntityTypeDeclaration(
  entityMetadata: ProcessedEntityMetadata,
  config: Partial<CodeGenConfig> = {},
  allEntities: ProcessedEntityMetadata[] = []
): Promise<GeneratedFileResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  try {
    // Generate the code
    const generatedCode = generateEntityFile(entityMetadata, finalConfig.typeGenerationOptions, allEntities)
    
    // Combine all parts into final content
    const content = combineGeneratedCode(generatedCode)
    
    // Format the code if prettier is enabled
    const formattedContent = finalConfig.prettier 
      ? await formatCode(content)
      : content

    // Determine file path - primary entities in root, related entities in subdirectory
    const fileName = `${entityMetadata.schemaName.toLowerCase()}${finalConfig.fileExtension}`
    const entityDir = getEntityDirectory(entityMetadata.logicalName, finalConfig)
    const filePath = join(entityDir, fileName)

    // Ensure output directory exists
    await fs.mkdir(dirname(filePath), { recursive: true })

    // Check if file exists and overwrite setting
    if (!finalConfig.overwrite) {
      try {
        await fs.access(filePath)
        return {
          filePath,
          content: formattedContent,
          size: Buffer.byteLength(formattedContent, 'utf8'),
          success: false,
          error: 'File exists and overwrite is disabled'
        }
      } catch {
        // File doesn't exist, proceed with writing
      }
    }

    // Write the file
    await fs.writeFile(filePath, formattedContent, 'utf8')

    return {
      filePath,
      content: formattedContent,
      size: Buffer.byteLength(formattedContent, 'utf8'),
      success: true
    }

  } catch (error) {
    const entityDir = getEntityDirectory(entityMetadata.logicalName, finalConfig)
    return {
      filePath: join(entityDir, `${entityMetadata.schemaName.toLowerCase()}${finalConfig.fileExtension}`),
      content: '',
      size: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

/**
 * Generate TypeScript declarations for multiple entities with optional related entities
 */
export async function generateMultipleEntityTypes(
  entities: ProcessedEntityMetadata[],
  config: Partial<CodeGenConfig> = {},
  relatedEntities: ProcessedEntityMetadata[] = []
): Promise<CodeGenResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const startTime = Date.now()
  
  const results: GeneratedFileResult[] = []
  
  // Combine primary and related entities for processing
  const allEntities = [...entities, ...relatedEntities]
  
  console.log(`📝 Generating ${entities.length} primary entity files${relatedEntities.length > 0 ? ` + ${relatedEntities.length} related entity files` : ''}...`)
  
  // Collect all unique global option sets from all entities
  const globalOptionSetsMap = new Map<string, ProcessedOptionSet>()
  
  for (const entity of allEntities) {
    for (const optionSet of entity.optionSets) {
      if (optionSet.isGlobal && !globalOptionSetsMap.has(optionSet.name)) {
        globalOptionSetsMap.set(optionSet.name, optionSet)
      }
    }
  }
  
  const globalOptionSets = Array.from(globalOptionSetsMap.values())
  
  
  // Generate global option set files
  if (globalOptionSets.length > 0) {
    const globalOptionSetPromises = globalOptionSets.map(optionSet => 
      writeGlobalOptionSetDeclaration(optionSet, finalConfig)
    )
    
    const globalOptionSetResults = await Promise.all(globalOptionSetPromises)
    results.push(...globalOptionSetResults)
  }
  
  // Only generate hooks for primary entities requested by the user
  // Related entities get type definitions but not hooks/queries
  const entitiesNeedingHooks = new Set<ProcessedEntityMetadata>()
  
  if (finalConfig.generateHooks) {
    // Only add primary entities - no hooks for related entities
    entities.forEach(entity => entitiesNeedingHooks.add(entity))
    
    console.log(`🔗 Generating ${entities.length} hooks for primary entities only...`)
  }
  
  // Process entities in batches to avoid overwhelming the system
  const batchSize = 5
  for (let i = 0; i < allEntities.length; i += batchSize) {
    const batch = allEntities.slice(i, i + batchSize)
    
    // Generate type declarations
    const typePromises = batch.map(entity => 
      writeEntityTypeDeclaration(entity, finalConfig, allEntities)
    )
    
    // Generate hooks for entities that need them (primary + related entities referenced in hooks)
    const entitiesNeedingHooksInBatch = batch.filter(entity => entitiesNeedingHooks.has(entity))
    const hookPromises = finalConfig.generateHooks 
      ? entitiesNeedingHooksInBatch.map(entity => writeEntityHooksFile(entity, finalConfig))
      : []
    
    // Generate query builders for entities that have hooks
    const queryBuilderPromises = finalConfig.generateHooks 
      ? entitiesNeedingHooksInBatch.map(entity => writeEntityQueryBuildersFile(entity, finalConfig))
      : []
    
    const batchResults = await Promise.all([...typePromises, ...hookPromises, ...queryBuilderPromises])
    results.push(...batchResults)
    
    // Small delay between batches to be respectful to the system
    if (i + batchSize < allEntities.length) {
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }

  // Generate query-types file if hooks are enabled
  if (finalConfig.generateHooks) {
    const queryTypesResult = await writeQueryTypesFile(finalConfig)
    results.push(queryTypesResult)
  }

  // Generate index file if requested
  let indexFile: GeneratedFileResult | undefined
  if (finalConfig.indexFile) {
    // Only include entity files in the main index, not global option sets
    const entityFiles = results.filter(r => r.success && !r.filePath.includes('global-choices'))
    indexFile = await generateIndexFile(entityFiles, finalConfig)
  }

  const duration = Date.now() - startTime
  const successfulFiles = results.filter(r => r.success).length
  const failedFiles = results.length - successfulFiles
  const totalSize = results.reduce((sum, r) => sum + r.size, 0)

  return {
    files: results,
    indexFile,
    totalFiles: results.length,
    successfulFiles,
    failedFiles,
    totalSize,
    duration
  }
}

/**
 * Generate barrel export index file
 */
async function generateIndexFile(
  successfulFiles: GeneratedFileResult[],
  config: CodeGenConfig
): Promise<GeneratedFileResult> {
  try {
    const lines: string[] = []
    
    // Add file header
    lines.push('// Generated barrel exports')
    lines.push(`// Generated: ${new Date().toISOString()}`)
    lines.push(`// Files: ${successfulFiles.length}`)
    lines.push('')

    // Add exports for each successful file
    for (const file of successfulFiles) {
      // Get relative path from output directory
      const relativePath = relative(config.outputDir, file.filePath)
      const exportPath = relativePath.replace(/\.(ts|d\.ts)$/, '')
      lines.push(`export * from './${exportPath}'`)
    }

    const content = lines.join('\n') + '\n'
    const formattedContent = config.prettier 
      ? await formatCode(content)
      : content

    const indexPath = join(config.outputDir, `index${config.fileExtension}`)
    
    await fs.writeFile(indexPath, formattedContent, 'utf8')

    return {
      filePath: indexPath,
      content: formattedContent,
      size: Buffer.byteLength(formattedContent, 'utf8'),
      success: true
    }

  } catch (error) {
    return {
      filePath: join(config.outputDir, `index${config.fileExtension}`),
      content: '',
      size: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

/**
 * Combine generated code parts into final content
 */
function combineGeneratedCode(code: GeneratedCode): string {
  const parts: string[] = []

  // Add imports
  if (code.imports.length > 0) {
    parts.push(generateImports(code.imports))
  }

  // Add constants (option sets)
  if (code.constants.trim()) {
    parts.push(code.constants)
    parts.push('')
  }

  // Add interfaces
  if (code.interfaces.trim()) {
    parts.push(code.interfaces)
    parts.push('')
  }

  // Add utility types
  if (code.types.trim()) {
    parts.push(code.types)
    parts.push('')
  }

  // Add metadata
  if (code.metadata?.trim()) {
    parts.push(code.metadata)
    parts.push('')
  }

  // Add validation
  if (code.validation?.trim()) {
    parts.push(code.validation)
  }

  return parts.join('\n').trim() + '\n'
}

/**
 * Format TypeScript code using ts-morph for proper TypeScript formatting
 */
async function formatCode(code: string): Promise<string> {
  try {
    // Create a temporary ts-morph project for formatting
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ScriptTarget.ES2020,
        module: ModuleKind.ES2020,
        declaration: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        skipLibCheck: true
      }
    })

    // Create a temporary source file with the code
    const sourceFile = project.createSourceFile('temp.ts', code)
    
    // Format the code using ts-morph's formatting capabilities
    sourceFile.formatText({
      ensureNewLineAtEndOfFile: true,
      insertSpaceAfterCommaDelimiter: true,
      insertSpaceAfterSemicolonInForStatements: true,
      insertSpaceBeforeAndAfterBinaryOperators: true,
      insertSpaceAfterConstructor: false,
      insertSpaceAfterKeywordsInControlFlowStatements: true,
      insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
      insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
      insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
      insertSpaceBeforeFunctionParenthesis: false,
      placeOpenBraceOnNewLineForFunctions: false,
      placeOpenBraceOnNewLineForControlBlocks: false,
      insertSpaceBeforeTypeAnnotation: false,
      insertSpaceAfterTypeAssertion: true
    })

    // Get the formatted text
    const formattedCode = sourceFile.getFullText()
    
    // Clean up the project
    project.removeSourceFile(sourceFile)

    return formattedCode
  } catch (error) {
    // Fallback to basic formatting if ts-morph formatting fails
    console.warn('ts-morph formatting failed, falling back to basic formatting:', error)
    return code
      .replace(/\n\n\n+/g, '\n\n') // Remove excessive newlines
      .replace(/^\s*\n/gm, '\n') // Remove empty lines with whitespace
      .replace(/\s+$/gm, '') // Remove trailing whitespace
      .trim() + '\n'
  }
}

/**
 * Validate generated TypeScript code using ts-morph compiler integration
 */
export async function validateGeneratedCode(
  filePath: string
): Promise<{ isValid: boolean; errors: string[]; warnings: string[] }> {
  try {
    const content = await fs.readFile(filePath, 'utf8')
    const errors: string[] = []
    const warnings: string[] = []

    // Basic content validation
    if (!content.trim()) {
      errors.push('File is empty')
      return { isValid: false, errors, warnings }
    }

    // Use ts-morph for comprehensive TypeScript validation
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ScriptTarget.ES2020,
        module: ModuleKind.ES2020,
        declaration: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        skipLibCheck: true,
        noUnusedLocals: false, // Don't warn about unused variables in generated code
        noUnusedParameters: false,
        noResolve: true, // Don't try to resolve imports - we're just validating syntax
        moduleResolution: undefined // Skip module resolution
      }
    })

    try {
      // Create source file and get diagnostics
      const sourceFile = project.createSourceFile(filePath, content)
      
      // Get semantic and syntactic diagnostics
      const diagnostics = sourceFile.getPreEmitDiagnostics()
      
      for (const diagnostic of diagnostics) {
        const message = diagnostic.getMessageText()
        const messageText = typeof message === 'string' ? message : message.getMessageText()
        const line = diagnostic.getLineNumber()
        const formattedMessage = line ? `Line ${line}: ${messageText}` : messageText

        // Skip module resolution errors in generated code
        if (messageText.includes("Cannot find module") || 
            messageText.includes("Module resolution") ||
            messageText.includes("moduleResolution")) {
          continue
        }

        // Categorize by severity
        const category = diagnostic.getCategory()
        if (category === 1) { // Error
          errors.push(formattedMessage)
        } else if (category === 0) { // Warning
          warnings.push(formattedMessage)
        }
      }

      // Additional validation checks
      const exports = sourceFile.getExportedDeclarations()
      if (exports.size === 0) {
        warnings.push('No exports found - file may not be usable as a module')
      }

      // Check for common issues in generated code
      const text = sourceFile.getFullText()
      if (text.includes('undefined')) {
        warnings.push('Contains "undefined" - may indicate incomplete generation')
      }

      project.removeSourceFile(sourceFile)
    } catch (compilerError) {
      errors.push(`TypeScript compilation error: ${compilerError instanceof Error ? compilerError.message : String(compilerError)}`)
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }

  } catch (error) {
    return {
      isValid: false,
      errors: [error instanceof Error ? error.message : String(error)],
      warnings: []
    }
  }
}

/**
 * Clean generated files
 */
export async function cleanGeneratedFiles(
  outputDir: string,
  pattern: string = '*.ts'
): Promise<{ deletedFiles: string[]; errors: string[] }> {
  const deletedFiles: string[] = []
  const errors: string[] = []

  try {
    // Read directory
    const files = await fs.readdir(outputDir)
    
    // Filter files by pattern (basic glob support)
    const targetFiles = files.filter(file => {
      if (pattern === '*.ts') {
        return file.endsWith('.ts')
      }
      if (pattern === '*.d.ts') {
        return file.endsWith('.d.ts')
      }
      return file.includes(pattern.replace('*', ''))
    })

    // Delete files
    for (const file of targetFiles) {
      try {
        const filePath = join(outputDir, file)
        await fs.unlink(filePath)
        deletedFiles.push(filePath)
      } catch (error) {
        errors.push(`Failed to delete ${file}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

  } catch (error) {
    errors.push(`Failed to read directory ${outputDir}: ${error instanceof Error ? error.message : String(error)}`)
  }

  return { deletedFiles, errors }
}

/**
 * Get statistics about generated files
 */
export async function getGeneratedFileStats(
  outputDir: string
): Promise<{
  totalFiles: number
  totalSize: number
  averageSize: number
  largestFile: { path: string; size: number } | null
  smallestFile: { path: string; size: number } | null
}> {
  try {
    const files = await fs.readdir(outputDir)
    const tsFiles = files.filter(f => f.endsWith('.ts') || f.endsWith('.d.ts'))
    
    if (tsFiles.length === 0) {
      return {
        totalFiles: 0,
        totalSize: 0,
        averageSize: 0,
        largestFile: null,
        smallestFile: null
      }
    }

    const fileStats: Array<{ path: string; size: number }> = []
    let totalSize = 0

    for (const file of tsFiles) {
      const filePath = join(outputDir, file)
      const stat = await fs.stat(filePath)
      const size = stat.size
      
      fileStats.push({ path: filePath, size })
      totalSize += size
    }

    fileStats.sort((a, b) => a.size - b.size)

    return {
      totalFiles: tsFiles.length,
      totalSize,
      averageSize: Math.round(totalSize / tsFiles.length),
      largestFile: fileStats[fileStats.length - 1] || null,
      smallestFile: fileStats[0] || null
    }

  } catch {
    return {
      totalFiles: 0,
      totalSize: 0,
      averageSize: 0,
      largestFile: null,
      smallestFile: null
    }
  }
}

/**
 * Create output directory structure
 */
export async function createOutputDirectory(
  outputDir: string,
  subdirectories: string[] = []
): Promise<{ created: string[]; errors: string[] }> {
  const created: string[] = []
  const errors: string[] = []

  try {
    // Create main output directory
    await fs.mkdir(outputDir, { recursive: true })
    created.push(outputDir)

    // Create subdirectories
    for (const subdir of subdirectories) {
      try {
        const subdirPath = join(outputDir, subdir)
        await fs.mkdir(subdirPath, { recursive: true })
        created.push(subdirPath)
      } catch (error) {
        errors.push(`Failed to create subdirectory ${subdir}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

  } catch (error) {
    errors.push(`Failed to create output directory ${outputDir}: ${error instanceof Error ? error.message : String(error)}`)
  }

  return { created, errors }
}

/**
 * Generate and write query-types file
 */
async function writeQueryTypesFile(config: CodeGenConfig): Promise<GeneratedFileResult> {
  const fileName = `query-types${config.fileExtension}`
  const filePath = join(config.outputDir, fileName)
  
  try {
    // Read the source query-types file and generate output
    const queryTypesContent = await generateQueryTypesFile(config)
    
    await fs.mkdir(dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, queryTypesContent, 'utf8')
    
    const stats = await fs.stat(filePath)
    
    return {
      filePath,
      content: queryTypesContent,
      size: stats.size,
      success: true
    }
    
  } catch (error) {
    return {
      filePath,
      content: '',
      size: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

/**
 * Generate query-types file content
 */
async function generateQueryTypesFile(config: CodeGenConfig): Promise<string> {
  const { includeComments = true } = config.typeGenerationOptions
  
  // Read the source query types file
  const currentFile = fileURLToPath(import.meta.url)
  const currentDir = dirname(currentFile)
  const sourceQueryTypesPath = join(currentDir, '..', 'query', 'types.ts')
  let sourceContent: string
  
  try {
    sourceContent = await fs.readFile(sourceQueryTypesPath, 'utf8')
  } catch {
    // Fallback content if source file is not available
    sourceContent = generateFallbackQueryTypes()
  }
  
  const lines: string[] = []
  
  if (includeComments) {
    lines.push('/**')
    lines.push(' * Query Types for Dataverse OData Operations')
    lines.push(' * ')
    lines.push(' * Auto-generated type definitions for type-safe Dataverse queries.')
    lines.push(' * Provides full TypeScript support for filtering, selecting, expanding, and ordering.')
    lines.push(' * ')
    lines.push(` * @generated ${new Date().toISOString()}`)
    lines.push(' */')
    lines.push('')
  }
  
  // Process the source content to make it suitable for the generated output
  const processedContent = sourceContent
    .replace(/^import .*$/gm, '') // Remove import statements
    .replace(/^export \{ .* \}.*$/gm, '') // Remove export statements
    .replace(/\/\*\*[\s\S]*?\*\//g, '') // Remove existing JSDoc comments if not including comments
    .replace(/^\s*\n/gm, '') // Remove empty lines
    .trim()
  
  lines.push(processedContent)
  
  return lines.join('\n')
}

/**
 * Generate fallback query types if source file is not available
 */
function generateFallbackQueryTypes(): string {
  return `// Basic OData query types for Dataverse operations
// NOTE: Use entity-specific expand types instead of these generic types for full type safety

// Base OData operators for different field types
export type StringOperators<T = string> = {
  $eq?: T
  $ne?: T
  $in?: T[]
  $nin?: T[]
  $contains?: T
  $startswith?: T
  $endswith?: T
  $like?: T
  $null?: boolean
  $notnull?: boolean
}

export type NumberOperators<T = number> = {
  $eq?: T
  $ne?: T
  $gt?: T
  $gte?: T
  $lt?: T
  $lte?: T
  $in?: T[]
  $nin?: T[]
  $null?: boolean
  $notnull?: boolean
}

export type BooleanOperators = {
  $eq?: boolean
  $ne?: boolean
  $null?: boolean
  $notnull?: boolean
}

export type DateOperators = {
  $eq?: Date | string
  $ne?: Date | string
  $gt?: Date | string
  $gte?: Date | string
  $lt?: Date | string
  $lte?: Date | string
  $in?: (Date | string)[]
  $nin?: (Date | string)[]
  $null?: boolean
  $notnull?: boolean
  // Dataverse-specific date functions
  $today?: boolean
  $yesterday?: boolean
  $tomorrow?: boolean
  $thisweek?: boolean
  $thismonth?: boolean
  $thisyear?: boolean
  $lastweek?: boolean
  $lastmonth?: boolean
  $lastyear?: boolean
  $nextweek?: boolean
  $nextmonth?: boolean
  $nextyear?: boolean
  $lastxdays?: number
  $nextxdays?: number
  $lastxmonths?: number
  $nextxmonths?: number
  $lastxyears?: number
  $nextxyears?: number
}

export type LookupOperators = {
  $eq?: string  // GUID
  $ne?: string
  $in?: string[]
  $nin?: string[]
  $null?: boolean
  $notnull?: boolean
}

// Type mapping for different attribute types
export type FilterOperatorForType<T> = 
  T extends string ? StringOperators<T> | T :
  T extends number ? NumberOperators<T> | T :
  T extends boolean ? BooleanOperators | T :
  T extends Date ? DateOperators | T :
  T extends string | Date ? DateOperators | T :
  T extends (infer U)[] ? FilterOperatorForType<U> | U[] :
  StringOperators<T> | T

// Filter type that maps entity properties to appropriate operators
export type ODataFilter<TEntity> = {
  [K in keyof TEntity]?: FilterOperatorForType<TEntity[K]>
} & {
  $and?: ODataFilter<TEntity>[]
  $or?: ODataFilter<TEntity>[]
  $not?: ODataFilter<TEntity>
}

export type ODataSelect<TEntity> = (keyof TEntity)[]

// Generic fallback - entity-specific types should override this
export type ODataExpand<TMetadata = any> = string[] | Record<string, any>

export type ODataOrderBy<TEntity> = {
  [K in keyof TEntity]?: 'asc' | 'desc'
} | string[]

export interface EntityListOptions<TEntity, TMetadata = any> {
  $select?: ODataSelect<TEntity>
  $expand?: ODataExpand<TMetadata>
  $filter?: ODataFilter<TEntity>
  $orderby?: ODataOrderBy<TEntity>
  $top?: number
  $skip?: number
  $count?: boolean
  $search?: string
}

export interface EntityOptions<TEntity, TMetadata = any> {
  $select?: ODataSelect<TEntity>
  $expand?: ODataExpand<TMetadata>
}

export interface ODataResponse<T> {
  '@odata.context': string
  '@odata.count'?: number
  '@odata.nextLink'?: string
  value: T[]
}

export interface ODataSingleResponse<T> extends Omit<ODataResponse<T>, 'value'> {
  value?: T
}`
}