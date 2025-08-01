/**
 * Query builders generation
 * Contains logic for generating entity-specific query builders and helper functions
 */

import type { ProcessedEntityMetadata } from '../../processors/index.js'
import type { TypeGenerationOptions } from '../index.js'

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
  
  
  // Correct path for queries directory structure
  // Primary entities: queries/entity.queries.ts → ../entity.js
  // Related entities: queries/related/entity.queries.ts → ../../related/entity.js
  const isPrimary = (options.primaryEntities || []).includes(entityMetadata.logicalName)
  const entityImportPath = isPrimary 
    ? `../${entityMetadata.logicalName}.js`
    : `../../related/${entityMetadata.logicalName}.js`
    
  lines.push(`import { ${interfaceName}Meta } from '${entityImportPath}'`)
  lines.push(`import type { ${interfaceName}, ${interfaceName}Expand } from '${entityImportPath}'`)
  lines.push(`import type {`)
  lines.push(`    ODataFilter,`)
  lines.push(`    ODataSelect,`)
  lines.push(`    ODataOrderBy`)
  lines.push(`} from '../query-types.js'`)
  lines.push('')
  lines.push(`// Type-safe options for ${interfaceName} operations`)
  lines.push(`type ${interfaceName}ListOptions = {`)
  lines.push(`    $select?: ODataSelect<${interfaceName}>`)
  lines.push(`    $expand?: ${interfaceName}Expand`)
  lines.push(`    $filter?: ODataFilter<${interfaceName}>`)
  lines.push(`    $orderby?: ODataOrderBy<${interfaceName}>`)
  lines.push(`    $top?: number`)
  lines.push(`    $skip?: number`)
  lines.push(`    $count?: boolean`)
  lines.push(`    $search?: string`)
  lines.push(`}`)
  lines.push('')
  lines.push(`type ${interfaceName}Options = {`)
  lines.push(`    $select?: ODataSelect<${interfaceName}>`)
  lines.push(`    $expand?: ${interfaceName}Expand`)
  lines.push(`}`)
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
  lines.push(`  buildEntityUrl: (id: string, options: ${interfaceName}Options = {}): string => {`)
  lines.push(`    return buildODataUrl('${entitySetName}', options, id)`)
  lines.push(`  },`)
  lines.push(``)
  lines.push(`  /**`)
  lines.push(`   * Build URL for fetching a list of ${entityMetadata.displayName} entities`)
  lines.push(`   */`)
  lines.push(`  buildListUrl: (options: ${interfaceName}ListOptions = {}): string => {`)
  lines.push(`    return buildODataUrl('${entitySetName}', options)`)
  lines.push(`  },`)
  lines.push(``)
  lines.push(`  /**`)
  lines.push(`   * Build URL for counting ${entityMetadata.displayName} entities`)
  lines.push(`   */`)
  lines.push(`  buildCountUrl: (options: Pick<${interfaceName}ListOptions, '$filter'> = {}): string => {`)
  lines.push(`    const baseUrl = buildODataUrl('${entitySetName}', options)`)
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
export function generateQueryHelperFunctions(lines: string[], interfaceName: string): void {
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
  lines.push(`            if (!${interfaceName}Meta.expandableProperties.includes(relationshipName as any)) {`)
  lines.push(`                throw new Error(\`Unknown relationship '\${relationshipName}'. Available relationships: \${${interfaceName}Meta.expandableProperties.join(', ')}\`)`)
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
  lines.push(`                if (!${interfaceName}Meta.expandableProperties.includes(relationshipName as any)) {`)
  lines.push(`                    throw new Error(\`Unknown relationship '\${relationshipName}'. Available relationships: \${${interfaceName}Meta.expandableProperties.join(', ')}\`)`)
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
  lines.push(`const buildODataUrl = (entitySet: string, options: ${interfaceName}ListOptions = {}, id?: string): string => {`)
  lines.push(`    const baseUrl = \`/api/data/v9.2/\${entitySet}\``)
  lines.push(`    const url = id ? \`\${baseUrl}(\${id})\` : baseUrl`)
  lines.push(``)
  lines.push(`    const queryParams = [`)
  lines.push(`        options.$select && \`$select=\${options.$select.join(',')}\`,`)
  lines.push(`        options.$expand && \`$expand=\${buildExpand(options.$expand)}\`,`)
  lines.push(`        options.$filter && \`$filter=\${buildFilter(options.$filter)}\`,`)
  lines.push(`        options.$orderby && \`$orderby=\${buildOrderBy(options.$orderby)}\`,`)
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