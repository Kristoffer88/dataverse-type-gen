/**
 * Generate React Query hooks for Dataverse entities
 * Extends the existing type generation with useQuery hooks
 */

import type { 
  ProcessedEntityMetadata
} from '../processors/index.js'

import type { TypeGenerationOptions } from './index.js'

/**
 * Generate individual, composable React Query hooks for an entity
 * Each hook is standalone and can be easily customized by developers
 */
export function generateEntityHooks(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  
  const interfaceName = entityMetadata.schemaName
  const pascalTypeName = toPascalCaseTypeName(entityMetadata.schemaName)
  const entitySetName = entityMetadata.entitySetName
  const primaryKey = entityMetadata.primaryIdAttribute
  
  // Import statements
  lines.push(`import { useQuery } from '@tanstack/react-query'`)
  lines.push(`import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'`)
  lines.push(`import { ${interfaceName}Metadata } from '../${entityMetadata.logicalName}.js'`)
  lines.push(`import type { ${interfaceName} } from '../${entityMetadata.logicalName}.js'`)
  
  // Import option set constants for examples
  const stateAttribute = entityMetadata.attributes.find(attr => attr.logicalName === 'statecode')
  if (stateAttribute?.optionSetName) {
    const stateConstantName = generateOptionSetConstantName(stateAttribute.optionSetName)
    lines.push(`import { ${stateConstantName} } from '../${entityMetadata.logicalName}.js'`)
  }
  
  lines.push('')
  
  // Add type definitions
  lines.push(`// Global fetch function - configure this with your authenticated fetch`)
  lines.push(`let globalFetch: (input: string | URL | Request, init?: RequestInit) => Promise<Response> = fetch`)
  lines.push(``)
  lines.push(`export function configureFetch(fetchFn: typeof fetch): void {`)
  lines.push(`  globalFetch = fetchFn`)
  lines.push(`}`)
  lines.push(``)
  
  // Add OData types
  lines.push(`type ODataResponse<T> = {`)
  lines.push(`  value: T[]`)
  lines.push(`  '@odata.count'?: number`)
  lines.push(`  '@odata.nextLink'?: string`)
  lines.push(`}`)
  lines.push(``)
  
  lines.push(`type ODataFilter<T> = {`)
  lines.push(`  [K in keyof T]?: T[K] | { $eq?: T[K]; $ne?: T[K]; $contains?: string; $startswith?: string; $gt?: T[K]; $lt?: T[K] }`)
  lines.push(`} & {`)
  lines.push(`  $and?: ODataFilter<T>[]`)
  lines.push(`  $or?: ODataFilter<T>[]`)
  lines.push(`}`)
  lines.push(``)
  
  lines.push(`type EntityOptions = {`)
  lines.push(`  $select?: string[]`)
  lines.push(`  $expand?: string[]`)
  lines.push(`}`)
  lines.push(``)
  
  lines.push(`type EntityListOptions<T> = EntityOptions & {`)
  lines.push(`  $filter?: ODataFilter<T>`)
  lines.push(`  $orderby?: { [K in keyof T]?: 'asc' | 'desc' }`)
  lines.push(`  $top?: number`)
  lines.push(`  $skip?: number`)
  lines.push(`}`)
  lines.push(``)
  
  // Modern composable OData URL builder
  lines.push(`const odataOperators = {`)
  lines.push(`  $eq: (field: string, value: any) => \`\${field} eq \${formatValue(value)}\`,`)
  lines.push(`  $ne: (field: string, value: any) => \`\${field} ne \${formatValue(value)}\`,`)
  lines.push(`  $gt: (field: string, value: any) => \`\${field} gt \${formatValue(value)}\`,`)
  lines.push(`  $lt: (field: string, value: any) => \`\${field} lt \${formatValue(value)}\`,`)
  lines.push(`  $contains: (field: string, value: string) => \`contains(\${field}, '\${value}')\`,`)
  lines.push(`  $startswith: (field: string, value: string) => \`startswith(\${field}, '\${value}')\`,`)
  lines.push(`} as const`)
  lines.push(``)
  lines.push(`const formatValue = (value: any): string => {`)
  lines.push(`  if (typeof value === 'string') return \`'\${value}'\``)
  lines.push(`  if (value instanceof Date) return value.toISOString()`)
  lines.push(`  return String(value)`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`const buildFilter = (filter: Record<string, any>): string => {`)
  lines.push(`  const conditions = Object.entries(filter)`)
  lines.push(`    .filter(([key]) => !key.startsWith('$'))`)
  lines.push(`    .map(([field, value]) => {`)
  lines.push(`      if (typeof value === 'object' && value !== null) {`)
  lines.push(`        return Object.entries(value)`)
  lines.push(`          .map(([op, val]) => odataOperators[op as keyof typeof odataOperators]?.(field, val))`)
  lines.push(`          .filter(Boolean)`)
  lines.push(`          .join(' and ')`)
  lines.push(`      }`)
  lines.push(`      return odataOperators.$eq(field, value)`)
  lines.push(`    })`)
  lines.push(`    .filter(Boolean)`)
  lines.push(`  `)
  lines.push(`  return conditions.join(' and ')`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`const buildODataUrl = (entitySet: string, options: EntityListOptions<any> = {}, id?: string): string => {`)
  lines.push(`  const baseUrl = \`/api/data/v9.2/\${entitySet}\``)
  lines.push(`  const url = id ? \`\${baseUrl}(\${id})\` : baseUrl`)
  lines.push(`  `)
  lines.push(`  const queryParams = [`)
  lines.push(`    options.$select && \`$select=\${options.$select.join(',')}\`,`)
  lines.push(`    options.$expand && \`$expand=\${options.$expand.join(',')}\`,`)
  lines.push(`    options.$filter && \`$filter=\${buildFilter(options.$filter)}\`,`)
  lines.push(`    options.$orderby && \`$orderby=\${Object.entries(options.$orderby).map(([f, d]) => \`\${f} \${d}\`).join(', ')}\`,`)
  lines.push(`    options.$top && \`$top=\${options.$top}\`,`)
  lines.push(`    options.$skip && \`$skip=\${options.$skip}\`,`)
  lines.push(`  ].filter(Boolean)`)
  lines.push(`  `)
  lines.push(`  return queryParams.length > 0 ? \`\${url}?\${queryParams.join('&')}\` : url`)
  lines.push(`}`)
  lines.push(``)
  
  // Generate individual hooks
  generateSingleEntityHook(lines, interfaceName, pascalTypeName, entitySetName, primaryKey, entityMetadata, includeComments)
  lines.push('')
  
  generateEntityListHook(lines, interfaceName, pascalTypeName, entitySetName, entityMetadata, includeComments)
  lines.push('')
  
  generateEntityCountHook(lines, interfaceName, pascalTypeName, entitySetName, entityMetadata, includeComments)
  lines.push('')
  
  // Add query keys
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Query keys for cache management`)
    lines.push(` * Use these to invalidate or prefetch specific queries`)
    lines.push(` */`)
  }
  lines.push(`export const ${pascalTypeName}QueryKeys = {`)
  lines.push(`  all: ['${entityMetadata.logicalName}'] as const,`)
  lines.push(`  detail: (id: string) => [...${pascalTypeName}QueryKeys.all, 'detail', id] as const,`)
  lines.push(`  list: (options?: EntityListOptions<${interfaceName}>) => [...${pascalTypeName}QueryKeys.all, 'list', options] as const,`)
  lines.push(`  count: (options?: EntityListOptions<${interfaceName}>) => [...${pascalTypeName}QueryKeys.all, 'count', options] as const,`)
  lines.push(`}`)
  
  return lines.join('\n')
}

/**
 * Generate hook for fetching a single entity
 */
function generateSingleEntityHook(
  lines: string[],
  interfaceName: string,
  pascalTypeName: string,
  entitySetName: string,
  primaryKey: string,
  entityMetadata: ProcessedEntityMetadata,
  includeComments: boolean
): void {
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Hook for fetching a single ${entityMetadata.displayName}`)
    lines.push(` * `)
    lines.push(` * @param id - The ${primaryKey} of the entity`)
    lines.push(` * @param options - Query options including $select, $expand, and React Query options`)
    lines.push(` * `)
    lines.push(` * @example`)
    lines.push(` * const { data: initiative, isLoading, error } = use${pascalTypeName}(`)
    lines.push(` *   '123e4567-e89b-12d3-a456-426614174000',`)
    lines.push(` *   { $select: ['${entityMetadata.primaryNameAttribute}', '${entityMetadata.attributes[0]?.logicalName || 'field'}'] }`)
    lines.push(` * )`)
    lines.push(` */`)
  }
  
  lines.push(`export function use${pascalTypeName}(`)
  lines.push(`  id: string | undefined,`)
  lines.push(`  options: EntityOptions & Omit<UseQueryOptions<${interfaceName}>, 'queryKey' | 'queryFn'> = {}`)
  lines.push(`): UseQueryResult<${interfaceName}> {`)
  lines.push(`  const { $select, $expand, ...queryOptions } = options`)
  lines.push(`  `)
  lines.push(`  return useQuery({`)
  lines.push(`    queryKey: ${pascalTypeName}QueryKeys.detail(id || ''),`)
  lines.push(`    queryFn: async (): Promise<${interfaceName}> => {`)
  lines.push(`      if (!id) throw new Error('ID is required')`)
  lines.push(`      `)
  lines.push(`      const url = buildODataUrl('${entitySetName}', { $select, $expand }, id)`)
  lines.push(`      const response = await globalFetch(url)`)
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
  pascalTypeName: string,
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
    lines.push(` * Hook for fetching a list of ${entityMetadata.displayName} entities`)
    lines.push(` * `)
    lines.push(` * @param options - Query options including filters, select, expand, orderby, etc.`)
    lines.push(` * `)
    lines.push(` * @example`)
    lines.push(` * const { data: initiatives } = use${pascalTypeName}List({`)
    lines.push(` *   $filter: { statecode: ${stateExample} },`)
    lines.push(` *   $select: ['${entityMetadata.primaryNameAttribute}', '${entityMetadata.attributes[0]?.logicalName || 'field'}'],`)
    lines.push(` *   $orderby: { ${entityMetadata.primaryNameAttribute}: 'asc' },`)
    lines.push(` *   $top: 10`)
    lines.push(` * })`)
    lines.push(` */`)
  }
  
  lines.push(`export function use${pascalTypeName}List(`)
  lines.push(`  options: EntityListOptions<${interfaceName}> & Omit<UseQueryOptions<ODataResponse<${interfaceName}>>, 'queryKey' | 'queryFn'> = {}`)
  lines.push(`): UseQueryResult<ODataResponse<${interfaceName}>> {`)
  lines.push(`  const { $filter, $select, $expand, $orderby, $top, $skip, ...queryOptions } = options`)
  lines.push(`  `)
  lines.push(`  return useQuery({`)
  lines.push(`    queryKey: ${pascalTypeName}QueryKeys.list({ $filter, $select, $expand, $orderby, $top, $skip }),`)
  lines.push(`    queryFn: async (): Promise<ODataResponse<${interfaceName}>> => {`)
  lines.push(`      const url = buildODataUrl('${entitySetName}', { $filter, $select, $expand, $orderby, $top, $skip })`)
  lines.push(`      const response = await globalFetch(url)`)
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
  pascalTypeName: string,
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
    lines.push(` * const { data: count } = use${pascalTypeName}Count({`)
    lines.push(` *   $filter: { statecode: 0 }`)
    lines.push(` * })`)
    lines.push(` */`)
  }
  
  lines.push(`export function use${pascalTypeName}Count(`)
  lines.push(`  options: Pick<EntityListOptions<${interfaceName}>, '$filter'> & Omit<UseQueryOptions<number>, 'queryKey' | 'queryFn'> = {}`)
  lines.push(`): UseQueryResult<number> {`)
  lines.push(`  const { $filter, ...queryOptions } = options`)
  lines.push(`  `)
  lines.push(`  return useQuery({`)
  lines.push(`    queryKey: ${pascalTypeName}QueryKeys.count({ $filter }),`)
  lines.push(`    queryFn: async (): Promise<number> => {`)
  lines.push(`      const url = buildODataUrl('${entitySetName}', { $filter }) + ($filter ? '&' : '?') + '$count=true'`)
  lines.push(`      const response = await globalFetch(url.replace('${entitySetName}', '${entitySetName}/$count'))`)
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
 * Generate a separate hooks file for an entity
 */
export function generateEntityHooksFile(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const lines: string[] = []
  
  // File header
  lines.push(`// Generated React Query hooks for ${entityMetadata.schemaName}`)
  lines.push(`// Entity: ${entityMetadata.displayName}`)
  lines.push(`// Generated: ${new Date().toISOString()}`)
  lines.push('')
  
  // Generate the hooks
  lines.push(generateEntityHooks(entityMetadata, options))
  
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
  lines.push(`export { configureFetch, createEntityHooks, invalidateEntityQueries } from 'dataverse-type-gen'`)
  
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
  lines.push(`import { configureFetch, createAuthenticatedFetcher } from 'dataverse-type-gen'`)
  lines.push('')
  lines.push(`// Configure authentication`)
  lines.push(`const authenticatedFetch = createAuthenticatedFetcher()`)
  lines.push(`configureFetch(authenticatedFetch)`)
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

function toPascalCaseTypeName(schemaName: string): string {
  if (schemaName.includes('_')) {
    const parts = schemaName.split('_')
    return parts.map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('')
  }
  
  return schemaName.charAt(0).toUpperCase() + schemaName.slice(1)
}

function generateSampleGuid(): string {
  return '123e4567-e89b-12d3-a456-426614174000'
}

function generateOptionSetConstantName(optionSetName: string): string {
  return optionSetName
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

function getFirstOptionSetExample(entityMetadata: ProcessedEntityMetadata): string {
  const stateAttribute = entityMetadata.attributes.find(attr => attr.logicalName === 'statecode')
  if (stateAttribute?.optionSetName) {
    const constantName = generateOptionSetConstantName(stateAttribute.optionSetName)
    return `${constantName}.Active.Value`
  }
  return '0 // Active'
}