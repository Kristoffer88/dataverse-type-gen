/**
 * Utility types for simplifying complex TypeScript patterns
 */

/**
 * Extracts all field names ending with 'id' (primary/foreign keys)
 * @example EntityIdFields<{userid: string, name: string, companyid: string}> = 'userid' | 'companyid'
 */
export type EntityIdFields<T> = {
  [K in keyof T]: K extends string 
    ? T[K] extends string 
      ? K extends `${string}id` ? K : never
      : never
    : never
}[keyof T]

/**
 * All fields except ID fields (safe for create operations)
 */
export type NonIdFields<T> = Omit<T, EntityIdFields<T>>

/**
 * Only ID fields (required for update operations)
 */
export type OnlyIdFields<T> = Pick<T, EntityIdFields<T>>