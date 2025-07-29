import type { 
  ProcessedEntityMetadata
} from '../processors/index.js'
import { getSharedImportPath, shouldOrganizeDirectories } from './import-utils.js'

// Import from modular files
import { generateEntityInterface } from './entity-interface.js'
import { generateOptionSetConstants } from './optionset-generation.js'
import { generateMetadataObject } from './metadata-generation.js'
import { generateBindingTypes } from './binding-types.js'
import { generateExpandTypes } from './expand-types.js'
import { generateOptionSetConstantName, generateOptionSetTypeName } from './utils.js'

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
  excludeAuxiliaryAttributes?: boolean
  nestedExpand?: boolean
  excludeSystemAuditRelationships?: boolean
  // Directory structure options
  primaryEntities?: string[]
  relatedEntitiesDir?: string
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

// Re-export all the functions from the modules
export { generateEntityInterface } from './entity-interface.js'
export { generateOptionSetConstants, generateGlobalOptionSetFile } from './optionset-generation.js'
export { generateMetadataObject } from './metadata-generation.js'
export { generateImports } from './import-generation.js'

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
 * Generate complete TypeScript file for an entity
 */
export function generateEntityFile(
  entityMetadata: ProcessedEntityMetadata,
  options: TypeGenerationOptions = {},
  allEntities: ProcessedEntityMetadata[] = []
): GeneratedCode {
  const lines: string[] = []
  const imports: Set<string> = new Set()

  // Directory organization configuration
  const { primaryEntities = [], relatedEntitiesDir = 'related', nestedExpand = false } = options
  const organizingDirectories = shouldOrganizeDirectories(relatedEntitiesDir, nestedExpand, primaryEntities)

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
    
    // Calculate correct import path for global choices
    const globalChoicePath = organizingDirectories 
      ? getSharedImportPath(entityMetadata.logicalName, `global-choices/${globalOptionSet.name}.js`, primaryEntities)
      : `./global-choices/${globalOptionSet.name}.js`
    
    if (usesConstant) {
      imports.add(`import { ${constantName}, type ${typeName}Value } from '${globalChoicePath}'`)
    } else {
      // Only import the type if constant is not used
      imports.add(`import type { ${typeName}Value } from '${globalChoicePath}'`)
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
    ? generateBindingTypes(entityMetadata, options, allEntities)
    : undefined

  // Generate expand types for type-safe $expand operations
  const expandResult = generateExpandTypes(entityMetadata, options, allEntities)
  const expandTypes = expandResult.expandTypes
  
  // Add related entity imports to the imports set
  expandResult.relatedEntityImports.forEach(imp => imports.add(imp))

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