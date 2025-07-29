/**
 * Query module exports
 * Provides React Query hooks and URL builders for Dataverse
 */

// Export hooks functionality
export {
  createEntityHooks,
  createQueryClient,
  invalidateEntityQueries,
  createPrefetchFunction,
  type UseQueryResult,
  type UseQueryOptions
} from './hooks.js'

// Export standalone URL builders
export {
  DataverseUrls,
  DataverseHelpers,
  configureDataverseUrls
} from './standalone.js'

// Export auth functionality
export {
  createAuthenticatedFetcher
} from '../auth/index.js'

// Export URL building functions
export {
  buildEntityUrl,
  buildEntitySetUrl,
  buildCountUrl,
  buildRelatedUrl,
  createQueryKey
} from './url-builders.js'

// Export all types
export type {
  EntityMetadata,
  ODataFilter,
  ODataQueryOptions,
  ODataResponse,
  ODataOrderBy,
  ODataSelect,
  ODataExpand,
  UseEntityOptions,
  UseEntityListOptions,
  EntityCreateInput,
  EntityUpdateInput,
  DataverseError,
  DataverseUrlConfig,
  UrlBuilderOptions
} from './types.js'