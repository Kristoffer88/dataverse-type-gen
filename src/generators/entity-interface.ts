import type { 
  ProcessedEntityMetadata, 
  ProcessedAttributeMetadata
} from '../processors/index.js'
import type { TypeGenerationOptions } from './index.js'
import { sanitizePropertyName, sanitizeInterfaceName } from './utils.js'

/**
 * Generate TypeScript interface for an entity
 */
export function generateEntityInterface(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const {
    entityPrefix = '',
    includeComments = true,
    excludeAuxiliaryAttributes = true
  } = options

  const lines: string[] = []
  const schemaName = sanitizeInterfaceName(entityMetadata.schemaName)
  const interfaceName = `${entityPrefix}${schemaName}`

  // Add entity comments
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * ${entityMetadata.displayName}`)
    if (entityMetadata.description) {
      lines.push(` * ${entityMetadata.description}`)
    }
    lines.push(` * Entity: ${entityMetadata.logicalName}`)
    lines.push(` * Schema: ${entityMetadata.schemaName}`)
    lines.push(` * Primary Key: ${entityMetadata.primaryIdAttribute}`)
    if (entityMetadata.primaryNameAttribute) {
      lines.push(` * Primary Name: ${entityMetadata.primaryNameAttribute}`)
    }
    lines.push(` */`)
  }

  lines.push(`export interface ${interfaceName} {`)

  // Process attributes
  let attributesToProcess = entityMetadata.attributes
  
  // Filter out auxiliary attributes if requested
  if (excludeAuxiliaryAttributes) {
    attributesToProcess = attributesToProcess.filter(attr => 
      !attr.attributeOf || // Exclude auxiliary attributes
      attr.isPrimaryId ||  // Always include primary ID
      attr.logicalName === entityMetadata.primaryNameAttribute // Always include primary name
    )
  }

  // Generate properties for each attribute
  for (const attribute of attributesToProcess) {
    const propertyLines = generateAttributeProperty(attribute, options)
    propertyLines.forEach(line => lines.push(`  ${line}`))
  }

  lines.push(`}`)

  return lines.join('\n')
}

/**
 * Generate property definition for an attribute
 */
function generateAttributeProperty(
  attribute: ProcessedAttributeMetadata,
  options: TypeGenerationOptions
): string[] {
  const { includeComments = true } = options
  const lines: string[] = []

  // Add attribute comment
  if (includeComments && attribute.displayName) {
    let comment = `/** ${attribute.displayName}`
    if (attribute.description && attribute.description !== attribute.displayName) {
      comment += ` - ${attribute.description}`
    }
    comment += ` */`
    lines.push(comment)
  }

  // Determine property name (ensure valid JavaScript identifier)
  const propertyName = sanitizePropertyName(attribute.logicalName)
  
  // Determine if property is optional
  const isOptional = attribute.requiredLevel !== 'SystemRequired' && !attribute.isPrimaryId
  const optionalMarker = isOptional ? '?' : ''

  // Determine TypeScript type
  const typeString = generateAttributeType(attribute)

  // Add additional type information in comment
  let additionalInfo = ''
  if (includeComments) {
    const infoParts: string[] = []
    
    if (attribute.maxLength) {
      infoParts.push(`Max length: ${attribute.maxLength}`)
    }
    
    if (attribute.minValue !== undefined || attribute.maxValue !== undefined) {
      const range = `Range: ${attribute.minValue ?? 'unbounded'} to ${attribute.maxValue ?? 'unbounded'}`
      infoParts.push(range)
    }
    
    if (attribute.targets && attribute.targets.length > 0) {
      infoParts.push(`Lookup to: ${attribute.targets.join(', ')}`)
    }
    
    if (attribute.optionSetName) {
      infoParts.push(`Option set: ${attribute.optionSetName}`)
    }
    
    additionalInfo = infoParts.length > 0 ? ` // ${infoParts.join(', ')}` : ''
  }

  lines.push(`${propertyName}${optionalMarker}: ${typeString};${additionalInfo}`)

  // Add _value property for lookup fields when includeLookupValues is enabled
  if (attribute.attributeType === 'Lookup' && options.includeLookupValues) {
    const valueProperty = `_${attribute.logicalName}_value`
    const valueComment = includeComments ? `/** ${valueProperty} - Resolved lookup GUID value */` : ''
    if (valueComment) lines.push(valueComment)
    lines.push(`${valueProperty}?: string; // Lookup value`)
  }

  return lines
}

/**
 * Generate TypeScript type for an attribute
 */
function generateAttributeType(attribute: ProcessedAttributeMetadata): string {
  switch (attribute.attributeType) {
    case 'String':
    case 'Memo':
      return 'string'
      
    case 'Integer':
    case 'BigInt':
    case 'Decimal':
    case 'Double':
    case 'Money':
      return 'number'
      
    case 'Boolean':
      return 'boolean'
      
    case 'DateTime':
      return 'Date | string'
      
    case 'Uniqueidentifier':
      return 'string' // GUID as string
      
    case 'Lookup':
    case 'Customer':
    case 'Owner':
      return 'string' // EntityReference ID as string
      
    case 'Picklist':
    case 'State':
    case 'Status':
      if (attribute.optionSetName) {
        const typeName = generateOptionSetTypeName(attribute.optionSetName)
        return `${typeName}Value`
      }
      return 'number'
      
    case 'MultiSelectPicklist':
      if (attribute.optionSetName) {
        const typeName = generateOptionSetTypeName(attribute.optionSetName)
        return `${typeName}Value[]`
      }
      return 'number[]'
      
    case 'Virtual':
    case 'EntityName':
      return 'string'
      
    default:
      // For unknown types, default to 'any' to prevent TypeScript errors
      return 'any'
  }
}

/**
 * Generate option set type name from option set name
 */
function generateOptionSetTypeName(optionSetName: string): string {
  return optionSetName
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}