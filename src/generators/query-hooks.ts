/**
 * Generate React Query hooks for Dataverse entities
 * Extends the existing type generation with useQuery hooks
 */

import type { 
  ProcessedEntityMetadata
} from '../processors/index.js'

import type { TypeGenerationOptions } from './index.js'

/**
 * Helper to determine the correct import path based on directory structure
 */
function getEntityImportPath(
  fromEntityLogicalName: string,
  toEntityLogicalName: string,
  primaryEntities: string[] = [],
  relatedEntitiesDir: string = 'related'
): string {
  const fromIsPrimary = primaryEntities.includes(fromEntityLogicalName)
  const toIsPrimary = primaryEntities.includes(toEntityLogicalName)
  
  if (fromIsPrimary && toIsPrimary) {
    // Both primary: ../entity
    return `../${toEntityLogicalName}.js`
  } else if (fromIsPrimary && !toIsPrimary) {
    // From primary to related: ../related/entity
    return `../${relatedEntitiesDir}/${toEntityLogicalName}.js`
  } else if (!fromIsPrimary && toIsPrimary) {
    // From related to primary: ../../entity
    return `../../${toEntityLogicalName}.js`
  } else {
    // Both related: ../entity
    return `../${toEntityLogicalName}.js`
  }
}

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
  
  const interfaceName = entityMetadata.schemaName
  const schemaTypeName = entityMetadata.schemaName
  const entitySetName = entityMetadata.entitySetName
  const primaryKey = entityMetadata.primaryIdAttribute
  
  // Determine import paths based on directory structure
  const entityImportPath = getEntityImportPath(entityMetadata.logicalName, entityMetadata.logicalName, primaryEntities, relatedEntitiesDir)
  const queryTypesImportPath = primaryEntities.includes(entityMetadata.logicalName) ? '../query-types.js' : '../../query-types.js'
  
  // Import statements
  lines.push(`import { useQuery } from '@tanstack/react-query'`)
  lines.push(`import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'`)
  lines.push(`import { ${entityMetadata.logicalName}Metadata } from '${entityImportPath}'`)
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
  lines.push(`import { ${entityMetadata.logicalName}Queries } from '${queryBuildersImportPath}'`)
  
  // Import related entity types for type-safe expands (only if they exist)
  // NOTE: We skip generating imports for related entities that don't have type files
  // This prevents import errors when only a subset of entities are being generated
  const relatedEntityImports = new Set<string>()
  
  // Only generate imports if we have explicit knowledge of what entities are available
  // For now, we comment out automatic related entity imports to prevent missing file errors
  // Future enhancement: Pass available entities list to conditionally generate imports
  
  /*
  for (const [, relatedInfo] of Object.entries(entityMetadata.relatedEntities)) {
    const relatedTypeName = relatedInfo.targetEntityLogicalName
    relatedEntityImports.add(`import type { ${relatedTypeName} } from '../${relatedInfo.targetEntityLogicalName}.js'`)
  }
  */
  
  if (relatedEntityImports.size > 0) {
    lines.push('')
    lines.push(`// Related entity imports for type-safe expands`)
    Array.from(relatedEntityImports).sort().forEach(importLine => lines.push(importLine))
  }
  
  // Import option set constants for examples
  const stateAttribute = entityMetadata.attributes.find(attr => attr.logicalName === 'statecode')
  if (stateAttribute?.optionSetName) {
    const stateConstantName = generateOptionSetConstantName(stateAttribute.optionSetName)
    lines.push(`import { ${stateConstantName} } from '../${entityMetadata.logicalName}.js'`)
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
    lines.push(` * These hooks use the generated query builders from ${entityMetadata.logicalName}Queries.`)
    lines.push(` * You can modify the query building logic by editing the queries file.`)
    lines.push(` */`)
    lines.push(``)
  }
  
  generateSingleEntityHook(lines, interfaceName, schemaTypeName, entitySetName, primaryKey, entityMetadata, includeComments)
  lines.push('')
  
  generateEntityListHook(lines, interfaceName, schemaTypeName, entitySetName, entityMetadata, includeComments)
  lines.push('')
  
  generateEntityCountHook(lines, interfaceName, schemaTypeName, entitySetName, entityMetadata, includeComments)
  lines.push('')
  
  // =====================================================================
  // Query Keys for Cache Management
  // =====================================================================
  
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Query keys for React Query cache management`)
    lines.push(` * `)
    lines.push(` * Use these to invalidate or prefetch specific queries:`)
    lines.push(` * - \`queryClient.invalidateQueries(${schemaTypeName}QueryKeys.all)\` - Invalidate all queries`)
    lines.push(` * - \`queryClient.invalidateQueries(${schemaTypeName}QueryKeys.detail(id))\` - Invalidate specific entity`)
    lines.push(` * - \`queryClient.invalidateQueries(${schemaTypeName}QueryKeys.list())\` - Invalidate all lists`)
    lines.push(` */`)
  }
  lines.push(`export const ${schemaTypeName}QueryKeys = {`)
  lines.push(`  /** Base key for all ${entityMetadata.displayName} queries */`)
  lines.push(`  all: ['${entityMetadata.logicalName}'] as const,`)
  lines.push(`  /** Key for single entity queries */`)
  lines.push(`  detail: (id: string) => [...${schemaTypeName}QueryKeys.all, 'detail', id] as const,`)
  lines.push(`  /** Key for entity list queries */`)
  lines.push(`  list: (options?: ${interfaceName}ListOptions) => [...${schemaTypeName}QueryKeys.all, 'list', options] as const,`)
  lines.push(`  /** Key for entity count queries */`)
  lines.push(`  count: (options?: Pick<${interfaceName}ListOptions, '$filter'>) => [...${schemaTypeName}QueryKeys.all, 'count', options] as const,`)
  lines.push(`}`)
  
  return lines.join('\n')
}

/**
 * Generate hook for fetching a single entity
 */
function generateSingleEntityHook(
  lines: string[],
  interfaceName: string,
  schemaTypeName: string,
  entitySetName: string,
  primaryKey: string,
  entityMetadata: ProcessedEntityMetadata,
  includeComments: boolean
): void {
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Fetch a single ${entityMetadata.displayName} by ID`)
    lines.push(` * `)
    lines.push(` * @param id - The ${primaryKey} of the entity`)
    lines.push(` * @param options - Query options with type-safe field selection`)
    lines.push(` * @param options.$select - Select specific fields (provides IntelliSense)`)
    lines.push(` * @param options.$expand - Expand related entities`)
    lines.push(` * `)
    lines.push(` * @example`)
    lines.push(` * // Basic usage`)
    lines.push(` * const { data, isLoading, error } = use${schemaTypeName}(entityId)`)
    lines.push(` * `)
    lines.push(` * @example`)
    lines.push(` * // With field selection and error handling`)
    lines.push(` * const { data: ${entityMetadata.logicalName.toLowerCase()}, isLoading } = use${schemaTypeName}(`)
    lines.push(` *   '123e4567-e89b-12d3-a456-426614174000',`)
    lines.push(` *   { `)
    lines.push(` *     $select: ['${entityMetadata.primaryNameAttribute}', '${entityMetadata.attributes.find(a => a.logicalName !== entityMetadata.primaryNameAttribute)?.logicalName || 'createdon'}'],`)
    lines.push(` *     enabled: !!entityId // Only run when ID exists`)
    lines.push(` *   }`)
    lines.push(` * )`)
    lines.push(` */`)
  }
  
  lines.push(`export function use${schemaTypeName}(`)
  lines.push(`    id: string | undefined,`)
  lines.push(`    options: ${interfaceName}Options & Omit<UseQueryOptions<${interfaceName}>, 'queryKey' | 'queryFn'> = {}`)
  lines.push(`): UseQueryResult<${interfaceName}> {`)
  lines.push(`  const { $select, $expand, ...queryOptions } = options`)
  lines.push(`  `)
  lines.push(`  return useQuery({`)
  lines.push(`    queryKey: ${schemaTypeName}QueryKeys.detail(id || ''),`)
  lines.push(`    queryFn: async (): Promise<${interfaceName}> => {`)
  lines.push(`      if (!id) throw new Error('ID is required')`)
  lines.push(`      `)
  lines.push(`      const url = ${entityMetadata.logicalName}Queries.buildEntityUrl(id, { $select, $expand })`)
  lines.push(`      const response = await fetch(url)`)
  lines.push(`      `)
  lines.push(`      if (!response.ok) {`)
  lines.push(`        throw new Error(\`Failed to fetch ${entityMetadata.displayName}: \${response.statusText}\`)`)
  lines.push(`      }`)
  lines.push(`      `)
  lines.push(`      return response.json()`)
  lines.push(`    },`)
  lines.push(`    enabled: !!id,`)
  lines.push(`    ...queryOptions`)
  lines.push(`  })`)
  lines.push(`}`)
}

/**
 * Generate hook for fetching a list of entities
 */
function generateEntityListHook(
  lines: string[],
  interfaceName: string,
  schemaTypeName: string,
  entitySetName: string,
  entityMetadata: ProcessedEntityMetadata,
  includeComments: boolean
): void {
  if (includeComments) {
    const stateAttribute = entityMetadata.attributes.find(attr => attr.logicalName === 'statecode')
    const stateExample = stateAttribute?.optionSetName 
      ? `${generateOptionSetConstantName(stateAttribute.optionSetName)}.Active.Value`
      : '0'
    
    lines.push(`/**`)
    lines.push(` * Fetch a list of ${entityMetadata.displayName} entities with filtering and pagination`)
    lines.push(` * `)
    lines.push(` * @param options - Query options with type-safe filters and field selection`)
    lines.push(` * @param options.$filter - Filter entities using type-safe field names and operators`)
    lines.push(` * @param options.$select - Select specific fields (provides IntelliSense)`)
    lines.push(` * @param options.$orderby - Sort by fields with 'asc' or 'desc' direction`)
    lines.push(` * @param options.$top - Limit number of results`)
    lines.push(` * @param options.$skip - Skip results for pagination`)
    lines.push(` * `)
    lines.push(` * @example`)
    lines.push(` * // Basic list`)
    lines.push(` * const { data } = use${schemaTypeName}List()`)
    lines.push(` * `)
    lines.push(` * @example`)
    lines.push(` * // Advanced filtering with type safety`)
    lines.push(` * const { data: ${entityMetadata.logicalName.toLowerCase()}s } = use${schemaTypeName}List({`)
    lines.push(` *   $filter: { `)
    lines.push(` *     statecode: ${stateExample},`)
    lines.push(` *     ${entityMetadata.primaryNameAttribute}: { $contains: 'important' },`)
    lines.push(` *     $and: [`)
    lines.push(` *       { createdon: { $gte: new Date('2024-01-01') } }`)
    lines.push(` *     ]`)
    lines.push(` *   },`)
    lines.push(` *   $select: ['${entityMetadata.primaryNameAttribute}', '${entityMetadata.attributes.find(a => a.logicalName !== entityMetadata.primaryNameAttribute)?.logicalName || 'createdon'}'],`)
    lines.push(` *   $orderby: { ${entityMetadata.primaryNameAttribute}: 'asc' },`)
    lines.push(` *   $top: 10`)
    lines.push(` * })`)
    lines.push(` */`)
  }
  
  lines.push(`export function use${schemaTypeName}List(`)
  lines.push(`    options: ${interfaceName}ListOptions & Omit<UseQueryOptions<ODataResponse<${interfaceName}>>, 'queryKey' | 'queryFn'> = {}`)
  lines.push(`): UseQueryResult<ODataResponse<${interfaceName}>> {`)
  lines.push(`  const { $filter, $select, $expand, $orderby, $top, $skip, ...queryOptions } = options`)
  lines.push(`  `)
  lines.push(`  return useQuery({`)
  lines.push(`    queryKey: ${schemaTypeName}QueryKeys.list({ $filter, $select, $expand, $orderby, $top, $skip }),`)
  lines.push(`    queryFn: async (): Promise<ODataResponse<${interfaceName}>> => {`)
  lines.push(`      const url = ${entityMetadata.logicalName}Queries.buildListUrl({ $filter, $select, $expand, $orderby, $top, $skip })`)
  lines.push(`      const response = await fetch(url)`)
  lines.push(`      `)
  lines.push(`      if (!response.ok) {`)
  lines.push(`        throw new Error(\`Failed to fetch ${entityMetadata.displayName} list: \${response.statusText}\`)`)
  lines.push(`      }`)
  lines.push(`      `)
  lines.push(`      return response.json()`)
  lines.push(`    },`)
  lines.push(`    ...queryOptions`)
  lines.push(`  })`)
  lines.push(`}`)
}

/**
 * Generate hook for counting entities
 */
function generateEntityCountHook(
  lines: string[],
  interfaceName: string,
  schemaTypeName: string,
  entitySetName: string,
  entityMetadata: ProcessedEntityMetadata,
  includeComments: boolean
): void {
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Hook for counting ${entityMetadata.displayName} entities`)
    lines.push(` * `)
    lines.push(` * @param options - Filter options to count specific entities`)
    lines.push(` * `)
    lines.push(` * @example`)
    lines.push(` * const { data: count } = use${schemaTypeName}Count({`)
    lines.push(` *   $filter: { statecode: 0 }`)
    lines.push(` * })`)
    lines.push(` */`)
  }
  
  lines.push(`export function use${schemaTypeName}Count(`)
  lines.push(`    options: Pick<${interfaceName}ListOptions, '$filter'> & Omit<UseQueryOptions<number>, 'queryKey' | 'queryFn'> = {}`)
  lines.push(`): UseQueryResult<number> {`)
  lines.push(`  const { $filter, ...queryOptions } = options`)
  lines.push(`  `)
  lines.push(`  return useQuery({`)
  lines.push(`    queryKey: ${schemaTypeName}QueryKeys.count({ $filter }),`)
  lines.push(`    queryFn: async (): Promise<number> => {`)
  lines.push(`      const url = ${entityMetadata.logicalName}Queries.buildCountUrl({ $filter })`)
  lines.push(`      const response = await fetch(url)`)
  lines.push(`      `)
  lines.push(`      if (!response.ok) {`)
  lines.push(`        throw new Error(\`Failed to count ${entityMetadata.displayName}: \${response.statusText}\`)`)
  lines.push(`      }`)
  lines.push(`      `)
  lines.push(`      const count = await response.text()`)
  lines.push(`      return parseInt(count, 10)`)
  lines.push(`    },`)
  lines.push(`    ...queryOptions`)
  lines.push(`  })`)
  lines.push(`}`)
}

/**
 * Generate query builder utilities for an entity
 */
export function generateEntityQueryBuilders(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  const interfaceName = entityMetadata.schemaName
  const schemaTypeName = entityMetadata.schemaName
  const entitySetName = entityMetadata.entitySetName
  
  // File header
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Query Builders for ${entityMetadata.displayName}`)
    lines.push(` * `)
    lines.push(` * Auto-generated type-safe query builders for Dataverse entity: ${entityMetadata.logicalName}`)
    lines.push(` * Provides transparent, modifiable query construction functions`)
    lines.push(` * `)
    lines.push(` * @generated ${new Date().toISOString()}`)
    lines.push(` * @entity ${entityMetadata.displayName} (${entityMetadata.schemaName})`)
    lines.push(` * @entitySet ${entityMetadata.entitySetName}`)
    lines.push(` */`)
  }
  lines.push('')
  
  // Import types and metadata
  const metadataImportPath = getEntityImportPath(
    entityMetadata.logicalName,
    entityMetadata.logicalName,
    options.primaryEntities || [],
    options.relatedEntitiesDir || 'related'
  ).replace('.js', '.js') // Entity imports self for metadata and interface
  
  // Correct path for queries directory structure
  // Primary entities: queries/entity.queries.ts → ../entity.js
  // Related entities: queries/related/entity.queries.ts → ../../related/entity.js
  const isPrimary = (options.primaryEntities || []).includes(entityMetadata.logicalName)
  const entityImportPath = isPrimary 
    ? `../${entityMetadata.logicalName}.js`
    : `../../related/${entityMetadata.logicalName}.js`
    
  lines.push(`import { ${interfaceName}Metadata } from '${entityImportPath}'`)
  lines.push(`import type { ${interfaceName} } from '${entityImportPath}'`)
  lines.push(`import type {`)
  lines.push(`    ODataFilter,`)
  lines.push(`    ODataSelect,`)
  lines.push(`    ODataExpand,`)
  lines.push(`    ODataOrderBy,`)
  lines.push(`    EntityListOptions,`)
  lines.push(`    EntityOptions`)
  lines.push(`} from '../query-types.js'`)
  lines.push('')
  
  // Generate helper functions
  generateQueryHelperFunctions(lines, interfaceName)
  
  // Generate the main query builder object
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Query builders for ${entityMetadata.displayName}`)
    lines.push(` * `)
    lines.push(` * These functions provide transparent query building that you can modify.`)
    lines.push(` * All functions are pure and return URL strings that you can inspect and customize.`)
    lines.push(` */`)
  }
  lines.push(`export const ${schemaTypeName}Queries = {`)
  lines.push(`  /**`)
  lines.push(`   * Build URL for fetching a single ${entityMetadata.displayName} by ID`)
  lines.push(`   */`)
  lines.push(`  buildEntityUrl: (id: string, options: EntityOptions<${interfaceName}, typeof ${interfaceName}Metadata> = {}): string => {`)
  lines.push(`    return buildODataUrl<${interfaceName}>('${entitySetName}', options, id)`)
  lines.push(`  },`)
  lines.push(``)
  lines.push(`  /**`)
  lines.push(`   * Build URL for fetching a list of ${entityMetadata.displayName} entities`)
  lines.push(`   */`)
  lines.push(`  buildListUrl: (options: EntityListOptions<${interfaceName}, typeof ${interfaceName}Metadata> = {}): string => {`)
  lines.push(`    return buildODataUrl<${interfaceName}>('${entitySetName}', options)`)
  lines.push(`  },`)
  lines.push(``)
  lines.push(`  /**`)
  lines.push(`   * Build URL for counting ${entityMetadata.displayName} entities`)
  lines.push(`   */`)
  lines.push(`  buildCountUrl: (options: Pick<EntityListOptions<${interfaceName}, typeof ${interfaceName}Metadata>, '$filter'> = {}): string => {`)
  lines.push(`    const baseUrl = buildODataUrl<${interfaceName}>('${entitySetName}', options)`)
  lines.push(`    return baseUrl.replace('${entitySetName}', '${entitySetName}/$count')`)
  lines.push(`  },`)
  lines.push(``)
  lines.push(`  /**`)
  lines.push(`   * Build OData filter string from filter object`)
  lines.push(`   */`)
  lines.push(`  buildFilter: (filter: ODataFilter<${interfaceName}>): string => {`)
  lines.push(`    return buildFilter<${interfaceName}>(filter)`)
  lines.push(`  },`)
  lines.push(``)
  lines.push(`  /**`)
  lines.push(`   * Build OData orderby string from orderby object`)
  lines.push(`   */`)
  lines.push(`  buildOrderBy: (orderby: ODataOrderBy<${interfaceName}>): string => {`)
  lines.push(`    return buildOrderBy<${interfaceName}>(orderby)`)
  lines.push(`  },`)
  lines.push(``)
  lines.push(`  /** Entity metadata for reference */`)
  lines.push(`  entitySet: '${entitySetName}',`)
  lines.push(`  logicalName: '${entityMetadata.logicalName}',`)
  lines.push(`  displayName: '${entityMetadata.displayName}'`)
  lines.push(`}`)
  
  return lines.join('\n')
}

/**
 * Generate the helper functions used by query builders
 */
function generateQueryHelperFunctions(lines: string[], interfaceName: string): void {
  // Types are imported, no need to redefine
  
  // OData operators
  lines.push(`const odataOperators = {`)
  lines.push(`    $eq: <T>(field: keyof T, value: any) => \`\${String(field)} eq \${formatValue(value)}\`,`)
  lines.push(`    $ne: <T>(field: keyof T, value: any) => \`\${String(field)} ne \${formatValue(value)}\`,`)
  lines.push(`    $gt: <T>(field: keyof T, value: any) => \`\${String(field)} gt \${formatValue(value)}\`,`)
  lines.push(`    $lt: <T>(field: keyof T, value: any) => \`\${String(field)} lt \${formatValue(value)}\`,`)
  lines.push(`    $gte: <T>(field: keyof T, value: any) => \`\${String(field)} ge \${formatValue(value)}\`,`)
  lines.push(`    $lte: <T>(field: keyof T, value: any) => \`\${String(field)} le \${formatValue(value)}\`,`)
  lines.push(`    $contains: <T>(field: keyof T, value: string) => \`contains(\${String(field)}, '\${value}')\`,`)
  lines.push(`    $startswith: <T>(field: keyof T, value: string) => \`startswith(\${String(field)}, '\${value}')\`,`)
  lines.push(`    $endswith: <T>(field: keyof T, value: string) => \`endswith(\${String(field)}, '\${value}')\`,`)
  lines.push(`    $in: <T>(field: keyof T, values: any[]) => \`\${String(field)} in (\${values.map(formatValue).join(',')})\`,`)
  lines.push(`} as const`)
  lines.push('')
  
  // Format value function
  lines.push(`const formatValue = (value: any): string => {`)
  lines.push(`    if (value === null || value === undefined) return 'null'`)
  lines.push(`    if (typeof value === 'string') return \`'\${value.replace(/'/g, "''")}\``)
  lines.push(`    if (value instanceof Date) return \`'\${value.toISOString()}'\``)
  lines.push(`    if (typeof value === 'boolean') return value.toString()`)
  lines.push(`    return String(value)`)
  lines.push(`}`)
  lines.push('')
  
  // Build filter function
  lines.push(`// Build OData filter string with support for logical operators`)
  lines.push(`const buildFilter = <T>(filter: ODataFilter<T>): string => {`)
  lines.push(`    const conditions = Object.entries(filter)`)
  lines.push(`        .filter(([key]) => !key.startsWith('$'))`)
  lines.push(`        .map(([field, value]) => {`)
  lines.push(`            if (typeof value === 'object' && value !== null && !(value instanceof Date)) {`)
  lines.push(`                return Object.entries(value)`)
  lines.push(`                    .map(([op, val]) => {`)
  lines.push(`                        const operatorFn = odataOperators[op as keyof typeof odataOperators]`)
  lines.push(`                        return operatorFn ? operatorFn<T>(field as keyof T, val) : null`)
  lines.push(`                    })`)
  lines.push(`                    .filter(Boolean)`)
  lines.push(`                    .join(' and ')`)
  lines.push(`            }`)
  lines.push(`            return odataOperators.$eq<T>(field as keyof T, value)`)
  lines.push(`        })`)
  lines.push(`        .filter(Boolean)`)
  lines.push(``)
  lines.push(`    // Handle $and and $or logical operators`)
  lines.push(`    const logicalConditions: string[] = []`)
  lines.push(`    if ('$and' in filter && filter.$and) {`)
  lines.push(`        const andConditions = filter.$and.map(f => buildFilter<T>(f)).filter(Boolean)`)
  lines.push(`        if (andConditions.length > 0) {`)
  lines.push(`            logicalConditions.push(\`(\${andConditions.join(' and ')})\`)`)
  lines.push(`        }`)
  lines.push(`    }`)
  lines.push(`    if ('$or' in filter && filter.$or) {`)
  lines.push(`        const orConditions = filter.$or.map(f => buildFilter<T>(f)).filter(Boolean)`)
  lines.push(`        if (orConditions.length > 0) {`)
  lines.push(`            logicalConditions.push(\`(\${orConditions.join(' or ')})\`)`)
  lines.push(`        }`)
  lines.push(`    }`)
  lines.push(``)
  lines.push(`    const allConditions = [...conditions, ...logicalConditions].filter(Boolean)`)
  lines.push(`    return allConditions.join(' and ')`)
  lines.push(`}`)
  lines.push('')
  
  // Enhanced build expand function with metadata validation
  lines.push(`// Build OData expand string with support for nested selects and relationship validation`)
  lines.push(`const buildExpand = (expand: any): string => {`)
  lines.push(`    if (Array.isArray(expand)) {`)
  lines.push(`        // Simple array format: ['rel1', 'rel2'] - validate against expandable properties`)
  lines.push(`        for (const relationshipName of expand) {`)
  lines.push(`            if (!${interfaceName}Metadata.expandableProperties.includes(relationshipName as any)) {`)
  lines.push(`                throw new Error(\`Unknown relationship '\${relationshipName}'. Available relationships: \${${interfaceName}Metadata.expandableProperties.join(', ')}\`)`)
  lines.push(`            }`)
  lines.push(`        }`)
  lines.push(`        return expand.join(',')`)
  lines.push(`    }`)
  lines.push(`    `)
  lines.push(`    if (typeof expand === 'object' && expand !== null) {`)
  lines.push(`        // Object format: { rel1: { $select: ['field1'] }, rel2: { $select: ['field2'] } }`)
  lines.push(`        return Object.entries(expand)`)
  lines.push(`            .map(([relationshipName, options]: [string, any]) => {`)
  lines.push(`                // Validate relationship exists`)
  lines.push(`                if (!${interfaceName}Metadata.expandableProperties.includes(relationshipName as any)) {`)
  lines.push(`                    throw new Error(\`Unknown relationship '\${relationshipName}'. Available relationships: \${${interfaceName}Metadata.expandableProperties.join(', ')}\`)`)
  lines.push(`                }`)
  lines.push(`                `)
  lines.push(`                if (!options || typeof options !== 'object') {`)
  lines.push(`                    return relationshipName`)
  lines.push(`                }`)
  lines.push(`                `)
  lines.push(`                const nestedParams: string[] = []`)
  lines.push(`                if (options.$select && Array.isArray(options.$select)) {`)
  lines.push(`                    nestedParams.push(\`$select=\${options.$select.join(',')}\`)`)
  lines.push(`                }`)
  lines.push(`                if (options.$filter) {`)
  lines.push(`                    nestedParams.push(\`$filter=\${buildExpandFilter(options.$filter)}\`)`)
  lines.push(`                }`)
  lines.push(`                if (options.$orderby) {`)
  lines.push(`                    const orderBy = typeof options.$orderby === 'object' && !Array.isArray(options.$orderby)`)
  lines.push(`                        ? Object.entries(options.$orderby).map(([field, dir]) => \`\${field} \${dir}\`).join(', ')`)
  lines.push(`                        : Array.isArray(options.$orderby) ? options.$orderby.join(', ') : options.$orderby`)
  lines.push(`                    nestedParams.push(\`$orderby=\${orderBy}\`)`)
  lines.push(`                }`)
  lines.push(`                if (options.$top !== undefined) {`)
  lines.push(`                    nestedParams.push(\`$top=\${options.$top}\`)`)
  lines.push(`                }`)
  lines.push(`                `)
  lines.push(`                return nestedParams.length > 0 `)
  lines.push(`                    ? \`\${relationshipName}(\${nestedParams.join(';')})\``)
  lines.push(`                    : relationshipName`)
  lines.push(`            })`)
  lines.push(`            .join(',')`)
  lines.push(`    }`)
  lines.push(`    `)
  lines.push(`    return String(expand)`)
  lines.push(`}`)
  lines.push('')
  
  // Simple filter builder for expand filters (simplified version)
  lines.push(`// Build filter for expand operations (simplified)`)
  lines.push(`const buildExpandFilter = (filter: any): string => {`)
  lines.push(`    if (typeof filter === 'object' && filter !== null) {`)
  lines.push(`        return Object.entries(filter)`)
  lines.push(`            .map(([field, value]) => {`)
  lines.push(`                if (typeof value === 'object' && value !== null) {`)
  lines.push(`                    return Object.entries(value)`)
  lines.push(`                        .map(([op, val]) => \`\${field} \${op.replace('$', '')} \${formatValue(val)}\`)`)
  lines.push(`                        .join(' and ')`)
  lines.push(`                }`)
  lines.push(`                return \`\${field} eq \${formatValue(value)}\``)
  lines.push(`            })`)
  lines.push(`            .join(' and ')`)
  lines.push(`    }`)
  lines.push(`    return String(filter)`)
  lines.push(`}`)
  lines.push('')
  
  // Build OData URL function
  lines.push(`// Build complete OData URL with query parameters`)
  lines.push(`const buildODataUrl = <T>(entitySet: string, options: EntityListOptions<T> = {}, id?: string): string => {`)
  lines.push(`    const baseUrl = \`/api/data/v9.2/\${entitySet}\``)
  lines.push(`    const url = id ? \`\${baseUrl}(\${id})\` : baseUrl`)
  lines.push(``)
  lines.push(`    const queryParams = [`)
  lines.push(`        options.$select && \`$select=\${options.$select.join(',')}\`,`)
  lines.push(`        options.$expand && \`$expand=\${buildExpand(options.$expand)}\`,`)
  lines.push(`        options.$filter && \`$filter=\${buildFilter<T>(options.$filter)}\`,`)
  lines.push(`        options.$orderby && \`$orderby=\${buildOrderBy<T>(options.$orderby)}\`,`)
  lines.push(`        options.$top !== undefined && \`$top=\${options.$top}\`,`)
  lines.push(`        options.$skip !== undefined && \`$skip=\${options.$skip}\`,`)
  lines.push(`        options.$count && \`$count=true\`,`)
  lines.push(`        options.$search && \`$search=\${encodeURIComponent(options.$search)}\`,`)
  lines.push(`    ].filter(Boolean)`)
  lines.push(``)
  lines.push(`    return queryParams.length > 0 ? \`\${url}?\${queryParams.join('&')}\` : url`)
  lines.push(`}`)
  lines.push('')
  
  // Build order by function
  lines.push(`// Build order by clause`)
  lines.push(`const buildOrderBy = <T>(orderby: ODataOrderBy<T>): string => {`)
  lines.push(`    return Object.entries(orderby)`)
  lines.push(`        .map(([field, direction]) => \`\${field} \${direction}\`)`)
  lines.push(`        .join(', ')`)
  lines.push(`}`)
  lines.push('')
}

/**
 * Generate a separate hooks file for an entity
 */
export function generateEntityHooksFile(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  
  // File header with clear documentation
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * React Query Hooks for ${entityMetadata.displayName}`)
    lines.push(` * `)
    lines.push(` * Auto-generated type-safe hooks for Dataverse entity: ${entityMetadata.logicalName}`)
    lines.push(` * Provides full TypeScript intellisense for queries, filters, and selections`)
    lines.push(` * `)
    lines.push(` * @generated ${new Date().toISOString()}`)
    lines.push(` * @entity ${entityMetadata.displayName} (${entityMetadata.schemaName})`)
    lines.push(` * @entitySet ${entityMetadata.entitySetName}`)
    lines.push(` */`)
  } else {
    lines.push(`// Generated React Query hooks for ${entityMetadata.schemaName}`)
    lines.push(`// Entity: ${entityMetadata.displayName}`)  
    lines.push(`// Generated: ${new Date().toISOString()}`)
  }
  lines.push('')
  
  // Generate the hooks
  lines.push(generateEntityHooks(entityMetadata, options))
  
  return lines.join('\n')
}

/**
 * Generate a query builders file for an entity  
 */
export function generateEntityQueryBuildersFile(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  
  // File header with clear documentation
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Query Builders for ${entityMetadata.displayName}`)
    lines.push(` * `)
    lines.push(` * Auto-generated type-safe query builders for Dataverse entity: ${entityMetadata.logicalName}`)
    lines.push(` * These are transparent, modifiable functions that you can customize as needed`)
    lines.push(` * `)
    lines.push(` * @generated ${new Date().toISOString()}`)
    lines.push(` * @entity ${entityMetadata.displayName} (${entityMetadata.schemaName})`)
    lines.push(` * @entitySet ${entityMetadata.entitySetName}`)
    lines.push(` */`)
  } else {
    lines.push(`// Generated query builders for ${entityMetadata.schemaName}`)
    lines.push(`// Entity: ${entityMetadata.displayName}`)  
    lines.push(`// Generated: ${new Date().toISOString()}`)
  }
  lines.push('')
  
  // Generate the query builders
  lines.push(generateEntityQueryBuilders(entityMetadata, options))
  
  return lines.join('\n')
}

/**
 * Generate hooks index file that exports all entity hooks
 */
export function generateHooksIndex(
  entities: ProcessedEntityMetadata[],
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  
  // File header
  lines.push(`// Generated React Query hooks index`)
  lines.push(`// Total entities: ${entities.length}`)
  lines.push(`// Generated: ${new Date().toISOString()}`)
  lines.push('')
  
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Barrel exports for all entity React Query hooks`)
    lines.push(` * `)
    lines.push(` * @example`)
    lines.push(` * import { usePumInitiative, usePumInitiativeList } from './hooks'`)
    lines.push(` * `)
    lines.push(` * const { data: initiative } = usePumInitiative('123e4567-e89b-12d3-a456-426614174000')`)
    lines.push(` * const { data: initiatives } = usePumInitiativeList({ statecode: 0 })`)
    lines.push(` */`)
    lines.push('')
  }
  
  // Export all hooks
  for (const entity of entities) {
    const hooksFile = `${entity.logicalName}.hooks.js`
    lines.push(`export * from './${hooksFile}'`)
  }
  
  lines.push('')
  
  // Export common utilities
  lines.push(`// Common utilities`)
  lines.push(`export { createEntityHooks, invalidateEntityQueries } from 'dataverse-type-gen'`)
  
  return lines.join('\n')
}

/**
 * Generate usage documentation for the hooks
 */
export function generateHooksDocumentation(
  entities: ProcessedEntityMetadata[]
): string {
  const lines: string[] = []
  
  lines.push(`# React Query Hooks for Dataverse`)
  lines.push('')
  lines.push(`This package provides type-safe React Query hooks for Dataverse entities.`)
  lines.push('')
  
  lines.push(`## Setup`)
  lines.push('')
  lines.push(`\`\`\`typescript`)
  lines.push(`import { QueryClient, QueryClientProvider } from '@tanstack/react-query'`)
  lines.push(`// Authentication is handled automatically by dataverse-utilities or model-driven apps`)
  lines.push('')
  lines.push(`// Create query client`)
  lines.push(`const queryClient = new QueryClient()`)
  lines.push('')
  lines.push(`function App() {`)
  lines.push(`  return (`)
  lines.push(`    <QueryClientProvider client={queryClient}>`)
  lines.push(`      {/* Your app components */}`)
  lines.push(`    </QueryClientProvider>`)
  lines.push(`  )`)
  lines.push(`}`)
  lines.push(`\`\`\``)
  lines.push('')
  
  lines.push(`## Available Hooks`)
  lines.push('')
  
  // Document first few entities as examples
  const exampleEntities = entities.slice(0, 3)
  
  for (const entity of exampleEntities) {
    const interfaceName = entity.schemaName
    const displayName = entity.displayName
    
    lines.push(`### ${displayName}`)
    lines.push('')
    
    lines.push(`\`\`\`typescript`)
    lines.push(`import { use${interfaceName}, use${interfaceName}List } from './hooks'`)
    lines.push('')
    lines.push(`// Fetch single entity`)
    lines.push(`const { data, isLoading, error } = use${interfaceName}('${generateSampleGuid()}')`)
    lines.push('')
    lines.push(`// Fetch entity list with filters`)
    lines.push(`const { data: entities } = use${interfaceName}List({`)
    lines.push(`  statecode: 0, // Active records only`)
    lines.push(`  ${entity.primaryNameAttribute}: { $contains: 'project' }`)
    lines.push(`})`)
    lines.push('')
    lines.push(`// Count entities`)
    lines.push(`const { data: count } = use${interfaceName}Count({`)
    lines.push(`  statecode: 0`)
    lines.push(`})`)
    lines.push(`\`\`\``)
    lines.push('')
  }
  
  lines.push(`## Type Safety`)
  lines.push('')
  lines.push(`All hooks provide full TypeScript type safety:`)
  lines.push('')
  lines.push(`- **Filters**: Auto-completion for all entity fields and operators`)
  lines.push(`- **Select**: Only valid field names are allowed`)
  lines.push(`- **Option Sets**: Use generated constants for type-safe values`)
  lines.push(`- **Relationships**: Type-safe expansion of related entities`)
  lines.push('')
  
  lines.push(`## Advanced Usage`)
  lines.push('')
  lines.push(`\`\`\`typescript`)
  lines.push(`// Complex filtering with option sets`)
  lines.push(`const { data } = usePumInitiativeList({`)
  lines.push(`  $filter: {`)
  lines.push(`    $and: [`)
  lines.push(`      { statecode: PumInitiativeStatecode.Active.Value },`)
  lines.push(`      { pum_status: PumStatus.InProgress.Value }`)
  lines.push(`    ]`)
  lines.push(`  },`)
  lines.push(`  $select: ['pum_name', 'pum_description', 'createdon'],`)
  lines.push(`  $orderby: { createdon: 'desc' },`)
  lines.push(`  $top: 10`)
  lines.push(`})`)
  lines.push('')
  lines.push(`// Cache invalidation`)
  lines.push(`import { useQueryClient } from '@tanstack/react-query'`)
  lines.push(`import { invalidateEntityQueries } from 'dataverse-type-gen'`)
  lines.push('')
  lines.push(`const queryClient = useQueryClient()`)
  lines.push('')
  lines.push(`// Invalidate all initiative queries`)
  lines.push(`await invalidateEntityQueries(queryClient, 'pum_initiative')`)
  lines.push('')
  lines.push(`// Invalidate specific query`)
  lines.push(`await invalidateEntityQueries(queryClient, 'pum_initiative', {`)
  lines.push(`  operation: 'single',`)
  lines.push(`  id: '123e4567-e89b-12d3-a456-426614174000'`)
  lines.push(`})`)
  lines.push(`\`\`\``)
  
  return lines.join('\n')
}

/**
 * Utility functions
 */


function generateSampleGuid(): string {
  return '123e4567-e89b-12d3-a456-426614174000'
}

function generateOptionSetConstantName(optionSetName: string): string {
  return optionSetName
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

