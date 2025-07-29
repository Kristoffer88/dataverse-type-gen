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

  // Generate binding types if enabled
  const bindingTypes = options.includeBindingTypes 
    ? generateBindingTypes(entityMetadata, options)
    : undefined

  // Generate expand types for type-safe $expand operations
  const expandTypes = generateExpandTypes(entityMetadata, options)

  // Generate metadata object
  const metadata = options.includeMetadata 
    ? generateMetadataObject(entityMetadata, options)
    : undefined

  // Combine all type definitions
  const allTypes = [
    interfaces,
    expandTypes,
    bindingTypes,
    metadata
  ].filter(Boolean).join('\n\n')

  return {
    interfaces: allTypes,
    constants: constants.join('\n'),
    types: '', // No utility types are generated anymore
    metadata: undefined, // Already included in interfaces
    imports: Array.from(imports)
  }
}

/**
 * Convert schema name to proper Pascal case type name
 * Example: "pum_CostResource" -> "PumCostResource"
 */
function toPascalCaseTypeName(schemaName: string): string {
  // Handle names that start with lowercase prefix followed by underscore and PascalCase
  // e.g., "pum_CostResource" -> "PumCostResource"
  if (schemaName.includes('_')) {
    const parts = schemaName.split('_')
    return parts.map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('')
  }
  
  // For names that are already in the right format, just ensure first letter is uppercase
  return schemaName.charAt(0).toUpperCase() + schemaName.slice(1)
}

/**
 * Generate binding types for @odata.bind operations
 */
function generateBindingTypes(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions
): string {
  const { includeComments = true } = options
  
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
  const pascalTypeName = toPascalCaseTypeName(entityMetadata.schemaName)
  
  if (includeComments) {
    lines.push(`/**`)
    lines.push(` * Binding types for ${entityMetadata.schemaName} @odata.bind operations`)
    lines.push(` */`)
  }
  
  lines.push(`export type ${pascalTypeName}Bindings = {`)
  
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
  lines.push(`export const ${pascalTypeName}Bindings = {`)
  
  for (const attr of lookupAttributes) {
    const functionName = attr.logicalName
    const targets = attr.targets || []
    
    if (targets.length === 1) {
      // Single target - type-safe function
      const target = targets[0]
      const entitySet = getEntitySetForTarget(target)
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
        const entitySet = getEntitySetForTarget(target)
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
  lines.push(`export type ${pascalTypeName}Create = Partial<${entityMetadata.schemaName}> & Partial<${pascalTypeName}Bindings> & {`)
  
  // Only add primary name attribute if it exists and is not empty
  const primaryNameAttr = entityMetadata.primaryNameAttribute?.trim()
  if (primaryNameAttr) {
    lines.push(`  ${primaryNameAttr}: string; // Required for create`)
  }
  
  lines.push(`};`)
  
  lines.push('')
  lines.push(`export type ${pascalTypeName}Update = Partial<Omit<${entityMetadata.schemaName}, '${entityMetadata.primaryIdAttribute}'>> & Partial<${pascalTypeName}Bindings> & {`)
  
  // Primary ID attribute should always exist, but add safety check
  const primaryIdAttr = entityMetadata.primaryIdAttribute?.trim()
  if (primaryIdAttr) {
    lines.push(`  ${primaryIdAttr}: string; // Required for update`)
  }
  
  lines.push(`};`)
  
  return lines.join('\n')
}

/**
 * Get the entity set name for a target entity type
 */
function getEntitySetForTarget(target?: string): string {
  if (!target) return 'entities'
  
  // Common entity set mappings
  const entitySetMap: Record<string, string> = {
    'systemuser': 'systemusers',
    'team': 'teams', 
    'businessunit': 'businessunits',
    'transactioncurrency': 'transactioncurrencies'
  }
  
  // Check if we have a specific mapping
  if (entitySetMap[target]) {
    return entitySetMap[target]
  }
  
  // For custom entities, typically add 's' to the end
  if (target.includes('_')) {
    return `${target}s`
  }
  
  // Default fallback
  return `${target}s`
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
 * Generate type-safe expand types for $expand operations
 */
function generateExpandTypes(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {}
): string {
  const { includeComments = true } = options
  const lines: string[] = []
  const schemaName = entityMetadata.schemaName
  
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
  lines.push(`export type ${expandTypeName} =`)
  lines.push(`  | ${expandablePropsTypeName}[]`) // Array format
  lines.push(`  | {`) // Object format
  lines.push(`      [K in ${expandablePropsTypeName}]?: {`)
  lines.push(`        $select?: string[]`)
  lines.push(`        $filter?: any`)
  lines.push(`        $orderby?: any`)
  lines.push(`        $top?: number`)
  lines.push(`      }`)
  lines.push(`    }`)
  
  return lines.join('\n')
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
  let sanitized = label
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
    .replace(/^[0-9]/, '_$&') // Handle leading numbers
  
  // If the sanitized name is empty (e.g., emoji-only labels), generate a fallback
  if (!sanitized || sanitized.trim() === '') {
    // Create a fallback name using the original label's character codes
    const fallback = 'Option' + Array.from(label)
      .map(char => char.charCodeAt(0))
      .join('')
    return fallback
  }
  
  return sanitized
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