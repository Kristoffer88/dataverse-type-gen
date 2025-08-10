/**
 * Query Types for Dataverse OData Operations
 * 
 * Auto-generated type definitions for type-safe Dataverse queries.
 * Provides full TypeScript support for filtering, selecting, expanding, and ordering.
 * 
 * @generated 2025-08-10T19:04:22.379Z
 */

// Basic OData query types for Dataverse operations
// NOTE: Use entity-specific expand types instead of these generic types for full type safety
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
  $and?: ODataFilter<TEntity>[]
  $or?: ODataFilter<TEntity>[]
  $not?: ODataFilter<TEntity>
}
export type ODataSelect<TEntity> = (keyof TEntity)[]
// Generic fallback - entity-specific types should override this
export type ODataExpand<TMetadata = any> = 
  | string[]
  | Record<string, {
      $select?: string[]
      $filter?: any
      $orderby?: any
      $top?: number
      $skip?: number
    }>
export type ODataOrderBy<TEntity> = {
  [K in keyof TEntity]?: 'asc' | 'desc'
} | string[]
export interface EntityListOptions<TEntity, TMetadata = any> {
  $select?: ODataSelect<TEntity>
  $expand?: ODataExpand<TMetadata>
  $filter?: ODataFilter<TEntity>
  $orderby?: ODataOrderBy<TEntity>
  $top?: number
  $skip?: number
  $count?: boolean
  $search?: string
}
export interface EntityOptions<TEntity, TMetadata = any> {
  $select?: ODataSelect<TEntity>
  $expand?: ODataExpand<TMetadata>
}
export interface ODataResponse<T> {
  '@odata.context': string
  '@odata.count'?: number
  '@odata.nextLink'?: string
  value: T[]
}
export interface ODataSingleResponse<T> extends Omit<ODataResponse<T>, 'value'> {
  value?: T
}