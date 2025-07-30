/**
 * Individual entity hooks generation
 * Contains logic for generating single entity React Query hooks
 */

import type { ProcessedEntityMetadata } from '../../processors/index.js'

/**
 * Generate entity-specific examples for documentation
 */
export function generateEntitySpecificExamples(entityMetadata: ProcessedEntityMetadata): {
  primaryName: string
  secondaryField: string
} {
  const primaryName = entityMetadata.primaryNameAttribute || 'name'
  const secondaryField = entityMetadata.attributes.find(a => a.logicalName !== primaryName)?.logicalName || 'createdon'
  
  return { primaryName, secondaryField }
}

/**
 * Generate hook for fetching a single entity
 */
export function generateSingleEntityHook(
  lines: string[],
  interfaceName: string,
  schemaTypeName: string,
  primaryKey: string,
  entityMetadata: ProcessedEntityMetadata,
  includeComments: boolean
): void {
  if (includeComments) {
    const examples = generateEntitySpecificExamples(entityMetadata)
    
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
    lines.push(` *   '<entity-id>',`)
    lines.push(` *   { `)
    lines.push(` *     $select: ['${examples.primaryName}', '${examples.secondaryField}'],`)
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
  lines.push(`      const url = ${interfaceName}Queries.buildEntityUrl(id, { $select, $expand })`)
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
 * Generate option set constant name from option set name
 */
export function generateOptionSetConstantName(optionSetName: string): string {
  return optionSetName
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

