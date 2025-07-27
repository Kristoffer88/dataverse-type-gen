import type { 
  ProcessedEntityMetadata, 
  ProcessedAttributeMetadata, 
  ProcessedOptionSet
} from '../processors/index.js'

/**
 * TypeScript generation options
 */
export interface TypeGenerationOptions {
  entityPrefix?: string
  includeComments?: boolean
  includeValidation?: boolean
  includeMetadata?: boolean
  useExactTypes?: boolean
  includeLookupValues?: boolean
  includeBindingTypes?: boolean
}

/**
 * Generated TypeScript code result
 */
export interface GeneratedCode {
  interfaces: string
  constants: string
  types: string
  metadata?: string
  validation?: string
  imports: string[]
}

/**
 * Generate TypeScript interface for an entity
 */
export function generateEntityInterface(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const {
    entityPrefix = '',
    includeComments = true
  } = options

  const interfaceName = `${entityPrefix}${entityMetadata.schemaName}`
  const lines: string[] = []

  // Add interface comment
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * ${entityMetadata.displayName}`)
    if (entityMetadata.description) {
      lines.push(` * ${entityMetadata.description}`)
    }
    lines.push(` * Entity: ${entityMetadata.logicalName}`)
    lines.push(` * Schema: ${entityMetadata.schemaName}`)
    lines.push(` * Custom: ${entityMetadata.isCustomEntity}`)
    lines.push(` */`)
  }

  lines.push(`export interface ${interfaceName} {`)

  // Generate properties for each attribute
  for (const attr of entityMetadata.attributes) {
    const propertyLines = generateAttributeProperty(attr, options)
    lines.push(...propertyLines.map(line => `  ${line}`))
  }

  lines.push(`}`)

  return lines.join('\n')
}

/**
 * Generate TypeScript property for an attribute
 */
function generateAttributeProperty(
  attribute: ProcessedAttributeMetadata,
  options: TypeGenerationOptions
): string[] {
  const { includeComments = true } = options
  const lines: string[] = []

  // Add property comment
  if (includeComments) {
    const comment = `/** ${attribute.logicalName} - ${attribute.displayName} */`
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
      return 'unknown' // Fallback for unknown types
  }
}

/**
 * Generate option set constants and types
 */
export function generateOptionSetConstants(
  optionSet: ProcessedOptionSet,
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []

  const constantName = generateOptionSetConstantName(optionSet.name)
  const typeName = generateOptionSetTypeName(optionSet.name)

  // Add option set comment
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * ${optionSet.displayName}`)
    if (optionSet.description) {
      lines.push(` * ${optionSet.description}`)
    }
    lines.push(` * Global: ${optionSet.isGlobal}`)
    lines.push(` * Custom: ${optionSet.isCustom}`)
    lines.push(` */`)
  }

  // Generate constant object
  lines.push(`export const ${constantName} = {`)
  
  for (const option of optionSet.options) {
    const optionName = sanitizeOptionName(option.label)
    const optionComment = includeComments && option.description 
      ? ` // ${option.description}` 
      : ''
    
    lines.push(`  ${optionName}: { Value: ${option.value}, Label: "${escapeString(option.label)}" },${optionComment}`)
  }
  
  lines.push(`} as const;`)
  lines.push('')

  // Generate type
  lines.push(`export type ${typeName}Value = typeof ${constantName}[keyof typeof ${constantName}]['Value'];`)

  return lines.join('\n')
}

/**
 * Generate comprehensive metadata object with Dataverse properties
 */
export function generateMetadataObject(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const {
    entityPrefix = '',
    includeComments = true
  } = options

  const interfaceName = `${entityPrefix}${entityMetadata.schemaName}`
  const metadataName = `${interfaceName}Metadata`
  const lines: string[] = []

  // Comprehensive metadata object with Dataverse properties
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Comprehensive metadata for ${entityMetadata.displayName}`)
    lines.push(` * Contains runtime entity information and Dataverse properties`)
    lines.push(` */`)
  }
  
  lines.push(`export const ${metadataName} = {`)
  
  // Core identification
  lines.push(`  logicalName: "${entityMetadata.logicalName}",`)
  lines.push(`  schemaName: "${entityMetadata.schemaName}",`)
  lines.push(`  entitySetName: "${entityMetadata.entitySetName}",`)
  lines.push(`  collectionName: "${entityMetadata.entitySetName}",`)
  
  // Display information
  lines.push(`  displayName: "${escapeString(entityMetadata.displayName)}",`)
  if (entityMetadata.description) {
    lines.push(`  description: "${escapeString(entityMetadata.description)}",`)
  }
  
  // Dataverse attributes (aligned with Dataverse naming)
  lines.push(`  primaryIdAttribute: "${entityMetadata.primaryIdAttribute}",`)
  lines.push(`  primaryNameAttribute: "${entityMetadata.primaryNameAttribute}",`)
  
  // Entity properties
  lines.push(`  isCustomEntity: ${entityMetadata.isCustomEntity},`)
  lines.push(`  entityType: "${entityMetadata.isCustomEntity ? 'custom' : 'system'}",`)
  
  // Counts and summary
  lines.push(`  attributeCount: ${entityMetadata.attributes.length},`)
  lines.push(`  optionSetCount: ${entityMetadata.optionSets.length},`)
  
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
  
  // Generation info
  lines.push(`  generated: "${new Date().toISOString()}"`)
  
  lines.push(`} as const;`)

  return lines.join('\n')
}

/**
 * Generate complete TypeScript file for an entity
 */
export function generateEntityFile(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): GeneratedCode {
  const lines: string[] = []
  const imports: Set<string> = new Set()

  // File header
  lines.push(`// Generated TypeScript definitions for ${entityMetadata.schemaName}`)
  lines.push(`// Entity: ${entityMetadata.displayName}`)
  lines.push(`// Total Attributes: ${entityMetadata.attributes.length}`)
  lines.push(`// Generated: ${new Date().toISOString()}`)
  lines.push('')

  // Separate global and local option sets
  const localOptionSets = entityMetadata.optionSets.filter(os => !os.isGlobal)
  const globalOptionSets = entityMetadata.optionSets.filter(os => os.isGlobal)

  // Add imports for global option sets - only import what's needed
  for (const globalOptionSet of globalOptionSets) {
    const constantName = generateOptionSetConstantName(globalOptionSet.name)
    const typeName = generateOptionSetTypeName(globalOptionSet.name)
    
    // Check if we actually use the constant (not just the type) in the entity
    const usesConstant = checkIfConstantIsUsed()
    
    if (usesConstant) {
      imports.add(`import { ${constantName}, type ${typeName}Value } from './global-choices/${globalOptionSet.name}.js'`)
    } else {
      // Only import the type if constant is not used
      imports.add(`import type { ${typeName}Value } from './global-choices/${globalOptionSet.name}.js'`)
    }
  }

  // Generate option set constants only for local option sets
  const constants: string[] = []
  for (const optionSet of localOptionSets) {
    constants.push(generateOptionSetConstants(optionSet, options))
    constants.push('')
  }

  // Generate main entity interface
  const interfaces = generateEntityInterface(entityMetadata, options)

  // Generate metadata object
  const metadata = options.includeMetadata 
    ? generateMetadataObject(entityMetadata, options)
    : undefined

  return {
    interfaces,
    constants: constants.join('\n'),
    types: '', // No utility types are generated anymore
    metadata,
    imports: Array.from(imports)
  }
}

/**
 * Check if a global option set constant is actually used in the entity
 * (beyond just the type usage in interface properties)
 */
function checkIfConstantIsUsed(): boolean {
  // In the current implementation, we only use the types in interfaces
  // We don't use the constants themselves in the generated code
  // This might change if we add validation functions or default values later
  
  // For now, we only need the type imports, not the constants
  return false
}

/**
 * Utility functions for name generation and sanitization
 */

function sanitizePropertyName(name: string): string {
  // Ensure property name is a valid JavaScript identifier
  let sanitized = name.replace(/[^a-zA-Z0-9_$]/g, '_')
  
  // Ensure it doesn't start with a number
  if (/^[0-9]/.test(sanitized)) {
    sanitized = `_${sanitized}`
  }
  
  return sanitized
}

function sanitizeOptionName(label: string): string {
  // Convert label to PascalCase identifier
  return label
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
    .replace(/^[0-9]/, '_$&') // Handle leading numbers
}

function generateOptionSetConstantName(optionSetName: string): string {
  // Convert to PascalCase
  return optionSetName
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

function generateOptionSetTypeName(optionSetName: string): string {
  return generateOptionSetConstantName(optionSetName)
}

function escapeString(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r')
}

/**
 * Generate TypeScript file for a global option set
 */
export function generateGlobalOptionSetFile(
  optionSet: ProcessedOptionSet,
  options: TypeGenerationOptions = {}
): string {
  if (!optionSet.isGlobal) {
    throw new Error(`Option set ${optionSet.name} is not global`)
  }

  const lines: string[] = []

  // File header
  lines.push(`// Generated TypeScript definitions for global option set: ${optionSet.name}`)
  lines.push(`// Display Name: ${optionSet.displayName}`)
  lines.push(`// Global: ${optionSet.isGlobal}`)
  lines.push(`// Custom: ${optionSet.isCustom}`)
  lines.push(`// Generated: ${new Date().toISOString()}`)
  lines.push('')

  // Generate the option set constants and types
  lines.push(generateOptionSetConstants(optionSet, options))

  return lines.join('\n')
}

/**
 * Generate imports for the generated code
 */
export function generateImports(requiredImports: string[]): string {
  if (requiredImports.length === 0) return ''
  
  const lines: string[] = []
  lines.push(`// Required imports`)
  
  for (const importStatement of requiredImports) {
    lines.push(importStatement)
  }
  
  lines.push('')
  return lines.join('\n')
}