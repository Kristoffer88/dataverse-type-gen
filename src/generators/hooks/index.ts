/**
 * Hooks module orchestrator
 * Re-exports all hooks generation functionality from individual modules
 */

// Entity hooks exports
export {
  generateEntitySpecificExamples,
  generateSingleEntityHook,
  generateOptionSetConstantName
} from './entity-hooks.js'

// List hooks exports
export {
  generateEntityListHook,
  generateEntityCountHook
} from './list-hooks.js'

// Query builders exports
export {
  generateEntityQueryBuilders,
  generateQueryHelperFunctions,
  generateEntityQueryBuildersFile
} from './query-builders.js'

// Utilities exports
export {
  generateHooksIndex,
  generateEntityHooksFile
} from './utilities.js'

// Main composable functions that combine the above modules
import type { ProcessedEntityMetadata } from '../../processors/index.js'
import type { TypeGenerationOptions } from '../index.js'
import { getHooksToEntityImportPath, getHooksToSharedImportPath, shouldOrganizeDirectories } from '../import-utils.js'
import { sanitizeInterfaceName } from '../utils.js'
import { 
  generateSingleEntityHook, 
  generateOptionSetConstantName
} from './entity-hooks.js'
import { generateEntityListHook, generateEntityCountHook } from './list-hooks.js'

/**
 * Generate individual, composable React Query hooks for an entity
 * Each hook is standalone and can be easily customized by developers
 */
export function generateEntityHooks(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const { 
    includeComments = true,
    primaryEntities = [],
    relatedEntitiesDir = 'related'
  } = options
  const lines: string[] = []
  
  const interfaceName = sanitizeInterfaceName(entityMetadata.schemaName)
  const primaryKey = entityMetadata.primaryIdAttribute
  
  // Determine import paths based on directory structure
  const organizingDirectories = shouldOrganizeDirectories(relatedEntitiesDir, options.nestedExpand ?? false, primaryEntities)
  const entityImportPath = organizingDirectories 
    ? getHooksToEntityImportPath(entityMetadata.logicalName, primaryEntities, relatedEntitiesDir)
    : `../${entityMetadata.logicalName.toLowerCase()}.js`
  const queryTypesImportPath = getHooksToSharedImportPath('query-types.js')
  
  // Import statements
  lines.push(`import { useQuery } from '@tanstack/react-query'`)
  lines.push(`import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'`)
  lines.push(`import { ${interfaceName}Meta } from '${entityImportPath}'`)
  lines.push(`import type { ${interfaceName}, ${interfaceName}Expand } from '${entityImportPath}'`)
  lines.push(`import type {`)
  lines.push(`    ODataFilter,`)
  lines.push(`    ODataSelect,`)
  lines.push(`    ODataOrderBy,`)
  lines.push(`    ODataResponse`)
  lines.push(`} from '${queryTypesImportPath}'`)
  
  // Query builders import path (from hooks to queries directory)
  // Both hooks and queries follow the same directory structure, so we can use relative paths within each
  const isPrimary = primaryEntities.includes(entityMetadata.logicalName)
  const queryBuildersImportPath = isPrimary 
    ? `../queries/${entityMetadata.logicalName}.queries.js`    // hooks/entity.hooks.ts → queries/entity.queries.ts
    : `../${entityMetadata.logicalName}.queries.js`             // hooks/related/entity.hooks.ts → queries/related/entity.queries.ts
  lines.push(`import { ${interfaceName}Queries } from '${queryBuildersImportPath}'`)
  
  // Import related entity types for type-safe expands (only if they exist)
  // NOTE: We skip generating imports for related entities that don't have type files
  // This prevents import errors when only a subset of entities are being generated
  const relatedEntityImports = new Set<string>()
  
  // Future enhancement: Pass available entities list to conditionally generate imports
  
  if (relatedEntityImports.size > 0) {
    lines.push('')
    lines.push(`// Related entity imports for type-safe expands`)
    Array.from(relatedEntityImports).sort().forEach(importLine => lines.push(importLine))
  }
  
  // Import option set constants for examples
  const stateAttribute = entityMetadata.attributes.find(attr => attr.logicalName === 'statecode')
  if (stateAttribute?.optionSetName) {
    const stateConstantName = generateOptionSetConstantName(stateAttribute.optionSetName)
    lines.push(`import { ${stateConstantName} } from '${entityImportPath}'`)
  }
  
  lines.push('')
  
  // =====================================================================
  // Configuration
  // =====================================================================
  
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Uses standard fetch - authentication handled by dataverse-utilities or model-driven apps`)
    lines.push(` */`)
  }
  lines.push(``)
  
  // Custom types with entity-specific expand support
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Type-safe options for ${entityMetadata.displayName} entity operations`)
    lines.push(` * Uses entity-specific expand types for full IntelliSense support`)
    lines.push(` */`)
  }
  lines.push(`type ${interfaceName}ListOptions = {`)
  lines.push(`  $select?: ODataSelect<${interfaceName}>`)
  lines.push(`  $expand?: ${interfaceName}Expand`)
  lines.push(`  $filter?: ODataFilter<${interfaceName}>`)
  lines.push(`  $orderby?: ODataOrderBy<${interfaceName}>`)
  lines.push(`  $top?: number`)
  lines.push(`  $skip?: number`)
  lines.push(`  $count?: boolean`)
  lines.push(`  $search?: string`)
  lines.push(`}`)
  lines.push('')
  lines.push(`type ${interfaceName}Options = {`)
  lines.push(`  $select?: ODataSelect<${interfaceName}>`)
  lines.push(`  $expand?: ${interfaceName}Expand`)
  lines.push(`}`)
  
  // =====================================================================
  // React Query Hooks (using generated query builders)
  // =====================================================================
  
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * These hooks use the generated query builders from ${interfaceName}Queries.`)
    lines.push(` * You can modify the query building logic by editing the queries file.`)
    lines.push(` */`)
    lines.push(``)
  }
  
  generateSingleEntityHook(lines, interfaceName, interfaceName, primaryKey, entityMetadata, includeComments)
  lines.push('')
  
  generateEntityListHook(lines, interfaceName, interfaceName, entityMetadata, includeComments)
  lines.push('')
  
  generateEntityCountHook(lines, interfaceName, interfaceName, entityMetadata, includeComments)
  lines.push('')
  
  // =====================================================================
  // Query Keys for Cache Management
  // =====================================================================
  
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Query keys for React Query cache management`)
    lines.push(` * `)
    lines.push(` * Use these to invalidate or prefetch specific queries:`)
    lines.push(` * - \`queryClient.invalidateQueries(${interfaceName}QueryKeys.all)\` - Invalidate all queries`)
    lines.push(` * - \`queryClient.invalidateQueries(${interfaceName}QueryKeys.detail(id))\` - Invalidate specific entity`)
    lines.push(` * - \`queryClient.invalidateQueries(${interfaceName}QueryKeys.list())\` - Invalidate all lists`)
    lines.push(` */`)
  }
  lines.push(`export const ${interfaceName}QueryKeys = {`)
  lines.push(`  /** Base key for all ${entityMetadata.displayName} queries */`)
  lines.push(`  all: ['${entityMetadata.logicalName}'] as const,`)
  lines.push(`  /** Key for single entity queries */`)
  lines.push(`  detail: (id: string) => [...${interfaceName}QueryKeys.all, 'detail', id] as const,`)
  lines.push(`  /** Key for entity list queries */`)
  lines.push(`  list: (options?: ${interfaceName}ListOptions) => [...${interfaceName}QueryKeys.all, 'list', options] as const,`)
  lines.push(`  /** Key for entity count queries */`)
  lines.push(`  count: (options?: Pick<${interfaceName}ListOptions, '$filter'>) => [...${interfaceName}QueryKeys.all, 'count', options] as const,`)
  lines.push(`}`)
  
  return lines.join('\n')
}