import type { ProcessedEntityMetadata } from '../processors/index.js'
import type { TypeGenerationOptions } from './index.js'
import { sanitizeInterfaceName } from './utils.js'
import { getEntityImportPath, getSharedImportPath, shouldOrganizeDirectories } from './import-utils.js'

/**
 * Generate type-safe expand types for $expand operations
 */
export function generateExpandTypes(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {},
  allEntities: ProcessedEntityMetadata[] = [],
  maxDepth: number = 3,
  currentDepth: number = 0
): { expandTypes: string, relatedEntityImports: string[] } {
  const { includeComments = true, fullMetadata = false, generateHooks = false, primaryEntities = [], relatedEntitiesDir = 'related' } = options
  const organizingDirectories = shouldOrganizeDirectories(relatedEntitiesDir, fullMetadata, primaryEntities)
  const lines: string[] = []
  const schemaName = sanitizeInterfaceName(entityMetadata.schemaName)
  const relatedEntityImports: string[] = []
  
  // Depth limiting prevents infinite recursion
  
  // Create lookup dictionary from actual metadata instead of hardcoded mapping
  const entityLookup = new Map<string, ProcessedEntityMetadata>()
  allEntities.forEach(entity => {
    entityLookup.set(entity.logicalName, entity)
  })
  
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Type-safe expand properties for ${entityMetadata.displayName}`)
    lines.push(` * Enables IntelliSense for $expand relationship names`)
    lines.push(` */`)
  }
  
  // Generate union type for expandable properties
  const expandablePropsTypeName = `${schemaName}ExpandableProperties`
  if (entityMetadata.expandableProperties.length > 0) {
    lines.push(`export type ${expandablePropsTypeName} =`)
    entityMetadata.expandableProperties.forEach((prop, index) => {
      const isFirst = index === 0
      const prefix = isFirst ? '  ' : '  | '
      lines.push(`${prefix}"${prop}"`)
    })
  } else {
    lines.push(`export type ${expandablePropsTypeName} = never`)
  }
  
  lines.push('')
  
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Type-safe expand options for ${entityMetadata.displayName}`)
    lines.push(` * Supports both array format and object format with nested options`)
    lines.push(` */`)
  }
  
  // Generate expand type with both array and object support
  const expandTypeName = `${schemaName}Expand`
  
  if (fullMetadata) {
    // Advanced mode: Full type-safe expand support with all related entity imports
    lines.push(`export type ${expandTypeName} =`)
    lines.push(`  | ${expandablePropsTypeName}[]`) // Array format
    lines.push(`  | ${schemaName}TypeSafeExpand`) // Type-safe object format

    lines.push('')
    
    if (includeComments) {
      lines.push(`/**`)
      lines.push(` * Type-safe expand with target entity field awareness`)
      lines.push(` * $select shows actual field names from target entities`)
      lines.push(` */`)
    }
    
    // Generate type-safe expand type that maps relationships to target entity types
    lines.push(`export type ${schemaName}TypeSafeExpand = {`)
    
    // Generate type mappings for each relationship
    if (Object.keys(entityMetadata.relatedEntities).length > 0) {
      // Add imports for query types (always include since query-types.ts is always generated)
      if (!relatedEntityImports.some(imp => imp.includes('ODataFilter'))) {
        const queryTypesPath = organizingDirectories 
          ? getSharedImportPath(entityMetadata.logicalName, 'query-types.js', primaryEntities)
          : './query-types.js'
        relatedEntityImports.push(`import type { ODataFilter, ODataOrderBy } from '${queryTypesPath}'`)
      }
      
      Object.entries(entityMetadata.relatedEntities).forEach(([relationshipName, info]) => {
        // Look up the actual schema name from the processed entities using our metadata lookup
        const relatedEntity = entityLookup.get(info.targetEntityLogicalName)
        if (!relatedEntity) {
          // Skip this relationship if target entity metadata is not available
          // This allows single-entity generation to work without all related entities
          return
        }
        const targetSchemaName = sanitizeInterfaceName(relatedEntity.schemaName)
        
        // Add import for the target entity type (skip self-references)
        if (info.targetEntityLogicalName !== entityMetadata.logicalName) {
          // Calculate correct import path based on directory organization
          const entityImportPath = organizingDirectories 
            ? getEntityImportPath(entityMetadata.logicalName, info.targetEntityLogicalName, primaryEntities, relatedEntitiesDir)
            : `./${relatedEntity.schemaName.toLowerCase()}.js`
          relatedEntityImports.push(`import type { ${targetSchemaName} } from '${entityImportPath}'`)
        }
        
        lines.push(`  "${relationshipName}"?: {`)
        lines.push(`    $select?: (keyof ${targetSchemaName})[]`)
        lines.push(`    $filter?: ODataFilter<${targetSchemaName}>`)
        lines.push(`    $orderby?: ODataOrderBy<${targetSchemaName}>`)
        lines.push(`    $top?: number`)
        
        // Add recursive expand support if we haven't reached max depth
        if (currentDepth < maxDepth) {
          const expandTypeName = `${targetSchemaName}Expand`
          lines.push(`    $expand?: ${expandTypeName}`)
          
          // Add import for the target entity's expand type (skip self-references to avoid circular imports)
          if (info.targetEntityLogicalName !== entityMetadata.logicalName) {
            const entityImportPath = organizingDirectories 
              ? getEntityImportPath(entityMetadata.logicalName, info.targetEntityLogicalName, primaryEntities, relatedEntitiesDir)
              : `./${relatedEntity.schemaName.toLowerCase()}.js`
            relatedEntityImports.push(`import type { ${expandTypeName} } from '${entityImportPath}'`)
          }
        }
        
        lines.push(`  }`)
      })
    }
    
    lines.push(`}`)
  } else {
    // Simple mode: Type-safe expand support with related entity imports when available
    lines.push(`export type ${expandTypeName} = `)
    lines.push(`  | ${expandablePropsTypeName}[]`)
    
    // Check if we have related entities available for type-safe $select
    if (Object.keys(entityMetadata.relatedEntities).length > 0) {
      // Add imports for query types (always include since query-types.ts is always generated)
      const queryTypesPath = organizingDirectories 
        ? getSharedImportPath(entityMetadata.logicalName, 'query-types.js', primaryEntities)
        : './query-types.js'
      relatedEntityImports.push(`import type { ODataFilter, ODataOrderBy } from '${queryTypesPath}'`)
      
      // Generate type mappings for each relationship with proper $select typing
      lines.push(`  | {`)
      Object.entries(entityMetadata.relatedEntities).forEach(([relationshipName, info]) => {
        // Look up the actual schema name from the processed entities
        const relatedEntity = entityLookup.get(info.targetEntityLogicalName)
        if (!relatedEntity) {
          // Skip this relationship if target entity metadata is not available
          return
        }
        const targetSchemaName = sanitizeInterfaceName(relatedEntity.schemaName)
        
        // Add import for the target entity type (skip self-references)
        if (info.targetEntityLogicalName !== entityMetadata.logicalName) {
          const entityImportPath = organizingDirectories 
            ? getEntityImportPath(entityMetadata.logicalName, info.targetEntityLogicalName, primaryEntities, relatedEntitiesDir)
            : `./related/${relatedEntity.schemaName.toLowerCase()}.js`
          relatedEntityImports.push(`import type { ${targetSchemaName} } from '${entityImportPath}'`)
        }
        
        lines.push(`      "${relationshipName}"?: {`)
        lines.push(`        $select?: (keyof ${targetSchemaName})[]`)
        lines.push(`        $filter?: ODataFilter<${targetSchemaName}>`)
        lines.push(`        $orderby?: ODataOrderBy<${targetSchemaName}>`)
        lines.push(`        $top?: number`)
        lines.push(`        $skip?: number`)
        
        // Add recursive expand support in simple mode too
        if (currentDepth < maxDepth) {
          const expandTypeName = `${targetSchemaName}Expand`
          lines.push(`        $expand?: ${expandTypeName}`)
          
          // Add import for the target entity's expand type (skip self-references to avoid circular imports)
          if (info.targetEntityLogicalName !== entityMetadata.logicalName) {
            const entityImportPath = organizingDirectories 
              ? getEntityImportPath(entityMetadata.logicalName, info.targetEntityLogicalName, primaryEntities, relatedEntitiesDir)
              : `./related/${relatedEntity.schemaName.toLowerCase()}.js`
            relatedEntityImports.push(`import type { ${expandTypeName} } from '${entityImportPath}'`)
          }
        }
        
        lines.push(`      }`)
      })
      lines.push(`    }`)
    } else {
      // Fallback to generic string[] if no related entities
      lines.push(`  | Partial<Record<${expandablePropsTypeName}, {`)
      lines.push(`      $select?: string[]`)
      lines.push(`      $filter?: any`)
      lines.push(`      $orderby?: any`)
      lines.push(`      $top?: number`)
      lines.push(`      $skip?: number`)
      lines.push(`    }>>`)
    }
    
    if (includeComments) {
      lines.push('')
      lines.push(`/**`)
      lines.push(` * Type-safe expand options for ${entityMetadata.displayName}`)
      lines.push(` * Use string array format: ["relationship1", "relationship2"]`)
      lines.push(` * Or object format with type safety: { "relationship": { $select: [...] } }`)
      lines.push(` */`)
    }
  }
  
  return {
    expandTypes: lines.join('\n'),
    relatedEntityImports
  }
}