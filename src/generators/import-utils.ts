/**
 * Utilities for calculating correct import paths based on directory organization
 */

/**
 * Helper to determine the correct import path for entity files based on directory structure
 */
export function getEntityImportPath(
  fromEntityLogicalName: string,
  toEntityLogicalName: string,
  primaryEntities: string[] = [],
  relatedEntitiesDir: string = 'related'
): string {
  const fromIsPrimary = primaryEntities.includes(fromEntityLogicalName)
  const toIsPrimary = primaryEntities.includes(toEntityLogicalName)
  
  if (fromIsPrimary && toIsPrimary) {
    // Both primary: ./entity
    return `./${toEntityLogicalName.toLowerCase()}.js`
  } else if (fromIsPrimary && !toIsPrimary) {
    // From primary to related: ./related/entity
    return `./${relatedEntitiesDir}/${toEntityLogicalName.toLowerCase()}.js`
  } else if (!fromIsPrimary && toIsPrimary) {
    // From related to primary: ../entity
    return `../${toEntityLogicalName.toLowerCase()}.js`
  } else {
    // Both related: ./entity
    return `./${toEntityLogicalName.toLowerCase()}.js`
  }
}

/**
 * Helper to determine the correct import path for shared files (query-types, global-choices) 
 * based on directory structure
 */
export function getSharedImportPath(
  fromEntityLogicalName: string,
  sharedFile: string,
  primaryEntities: string[] = [],
  relatedEntitiesDir: string = 'related'
): string {
  const fromIsPrimary = primaryEntities.includes(fromEntityLogicalName)
  
  if (fromIsPrimary) {
    // From primary: ./shared-file or ./subdirectory/file
    return `./${sharedFile}`
  } else {
    // From related: ../shared-file or ../subdirectory/file
    return `../${sharedFile}`
  }
}

/**
 * Helper to determine import path from hooks directory to entity files
 */
export function getHooksToEntityImportPath(
  entityLogicalName: string,
  primaryEntities: string[] = [],
  relatedEntitiesDir: string = 'related'
): string {
  const entityIsPrimary = primaryEntities.includes(entityLogicalName)
  
  if (entityIsPrimary) {
    // From hooks to primary entity: ../entity
    return `../${entityLogicalName.toLowerCase()}.js`
  } else {
    // From hooks to related entity: ../related/entity
    return `../${relatedEntitiesDir}/${entityLogicalName.toLowerCase()}.js`
  }
}

/**
 * Helper to determine import path from hooks directory to shared files
 */
export function getHooksToSharedImportPath(
  sharedFile: string
): string {
  // From hooks directory to shared files: ../shared-file
  return `../${sharedFile}`
}

/**
 * Check if directory organization should be enabled based on configuration
 */
export function shouldOrganizeDirectories(
  relatedEntitiesDir: string | undefined,
  nestedExpand: boolean,
  primaryEntities: string[] = []
): boolean {
  return !!(relatedEntitiesDir && (nestedExpand || primaryEntities.length > 0))
}