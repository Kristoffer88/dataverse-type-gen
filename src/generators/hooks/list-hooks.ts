/**
 * List and count hooks generation
 * Contains logic for generating entity list and count React Query hooks
 */

import type { ProcessedEntityMetadata } from '../../processors/index.js'
import { generateOptionSetConstantName } from './entity-hooks.js'

/**
 * Generate hook for fetching a list of entities
 */
export function generateEntityListHook(
  lines: string[],
  interfaceName: string,
  schemaTypeName: string,
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
    lines.push(` *       { createdon: { $gte: new Date() } }`)
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
  lines.push(`      const url = ${interfaceName}Queries.buildListUrl({ $filter, $select, $expand, $orderby, $top, $skip })`)
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
export function generateEntityCountHook(
  lines: string[],
  interfaceName: string,
  schemaTypeName: string,
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
  lines.push(`      const url = ${interfaceName}Queries.buildCountUrl({ $filter })`)
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