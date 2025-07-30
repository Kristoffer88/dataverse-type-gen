import type { ProcessedEntityMetadata, ProcessedOptionSet } from '../processors/index.js'
import type { CodeGenConfig, GeneratedFileResult, CodeGenResult } from './index.js'
import { 
  writeGlobalOptionSetDeclaration, 
  writeEntityHooksFile, 
  writeEntityQueryBuildersFile, 
  writeEntityTypeDeclaration,
  writeQueryTypesFile 
} from './file-writer.js'
import { generateIndexFile, calculateGenerationResults } from './result-tracking.js'

/**
 * Default code generation configuration
 */
export const DEFAULT_CODEGEN_CONFIG: CodeGenConfig = {
  outputDir: './generated',
  fileExtension: '.ts',
  indexFile: true,
  prettier: true,
  eslint: false,
  overwrite: true,
  generateHooks: true,
  relatedEntitiesDir: 'related',
  primaryEntities: [],
  typeGenerationOptions: {
    includeComments: true,
    includeValidation: true,
    includeMetadata: true,
    useExactTypes: true
  }
}

/**
 * Generate TypeScript declarations for multiple entities with optional related entities
 */
export async function generateMultipleEntityTypes(
  entities: ProcessedEntityMetadata[],
  config: Partial<CodeGenConfig> = {},
  relatedEntities: ProcessedEntityMetadata[] = []
): Promise<CodeGenResult> {
  const finalConfig = { ...DEFAULT_CODEGEN_CONFIG, ...config }
  const startTime = Date.now()
  
  const results: GeneratedFileResult[] = []
  
  // Combine primary and related entities for processing
  const allEntities = [...entities, ...relatedEntities]
  
  console.log(`📝 Generating ${entities.length} primary entity files${relatedEntities.length > 0 ? ` + ${relatedEntities.length} related entity files` : ''}...`)
  
  // Collect all unique global option sets from all entities
  const globalOptionSetsMap = new Map<string, ProcessedOptionSet>()
  
  for (const entity of allEntities) {
    for (const optionSet of entity.optionSets) {
      if (optionSet.isGlobal && !globalOptionSetsMap.has(optionSet.name)) {
        globalOptionSetsMap.set(optionSet.name, optionSet)
      }
    }
  }
  
  const globalOptionSets = Array.from(globalOptionSetsMap.values())
  
  // Generate global option set files
  if (globalOptionSets.length > 0) {
    const globalOptionSetPromises = globalOptionSets.map(optionSet => 
      writeGlobalOptionSetDeclaration(optionSet, finalConfig)
    )
    
    const globalOptionSetResults = await Promise.all(globalOptionSetPromises)
    results.push(...globalOptionSetResults)
  }
  
  // Only generate hooks for primary entities requested by the user
  // Related entities get type definitions but not hooks/queries
  const entitiesNeedingHooks = new Set<ProcessedEntityMetadata>()
  
  if (finalConfig.generateHooks) {
    // Only add primary entities - no hooks for related entities
    entities.forEach(entity => entitiesNeedingHooks.add(entity))
    
    console.log(`🔗 Generating ${entities.length} hooks for primary entities only...`)
  }
  
  // Process entities in batches to avoid overwhelming the system
  const batchSize = 5
  for (let i = 0; i < allEntities.length; i += batchSize) {
    const batch = allEntities.slice(i, i + batchSize)
    
    // Generate type declarations
    const typePromises = batch.map(entity => 
      writeEntityTypeDeclaration(entity, finalConfig, allEntities)
    )
    
    // Generate hooks for entities that need them (primary + related entities referenced in hooks)
    const entitiesNeedingHooksInBatch = batch.filter(entity => entitiesNeedingHooks.has(entity))
    const hookPromises = finalConfig.generateHooks 
      ? entitiesNeedingHooksInBatch.map(entity => writeEntityHooksFile(entity, finalConfig))
      : []
    
    // Generate query builders for entities that have hooks
    const queryBuilderPromises = finalConfig.generateHooks 
      ? entitiesNeedingHooksInBatch.map(entity => writeEntityQueryBuildersFile(entity, finalConfig))
      : []
    
    const batchResults = await Promise.all([...typePromises, ...hookPromises, ...queryBuilderPromises])
    results.push(...batchResults)
    
    // Small delay between batches to be respectful to the system
    if (i + batchSize < allEntities.length) {
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }

  // Generate query-types file if hooks are enabled
  if (finalConfig.generateHooks) {
    const queryTypesResult = await writeQueryTypesFile(finalConfig)
    results.push(queryTypesResult)
  }

  // Generate index file if requested
  let indexFile: GeneratedFileResult | undefined
  if (finalConfig.indexFile) {
    // Only include entity files in the main index, not global option sets
    const entityFiles = results.filter(r => r.success && !r.filePath.includes('global-choices'))
    indexFile = await generateIndexFile(entityFiles, finalConfig)
  }

  return calculateGenerationResults(results, indexFile, startTime)
}