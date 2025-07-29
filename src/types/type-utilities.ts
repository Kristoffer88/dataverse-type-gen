/**
 * Utility types for simplifying complex TypeScript patterns
 */

// String manipulation helpers
export type StringEndingWith<T, Suffix extends string> = T extends `${string}${Suffix}` ? T : never
export type StringStartingWith<T, Prefix extends string> = T extends `${Prefix}${string}` ? T : never

/**
 * Extracts all field names ending with 'id' (primary/foreign keys)
 * @example EntityIdFields<{userid: string, name: string, companyid: string}> = 'userid' | 'companyid'
 */
export type EntityIdFields<T> = {
  [K in keyof T]: K extends string 
    ? T[K] extends string 
      ? StringEndingWith<K, 'id'>
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

// Type checking helpers
export type IsString<T> = T extends string ? true : false
export type IsNumber<T> = T extends number ? true : false  
export type IsBoolean<T> = T extends boolean ? true : false
export type IsDate<T> = T extends Date ? true : false
export type IsArray<T> = T extends unknown[] ? true : false