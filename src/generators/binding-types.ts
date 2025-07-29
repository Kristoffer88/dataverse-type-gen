import type { ProcessedEntityMetadata } from '../processors/index.js'
import type { TypeGenerationOptions } from './index.js'
import { sanitizeInterfaceName } from './utils.js'

/**
 * Generate binding types for @odata.bind operations
 */
export function generateBindingTypes(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions,
  allEntities: ProcessedEntityMetadata[] = []
): string {
  const { includeComments = true } = options
  
  // Create lookup dictionary from actual metadata
  const entityLookup = new Map<string, ProcessedEntityMetadata>()
  allEntities.forEach(entity => {
    entityLookup.set(entity.logicalName, entity)
  })
  
  // Filter out read-only system fields that cannot be set via @odata.bind
  const readOnlySystemFields = new Set([
    'createdby',
    'modifiedby', 
    'createdonbehalfby',
    'modifiedonbehalfby',
    'owninguser',
    'owningteam',
    'owningbusinessunit'
  ])
  
  const lookupAttributes = entityMetadata.attributes.filter(attr => 
    attr.attributeType === 'Lookup' && !readOnlySystemFields.has(attr.logicalName)
  )
  
  if (lookupAttributes.length === 0) {
    return ''
  }

  const lines: string[] = []
  const schemaTypeName = sanitizeInterfaceName(entityMetadata.schemaName)
  
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Binding types for ${entityMetadata.schemaName} @odata.bind operations`)
    lines.push(` */`)
  }
  
  lines.push(`export type ${schemaTypeName}Bindings = {`)
  
  for (const attr of lookupAttributes) {
    const bindingProperty = `${attr.schemaName}@odata.bind`
    const targets = attr.targets && attr.targets.length > 0 ? ` // Bind to: ${attr.targets.join(', ')}` : ''
    lines.push(`  '${bindingProperty}'?: string;${targets}`)
  }
  
  lines.push(`};`)
  
  // Generate type-safe binding helper functions
  lines.push('')
  lines.push(`/**`)
  lines.push(` * Type-safe helper functions for creating ${entityMetadata.schemaName} @odata.bind relationships`)
  lines.push(` * Each function returns the correct entity set path for the target entity`)
  lines.push(` */`)
  lines.push(`export const ${schemaTypeName}Bindings = {`)
  
  for (const attr of lookupAttributes) {
    const functionName = attr.logicalName
    const targets = attr.targets || []
    
    if (targets.length === 1) {
      // Single target - type-safe function
      const target = targets[0]
      const targetEntity = entityLookup.get(target)
      if (!targetEntity) {
        throw new Error(`Entity metadata not found for target entity: ${target}. This entity should be included in the allEntities array passed to generateBindingTypes.`)
      }
      const entitySet = targetEntity.entitySetName
      lines.push(`  /** Create @odata.bind for ${attr.logicalName} -> ${target} */`)
      lines.push(`  ${functionName}: (id: string): { '${attr.schemaName}@odata.bind': string } => ({`)
      lines.push(`    '${attr.schemaName}@odata.bind': \`/${entitySet}(\${id})\``)
      lines.push(`  }),`)
    } else if (targets.length > 1) {
      // Multiple targets - require entity type parameter
      lines.push(`  /** Create @odata.bind for ${attr.logicalName} -> ${targets.join(' | ')} */`)
      lines.push(`  ${functionName}: (id: string, entityType: '${targets.join("' | '")}') => {`)
      lines.push(`    const entitySets = {`)
      targets.forEach(target => {
        const targetEntity = entityLookup.get(target)
        if (!targetEntity) {
          throw new Error(`Entity metadata not found for target entity: ${target}. This entity should be included in the allEntities array passed to generateBindingTypes.`)
        }
        const entitySet = targetEntity.entitySetName
        lines.push(`      '${target}': '${entitySet}',`)
      })
      lines.push(`    } as const;`)
      lines.push(`    return { '${attr.schemaName}@odata.bind': \`/\${entitySets[entityType]}(\${id})\` };`)
      lines.push(`  },`)
    } else {
      // No targets specified - generic function
      lines.push(`  /** Create @odata.bind for ${attr.logicalName} (generic) */`)
      lines.push(`  ${functionName}: (id: string, entitySet: string): { '${attr.schemaName}@odata.bind': string } => ({`)
      lines.push(`    '${attr.schemaName}@odata.bind': \`/\${entitySet}(\${id})\``)
      lines.push(`  }),`)
    }
  }
  
  lines.push(`} as const;`)
  
  // Add Create and Update utility types with bindings
  lines.push('')
  lines.push(`export type ${schemaTypeName}Create = Partial<${entityMetadata.schemaName}> & Partial<${schemaTypeName}Bindings> & {`)
  
  // Only add primary name attribute if it exists and is not empty
  const primaryNameAttr = entityMetadata.primaryNameAttribute?.trim()
  if (primaryNameAttr) {
    lines.push(`  ${primaryNameAttr}: string; // Required for create`)
  }
  
  lines.push(`};`)
  
  lines.push('')
  lines.push(`export type ${schemaTypeName}Update = Partial<Omit<${entityMetadata.schemaName}, '${entityMetadata.primaryIdAttribute}'>> & Partial<${schemaTypeName}Bindings> & {`)
  
  // Primary ID attribute should always exist, but add safety check
  const primaryIdAttr = entityMetadata.primaryIdAttribute?.trim()
  if (primaryIdAttr) {
    lines.push(`  ${primaryIdAttr}: string; // Required for update`)
  }
  
  lines.push(`};`)
  
  return lines.join('\n')
}