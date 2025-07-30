/**
 * Hook utilities and documentation generation
 * Contains utilities for generating hook indexes, documentation, and helper functions
 */

import type { ProcessedEntityMetadata } from '../../processors/index.js'
import type { TypeGenerationOptions } from '../index.js'
import { sanitizeInterfaceName } from '../utils.js'

/**
 * Generate hooks index file that exports all entity hooks
 */
export function generateHooksIndex(
  entities: ProcessedEntityMetadata[],
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  
  // File header
  lines.push(`// Generated React Query hooks index`)
  lines.push(`// Total entities: ${entities.length}`)
  lines.push(`// Generated: ${new Date().toISOString()}`)
  lines.push('')
  
  if (includeComments && entities.length > 0) {
    const firstEntity = entities[0]
    const pascalTypeName = sanitizeInterfaceName(firstEntity.schemaName)
    
    lines.push(`/**`)
    lines.push(` * Barrel exports for all entity React Query hooks`)
    lines.push(` * `)
    lines.push(` * @example`)
    lines.push(` * import { use${pascalTypeName}, use${pascalTypeName}List } from './hooks'`)
    lines.push(` * `)
    lines.push(` * const { data: entity } = use${pascalTypeName}('<entity-id>')`)
    lines.push(` * const { data: entities } = use${pascalTypeName}List({ statecode: 0 })`)
    lines.push(` */`)
    lines.push('')
  }
  
  // Export all hooks
  for (const entity of entities) {
    const hooksFile = `${entity.logicalName}.hooks.js`
    lines.push(`export * from './${hooksFile}'`)
  }
  
  lines.push('')
  
  // Note: All query keys are provided by the generated hooks
  // Use queryClient.invalidateQueries(EntityQueryKeys.all) for cache invalidation
  
  return lines.join('\n')
}


/**
 * Generate a separate hooks file for an entity
 */
export function generateEntityHooksFile(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {},
  hooksContent?: string
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  
  // File header with clear documentation
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * React Query Hooks for ${entityMetadata.displayName}`)
    lines.push(` * `)
    lines.push(` * Auto-generated type-safe hooks for Dataverse entity: ${entityMetadata.logicalName}`)
    lines.push(` * Provides full TypeScript intellisense for queries, filters, and selections`)
    lines.push(` * `)
    lines.push(` * @generated ${new Date().toISOString()}`)
    lines.push(` * @entity ${entityMetadata.displayName} (${entityMetadata.schemaName})`)
    lines.push(` * @entitySet ${entityMetadata.entitySetName}`)
    lines.push(` */`)
  } else {
    lines.push(`// Generated React Query hooks for ${entityMetadata.schemaName}`)
    lines.push(`// Entity: ${entityMetadata.displayName}`)  
    lines.push(`// Generated: ${new Date().toISOString()}`)
  }
  lines.push('')
  
  // Add the hooks content if provided
  if (hooksContent) {
    lines.push(hooksContent)
  }
  
  return lines.join('\n')
}