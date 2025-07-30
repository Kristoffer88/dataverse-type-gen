import type { ProcessedEntityMetadata } from '../processors/index.js'
import type { TypeGenerationOptions } from './index.js'
import { sanitizeInterfaceName, escapeString } from './utils.js'

/**
 * Generate metadata object for runtime use
 */
export function generateMetadataObject(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  const schemaName = sanitizeInterfaceName(entityMetadata.schemaName)
  const metadataName = `${schemaName}Meta`

  // Metadata header comment
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Runtime metadata for ${entityMetadata.displayName}`)
    lines.push(` * Provides entity schema information for API operations`)
    lines.push(` */`)
  }

  lines.push(`export const ${metadataName} = {`)
  
  // Basic entity information
  lines.push(`  logicalName: "${entityMetadata.logicalName}",`)
  lines.push(`  schemaName: "${entityMetadata.schemaName}",`)
  lines.push(`  displayName: "${escapeString(entityMetadata.displayName)}",`)
  lines.push(`  entitySetName: "${entityMetadata.entitySetName}",`)
  lines.push(`  isCustomEntity: ${entityMetadata.isCustomEntity},`)
  
  if (entityMetadata.description) {
    lines.push(`  description: "${escapeString(entityMetadata.description)}",`)
  }
  
  // Attribute details for runtime use
  const primaryIdAttr = entityMetadata.attributes.find(attr => attr.isPrimaryId)
  const primaryNameAttr = entityMetadata.attributes.find(attr => attr.logicalName === entityMetadata.primaryNameAttribute)
  const lookupAttributes = entityMetadata.attributes.filter(attr => attr.attributeType === 'Lookup')
  const requiredAttributes = entityMetadata.attributes.filter(attr => attr.requiredLevel === 'SystemRequired' || attr.requiredLevel === 'ApplicationRequired')
  
  lines.push(`  primaryKey: {`)
  lines.push(`    logicalName: "${entityMetadata.primaryIdAttribute}",`)
  lines.push(`    attributeType: "${primaryIdAttr?.attributeType || 'Uniqueidentifier'}",`)
  lines.push(`    displayName: "${escapeString(primaryIdAttr?.displayName || entityMetadata.primaryIdAttribute)}"`)
  lines.push(`  },`)
  
  if (primaryNameAttr) {
    lines.push(`  primaryName: {`)
    lines.push(`    logicalName: "${entityMetadata.primaryNameAttribute}",`)
    lines.push(`    attributeType: "${primaryNameAttr.attributeType}",`)
    lines.push(`    displayName: "${escapeString(primaryNameAttr.displayName)}",`)
    if (primaryNameAttr.maxLength) {
      lines.push(`    maxLength: ${primaryNameAttr.maxLength}`)
    }
    lines.push(`  },`)
  }
  
  // Quick reference arrays
  lines.push(`  lookupAttributes: [${lookupAttributes.map(attr => `"${attr.logicalName}"`).join(', ')}],`)
  lines.push(`  requiredAttributes: [${requiredAttributes.filter(attr => !attr.isPrimaryId).map(attr => `"${attr.logicalName}"`).join(', ')}],`)
  
  // Option sets summary
  if (entityMetadata.optionSets.length > 0) {
    lines.push(`  optionSets: [${entityMetadata.optionSets.map(os => `"${os.name}"`).join(', ')}],`)
  }
  
  // Expandable properties for $expand operations
  if (entityMetadata.expandableProperties.length > 0) {
    lines.push(`  expandableProperties: [`)
    entityMetadata.expandableProperties.forEach(prop => {
      const comment = lookupAttributes.some(attr => attr.logicalName === prop) 
        ? ' // Lookup field' 
        : ' // Relationship'
      lines.push(`    "${prop}",${comment}`)
    })
    lines.push(`  ],`)
  }
  
  // Related entities for type-safe nested expands
  if (Object.keys(entityMetadata.relatedEntities).length > 0) {
    lines.push(`  relatedEntities: {`)
    Object.entries(entityMetadata.relatedEntities).forEach(([relationshipName, info]) => {
      lines.push(`    "${relationshipName}": {`)
      lines.push(`      relationshipName: "${info.relationshipName}",`)
      lines.push(`      targetEntityLogicalName: "${info.targetEntityLogicalName}",`)
      lines.push(`      targetEntitySetName: "${info.targetEntitySetName}",`)
      lines.push(`      relationshipType: "${info.relationshipType}"`)
      lines.push(`    },`)
    })
    lines.push(`  },`)
  }
  
  // Generation info
  lines.push(`  generated: "${new Date().toISOString()}"`)
  
  lines.push(`} as const;`)

  return lines.join('\n')
}