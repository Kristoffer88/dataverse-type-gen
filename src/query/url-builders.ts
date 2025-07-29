/**
 * URL builders for Dataverse Web API with full OData support
 * Provides type-safe URL construction for entities, filtering, and relationships
 */

import type { 
  EntityMetadata, 
  ODataQueryOptions, 
  ODataFilter, 
  UrlBuilderOptions
} from './types.js'

/**
 * Default API configuration
 */
const DEFAULT_CONFIG = {
  apiVersion: 'v9.2',
  baseUrl: '/api/data'
} as const

/**
 * Build a complete Dataverse Web API URL with query parameters
 */
export function buildUrl(
  endpoint: string, 
  queryParams?: URLSearchParams,
  options?: { baseUrl?: string; apiVersion?: string }
): string {
  const { baseUrl = DEFAULT_CONFIG.baseUrl, apiVersion = DEFAULT_CONFIG.apiVersion } = options || {}
  
  const fullEndpoint = `${baseUrl}/${apiVersion}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  
  if (queryParams && queryParams.toString()) {
    return `${fullEndpoint}?${queryParams.toString()}`
  }
  
  return fullEndpoint
}

/**
 * Build URL for retrieving a single entity by ID
 */
export function buildEntityUrl<TEntity>(
  metadata: EntityMetadata,
  id: string,
  options?: UrlBuilderOptions<TEntity>
): string {
  const { baseUrl, apiVersion, $select, $expand } = options || {}
  
  const params = new URLSearchParams()
  
  // Add select parameter
  if ($select && $select.length > 0) {
    params.append('$select', $select.join(','))
  }
  
  // Add expand parameter
  if ($expand) {
    if (Array.isArray($expand) && $expand.length > 0) {
      params.append('$expand', $expand.join(','))
    } else if (typeof $expand === 'object' && Object.keys($expand).length > 0) {
      // Handle object format - for now just use keys, full implementation would be in buildExpand
      params.append('$expand', Object.keys($expand).join(','))
    }
  }
  
  const endpoint = `/${metadata.entitySetName}(${id})`
  return buildUrl(endpoint, params, { baseUrl, apiVersion })
}

/**
 * Build URL for retrieving multiple entities (entity set)
 */
export function buildEntitySetUrl<TEntity>(
  metadata: EntityMetadata,
  options?: UrlBuilderOptions<TEntity>
): string {
  const { 
    baseUrl, 
    apiVersion, 
    $filter, 
    $select, 
    $expand, 
    $orderby, 
    $top, 
    $skip, 
    $count 
  } = options || {}
  
  const params = new URLSearchParams()
  
  // Add filter parameter
  if ($filter) {
    const filterString = buildFilterString($filter)
    if (filterString) {
      params.append('$filter', filterString)
    }
  }
  
  // Add select parameter
  if ($select && $select.length > 0) {
    params.append('$select', $select.join(','))
  }
  
  // Add expand parameter
  if ($expand) {
    if (Array.isArray($expand) && $expand.length > 0) {
      params.append('$expand', $expand.join(','))
    } else if (typeof $expand === 'object' && Object.keys($expand).length > 0) {
      // Handle object format - for now just use keys, full implementation would be in buildExpand
      params.append('$expand', Object.keys($expand).join(','))
    }
  }
  
  // Add orderby parameter
  if ($orderby) {
    if (Array.isArray($orderby)) {
      params.append('$orderby', $orderby.join(','))
    } else {
      const orderbyString = Object.entries($orderby)
        .map(([field, direction]) => `${field} ${direction}`)
        .join(',')
      if (orderbyString) {
        params.append('$orderby', orderbyString)
      }
    }
  }
  
  // Add pagination parameters
  if ($top !== undefined) {
    params.append('$top', $top.toString())
  }
  
  if ($skip !== undefined) {
    params.append('$skip', $skip.toString())
  }
  
  // Add count parameter
  if ($count) {
    params.append('$count', 'true')
  }
  
  const endpoint = `/${metadata.entitySetName}`
  return buildUrl(endpoint, params, { baseUrl, apiVersion })
}

/**
 * Build URL for retrieving related entities
 */
export function buildRelatedUrl<TEntity>(
  metadata: EntityMetadata,
  id: string,
  relationshipName: string,
  options?: UrlBuilderOptions<TEntity>
): string {
  const { 
    baseUrl, 
    apiVersion, 
    $filter, 
    $select, 
    $orderby, 
    $top, 
    $skip 
  } = options || {}
  
  const params = new URLSearchParams()
  
  // Add filter parameter
  if ($filter) {
    const filterString = buildFilterString($filter)
    if (filterString) {
      params.append('$filter', filterString)
    }
  }
  
  // Add select parameter
  if ($select && $select.length > 0) {
    params.append('$select', $select.join(','))
  }
  
  // Add orderby parameter
  if ($orderby) {
    if (Array.isArray($orderby)) {
      params.append('$orderby', $orderby.join(','))
    } else {
      const orderbyString = Object.entries($orderby)
        .map(([field, direction]) => `${field} ${direction}`)
        .join(',')
      if (orderbyString) {
        params.append('$orderby', orderbyString)
      }
    }
  }
  
  // Add pagination parameters
  if ($top !== undefined) {
    params.append('$top', $top.toString())
  }
  
  if ($skip !== undefined) {
    params.append('$skip', $skip.toString())
  }
  
  const endpoint = `/${metadata.entitySetName}(${id})/${relationshipName}`
  return buildUrl(endpoint, params, { baseUrl, apiVersion })
}

/**
 * Build URL for counting entities
 */
export function buildCountUrl<TEntity>(
  metadata: EntityMetadata,
  options?: Pick<UrlBuilderOptions<TEntity>, '$filter' | 'baseUrl' | 'apiVersion'>
): string {
  const { baseUrl, apiVersion, $filter } = options || {}
  
  const params = new URLSearchParams()
  
  // Add filter parameter
  if ($filter) {
    const filterString = buildFilterString($filter)
    if (filterString) {
      params.append('$filter', filterString)
    }
  }
  
  const endpoint = `/${metadata.entitySetName}/$count`
  return buildUrl(endpoint, params, { baseUrl, apiVersion })
}

/**
 * Build OData filter string from filter object
 */
export function buildFilterString<TEntity>(filter: ODataFilter<TEntity>): string {
  return buildFilterExpression(filter)
}

/**
 * Recursively build filter expressions
 */
function buildFilterExpression<TEntity>(filter: ODataFilter<TEntity>): string {
  const expressions: string[] = []
  
  for (const [key, value] of Object.entries(filter)) {
    if (key === '$and' && Array.isArray(value)) {
      const andExpressions = value.map(f => buildFilterExpression(f)).filter(Boolean)
      if (andExpressions.length > 0) {
        expressions.push(`(${andExpressions.join(' and ')})`)
      }
    } else if (key === '$or' && Array.isArray(value)) {
      const orExpressions = value.map(f => buildFilterExpression(f)).filter(Boolean)
      if (orExpressions.length > 0) {
        expressions.push(`(${orExpressions.join(' or ')})`)
      }
    } else if (key === '$not' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const notExpression = buildFilterExpression(value as ODataFilter<TEntity>)
      if (notExpression) {
        expressions.push(`not (${notExpression})`)
      }
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Handle field operators
      const fieldExpression = buildFieldExpression(key, value)
      if (fieldExpression) {
        expressions.push(fieldExpression)
      }
    } else {
      // Handle direct value comparison (field: value)
      expressions.push(buildDirectComparison(key, value))
    }
  }
  
  return expressions.join(' and ')
}

/**
 * Build expression for a single field with operators
 */
function buildFieldExpression(fieldName: string, operators: Record<string, unknown>): string {
  const expressions: string[] = []
  
  for (const [operator, value] of Object.entries(operators)) {
    switch (operator) {
      case '$eq':
        expressions.push(`${fieldName} eq ${formatValue(value)}`)
        break
      case '$ne':
        expressions.push(`${fieldName} ne ${formatValue(value)}`)
        break
      case '$gt':
        expressions.push(`${fieldName} gt ${formatValue(value)}`)
        break
      case '$gte':
        expressions.push(`${fieldName} ge ${formatValue(value)}`)
        break
      case '$lt':
        expressions.push(`${fieldName} lt ${formatValue(value)}`)
        break
      case '$lte':
        expressions.push(`${fieldName} le ${formatValue(value)}`)
        break
      case '$in':
        if (Array.isArray(value) && value.length > 0) {
          const inValues = value.map(v => formatValue(v)).join(',')
          expressions.push(`${fieldName} in (${inValues})`)
        }
        break
      case '$nin':
        if (Array.isArray(value) && value.length > 0) {
          const ninValues = value.map(v => `${fieldName} ne ${formatValue(v)}`).join(' and ')
          expressions.push(`(${ninValues})`)
        }
        break
      case '$contains':
        expressions.push(`contains(${fieldName}, ${formatValue(value)})`)
        break
      case '$startswith':
        expressions.push(`startswith(${fieldName}, ${formatValue(value)})`)
        break
      case '$endswith':
        expressions.push(`endswith(${fieldName}, ${formatValue(value)})`)
        break
      case '$like':
        expressions.push(`${fieldName} like ${formatValue(value)}`)
        break
      case '$null':
        expressions.push(value ? `${fieldName} eq null` : `${fieldName} ne null`)
        break
      case '$notnull':
        expressions.push(value ? `${fieldName} ne null` : `${fieldName} eq null`)
        break
      // Date-specific operators
      case '$today':
        expressions.push(`${fieldName} eq Today()`)
        break
      case '$yesterday':
        expressions.push(`${fieldName} eq Yesterday()`)
        break
      case '$tomorrow':
        expressions.push(`${fieldName} eq Tomorrow()`)
        break
      case '$thisweek':
        expressions.push(`${fieldName} eq ThisWeek()`)
        break
      case '$thismonth':
        expressions.push(`${fieldName} eq ThisMonth()`)
        break
      case '$thisyear':
        expressions.push(`${fieldName} eq ThisYear()`)
        break
      case '$lastweek':
        expressions.push(`${fieldName} eq LastWeek()`)
        break
      case '$lastmonth':
        expressions.push(`${fieldName} eq LastMonth()`)
        break
      case '$lastyear':
        expressions.push(`${fieldName} eq LastYear()`)
        break
      case '$nextweek':
        expressions.push(`${fieldName} eq NextWeek()`)
        break
      case '$nextmonth':
        expressions.push(`${fieldName} eq NextMonth()`)
        break
      case '$nextyear':
        expressions.push(`${fieldName} eq NextYear()`)
        break
      case '$lastxdays':
        expressions.push(`${fieldName} eq LastXDays(${value})`)
        break
      case '$nextxdays':
        expressions.push(`${fieldName} eq NextXDays(${value})`)
        break
      case '$lastxmonths':
        expressions.push(`${fieldName} eq LastXMonths(${value})`)
        break
      case '$nextxmonths':
        expressions.push(`${fieldName} eq NextXMonths(${value})`)
        break
      case '$lastxyears':
        expressions.push(`${fieldName} eq LastXYears(${value})`)
        break
      case '$nextxyears':
        expressions.push(`${fieldName} eq NextXYears(${value})`)
        break
    }
  }
  
  return expressions.join(' and ')
}

/**
 * Build direct comparison (field: value)
 */
function buildDirectComparison(fieldName: string, value: unknown): string {
  return `${fieldName} eq ${formatValue(value)}`
}

/**
 * Format value for OData query
 */
function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return 'null'
  }
  
  if (typeof value === 'string') {
    // Escape single quotes and wrap in quotes
    return `'${value.replace(/'/g, "''")}'`
  }
  
  if (typeof value === 'boolean') {
    return value.toString()
  }
  
  if (typeof value === 'number') {
    return value.toString()
  }
  
  if (value instanceof Date) {
    return value.toISOString()
  }
  
  // Handle GUID format
  if (typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
    return `'${value}'`
  }
  
  return `'${String(value)}'`
}

/**
 * Create query key for React Query based on parameters
 */
export function createQueryKey<TEntity>(
  entityName: string,
  operation: 'single' | 'list' | 'count' | 'related',
  options?: {
    id?: string
    filters?: ODataFilter<TEntity>
    queryOptions?: Omit<ODataQueryOptions<TEntity>, '$filter'>
    relationship?: string
  }
): (string | object)[] {
  const { id, filters, queryOptions, relationship } = options || {}
  
  const key: (string | object)[] = ['dataverse', entityName, operation]
  
  if (id) {
    key.push(id)
  }
  
  if (relationship) {
    key.push('related', relationship)
  }
  
  if (filters) {
    key.push({ filters })
  }
  
  if (queryOptions) {
    key.push({ options: queryOptions })
  }
  
  return key
}