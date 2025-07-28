/**
 * React Query hook factories for Dataverse entities
 * Provides type-safe useQuery hooks with full OData support
 */

import type { 
  EntityMetadata,
  ODataFilter,
  UseEntityOptions,
  UseEntityListOptions,
  ODataResponse,
  DataverseError
} from './types.js'

import { 
  buildEntityUrl, 
  buildEntitySetUrl, 
  buildCountUrl, 
  buildRelatedUrl,
  createQueryKey
} from './url-builders.js'

// Type definitions for React Query (compatible with multiple versions)
export interface UseQueryResult<TData = unknown, TError = unknown> {
  data: TData | undefined
  error: TError | null
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  isIdle: boolean
  isFetching: boolean
  refetch: () => void
  // Additional properties may vary by React Query version
  [key: string]: unknown
}

export interface UseQueryOptions<TData = unknown, TError = unknown> {
  enabled?: boolean
  staleTime?: number
  cacheTime?: number
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
  retry?: boolean | number
  onSuccess?: (data: TData) => void
  onError?: (error: TError) => void
  select?: (data: unknown) => TData
  queryKey?: unknown[]
  queryFn?: () => Promise<TData>
  // Additional properties may vary by React Query version
  [key: string]: unknown
}

// Global configuration for fetch function
let globalFetch: (url: string, options?: RequestInit) => Promise<Response> = fetch

/**
 * Configure the fetch function used by hooks
 * This should be set to an authenticated fetch function
 */
export function configureFetch(fetchFn: (input: string | URL | Request, init?: RequestInit) => Promise<Response>): void {
  globalFetch = fetchFn as typeof fetch
}

/**
 * Default error handler for Dataverse API responses
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: DataverseError | undefined
    
    try {
      errorData = await response.json() as DataverseError
    } catch {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const error = new Error(errorData?.error?.message || `HTTP ${response.status}: ${response.statusText}`)
    ;(error as Error & { code?: string; status?: number; details?: DataverseError }).code = errorData?.error?.code
    ;(error as Error & { code?: string; status?: number; details?: DataverseError }).status = response.status
    ;(error as Error & { code?: string; status?: number; details?: DataverseError }).details = errorData
    
    throw error
  }
  
  return response.json() as Promise<T>
}

/**
 * Create entity-specific hooks for a given entity type
 */
export function createEntityHooks<
  TEntity = Record<string, unknown>
>(metadata: EntityMetadata): {
  useEntity: (id: string | undefined, options?: UseEntityOptions<TEntity> & UseQueryOptions<TEntity, Error>) => UseQueryResult<TEntity, Error>
  useEntityList: (filters?: ODataFilter<TEntity>, options?: UseEntityListOptions<TEntity> & UseQueryOptions<ODataResponse<TEntity>, Error>) => UseQueryResult<ODataResponse<TEntity>, Error>
  useEntityCount: (filters?: ODataFilter<TEntity>, options?: UseQueryOptions<number, Error>) => UseQueryResult<number, Error>
  useRelatedEntities: <TRelated = Record<string, unknown>>(id: string | undefined, relationshipName: string, filters?: ODataFilter<TRelated>, options?: UseEntityListOptions<TRelated> & UseQueryOptions<ODataResponse<TRelated>, Error>) => UseQueryResult<ODataResponse<TRelated>, Error>
  metadata: EntityMetadata
} {
  
  /**
   * Hook for fetching a single entity by ID
   */
  function useEntity(
    id: string | undefined,
    options?: UseEntityOptions<TEntity> & UseQueryOptions<TEntity, Error>
  ): UseQueryResult<TEntity, Error> {
    const { enabled = true, ...queryOptions } = options || {}
    
    const useQuery = getUseQuery()
    
    return useQuery({
      queryKey: createQueryKey<TEntity>(metadata.logicalName, 'single', { 
        id, 
        queryOptions: {
          $select: options?.$select,
          $expand: options?.$expand
        }
      }),
      queryFn: async (): Promise<TEntity> => {
        if (!id) throw new Error('Entity ID is required')
        
        const url = buildEntityUrl<TEntity>(metadata, id, options)
        const response = await globalFetch(url)
        return handleResponse<TEntity>(response)
      },
      enabled: enabled && !!id,
      ...queryOptions
    })
  }
  
  /**
   * Hook for fetching multiple entities
   */
  function useEntityList(
    filters?: ODataFilter<TEntity>,
    options?: UseEntityListOptions<TEntity> & UseQueryOptions<ODataResponse<TEntity>, Error>
  ): UseQueryResult<ODataResponse<TEntity>, Error> {
    const { enabled = true, ...queryOptions } = options || {}
    
    const useQuery = getUseQuery()
    
    return useQuery({
      queryKey: createQueryKey<TEntity>(metadata.logicalName, 'list', { 
        filters,
        queryOptions: {
          $select: options?.$select,
          $expand: options?.$expand,
          $orderby: options?.$orderby,
          $top: options?.$top,
          $skip: options?.$skip,
          $count: options?.$count
        }
      }),
      queryFn: async (): Promise<ODataResponse<TEntity>> => {
        const url = buildEntitySetUrl<TEntity>(metadata, { 
          $filter: filters,
          ...options 
        })
        const response = await globalFetch(url)
        return handleResponse<ODataResponse<TEntity>>(response)
      },
      enabled,
      ...queryOptions
    })
  }
  
  /**
   * Hook for getting entity count
   */
  function useEntityCount(
    filters?: ODataFilter<TEntity>,
    options?: UseQueryOptions<number, Error>
  ): UseQueryResult<number, Error> {
    const { enabled = true, ...queryOptions } = options || {}
    
    const useQuery = getUseQuery()
    
    return useQuery({
      queryKey: createQueryKey<TEntity>(metadata.logicalName, 'count', { filters }),
      queryFn: async (): Promise<number> => {
        const url = buildCountUrl<TEntity>(metadata, { $filter: filters })
        const response = await globalFetch(url)
        const count = await response.text()
        return parseInt(count, 10)
      },
      enabled,
      ...queryOptions
    })
  }
  
  /**
   * Hook for fetching related entities
   */
  function useRelatedEntities<TRelated = Record<string, unknown>>(
    id: string | undefined,
    relationshipName: string,
    filters?: ODataFilter<TRelated>,
    options?: UseEntityListOptions<TRelated> & UseQueryOptions<ODataResponse<TRelated>, Error>
  ): UseQueryResult<ODataResponse<TRelated>, Error> {
    const { enabled = true, ...queryOptions } = options || {}
    
    const useQuery = getUseQuery()
    
    return useQuery({
      queryKey: createQueryKey<TRelated>(metadata.logicalName, 'related', { 
        id,
        relationship: relationshipName,
        filters,
        queryOptions: {
          $select: options?.$select,
          $orderby: options?.$orderby,
          $top: options?.$top,
          $skip: options?.$skip
        }
      }),
      queryFn: async (): Promise<ODataResponse<TRelated>> => {
        if (!id) throw new Error('Entity ID is required')
        
        const url = buildRelatedUrl<TRelated>(metadata, id, relationshipName, { 
          $filter: filters,
          ...options 
        })
        const response = await globalFetch(url)
        return handleResponse<ODataResponse<TRelated>>(response)
      },
      enabled: enabled && !!id,
      ...queryOptions
    })
  }
  
  return {
    useEntity,
    useEntityList,
    useEntityCount,
    useRelatedEntities,
    metadata
  }
}

/**
 * Get the appropriate useQuery hook from the available React Query version
 * This function detects and uses the correct useQuery from the environment
 */
function getUseQuery(): <TData = unknown, TError = unknown>(options: UseQueryOptions<TData, TError>) => UseQueryResult<TData, TError> {
  // Try to detect useQuery from different React Query versions
  try {
    // Try @tanstack/react-query (v4+) - use dynamic require for compatibility
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tanstackQuery = require('@tanstack/react-query')
    if (tanstackQuery?.useQuery) {
      return tanstackQuery.useQuery
    }
  } catch {
    // Ignore import error
  }
  
  try {
    // Try react-query (v3) - use dynamic require for compatibility
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const reactQuery = require('react-query')
    if (reactQuery?.useQuery) {
      return reactQuery.useQuery
    }
  } catch {
    // Ignore import error
  }
  
  // If no React Query is found, return a mock that throws an error
  return () => {
    throw new Error(
      'React Query not found. Please install @tanstack/react-query or react-query to use hooks.\n' +
      'For standalone URL utilities, use the DataverseUrls export instead.'
    )
  }
}

/**
 * Create a typed query client helper
 */
export function createQueryClient(): unknown {
  try {
    // Try @tanstack/react-query first - use dynamic require for compatibility
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tanstackQuery = require('@tanstack/react-query')
    if (tanstackQuery?.QueryClient) {
      return new tanstackQuery.QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            cacheTime: 1000 * 60 * 30, // 30 minutes
            refetchOnWindowFocus: false,
            retry: (failureCount: number, error: Error & { status?: number }): boolean => {
              // Don't retry on 4xx errors
              if (error?.status && error.status >= 400 && error.status < 500) {
                return false
              }
              return failureCount < 3
            }
          }
        }
      })
    }
  } catch {
    // Ignore error
  }
  
  try {
    // Try react-query (v3) - use dynamic require for compatibility
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const reactQuery = require('react-query')
    if (reactQuery?.QueryClient) {
      return new reactQuery.QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            cacheTime: 1000 * 60 * 30, // 30 minutes
            refetchOnWindowFocus: false,
            retry: (failureCount: number, error: Error & { status?: number }): boolean => {
              // Don't retry on 4xx errors
              if (error?.status && error.status >= 400 && error.status < 500) {
                return false
              }
              return failureCount < 3
            }
          }
        }
      })
    }
  } catch {
    // Ignore error
  }
  
  throw new Error('React Query not found. Please install @tanstack/react-query or react-query.')
}

/**
 * Utility function to invalidate entity queries
 */
export function invalidateEntityQueries<TEntity>(
  queryClient: { invalidateQueries: (queryKey: (string | object)[]) => Promise<void> },
  entityName: string,
  options?: {
    operation?: 'single' | 'list' | 'count' | 'related'
    id?: string
  }
): Promise<void> {
  const { operation, id } = options || {}
  
  let queryKey: (string | object)[]
  
  if (operation && id) {
    queryKey = createQueryKey<TEntity>(entityName, operation, { id })
  } else if (operation) {
    queryKey = ['dataverse', entityName, operation]
  } else {
    queryKey = ['dataverse', entityName]
  }
  
  return queryClient.invalidateQueries(queryKey)
}

/**
 * Create a prefetch function for entities
 */
export function createPrefetchFunction<TEntity>(
  queryClient: { prefetchQuery: (options: { queryKey: unknown[]; queryFn: () => Promise<unknown> }) => Promise<void> },
  metadata: EntityMetadata
): {
  prefetchEntity: (id: string, options?: UseEntityOptions<TEntity>) => Promise<void>
  prefetchEntityList: (filters?: ODataFilter<TEntity>, options?: UseEntityListOptions<TEntity>) => Promise<void>
} {
  return {
    prefetchEntity: (id: string, options?: UseEntityOptions<TEntity>): Promise<void> => {
      return queryClient.prefetchQuery({
        queryKey: createQueryKey<TEntity>(metadata.logicalName, 'single', { id }),
        queryFn: async () => {
          const url = buildEntityUrl<TEntity>(metadata, id, options)
          const response = await globalFetch(url)
          return handleResponse<TEntity>(response)
        }
      })
    },
    
    prefetchEntityList: (filters?: ODataFilter<TEntity>, options?: UseEntityListOptions<TEntity>): Promise<void> => {
      return queryClient.prefetchQuery({
        queryKey: createQueryKey<TEntity>(metadata.logicalName, 'list', { filters }),
        queryFn: async () => {
          const url = buildEntitySetUrl<TEntity>(metadata, { $filter: filters, ...options })
          const response = await globalFetch(url)
          return handleResponse<ODataResponse<TEntity>>(response)
        }
      })
    }
  }
}