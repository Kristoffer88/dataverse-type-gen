import type { EntityDefinition, AttributeMetadata } from './types.js'
import { advancedLog } from './error-logger.js'

interface OptionSetData {
  Name: string
  DisplayName?: { UserLocalizedLabel?: { Label: string } }
  Options?: Array<{
    Value: number
    Label?: { UserLocalizedLabel?: { Label: string } }
  }>
}

export interface GenerateEntityTypeOptions {
  includeMetadata?: boolean
  includeUtilityTypes?: boolean
  includeLookupValues?: boolean
  includeBindingTypes?: boolean
}

export interface AttributeDetails extends AttributeMetadata {
  AttributeType: string
  MaxLength?: number
  MinValue?: number
  MaxValue?: number
  Precision?: number
  Format?: string
  DefaultFormValue?: number
  Targets?: string[]
  OptionSet?: {
    Name: string
    DisplayName?: { UserLocalizedLabel?: { Label: string } }
    Options?: Array<{
      Value: number
      Label?: { UserLocalizedLabel?: { Label: string } }
    }>
  }
  GlobalOptionSet?: {
    Name: string
    DisplayName?: { UserLocalizedLabel?: { Label: string } }
    Options?: Array<{
      Value: number
      Label?: { UserLocalizedLabel?: { Label: string } }
    }>
  }
}

export async function generateEntityTypeScript(
  entityName: string, 
  options: GenerateEntityTypeOptions = {}
): Promise<string> {
  try {
    // Get basic entity info
    const entityUrl = `/api/data/v9.1/EntityDefinitions(LogicalName='${entityName}')?$select=LogicalName,SchemaName,DisplayName,PrimaryIdAttribute,PrimaryNameAttribute,IsCustomEntity`
    const entityRes = await fetch(entityUrl)
    if (!entityRes.ok) {
      await advancedLog(entityRes, entityUrl, 'GET')
      throw new Error(`Failed to get entity definition: ${entityRes.status}`)
    }
    const entity = await entityRes.json() as EntityDefinition
    
    // Get all attributes with basic info
    const attrsUrl = `/api/data/v9.1/EntityDefinitions(LogicalName='${entityName}')/Attributes?$select=LogicalName,SchemaName,AttributeType,DisplayName,IsCustomAttribute,IsPrimaryId,IsPrimaryName,RequiredLevel`
    const attrsRes = await fetch(attrsUrl)
    if (!attrsRes.ok) {
      await advancedLog(attrsRes, attrsUrl, 'GET')
      throw new Error(`Failed to get attributes: ${attrsRes.status}`)
    }
    const attrsData = await attrsRes.json() as { value: AttributeMetadata[] }
    const attrs = attrsData.value
    
    // Get detailed metadata for each attribute type
    const attributeTypes = [
      'StringAttributeMetadata',
      'IntegerAttributeMetadata', 
      'BooleanAttributeMetadata',
      'DateTimeAttributeMetadata',
      'DecimalAttributeMetadata',
      'MoneyAttributeMetadata',
      'PicklistAttributeMetadata',
      'LookupAttributeMetadata',
      'UniqueIdentifierAttributeMetadata',
      'StateAttributeMetadata',
      'StatusAttributeMetadata'
    ]

    const detailedAttributes = new Map<string, AttributeDetails>()
    const optionSets = new Map<string, OptionSetData>()
    const lookupFields = new Map<string, {
      logicalName: string
      schemaName: string
      targets: string[]
    }>()

    // Fetch detailed metadata for each type
    for (const attributeType of attributeTypes) {
      try {
        let selectFields = 'LogicalName,SchemaName,DisplayName,RequiredLevel,IsCustomAttribute'
        let expandFields = ''
        
        // Add type-specific fields
        switch (attributeType) {
          case 'StringAttributeMetadata':
            selectFields += ',MaxLength,Format'
            break
          case 'IntegerAttributeMetadata':
            selectFields += ',MinValue,MaxValue'
            break
          case 'DecimalAttributeMetadata':
            selectFields += ',MinValue,MaxValue,Precision'
            break
          case 'MoneyAttributeMetadata':
            selectFields += ',MinValue,MaxValue,Precision'
            break
          case 'DateTimeAttributeMetadata':
            selectFields += ',Format,DateTimeBehavior'
            break
          case 'PicklistAttributeMetadata':
            selectFields += ',DefaultFormValue'
            expandFields = '&$expand=OptionSet($select=Name,DisplayName,Options),GlobalOptionSet($select=Name,DisplayName,Options)'
            break
          case 'LookupAttributeMetadata':
            selectFields += ',Targets'
            break
        }
        
        const url = `/api/data/v9.1/EntityDefinitions(LogicalName='${entityName}')/Attributes/Microsoft.Dynamics.CRM.${attributeType}?$select=${selectFields}${expandFields}`
        const res = await fetch(url)
        
        if (!res.ok) {
          await advancedLog(res, url, 'GET')
        }
        
        if (res.ok) {
          const data = await res.json() as { value: AttributeDetails[] }
          
          data.value?.forEach((attr) => {
            detailedAttributes.set(attr.LogicalName, {
              ...attr,
              AttributeType: attributeType.replace('AttributeMetadata', '')
            })
            
            // Collect option sets
            if (attr.OptionSet) {
              optionSets.set(attr.OptionSet.Name, attr.OptionSet)
            }
            if (attr.GlobalOptionSet) {
              optionSets.set(attr.GlobalOptionSet.Name, attr.GlobalOptionSet)
            }
            
            // Collect lookup fields
            if (attributeType === 'LookupAttributeMetadata' && attr.Targets) {
              lookupFields.set(attr.LogicalName, {
                logicalName: attr.LogicalName,
                schemaName: attr.SchemaName,
                targets: attr.Targets
              })
            }
          })
        }
      } catch {
        // Continue if a specific attribute type fails
      }
    }

    // Generate TypeScript file content
    let tsContent = `// Generated TypeScript definitions for ${entity.SchemaName}\n`
    tsContent += `// Entity: ${entity.DisplayName?.UserLocalizedLabel?.Label || entity.SchemaName}\n`
    tsContent += `// Total Attributes: ${attrs.length}\n`
    tsContent += `// Generated: ${new Date().toISOString()}\n\n`

    // Generate option set constants first
    optionSets.forEach((optionSet, name) => {
      if (optionSet.Options && optionSet.Options.length > 0) {
        const constantName = toPascalCase(name)
        tsContent += `export const ${constantName} = {\n`
        
        optionSet.Options.forEach((option) => {
          const propName = toValidPropertyName(option.Label?.UserLocalizedLabel?.Label || `Option${option.Value}`)
          const label = option.Label?.UserLocalizedLabel?.Label || `Option ${option.Value}`
          tsContent += `  ${propName}: { Value: ${option.Value}, Label: "${label}" },\n`
        })
        
        tsContent += `} as const;\n\n`
        tsContent += `export type ${constantName}Value = typeof ${constantName}[keyof typeof ${constantName}]['Value'];\n\n`
      }
    })

    // Generate main interface
    tsContent += `export interface ${entity.SchemaName} {\n`

    // Sort attributes: ID first, then name, then rest alphabetically
    const sortedAttrs = attrs.sort((a, b) => {
      if (a.IsPrimaryId) return -1
      if (b.IsPrimaryId) return 1
      if (a.IsPrimaryName) return -1
      if (b.IsPrimaryName) return 1
      return a.LogicalName.localeCompare(b.LogicalName)
    })

    sortedAttrs.forEach(attr => {
      const detailed = detailedAttributes.get(attr.LogicalName) || attr as AttributeDetails
      const isRequired = detailed.RequiredLevel?.Value === 'Required' || detailed.RequiredLevel?.Value === 'SystemRequired'
      const optional = isRequired ? '' : '?'
      
      let tsType = 'any'
      let comment = ''
      
      // Map Dataverse types to TypeScript types
      switch (detailed.AttributeType) {
        case 'String':
          tsType = 'string'
          if (detailed.MaxLength) {
            comment = ` // Max length: ${detailed.MaxLength}`
          }
          break
        case 'Integer':
          tsType = 'number'
          if (detailed.MinValue !== undefined || detailed.MaxValue !== undefined) {
            comment = ` // Range: ${detailed.MinValue || 'unbounded'} to ${detailed.MaxValue || 'unbounded'}`
          }
          break
        case 'BigInt':
          tsType = 'number'
          comment = ' // BigInt'
          break
        case 'Boolean':
          tsType = 'boolean'
          break
        case 'DateTime':
          tsType = 'Date | string'
          break
        case 'Decimal':
          tsType = 'number'
          if (detailed.Precision) {
            comment = ` // Decimal precision: ${detailed.Precision}`
          }
          break
        case 'Money':
          tsType = 'number'
          comment = ' // Currency value'
          break
        case 'Picklist':
          if (detailed.OptionSet || detailed.GlobalOptionSet) {
            const optionSetName = (detailed.OptionSet?.Name || detailed.GlobalOptionSet?.Name)
            const constantName = toPascalCase(optionSetName!)
            tsType = `${constantName}Value`
            comment = ` // Option set: ${optionSetName}`
          } else {
            tsType = 'number'
            comment = ' // Picklist value'
          }
          break
        case 'State':
          tsType = 'number'
          comment = ' // State code'
          break
        case 'Status':
          tsType = 'number'
          comment = ' // Status code'
          break
        case 'Lookup':
          tsType = 'string'
          if (detailed.Targets) {
            comment = ` // Lookup to: ${detailed.Targets.join(', ')}`
          } else {
            comment = ' // Entity reference ID'
          }
          break
        case 'Uniqueidentifier':
          tsType = 'string'
          comment = ' // GUID'
          break
        case 'Owner':
          tsType = 'string'
          comment = ' // Owner reference'
          break
        case 'EntityName':
          tsType = 'string'
          comment = ' // Entity name'
          break
        case 'Virtual':
          tsType = 'string'
          comment = ' // Virtual/computed field'
          break
        default:
          tsType = 'string'
          comment = ` // ${detailed.AttributeType}`
      }

      const displayName = detailed.DisplayName?.UserLocalizedLabel?.Label || attr.LogicalName
      const description = displayName !== attr.LogicalName ? ` - ${displayName}` : ''
      
      tsContent += `  /** ${attr.LogicalName}${description} */\n`
      tsContent += `  ${attr.LogicalName}${optional}: ${tsType};${comment}\n`
      
      // Add _value property for lookup fields when includeLookupValues is enabled
      if (detailed.AttributeType === 'Lookup' && options.includeLookupValues) {
        const valueProperty = `_${attr.LogicalName}_value`
        tsContent += `  /** ${valueProperty} - Resolved lookup GUID value */\n`
        tsContent += `  ${valueProperty}?: string; // Lookup value\n`
      }
      
      tsContent += `\n`
    })

    tsContent += `}\n\n`

    // Generate binding utility types when includeBindingTypes is enabled
    if (options.includeBindingTypes && lookupFields.size > 0) {
      tsContent += `export type ${entity.SchemaName}Bindings = {\n`
      
      lookupFields.forEach((lookupField) => {
        const bindingProperty = `${lookupField.schemaName}@odata.bind`
        const comment = ` // Bind to: ${lookupField.targets.join(', ')}`
        tsContent += `  '${bindingProperty}'?: string;${comment}\n`
      })
      
      tsContent += `};\n\n`
    }

    if (options.includeUtilityTypes !== false) {
      // Add utility type for creating new records (optional fields)
      const createBindings = options.includeBindingTypes && lookupFields.size > 0 ? ` & Partial<${entity.SchemaName}Bindings>` : ''
      tsContent += `export type ${entity.SchemaName}Create = Partial<${entity.SchemaName}>${createBindings} & {\n`
      tsContent += `  ${entity.PrimaryNameAttribute}: string; // Required for create\n`
      tsContent += `};\n\n`

      // Add utility type for updates (all optional except ID)
      const updateBindings = options.includeBindingTypes && lookupFields.size > 0 ? ` & Partial<${entity.SchemaName}Bindings>` : ''
      tsContent += `export type ${entity.SchemaName}Update = Partial<Omit<${entity.SchemaName}, '${entity.PrimaryIdAttribute}'>>${updateBindings} & {\n`
      tsContent += `  ${entity.PrimaryIdAttribute}: string; // Required for update\n`
      tsContent += `};\n\n`
    }

    if (options.includeMetadata !== false) {
      // Add metadata object for runtime information
      tsContent += `// Metadata object for runtime information\n`
      tsContent += `export const ${entity.SchemaName}Metadata = {\n`
      tsContent += `  entityName: "${entity.LogicalName}",\n`
      tsContent += `  schemaName: "${entity.SchemaName}",\n`
      tsContent += `  displayName: "${entity.DisplayName?.UserLocalizedLabel?.Label || entity.SchemaName}",\n`
      tsContent += `  isCustomEntity: ${entity.IsCustomEntity || false},\n`
      tsContent += `  primaryKey: "${entity.PrimaryIdAttribute}",\n`
      tsContent += `  primaryName: "${entity.PrimaryNameAttribute}",\n`
      tsContent += `  optionSets: {\n`
      
      optionSets.forEach((optionSet, name) => {
        const constantName = toPascalCase(name)
        tsContent += `    ${name}: ${constantName},\n`
      })
      
      tsContent += `  },\n`
      
      // Add lookup fields metadata when available
      if (lookupFields.size > 0) {
        tsContent += `  lookupFields: {\n`
        
        lookupFields.forEach((lookupField) => {
          const targetEntities = lookupField.targets.map(t => `'${t}'`).join(', ')
          tsContent += `    ${lookupField.logicalName}: {\n`
          tsContent += `      schemaName: '${lookupField.schemaName}',\n`
          tsContent += `      targets: [${targetEntities}],\n`
          tsContent += `      valueProperty: '_${lookupField.logicalName}_value'\n`
          tsContent += `    },\n`
        })
        
        tsContent += `  },\n`
      }
      tsContent += `  getDisplayName: (fieldName: keyof ${entity.SchemaName}): string => {\n`
      tsContent += `    // Add field display name mapping here\n`
      tsContent += `    return fieldName as string;\n`
      tsContent += `  },\n`
      tsContent += `  getOptionLabel: (fieldName: keyof ${entity.SchemaName}, value: number): string | null => {\n`
      tsContent += `    // Add option label lookup here\n`
      tsContent += `    return null;\n`
      tsContent += `  }\n`
      tsContent += `} as const;\n`
    }

    return tsContent

  } catch (error) {
    throw new Error(`Failed to generate TypeScript for entity '${entityName}': ${error}`)
  }
}

// Helper function for PascalCase conversion
function toPascalCase(str: string): string {
  if (!str) return 'Unknown'
  return str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

// Helper function to create valid TypeScript property names
function toValidPropertyName(str: string): string {
  if (!str) return 'Unknown'
  let cleaned = str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
  
  // If it starts with a number, prefix with underscore
  if (/^[0-9]/.test(cleaned)) {
    cleaned = '_' + cleaned
  }
  
  return cleaned
}