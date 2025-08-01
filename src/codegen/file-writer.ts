import { promises as fs } from 'fs'
import { join, dirname } from 'path'
import type { ProcessedEntityMetadata, ProcessedOptionSet } from '../processors/index.js'
import type { CodeGenConfig, GeneratedFileResult } from './index.js'
import { generateEntityFile, generateGlobalOptionSetFile } from '../generators/index.js'
import { generateEntityHooks, generateEntityHooksFile, generateEntityQueryBuildersFile } from '../generators/query-hooks.js'
import { combineGeneratedCode, formatCode } from './formatter.js'
import { isPrimaryEntity, getEntityDirectory } from './directory-manager.js'

/**
 * Write TypeScript declaration file for a global option set
 */
export async function writeGlobalOptionSetDeclaration(
  optionSet: ProcessedOptionSet,
  config: CodeGenConfig
): Promise<GeneratedFileResult> {
  try {
    // Generate the code
    const content = generateGlobalOptionSetFile(optionSet, config.typeGenerationOptions)
    
    // Format the code if prettier is enabled
    const formattedContent = config.prettier 
      ? await formatCode(content, true)
      : content

    // Determine file path - create in global-choices subdirectory
    const fileName = `${optionSet.name.toLowerCase()}${config.fileExtension}`
    const filePath = join(config.outputDir, 'global-choices', fileName)

    // Ensure output directory exists
    await fs.mkdir(dirname(filePath), { recursive: true })

    // Check if file exists and overwrite setting
    if (!config.overwrite) {
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
      filePath: join(config.outputDir, 'global-choices', `${optionSet.name.toLowerCase()}${config.fileExtension}`),
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
  config: CodeGenConfig
): Promise<GeneratedFileResult> {
  try {
    // Generate the actual hooks content first
    const hooksContent = generateEntityHooks(entityMetadata, config.typeGenerationOptions)
    
    // Generate the complete hooks file with header and content
    const content = generateEntityHooksFile(entityMetadata, config.typeGenerationOptions, hooksContent)
    
    // Format the code if prettier is enabled
    const formattedContent = config.prettier 
      ? await formatCode(content, true)
      : content

    // Determine file path - hooks files go in hooks subdirectory with related entities in hooks/related
    const fileName = `${entityMetadata.logicalName}.hooks${config.fileExtension}`
    const hooksBaseDir = join(config.outputDir, 'hooks')
    
    // Check if directory organization should be enabled
    const shouldOrganizeDirectories = config.relatedEntitiesDir && 
      (config.typeGenerationOptions.fullMetadata || config.primaryEntities?.length);
    
    const hooksDir = !shouldOrganizeDirectories || isPrimaryEntity(entityMetadata.logicalName, config.primaryEntities) 
      ? hooksBaseDir 
      : join(hooksBaseDir, config.relatedEntitiesDir || 'related')
    const filePath = join(hooksDir, fileName)

    // Ensure output directory exists
    await fs.mkdir(dirname(filePath), { recursive: true })

    // Check if file exists and overwrite setting
    if (!config.overwrite) {
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
    const hooksBaseDir = join(config.outputDir, 'hooks')
    
    // Check if directory organization should be enabled
    const shouldOrganizeDirectories = config.relatedEntitiesDir && 
      (config.typeGenerationOptions.fullMetadata || config.primaryEntities?.length);
    
    const hooksDir = !shouldOrganizeDirectories || isPrimaryEntity(entityMetadata.logicalName, config.primaryEntities) 
      ? hooksBaseDir 
      : join(hooksBaseDir, config.relatedEntitiesDir || 'related')
    return {
      filePath: join(hooksDir, `${entityMetadata.logicalName}.hooks${config.fileExtension}`),
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
  config: CodeGenConfig
): Promise<GeneratedFileResult> {
  try {
    // Generate the query builders code
    const content = generateEntityQueryBuildersFile(entityMetadata, config.typeGenerationOptions)
    
    // Format the code if prettier is enabled
    const formattedContent = config.prettier 
      ? await formatCode(content, true)
      : content

    // Determine file path - query builders files go in queries subdirectory with related entities in queries/related
    const fileName = `${entityMetadata.logicalName}.queries${config.fileExtension}`
    const queriesBaseDir = join(config.outputDir, 'queries')
    
    // Check if directory organization should be enabled
    const shouldOrganizeDirectories = config.relatedEntitiesDir && 
      (config.typeGenerationOptions.fullMetadata || config.primaryEntities?.length);
    
    const queriesDir = !shouldOrganizeDirectories || isPrimaryEntity(entityMetadata.logicalName, config.primaryEntities) 
      ? queriesBaseDir 
      : join(queriesBaseDir, config.relatedEntitiesDir || 'related')
    const filePath = join(queriesDir, fileName)

    // Ensure output directory exists
    await fs.mkdir(dirname(filePath), { recursive: true })

    // Check if file exists and overwrite setting
    if (!config.overwrite) {
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
    const queriesBaseDir = join(config.outputDir, 'queries')
    
    // Check if directory organization should be enabled
    const shouldOrganizeDirectories = config.relatedEntitiesDir && 
      (config.typeGenerationOptions.fullMetadata || config.primaryEntities?.length);
    
    const queriesDir = !shouldOrganizeDirectories || isPrimaryEntity(entityMetadata.logicalName, config.primaryEntities) 
      ? queriesBaseDir 
      : join(queriesBaseDir, config.relatedEntitiesDir || 'related')
    return {
      filePath: join(queriesDir, `${entityMetadata.logicalName}.queries${config.fileExtension}`),
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
  config: CodeGenConfig,
  allEntities: ProcessedEntityMetadata[] = []
): Promise<GeneratedFileResult> {
  try {
    // Generate the code
    const generatedCode = generateEntityFile(entityMetadata, config.typeGenerationOptions, allEntities)
    
    // Combine all parts into final content
    const content = combineGeneratedCode(generatedCode)
    
    // Format the code if prettier is enabled
    const formattedContent = config.prettier 
      ? await formatCode(content, true)
      : content

    // Determine file path - primary entities in root, related entities in subdirectory
    const fileName = `${entityMetadata.schemaName.toLowerCase()}${config.fileExtension}`
    const entityDir = getEntityDirectory(entityMetadata.logicalName, config)
    const filePath = join(entityDir, fileName)

    // Ensure output directory exists
    await fs.mkdir(dirname(filePath), { recursive: true })

    // Check if file exists and overwrite setting
    if (!config.overwrite) {
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
    const entityDir = getEntityDirectory(entityMetadata.logicalName, config)
    return {
      filePath: join(entityDir, `${entityMetadata.schemaName.toLowerCase()}${config.fileExtension}`),
      content: '',
      size: 0,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

/**
 * Write query-types file
 */
export async function writeQueryTypesFile(config: CodeGenConfig): Promise<GeneratedFileResult> {
  const fileName = `query-types${config.fileExtension}`
  const filePath = join(config.outputDir, fileName)
  
  try {
    // Generate the query-types content
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
  const { fileURLToPath } = await import('url')
  const { dirname } = await import('path')
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
export type ODataExpand<TMetadata = any> = 
  | string[]
  | Record<string, {
      $select?: string[]
      $filter?: any
      $orderby?: any
      $top?: number
      $skip?: number
    }>

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