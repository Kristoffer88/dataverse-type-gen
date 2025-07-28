/**
 * Generate React Query hooks for Dataverse entities
 * Extends the existing type generation with useQuery hooks
 */

import type { 
  ProcessedEntityMetadata
} from '../processors/index.js'

import type { TypeGenerationOptions } from './index.js'

/**
 * Generate React Query hooks for an entity
 */
export function generateEntityHooks(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  
  const interfaceName = entityMetadata.schemaName
  const hooksName = `use${interfaceName}`
  
  // Import statements
  lines.push(`import { createEntityHooks } from 'dataverse-type-gen'`)
  lines.push(`import type { ODataFilter, UseEntityOptions, UseEntityListOptions } from 'dataverse-type-gen'`)
  lines.push(`import { ${interfaceName}Metadata } from '../${entityMetadata.logicalName}.js'`)
  lines.push(`import type { ${interfaceName} } from '../${entityMetadata.logicalName}.js'`)
  
  // Import binding types if they exist
  const pascalTypeName = toPascalCaseTypeName(entityMetadata.schemaName)
  lines.push(`import type { ${pascalTypeName}Create, ${pascalTypeName}Update } from '../${entityMetadata.logicalName}.js'`)
  
  lines.push('')
  
  // Add hooks comment
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * React Query hooks for ${entityMetadata.displayName}`)
    lines.push(` * Provides type-safe data fetching with caching and synchronization`)
    lines.push(` * `)
    lines.push(` * @example`)
    lines.push(` * // Fetch single entity`)
    lines.push(` * const { data: entity } = ${hooksName}.useEntity('${generateSampleGuid()}')`)
    lines.push(` * `)
    lines.push(` * // Fetch entity list with filters`)
    lines.push(` * const { data: entities } = ${hooksName}.useEntityList({`)
    lines.push(` *   statecode: ${getFirstOptionSetExample(entityMetadata)}`)
    lines.push(` * })`)
    lines.push(` */`)
  }
  
  // Create the hooks object
  lines.push(`export const ${hooksName} = createEntityHooks<`)
  lines.push(`  ${interfaceName},`)
  lines.push(`  ${pascalTypeName}Create,`)
  lines.push(`  ${pascalTypeName}Update`)
  lines.push(`>(${interfaceName}Metadata)`)
  
  lines.push('')
  
  // Add convenience exports with better names
  lines.push(`// Convenience exports with entity-specific names`)
  lines.push(`export const useEntity = ${hooksName}.useEntity`)
  lines.push(`export const useEntityList = ${hooksName}.useEntityList`)
  lines.push(`export const useEntityCount = ${hooksName}.useEntityCount`)
  lines.push(`export const useRelatedEntities = ${hooksName}.useRelatedEntities`)
  
  lines.push('')
  
  // Add TypeScript helper types for common filter patterns
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Common filter patterns for ${entityMetadata.displayName}`)
    lines.push(` */`)
  }
  
  lines.push(`export type ${interfaceName}Filters = ODataFilter<${interfaceName}>`)
  
  // Note: Option set helper filters are disabled to avoid import issues
  // TODO: Add proper imports for option set constants before generating helpers
  
  lines.push('')
  
  // Add query key helpers
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Query key factory for ${entityMetadata.displayName}`)
    lines.push(` * Use these keys for manual cache manipulation`)
    lines.push(` */`)
  }
  lines.push(`export const ${interfaceName}QueryKeys = {`)
  lines.push(`  all: ['dataverse', '${entityMetadata.logicalName}'] as const,`)
  lines.push(`  lists: () => [...${interfaceName}QueryKeys.all, 'list'] as const,`)
  lines.push(`  list: (filters?: ${interfaceName}Filters) => [...${interfaceName}QueryKeys.lists(), { filters }] as const,`)
  lines.push(`  details: () => [...${interfaceName}QueryKeys.all, 'detail'] as const,`)
  lines.push(`  detail: (id: string) => [...${interfaceName}QueryKeys.details(), id] as const,`)
  lines.push(`  counts: () => [...${interfaceName}QueryKeys.all, 'count'] as const,`)
  lines.push(`  count: (filters?: ${interfaceName}Filters) => [...${interfaceName}QueryKeys.counts(), { filters }] as const,`)
  lines.push(`}`)
  
  return lines.join('\n')
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