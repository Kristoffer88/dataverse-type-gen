import type { 
  EntityDefinition, 
  AttributeMetadata,
  LocalizedLabel
} from '../types.js'
import type {
  GlobalOptionSetDefinition,
  PicklistAttributeMetadata,
  MultiSelectPicklistAttributeMetadata,
  LookupAttributeMetadata,
  StateAttributeMetadata,
  StatusAttributeMetadata
} from '../client/index.js'

/**
 * Related entity information for type-safe nested expands
 */
export interface RelatedEntityInfo {
  relationshipName: string // e.g., "pum_program"
  targetEntityLogicalName: string // e.g., "pum_program" 
  targetEntitySetName: string // e.g., "pum_programs"
  relationshipType: 'OneToMany' | 'ManyToOne' | 'ManyToMany'
}

/**
 * Processed entity metadata for type generation
 */
export interface ProcessedEntityMetadata {
  logicalName: string
  schemaName: string
  displayName: string
  description?: string
  primaryIdAttribute: string
  primaryNameAttribute: string
  entitySetName: string
  isCustomEntity: boolean
  attributes: ProcessedAttributeMetadata[]
  optionSets: ProcessedOptionSet[]
  expandableProperties: string[] // Lookup fields + relationship names for $expand
  oneToManyRelationships: ProcessedRelationshipMetadata[]
  manyToOneRelationships: ProcessedRelationshipMetadata[]
  manyToManyRelationships: ProcessedManyToManyRelationshipMetadata[]
  /** Related entities with their full metadata for type-safe expands */
  relatedEntities: Record<string, RelatedEntityInfo>
}

/**
 * String attribute metadata for processing
 */
interface StringAttributeTypeMetadata {
  MaxLength?: number
  Format?: string
}

/**
 * Numeric attribute metadata for processing
 */
interface NumericAttributeTypeMetadata {
  MinValue?: number
  MaxValue?: number
  Precision?: number
}

/**
 * DateTime attribute metadata for processing
 */
interface DateTimeAttributeTypeMetadata {
  Format?: string
}

/**
 * Processed attribute metadata
 */
export interface ProcessedAttributeMetadata {
  logicalName: string
  schemaName: string
  displayName: string
  description?: string
  attributeType: string
  isCustomAttribute: boolean
  isValidForCreate: boolean
  isValidForRead: boolean
  isValidForUpdate: boolean
  requiredLevel: 'None' | 'SystemRequired' | 'ApplicationRequired' | 'Recommended'
  isPrimaryId: boolean
  isPrimaryName: boolean
  attributeOf?: string // For auxiliary attribute filtering
  // Type-specific properties
  maxLength?: number
  minValue?: number
  maxValue?: number
  precision?: number
  format?: string
  targets?: string[] // For lookup attributes
  optionSetName?: string // For picklist attributes
  globalOptionSet?: string // For global option sets
  isMultiSelect?: boolean // For multi-select picklists
  optionSet?: ProcessedOptionSet // For picklist attributes with full option set data
}

/**
 * Processed option set for type generation
 */
export interface ProcessedOptionSet {
  name: string
  displayName: string
  description?: string
  isGlobal: boolean
  isCustom: boolean
  options: ProcessedOption[]
}

/**
 * Processed option for constants generation
 */
export interface ProcessedOption {
  value: number
  label: string
  description?: string
}

/**
 * Processed relationship metadata for type generation
 */
export interface ProcessedRelationshipMetadata {
  schemaName: string
  referencedEntity: string
  referencedAttribute: string
  referencingEntity: string
  referencingAttribute: string
  isCustomRelationship: boolean
}

/**
 * Processed many-to-many relationship metadata for type generation
 */
export interface ProcessedManyToManyRelationshipMetadata {
  schemaName: string
  entity1LogicalName: string
  entity1IntersectAttribute: string
  entity2LogicalName: string
  entity2IntersectAttribute: string
  intersectEntityName: string
  isCustomRelationship: boolean
}

/**
 * Extract display name from localized label structure
 */
function extractDisplayName(localizedLabel?: LocalizedLabel): string {
  if (!localizedLabel) return ''
  
  // Try user localized label first, then first available label
  const label = localizedLabel.UserLocalizedLabel?.Label || 
                localizedLabel.LocalizedLabels?.[0]?.Label || 
                ''
  
  return label
}

/**
 * Extract required level from metadata
 */
function extractRequiredLevel(requiredLevel?: { Value: string }): 'None' | 'SystemRequired' | 'ApplicationRequired' | 'Recommended' {
  if (!requiredLevel?.Value) return 'None'
  
  switch (requiredLevel.Value) {
    case 'SystemRequired':
      return 'SystemRequired'
    case 'ApplicationRequired':
      return 'ApplicationRequired'
    case 'Recommended':
      return 'Recommended'
    default:
      return 'None'
  }
}

/**
 * Process entity metadata for type generation
 */
export function processEntityMetadata(entityMetadata: EntityDefinition, options?: { excludeSystemAuditRelationships?: boolean }): ProcessedEntityMetadata {
  const processed: ProcessedEntityMetadata = {
    logicalName: entityMetadata.LogicalName,
    schemaName: entityMetadata.SchemaName,
    displayName: extractDisplayName(entityMetadata.DisplayName) || entityMetadata.SchemaName,
    description: extractDisplayName(entityMetadata.Description),
    primaryIdAttribute: entityMetadata.PrimaryIdAttribute || '',
    primaryNameAttribute: entityMetadata.PrimaryNameAttribute || '',
    entitySetName: entityMetadata.EntitySetName || '',
    isCustomEntity: entityMetadata.IsCustomEntity,
    attributes: [],
    optionSets: [],
    expandableProperties: [],
    oneToManyRelationships: [],
    manyToOneRelationships: [],
    manyToManyRelationships: [],
    relatedEntities: {}
  }
  
  // Process attributes if available
  if (entityMetadata.Attributes) {
    const allProcessedAttributes = entityMetadata.Attributes.map(attr => processAttributeMetadata(attr))
    
    // Store all attributes initially (filtering will be applied during generation if configured)
    processed.attributes = allProcessedAttributes
    
    // Extract option sets from attributes
    processed.optionSets = extractOptionSetsFromAttributes(entityMetadata.Attributes)
    
    // Extract expandable properties (lookup fields for many-to-one relationships)
    const lookupFields = processed.attributes
      .filter(attr => attr.attributeType === 'Lookup')
      .map(attr => attr.schemaName)
    
    processed.expandableProperties = [...lookupFields]
  }
  
  // Process relationships if available
  if (entityMetadata.OneToManyRelationships) {
    processed.oneToManyRelationships = entityMetadata.OneToManyRelationships.map(rel => ({
      schemaName: rel.SchemaName,
      referencedEntity: rel.ReferencedEntity,
      referencedAttribute: rel.ReferencedAttribute,
      referencingEntity: rel.ReferencingEntity,
      referencingAttribute: rel.ReferencingAttribute,
      isCustomRelationship: rel.IsCustomRelationship
    }))
    
    // Add one-to-many relationship names to expandable properties
    const oneToManyNames = processed.oneToManyRelationships.map(rel => rel.schemaName)
    processed.expandableProperties.push(...oneToManyNames)
  }
  
  if (entityMetadata.ManyToOneRelationships) {
    processed.manyToOneRelationships = entityMetadata.ManyToOneRelationships.map(rel => ({
      schemaName: rel.SchemaName,
      referencedEntity: rel.ReferencedEntity,
      referencedAttribute: rel.ReferencedAttribute,
      referencingEntity: rel.ReferencingEntity,
      referencingAttribute: rel.ReferencingAttribute,
      isCustomRelationship: rel.IsCustomRelationship
    }))
    
    // Add many-to-one relationship names to expandable properties
    const manyToOneNames = processed.manyToOneRelationships.map(rel => rel.schemaName)
    processed.expandableProperties.push(...manyToOneNames)
  }
  
  if (entityMetadata.ManyToManyRelationships) {
    processed.manyToManyRelationships = entityMetadata.ManyToManyRelationships.map(rel => ({
      schemaName: rel.SchemaName,
      entity1LogicalName: rel.Entity1LogicalName,
      entity1IntersectAttribute: rel.Entity1IntersectAttribute,
      entity2LogicalName: rel.Entity2LogicalName,
      entity2IntersectAttribute: rel.Entity2IntersectAttribute,
      intersectEntityName: rel.IntersectEntityName,
      isCustomRelationship: rel.IsCustomRelationship
    }))
    
    // Add many-to-many relationship names to expandable properties
    const manyToManyNames = processed.manyToManyRelationships.map(rel => rel.schemaName)
    processed.expandableProperties.push(...manyToManyNames)
  }
  
  // Build related entities info from relationships and lookup attributes
  processed.relatedEntities = buildRelatedEntitiesInfo(processed, options?.excludeSystemAuditRelationships)
  
  return processed
}

/**
 * Build related entities information for type-safe expands
 */
function buildRelatedEntitiesInfo(primaryEntity: ProcessedEntityMetadata, excludeSystemAuditRelationships = false): Record<string, RelatedEntityInfo> {
  const relatedEntities: Record<string, RelatedEntityInfo> = {}

  // System audit relationship patterns to exclude for systemuser
  const systemAuditPatterns = [
    /^lk_.*_createdby$/,
    /^lk_.*_modifiedby$/,
    /^lk_.*_createdonbehalfby$/,
    /^lk_.*_modifiedonbehalfby$/,
    /^user_.*$/,
    /^systemuser_.*$/,
    /^createdby_.*$/,
    /^modifiedby_.*$/,
    /^createdonbehalfby_.*$/,
    /^modifiedonbehalfby_.*$/
  ]

  // Process lookup attributes (many-to-one relationships)
  for (const attr of primaryEntity.attributes) {
    if (attr.attributeType === 'Lookup' && attr.targets) {
      for (const targetEntity of attr.targets) {
        const relationshipName = attr.logicalName.replace(/_value$/, '')
        
        // Skip if this is a duplicate key
        if (relatedEntities[relationshipName]) {
          continue
        }
        
        relatedEntities[relationshipName] = {
          relationshipName,
          targetEntityLogicalName: targetEntity,
          targetEntitySetName: `${targetEntity}s`, // Will be corrected when we have actual metadata
          relationshipType: 'ManyToOne'
        }
      }
    }
  }

  // Process one-to-many relationships
  for (const rel of primaryEntity.oneToManyRelationships) {
    // Skip system audit relationships if configured
    if (excludeSystemAuditRelationships && primaryEntity.logicalName === 'systemuser') {
      const isSystemAuditRelationship = systemAuditPatterns.some(pattern => 
        pattern.test(rel.schemaName)
      )
      if (isSystemAuditRelationship) {
        continue
      }
    }
    
    // Skip if this is a duplicate key
    if (relatedEntities[rel.schemaName]) {
      continue
    }
    
    relatedEntities[rel.schemaName] = {
      relationshipName: rel.schemaName,
      targetEntityLogicalName: rel.referencingEntity,
      targetEntitySetName: `${rel.referencingEntity}s`, // Will be corrected when we have actual metadata
      relationshipType: 'OneToMany'
    }
  }

  // Process many-to-many relationships
  for (const rel of primaryEntity.manyToManyRelationships) {
    // Determine the target entity (the one that's not the current entity)
    const targetEntity = rel.entity1LogicalName === primaryEntity.logicalName 
      ? rel.entity2LogicalName 
      : rel.entity1LogicalName
    
    // Skip if this is a duplicate key
    if (relatedEntities[rel.schemaName]) {
      continue
    }
    
    relatedEntities[rel.schemaName] = {
      relationshipName: rel.schemaName,
      targetEntityLogicalName: targetEntity,
      targetEntitySetName: `${targetEntity}s`, // Will be corrected when we have actual metadata
      relationshipType: 'ManyToMany'
    }
  }

  return relatedEntities
}

/**
 * Extract all related entity names from processed metadata
 */
export function extractRelatedEntityNames(metadata: ProcessedEntityMetadata): string[] {
  const relatedEntityNames = new Set<string>()

  // From related entities info
  for (const relatedEntity of Object.values(metadata.relatedEntities)) {
    relatedEntityNames.add(relatedEntity.targetEntityLogicalName)
  }

  return Array.from(relatedEntityNames)
}

/**
 * Process individual attribute metadata
 */
export function processAttributeMetadata(attributeMetadata: AttributeMetadata): ProcessedAttributeMetadata {
  const processed: ProcessedAttributeMetadata = {
    logicalName: attributeMetadata.LogicalName,
    schemaName: attributeMetadata.SchemaName,
    displayName: extractDisplayName(attributeMetadata.DisplayName) || attributeMetadata.SchemaName,
    description: extractDisplayName(attributeMetadata.Description),
    attributeType: attributeMetadata.AttributeType,
    isCustomAttribute: attributeMetadata.IsCustomAttribute,
    isValidForCreate: attributeMetadata.IsValidForCreate,
    isValidForRead: attributeMetadata.IsValidForRead,
    isValidForUpdate: attributeMetadata.IsValidForUpdate,
    requiredLevel: extractRequiredLevel(attributeMetadata.RequiredLevel),
    isPrimaryId: attributeMetadata.IsPrimaryId || false,
    isPrimaryName: attributeMetadata.IsPrimaryName || false,
    attributeOf: attributeMetadata.AttributeOf
  }
  
  // Handle type-specific properties
  const odataType = (attributeMetadata as { '@odata.type'?: string })['@odata.type']
  
  // Normalize OData type by removing # prefix if present
  const normalizedODataType = odataType?.startsWith('#') ? odataType.substring(1) : odataType
  
  switch (normalizedODataType) {
    case 'Microsoft.Dynamics.CRM.PicklistAttributeMetadata':
      processPicklistAttribute(processed, attributeMetadata as PicklistAttributeMetadata)
      break
      
    case 'Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata':
      processMultiSelectPicklistAttribute(processed, attributeMetadata as MultiSelectPicklistAttributeMetadata)
      break
      
    case 'Microsoft.Dynamics.CRM.LookupAttributeMetadata':
      processLookupAttribute(processed, attributeMetadata as LookupAttributeMetadata)
      break
      
    case 'Microsoft.Dynamics.CRM.StateAttributeMetadata':
    case 'Microsoft.Dynamics.CRM.StatusAttributeMetadata':
      processStateStatusAttribute(processed, attributeMetadata as StateAttributeMetadata | StatusAttributeMetadata)
      break
      
    case 'Microsoft.Dynamics.CRM.StringAttributeMetadata':
      processStringAttribute(processed, attributeMetadata as AttributeMetadata & StringAttributeTypeMetadata)
      break
      
    case 'Microsoft.Dynamics.CRM.IntegerAttributeMetadata':
    case 'Microsoft.Dynamics.CRM.BigIntAttributeMetadata':
    case 'Microsoft.Dynamics.CRM.DecimalAttributeMetadata':
    case 'Microsoft.Dynamics.CRM.DoubleAttributeMetadata':
    case 'Microsoft.Dynamics.CRM.MoneyAttributeMetadata':
      processNumericAttribute(processed, attributeMetadata as AttributeMetadata & NumericAttributeTypeMetadata)
      break
      
    case 'Microsoft.Dynamics.CRM.DateTimeAttributeMetadata':
      processDateTimeAttribute(processed, attributeMetadata as AttributeMetadata & DateTimeAttributeTypeMetadata)
      break
  }
  
  return processed
}

/**
 * Process picklist attribute
 */
function processPicklistAttribute(processed: ProcessedAttributeMetadata, attr: PicklistAttributeMetadata): void {
  if (attr.OptionSet) {
    processed.optionSetName = attr.OptionSet.Name || `${processed.logicalName}_options`
  }
  
  if (attr.GlobalOptionSet) {
    processed.globalOptionSet = attr.GlobalOptionSet
  }
}

/**
 * Process multi-select picklist attribute
 */
function processMultiSelectPicklistAttribute(processed: ProcessedAttributeMetadata, attr: MultiSelectPicklistAttributeMetadata): void {
  processed.isMultiSelect = true
  
  if (attr.OptionSet) {
    processed.optionSetName = attr.OptionSet.Name || `${processed.logicalName}_options`
  }
  
  if (attr.GlobalOptionSet) {
    processed.globalOptionSet = attr.GlobalOptionSet
  }
}

/**
 * Process lookup attribute
 */
function processLookupAttribute(processed: ProcessedAttributeMetadata, attr: LookupAttributeMetadata): void {
  processed.targets = attr.Targets || []
  processed.format = attr.Format
}

/**
 * Process state/status attribute
 */
function processStateStatusAttribute(processed: ProcessedAttributeMetadata, attr: StateAttributeMetadata | StatusAttributeMetadata): void {
  if (attr.OptionSet) {
    processed.optionSetName = attr.OptionSet.Name || `${processed.logicalName}_options`
  }
}

/**
 * Process string attribute
 */
function processStringAttribute(processed: ProcessedAttributeMetadata, attr: AttributeMetadata & StringAttributeTypeMetadata): void {
  if (attr.MaxLength !== undefined) {
    processed.maxLength = attr.MaxLength
  }
  if (attr.Format) {
    processed.format = attr.Format
  }
}

/**
 * Process numeric attribute
 */
function processNumericAttribute(processed: ProcessedAttributeMetadata, attr: AttributeMetadata & NumericAttributeTypeMetadata): void {
  if (attr.MinValue !== undefined) {
    processed.minValue = attr.MinValue
  }
  if (attr.MaxValue !== undefined) {
    processed.maxValue = attr.MaxValue
  }
  if (attr.Precision !== undefined) {
    processed.precision = attr.Precision
  }
}

/**
 * Process datetime attribute
 */
function processDateTimeAttribute(processed: ProcessedAttributeMetadata, attr: AttributeMetadata & DateTimeAttributeTypeMetadata): void {
  if (attr.Format) {
    processed.format = attr.Format
  }
}

/**
 * Extract option sets from entity attributes
 */
export function extractOptionSetsFromAttributes(attributes: AttributeMetadata[]): ProcessedOptionSet[] {
  const optionSets: ProcessedOptionSet[] = []
  
  for (const attr of attributes) {
    const odataType = (attr as { '@odata.type'?: string })['@odata.type']
    
    // Normalize OData type by removing # prefix if present
    const normalizedODataType = odataType?.startsWith('#') ? odataType.substring(1) : odataType
    
    if (normalizedODataType?.includes('PicklistAttributeMetadata') || 
        normalizedODataType?.includes('StateAttributeMetadata') || 
        normalizedODataType?.includes('StatusAttributeMetadata')) {
      
      const picklistAttr = attr as PicklistAttributeMetadata
      
      if (picklistAttr.OptionSet && !picklistAttr.GlobalOptionSet) {
        // Local option set
        const processedOptionSet = processOptionSet(picklistAttr.OptionSet, attr.LogicalName)
        if (processedOptionSet) {
          optionSets.push(processedOptionSet)
        }
      }
    }
  }
  
  return optionSets
}

/**
 * Process option set metadata
 */
export function processOptionSet(
  optionSetMetadata: PicklistAttributeMetadata['OptionSet'] | GlobalOptionSetDefinition,
  fallbackName?: string
): ProcessedOptionSet | null {
  if (!optionSetMetadata?.Options) return null
  
  const processed: ProcessedOptionSet = {
    name: optionSetMetadata.Name || fallbackName || 'unknown_optionset',
    displayName: extractDisplayName(optionSetMetadata.DisplayName) || optionSetMetadata.Name || fallbackName || 'Unknown',
    description: extractDisplayName((optionSetMetadata as { Description?: LocalizedLabel }).Description),
    isGlobal: (optionSetMetadata as GlobalOptionSetDefinition).IsGlobal || false,
    isCustom: (optionSetMetadata as GlobalOptionSetDefinition).IsCustomOptionSet || (optionSetMetadata as { IsCustomOptionSet?: boolean }).IsCustomOptionSet || false,
    options: []
  }
  
  // Process options
  processed.options = optionSetMetadata.Options.map(option => ({
    value: option.Value,
    label: extractDisplayName(option.Label) || option.Value.toString(),
    description: extractDisplayName((option as { Description?: LocalizedLabel }).Description)
  }))
  
  return processed
}

/**
 * Process global option set
 */
export function processGlobalOptionSet(globalOptionSet: GlobalOptionSetDefinition): ProcessedOptionSet {
  return {
    name: globalOptionSet.Name,
    displayName: extractDisplayName(globalOptionSet.DisplayName) || globalOptionSet.Name,
    description: extractDisplayName(globalOptionSet.Description),
    isGlobal: globalOptionSet.IsGlobal,
    isCustom: globalOptionSet.IsCustomOptionSet,
    options: globalOptionSet.Options.map(option => ({
      value: option.Value,
      label: extractDisplayName(option.Label) || option.Value.toString(),
      description: extractDisplayName((option as { Description?: LocalizedLabel }).Description)
    }))
  }
}

/**
 * Merge processed option sets, avoiding duplicates
 */
export function mergeOptionSets(optionSets: ProcessedOptionSet[]): ProcessedOptionSet[] {
  const uniqueOptionSets = new Map<string, ProcessedOptionSet>()
  
  for (const optionSet of optionSets) {
    const key = optionSet.name
    if (!uniqueOptionSets.has(key)) {
      uniqueOptionSets.set(key, optionSet)
    }
  }
  
  return Array.from(uniqueOptionSets.values())
}

/**
 * Filter attributes by type
 */
export function filterAttributesByType(
  attributes: ProcessedAttributeMetadata[], 
  types: string[]
): ProcessedAttributeMetadata[] {
  return attributes.filter(attr => types.includes(attr.attributeType))
}

/**
 * Get primary attributes (ID and Name)
 */
export function getPrimaryAttributes(attributes: ProcessedAttributeMetadata[]): {
  primaryId?: ProcessedAttributeMetadata
  primaryName?: ProcessedAttributeMetadata
} {
  return {
    primaryId: attributes.find(attr => attr.isPrimaryId),
    primaryName: attributes.find(attr => attr.isPrimaryName)
  }
}

/**
 * Group attributes by type
 */
export function groupAttributesByType(attributes: ProcessedAttributeMetadata[]): Record<string, ProcessedAttributeMetadata[]> {
  const groups: Record<string, ProcessedAttributeMetadata[]> = {}
  
  for (const attr of attributes) {
    if (!groups[attr.attributeType]) {
      groups[attr.attributeType] = []
    }
    groups[attr.attributeType].push(attr)
  }
  
  return groups
}

/**
 * Get lookup attributes with their targets
 */
export function getLookupAttributes(attributes: ProcessedAttributeMetadata[]): Array<ProcessedAttributeMetadata & { targets: string[] }> {
  return attributes
    .filter(attr => attr.attributeType === 'Lookup' && attr.targets)
    .map(attr => ({ ...attr, targets: attr.targets! }))
}

/**
 * Get option set attributes
 */
export function getOptionSetAttributes(attributes: ProcessedAttributeMetadata[]): ProcessedAttributeMetadata[] {
  return attributes.filter(attr => 
    attr.attributeType === 'Picklist' || 
    attr.attributeType === 'MultiSelectPicklist' ||
    attr.attributeType === 'State' ||
    attr.attributeType === 'Status'
  )
}

/**
 * Filter out auxiliary attributes using AttributeOf field
 * Auxiliary attributes are system-generated fields like lookup name fields that reference other attributes
 * 
 * @param attributes - Array of processed attribute metadata
 * @returns Filtered array without auxiliary attributes
 */
export function filterAuxiliaryAttributes(attributes: ProcessedAttributeMetadata[]): ProcessedAttributeMetadata[] {
  return attributes.filter(attr => !attr.attributeOf)
}

/**
 * Validate processed metadata
 */
export function validateProcessedMetadata(metadata: ProcessedEntityMetadata): {
  isValid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []
  
  // Required fields validation
  if (!metadata.logicalName) {
    errors.push('Missing logical name')
  }
  
  if (!metadata.schemaName) {
    errors.push('Missing schema name')
  }
  
  if (!metadata.primaryIdAttribute) {
    warnings.push('Missing primary ID attribute')
  }
  
  if (!metadata.primaryNameAttribute) {
    warnings.push('Missing primary name attribute')
  }
  
  // Attributes validation
  if (metadata.attributes.length === 0) {
    warnings.push('No attributes found')
  }
  
  // Check for duplicate attribute logical names
  const logicalNames = new Set<string>()
  for (const attr of metadata.attributes) {
    if (logicalNames.has(attr.logicalName)) {
      errors.push(`Duplicate attribute logical name: ${attr.logicalName}`)
    }
    logicalNames.add(attr.logicalName)
  }
  
  // Option sets validation
  for (const optionSet of metadata.optionSets) {
    if (optionSet.options.length === 0) {
      warnings.push(`Option set '${optionSet.name}' has no options`)
    }
    
    // Check for duplicate option values
    const values = new Set<number>()
    for (const option of optionSet.options) {
      if (values.has(option.value)) {
        errors.push(`Duplicate option value in '${optionSet.name}': ${option.value}`)
      }
      values.add(option.value)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}