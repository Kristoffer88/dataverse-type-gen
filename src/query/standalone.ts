/**
 * Standalone URL utilities for Dataverse Web API
 * Perfect for users who don't want to use React Query but need type-safe URLs
 */

import type { 
  EntityMetadata, 
  ODataFilter, 
  ODataQueryOptions,
  DataverseUrlConfig
} from './types.js'

import { 
  buildEntityUrl, 
  buildEntitySetUrl, 
  buildCountUrl, 
  buildRelatedUrl,
  buildUrl
} from './url-builders.js'


/**
 * Default configuration
 */
let defaultConfig: DataverseUrlConfig = {
  apiVersion: 'v9.2',
  baseUrl: '/api/data'
}

/**
 * Configure default settings for URL generation
 */
export function configureDataverseUrls(config: DataverseUrlConfig): void {
  defaultConfig = { ...defaultConfig, ...config }
}

/**
 * Standalone URL utilities for Dataverse entities
 * Provides type-safe URL generation without React Query dependency
 */
export const DataverseUrls = {
  /**
   * Get URL for a single entity by ID
   * 
   * @example
   * const url = DataverseUrls.entity(entityMetadata, "123e4567-e89b-12d3-a456-426614174000", {
   *   $select: ['<primary_name_field>', '<description_field>'],
   *   $expand: ['<related_entity>']
   * })
   */
  entity<TEntity>(
    metadata: EntityMetadata,
    id: string,
    options?: Omit<ODataQueryOptions<TEntity>, '$filter' | '$orderby' | '$top' | '$skip' | '$count'> & DataverseUrlConfig
  ): string {
    const config = { ...defaultConfig, ...options }
    return addInstanceUrl(
      buildEntityUrl<TEntity>(metadata, id, { 
        ...options,
        baseUrl: config.baseUrl,
        apiVersion: config.apiVersion 
      }),
      config.instanceUrl
    )
  },

  /**
   * Get URL for entity collection (list)
   * 
   * @example
   * const url = DataverseUrls.entitySet(entityMetadata, {
   *   $filter: { 
   *     '<name_field>': { $contains: "search_term" },
   *     statecode: '<EntityStatecode>'.Active.Value 
   *   },
   *   $select: ['<primary_name_field>', '<description_field>'],
   *   $orderby: { '<name_field>': 'asc' },
   *   $top: 50
   * })
   */
  entitySet<TEntity>(
    metadata: EntityMetadata,
    options?: ODataQueryOptions<TEntity> & DataverseUrlConfig
  ): string {
    const config = { ...defaultConfig, ...options }
    return addInstanceUrl(
      buildEntitySetUrl<TEntity>(metadata, { 
        ...options,
        baseUrl: config.baseUrl,
        apiVersion: config.apiVersion 
      }),
      config.instanceUrl
    )
  },

  /**
   * Get URL for counting entities
   * 
   * @example
   * const url = DataverseUrls.count(entityMetadata, {
   *   $filter: { statecode: '<EntityStatecode>'.Active.Value }
   * })
   */
  count<TEntity>(
    metadata: EntityMetadata,
    options?: { $filter?: ODataFilter<TEntity> } & DataverseUrlConfig
  ): string {
    const config = { ...defaultConfig, ...options }
    return addInstanceUrl(
      buildCountUrl<TEntity>(metadata, { 
        $filter: options?.$filter,
        baseUrl: config.baseUrl,
        apiVersion: config.apiVersion 
      }),
      config.instanceUrl
    )
  },

  /**
   * Get URL for related entities
   * 
   * @example
   * const url = DataverseUrls.related(entityMetadata, "123e4567-e89b-12d3-a456-426614174000", "<entity_relationship>", {
   *   $filter: { statecode: '<RelatedEntityStatecode>'.Active.Value },
   *   $select: ['<primary_name_field>', '<date_field>'],
   *   $orderby: { '<date_field>': 'asc' }
   * })
   */
  related<TRelated = Record<string, unknown>>(
    metadata: EntityMetadata,
    id: string,
    relationshipName: string,
    options?: Omit<ODataQueryOptions<TRelated>, '$expand' | '$count'> & DataverseUrlConfig
  ): string {
    const config = { ...defaultConfig, ...options }
    return addInstanceUrl(
      buildRelatedUrl<TRelated>(metadata, id, relationshipName, { 
        ...options,
        baseUrl: config.baseUrl,
        apiVersion: config.apiVersion 
      }),
      config.instanceUrl
    )
  },

  /**
   * Build a custom URL with query parameters
   * 
   * @example
   * const url = DataverseUrls.custom('/CustomAPI', { param1: 'value1' })
   */
  custom(
    endpoint: string,
    queryParams?: Record<string, string | number | boolean>,
    config?: DataverseUrlConfig
  ): string {
    const urlConfig = { ...defaultConfig, ...config }
    const params = new URLSearchParams()
    
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, String(value))
      })
    }
    
    return addInstanceUrl(
      buildUrl(endpoint, params, {
        baseUrl: urlConfig.baseUrl,
        apiVersion: urlConfig.apiVersion
      }),
      urlConfig.instanceUrl
    )
  },

  /**
   * Build batch request URL
   * 
   * @example
   * const url = DataverseUrls.batch()
   */
  batch(config?: DataverseUrlConfig): string {
    const urlConfig = { ...defaultConfig, ...config }
    return addInstanceUrl(
      buildUrl('/$batch', undefined, {
        baseUrl: urlConfig.baseUrl,
        apiVersion: urlConfig.apiVersion
      }),
      urlConfig.instanceUrl
    )
  }
}

/**
 * Add instance URL prefix if provided
 */
function addInstanceUrl(url: string, instanceUrl?: string): string {
  if (instanceUrl) {
    // Remove trailing slash from instance URL
    const cleanInstanceUrl = instanceUrl.replace(/\/$/, '')
    return `${cleanInstanceUrl}${url}`
  }
  return url
}

/**
 * Helper functions for common URL patterns
 */
export const DataverseHelpers = {
  /**
   * Create a URL for WebResource access
   */
  webResource(name: string, config?: DataverseUrlConfig): string {
    const urlConfig = { ...defaultConfig, ...config }
    return addInstanceUrl(`/WebResources/${name}`, urlConfig.instanceUrl)
  },

  /**
   * Create a URL for executing a custom API
   */
  customApi(
    apiName: string,
    parameters?: Record<string, unknown>,
    config?: DataverseUrlConfig
  ): string {
    const urlConfig = { ...defaultConfig, ...config }
    const params = new URLSearchParams()
    
    if (parameters) {
      Object.entries(parameters).forEach(([key, value]) => {
        params.append(key, String(value))
      })
    }
    
    return addInstanceUrl(
      buildUrl(`/${apiName}`, params, {
        baseUrl: urlConfig.baseUrl,
        apiVersion: urlConfig.apiVersion
      }),
      urlConfig.instanceUrl
    )
  },

  /**
   * Create a URL for executing a workflow/action
   */
  action(
    actionName: string,
    config?: DataverseUrlConfig
  ): string {
    const urlConfig = { ...defaultConfig, ...config }
    return addInstanceUrl(
      buildUrl(`/${actionName}`, undefined, {
        baseUrl: urlConfig.baseUrl,
        apiVersion: urlConfig.apiVersion
      }),
      urlConfig.instanceUrl
    )
  },

  /**
   * Create a URL for executing a function
   */
  function(
    functionName: string,
    parameters?: Record<string, unknown>,
    config?: DataverseUrlConfig
  ): string {
    const urlConfig = { ...defaultConfig, ...config }
    
    // Functions use parameters in the URL path, not query parameters
    let functionUrl = `/${functionName}`
    
    if (parameters) {
      const paramPairs = Object.entries(parameters).map(([key, value]) => {
        let formattedValue: string
        if (typeof value === 'string') {
          formattedValue = `'${value.replace(/'/g, "''")}'`
        } else {
          formattedValue = String(value)
        }
        return `${key}=${formattedValue}`
      })
      
      if (paramPairs.length > 0) {
        functionUrl += `(${paramPairs.join(',')})`
      }
    }
    
    return addInstanceUrl(
      buildUrl(functionUrl, undefined, {
        baseUrl: urlConfig.baseUrl,
        apiVersion: urlConfig.apiVersion
      }),
      urlConfig.instanceUrl
    )
  }
}

/**
 * Export the configuration function for easy access
 */
export { configureDataverseUrls as configure }