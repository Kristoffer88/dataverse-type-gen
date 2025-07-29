/**
 * TypeScript types for OData queries with full type safety
 * Supports filtering, selecting, expanding, and ordering operations
 */

// Base OData operators for different field types
export type StringOperators<T = string> = {
  $eq?: T
  $ne?: T
  $in?: T[]
  $nin?: T[]
  $contains?: T
  $startswith?: T
  $endswith?: T
  $like?: T
  $null?: boolean
  $notnull?: boolean
}

export type NumberOperators<T = number> = {
  $eq?: T
  $ne?: T
  $gt?: T
  $gte?: T
  $lt?: T
  $lte?: T
  $in?: T[]
  $nin?: T[]
  $null?: boolean
  $notnull?: boolean
}

export type BooleanOperators = {
  $eq?: boolean
  $ne?: boolean
  $null?: boolean
  $notnull?: boolean
}

export type DateOperators = {
  $eq?: Date | string
  $ne?: Date | string
  $gt?: Date | string
  $gte?: Date | string
  $lt?: Date | string
  $lte?: Date | string
  $in?: (Date | string)[]
  $nin?: (Date | string)[]
  $null?: boolean
  $notnull?: boolean
  // Dataverse-specific date functions
  $today?: boolean
  $yesterday?: boolean
  $tomorrow?: boolean
  $thisweek?: boolean
  $thismonth?: boolean
  $thisyear?: boolean
  $lastweek?: boolean
  $lastmonth?: boolean
  $lastyear?: boolean
  $nextweek?: boolean
  $nextmonth?: boolean
  $nextyear?: boolean
  $lastxdays?: number
  $nextxdays?: number
  $lastxmonths?: number
  $nextxmonths?: number
  $lastxyears?: number
  $nextxyears?: number
}

export type LookupOperators = {
  $eq?: string  // GUID
  $ne?: string
  $in?: string[]
  $nin?: string[]
  $null?: boolean
  $notnull?: boolean
}

// Type mapping for different attribute types
export type FilterOperatorForType<T> = 
  T extends string ? StringOperators<T> | T :
  T extends number ? NumberOperators<T> | T :
  T extends boolean ? BooleanOperators | T :
  T extends Date ? DateOperators | T :
  T extends string | Date ? DateOperators | T :
  T extends (infer U)[] ? FilterOperatorForType<U> | U[] :
  StringOperators<T> | T

// Filter type that maps entity properties to appropriate operators
export type ODataFilter<TEntity> = {
  [K in keyof TEntity]?: FilterOperatorForType<TEntity[K]>
} & {
  // Logical operators
  $and?: ODataFilter<TEntity>[]
  $or?: ODataFilter<TEntity>[]
  $not?: ODataFilter<TEntity>
}

// Select specific fields from entity
export type ODataSelect<TEntity> = (keyof TEntity)[]

// Nested expand options for individual expanded entities
export type ExpandOptions = {
  $select?: string[]
  $filter?: Record<string, any>
  $orderby?: Record<string, 'asc' | 'desc'> | string[]
  $top?: number
}

// Helper type to extract entity interface from metadata
type EntityFromMetadata<TMeta> = TMeta extends { attributes: readonly any[] } ? {
  [K in TMeta['attributes'][number]['logicalName']]: any
} : any

// Type for individual expand options with target entity awareness
export type RelationshipExpandOption<TTargetEntity = any> = {
  $select?: (keyof TTargetEntity)[]
  $filter?: ODataFilter<TTargetEntity>  
  $orderby?: ODataOrderBy<TTargetEntity>
  $top?: number
}

// Generic expand object that works with any relationship
export type ExpandObject = Record<string, RelationshipExpandOption>

// Main type that maps relationship names to their target entity types
export type TypeSafeExpand<TEntityMetadata> = TEntityMetadata extends {
  relatedEntities: infer TRelated
} ? {
  [K in keyof TRelated]?: TRelated[K] extends { targetEntityLogicalName: string }
    ? RelationshipExpandOption<any> // Will be properly typed in generated code
    : never
} : ExpandObject // Fallback for when metadata isn't available

// Base expand type - supports both simple arrays and nested object syntax
export type ODataExpand<TEntityMetadata = any> = 
  | string[] // Simple array format: ['rel1', 'rel2'] 
  | TypeSafeExpand<TEntityMetadata> // Type-safe object format
  | ExpandObject // Generic object format fallback

// Helper type to extract expandable properties from entity with metadata
export type ExpandablePropertiesOf<T> = T extends { relatedEntities: any } 
  ? ODataExpand<T>
  : string[] | Record<string, ExpandOptions>

// Order by with direction
export type ODataOrderBy<TEntity> = {
  [K in keyof TEntity]?: 'asc' | 'desc'
} | string[]

// Complete OData query options
export interface ODataQueryOptions<TEntity, TMetadata = any> {
  $filter?: ODataFilter<TEntity>
  $select?: ODataSelect<TEntity>
  $expand?: ODataExpand<TMetadata>
  $orderby?: ODataOrderBy<TEntity>
  $top?: number
  $skip?: number
  $count?: boolean
  $search?: string
}

// Strict type for entity list queries (prevents arbitrary properties)
export interface EntityListOptions<TEntity, TMetadata = any> {
  /** Select specific fields (provides IntelliSense) */
  $select?: ODataSelect<TEntity>
  /** Expand related entities */
  $expand?: ODataExpand<TMetadata>
  /** Filter entities (type-safe field names and operators) */
  $filter?: ODataFilter<TEntity>
  /** Sort results by fields with direction */
  $orderby?: ODataOrderBy<TEntity>
  /** Limit number of results */
  $top?: number
  /** Skip results for pagination */
  $skip?: number
  /** Include count in response */
  $count?: boolean
  /** Search across fields */
  $search?: string
}

// Entity metadata interface for runtime information
export interface EntityMetadata {
  logicalName: string
  schemaName: string
  entitySetName: string
  collectionName: string
  displayName: string
  primaryIdAttribute: string
  primaryNameAttribute: string
  isCustomEntity: boolean
  entityType: string
  attributeCount: number
  optionSetCount: number
  primaryKey: {
    logicalName: string
    attributeType: string
    displayName: string
  }
  primaryName?: {
    logicalName: string
    attributeType: string
    displayName: string
    maxLength?: number
  }
  lookupAttributes: readonly string[]
  requiredAttributes: readonly string[]
  optionSets?: readonly string[]
  generated: string
}

// URL builder options
export interface UrlBuilderOptions<TEntity, TMetadata = any> extends ODataQueryOptions<TEntity, TMetadata> {
  baseUrl?: string
  apiVersion?: string
}

// Query key factory for React Query
export interface QueryKeyOptions<TEntity, TMetadata = any> {
  entity: string
  operation: 'single' | 'list' | 'count' | 'related'
  id?: string
  filters?: ODataFilter<TEntity>
  options?: Omit<ODataQueryOptions<TEntity, TMetadata>, '$filter'>
  relationship?: string
}

// React Query hook options
export interface UseEntityOptions<TEntity, TMetadata = any> extends Omit<ODataQueryOptions<TEntity, TMetadata>, '$filter'> {
  enabled?: boolean
  staleTime?: number
  cacheTime?: number
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
}

export interface UseEntityListOptions<TEntity, TMetadata = any> extends ODataQueryOptions<TEntity, TMetadata> {
  enabled?: boolean
  staleTime?: number
  cacheTime?: number
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
}

// Mutation types for create/update operations
export type EntityCreateInput<TEntity, TBindings = Record<string, never>> = 
  Partial<Omit<TEntity, string & keyof { [K in keyof TEntity]: TEntity[K] extends string ? K extends `${string}id` ? K : never : never }>> & 
  Partial<TBindings>

export type EntityUpdateInput<TEntity, TBindings = Record<string, never>> = 
  Partial<Omit<TEntity, string & keyof { [K in keyof TEntity]: TEntity[K] extends string ? K extends `${string}id` ? K : never : never }>> & 
  Partial<TBindings> &
  { [K in keyof TEntity]: K extends `${string}id` ? TEntity[K] : never }[keyof TEntity]

// Response types
export interface ODataResponse<T> {
  '@odata.context': string
  '@odata.count'?: number
  '@odata.nextLink'?: string
  value: T[]
}

export interface ODataSingleResponse<T> extends Omit<ODataResponse<T>, 'value'> {
  value?: T
}

// Error types
export interface DataverseError {
  error: {
    code: string
    message: string
    innererror?: {
      message: string
      type: string
      stacktrace?: string
    }
  }
}

// Configuration for Dataverse URLs
export interface DataverseUrlConfig {
  baseUrl?: string
  apiVersion?: string
  instanceUrl?: string
}