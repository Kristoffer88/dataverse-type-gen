import type { EntityDefinition, AttributeMetadata } from '../types.js'
import { createAuthenticatedFetcher } from '../auth/index.js'
import { advancedLog, getStatusCodeDescription } from '../error-logger.js'
import { globalRequestQueue } from './concurrent-queue.js'
import { fetchEntitiesWithOrFilter } from './or-filter-batching.js'

// Create authenticated fetcher instance
const authenticatedFetch = createAuthenticatedFetcher()

/**
 * Options for fetching entity metadata
 */
export interface FetchEntityMetadataOptions {
  includeAttributes?: boolean
  includeRelationships?: boolean
  attributeTypes?: string[]
  select?: string[]
}

/**
 * Global option set definition from Dataverse API
 */
export interface GlobalOptionSetDefinition {
  MetadataId: string
  Name: string
  DisplayName?: {
    LocalizedLabels: Array<{ Label: string; LanguageCode: number }>
    UserLocalizedLabel?: { Label: string; LanguageCode: number }
  }
  Description?: {
    LocalizedLabels: Array<{ Label: string; LanguageCode: number }>
    UserLocalizedLabel?: { Label: string; LanguageCode: number }
  }
  Options: Array<{
    Value: number
    Label?: {
      LocalizedLabels: Array<{ Label: string; LanguageCode: number }>
      UserLocalizedLabel?: { Label: string; LanguageCode: number }
    }
    Description?: {
      LocalizedLabels: Array<{ Label: string; LanguageCode: number }>
      UserLocalizedLabel?: { Label: string; LanguageCode: number }
    }
  }>
  IsCustomOptionSet: boolean
  IsGlobal: boolean
  OptionSetType: string
}

/**
 * Picklist attribute metadata with expanded option set
 */
export interface PicklistAttributeMetadata extends AttributeMetadata {
  '@odata.type': 'Microsoft.Dynamics.CRM.PicklistAttributeMetadata'
  OptionSet?: {
    MetadataId: string
    Name?: string
    DisplayName?: {
      LocalizedLabels: Array<{ Label: string; LanguageCode: number }>
      UserLocalizedLabel?: { Label: string; LanguageCode: number }
    }
    Options: Array<{
      Value: number
      Label?: {
        LocalizedLabels: Array<{ Label: string; LanguageCode: number }>
        UserLocalizedLabel?: { Label: string; LanguageCode: number }
      }
    }>
    IsGlobal: boolean
    IsCustomOptionSet: boolean
  }
  GlobalOptionSet?: string
}

/**
 * Multi-select picklist attribute metadata
 */
export interface MultiSelectPicklistAttributeMetadata extends AttributeMetadata {
  '@odata.type': 'Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata'
  OptionSet?: PicklistAttributeMetadata['OptionSet']
  GlobalOptionSet?: string
}

/**
 * Lookup attribute metadata with target information
 */
export interface LookupAttributeMetadata extends AttributeMetadata {
  '@odata.type': 'Microsoft.Dynamics.CRM.LookupAttributeMetadata'
  Targets?: string[]
  Format?: string
}

/**
 * State attribute metadata
 */
export interface StateAttributeMetadata extends AttributeMetadata {
  '@odata.type': 'Microsoft.Dynamics.CRM.StateAttributeMetadata'
  OptionSet?: PicklistAttributeMetadata['OptionSet']
}

/**
 * Status attribute metadata
 */
export interface StatusAttributeMetadata extends AttributeMetadata {
  '@odata.type': 'Microsoft.Dynamics.CRM.StatusAttributeMetadata'
  OptionSet?: PicklistAttributeMetadata['OptionSet']
}

/**
 * Solution definition from Dataverse API
 */
export interface SolutionDefinition {
  solutionid: string
  uniquename: string
  friendlyname?: string
  version?: string
  publisherid?: string
  ismanaged?: boolean
  description?: string
}

/**
 * Solution component definition from Dataverse API
 */
export interface SolutionComponent {
  solutioncomponentid: string
  solutionid?: string
  _solutionid_value?: string  // Alternative field name returned by API
  objectid: string
  componenttype: number
  rootcomponentbehavior?: number
  ismetadata?: boolean
}

/**
 * Component type constants for solution components
 */
export const COMPONENT_TYPES = {
  ENTITY: 1,
  ATTRIBUTE: 2,
  RELATIONSHIP: 10,
  OPTION_SET: 9,
  // Add more as needed
} as const

/**
 * Fetch single entity metadata from Dataverse
 * 
 * @param entityLogicalName - The logical name of the entity (e.g., 'account', 'contact')
 * @param options - Options for customizing the fetch
 * @returns Promise<EntityDefinition | null>
 */
export async function fetchEntityMetadata(
  entityLogicalName: string,
  options: FetchEntityMetadataOptions = {}
): Promise<EntityDefinition | null> {
  const {
    includeAttributes = true,
    includeRelationships = false,
    select = [
      'LogicalName',
      'SchemaName', 
      'DisplayName',
      'Description',
      'HasActivities',
      'HasFeedback',
      'HasNotes',
      'IsActivity',
      'IsCustomEntity',
      'OwnershipType',
      'PrimaryIdAttribute',
      'PrimaryNameAttribute',
      'EntitySetName'
    ]
  } = options

  try {
    // Build URL with proper OData parameters
    const params = new URLSearchParams()
    
    if (select.length > 0) {
      params.append('$select', select.join(','))
    }
    
    // Add expand parameters if needed
    const expandItems: string[] = []
    if (includeAttributes) {
      expandItems.push('Attributes')
    }
    if (includeRelationships) {
      expandItems.push('OneToManyRelationships', 'ManyToOneRelationships', 'ManyToManyRelationships')
    }
    
    if (expandItems.length > 0) {
      params.append('$expand', expandItems.join(','))
    }
    
    const url = `/api/data/v9.2/EntityDefinitions(LogicalName='${entityLogicalName}')${params.toString() ? `?${params.toString()}` : ''}`
    
    const response = await authenticatedFetch(url, { method: 'GET' })
    
    if (response.status === 404) {
      return null // Entity not found
    }
    
    if (!response.ok) {
      await advancedLog(response, url, 'GET')
      const statusDescription = getStatusCodeDescription(response.status)
      throw new Error(`Failed to fetch entity metadata for '${entityLogicalName}': ${response.status} ${response.statusText} - ${statusDescription}`)
    }
    
    const entityData = await response.json() as EntityDefinition
    
    // If attributes are requested, fetch them separately with full OptionSet data
    if (includeAttributes && entityData) {
      try {
        const detailedAttributes = await fetchEntityAttributes(entityLogicalName)
        // Replace the basic attributes with detailed ones that include OptionSet data
        entityData.Attributes = detailedAttributes
      } catch (error) {
        // If fetching detailed attributes fails, keep the basic ones
        console.warn(`Failed to fetch detailed attributes for ${entityLogicalName}, using basic attributes:`, error)
      }
    }
    
    return entityData
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching entity metadata for '${entityLogicalName}': ${error.message}`)
    }
    throw error
  }
}

/**
 * Progress callback for entity fetching
 */
export type ProgressCallback = (current: number, total: number, entityName?: string) => void

/**
 * Fetch ALL entity metadata from Dataverse for complete type safety
 * Used when fullMetadata is enabled in configuration
 */
export async function fetchAllEntityMetadata(
  options: FetchEntityMetadataOptions & { onProgress?: ProgressCallback } = {}
): Promise<EntityDefinition[]> {
  console.log(`🌍 Fetching ALL entities from Dataverse for complete type safety...`)
  
  try {
    // Get all entities with basic metadata first
    const allEntities = await fetchAllEntities({
      select: [
        'LogicalName',
        'SchemaName', 
        'DisplayName',
        'Description',
        'HasActivities',
        'HasFeedback',
        'HasNotes',
        'IsActivity',
        'IsCustomEntity',
        'OwnershipType',
        'PrimaryIdAttribute',
        'PrimaryNameAttribute',
        'EntitySetName'
      ]
    })
    
    console.log(`📊 Found ${allEntities.length} total entities in Dataverse`)
    
    // Now fetch detailed metadata for each entity if attributes are requested
    if (options.includeAttributes) {
      const entitiesWithAttributes = await fetchMultipleEntities(
        allEntities.map(e => e.LogicalName),
        { ...options, onProgress: options.onProgress }
      )
      
      console.log(`✅ Successfully fetched detailed metadata for ${entitiesWithAttributes.length} entities`)
      return entitiesWithAttributes
    }
    
    return allEntities
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching all entity metadata: ${error.message}`)
    }
    throw error
  }
}

/**
 * Fetch multiple entities metadata including related entities for type-safe expands
 */
export async function fetchMultipleEntitiesWithRelated(
  entityNames: string[],
  options: FetchEntityMetadataOptions & { includeRelatedEntities?: boolean } = {}
): Promise<{
  primaryEntities: EntityDefinition[]
  relatedEntities: Map<string, EntityDefinition>
}> {
  const { includeRelatedEntities = false, ...baseOptions } = options
  
  console.log(`📥 Fetching metadata for ${entityNames.length} primary entities...`)
  
  // Fetch primary entities with relationships if needed
  const primaryEntities = await fetchMultipleEntities(entityNames, {
    ...baseOptions,
    includeRelationships: includeRelatedEntities
  })

  const relatedEntities = new Map<string, EntityDefinition>()

  if (includeRelatedEntities && primaryEntities.length > 0) {
    // Import processor function to extract related entity names
    const { processEntityMetadata, extractRelatedEntityNames } = await import('../processors/index.js')
    
    // Process primary entities to extract related entity names
    const allRelatedEntityNames = new Set<string>()
    
    for (const entity of primaryEntities) {
      const processed = processEntityMetadata(entity)
      const relatedNames = extractRelatedEntityNames(processed)
      relatedNames.forEach(name => allRelatedEntityNames.add(name))
    }

    // Remove primary entities from related entities list to avoid duplicates
    entityNames.forEach(name => allRelatedEntityNames.delete(name))

    const relatedEntityArray = Array.from(allRelatedEntityNames)

    if (relatedEntityArray.length > 0) {
      console.log(`🔗 Discovering ${relatedEntityArray.length} related entities...`)
      console.log(`📥 Fetching metadata for related entities...`)
      
      // Fetch related entities metadata
      const relatedEntitiesArray = await fetchMultipleEntities(relatedEntityArray, baseOptions)
      
      // Store in map for easy lookup
      for (const entity of relatedEntitiesArray) {
        relatedEntities.set(entity.LogicalName, entity)
      }
      
      console.log(`✅ Successfully fetched ${relatedEntitiesArray.length} related entities`)
    }
  }

  return {
    primaryEntities,
    relatedEntities
  }
}

/**
 * Fetch entity attributes with proper casting for specific attribute types
 * This is essential for getting full picklist option data
 * 
 * Uses parallel processing for attribute type casting to improve performance
 * 
 * @param entityLogicalName - The logical name of the entity
 * @param attributeTypes - Specific attribute types to cast (optional)
 * @returns Promise<AttributeMetadata[]>
 */
export async function fetchEntityAttributes(
  entityLogicalName: string,
  attributeTypes: string[] = [
    'Microsoft.Dynamics.CRM.PicklistAttributeMetadata',
    'Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata',
    'Microsoft.Dynamics.CRM.StateAttributeMetadata',
    'Microsoft.Dynamics.CRM.StatusAttributeMetadata',
    'Microsoft.Dynamics.CRM.LookupAttributeMetadata'
  ]
): Promise<AttributeMetadata[]> {
  
  try {
    // First fetch all attributes with basic information including AttributeOf for auxiliary filtering
    const basicUrl = `/api/data/v9.2/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes?$select=LogicalName,SchemaName,DisplayName,Description,AttributeType,IsCustomAttribute,IsValidForCreate,IsValidForRead,IsValidForUpdate,RequiredLevel,IsPrimaryId,IsPrimaryName,AttributeOf`
    
    const basicData = await globalRequestQueue.execute<{ value: AttributeMetadata[] }>(
      () => authenticatedFetch(basicUrl, { method: 'GET' }),
      { 
        url: basicUrl, 
        method: 'GET',
        priority: 2 // High priority for basic attributes
      }
    )
    
    const basicAttributes = basicData.value
    
    // Smart optimization: Only cast attribute types that actually exist in this entity
    // This can reduce API calls from 5 per entity to 0-3 per entity on average
    const existingAttributeTypes = new Set<string>()
    for (const attr of basicAttributes) {
      if (attr.AttributeType === 'Picklist') {
        existingAttributeTypes.add('Microsoft.Dynamics.CRM.PicklistAttributeMetadata')
      } else if (attr.AttributeType === 'MultiSelectPicklist') {
        existingAttributeTypes.add('Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata')
      } else if (attr.AttributeType === 'State') {
        existingAttributeTypes.add('Microsoft.Dynamics.CRM.StateAttributeMetadata')
      } else if (attr.AttributeType === 'Status') {
        existingAttributeTypes.add('Microsoft.Dynamics.CRM.StatusAttributeMetadata')
      } else if (attr.AttributeType === 'Lookup' || attr.AttributeType === 'Customer' || attr.AttributeType === 'Owner') {
        existingAttributeTypes.add('Microsoft.Dynamics.CRM.LookupAttributeMetadata')
      }
    }
    
    const relevantAttributeTypes = attributeTypes.filter(type => existingAttributeTypes.has(type))
    
    if (relevantAttributeTypes.length === 0) {
      // No special attribute types found - return basic attributes only
      return basicAttributes
    }
    
    // Process only the relevant attribute types in parallel for much better performance
    const castPromises = relevantAttributeTypes.map(async (attributeType) => {
      try {
        const castUrl = `/api/data/v9.2/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes/${attributeType}`
        
        // Add expand for option sets if dealing with picklist types
        const expandParams = attributeType.includes('Picklist') || attributeType.includes('State') || attributeType.includes('Status')
          ? '?$expand=OptionSet' 
          : ''
        
        const castData = await globalRequestQueue.execute<{ value: AttributeMetadata[] }>(
          () => authenticatedFetch(`${castUrl}${expandParams}`, { method: 'GET' }),
          {
            url: `${castUrl}${expandParams}`,
            method: 'GET',
            priority: 1, // Lower priority than basic attributes
            maxRetries: 2 // Fewer retries for attribute casting (non-critical)
          }
        )
        
        return castData.value || []
      } catch (castError) {
        console.warn(`Failed to cast attributes for type ${attributeType} on entity ${entityLogicalName}:`, castError)
        return []
      }
    })
    
    // Wait for all attribute type casting to complete
    const castResults = await Promise.all(castPromises)
    
    // Merge all cast attributes with basic attributes
    for (const castAttributes of castResults) {
      for (const castAttr of castAttributes) {
        const basicIndex = basicAttributes.findIndex(attr => attr.LogicalName === castAttr.LogicalName)
        if (basicIndex >= 0) {
          // Replace basic attribute with cast version that has full details
          basicAttributes[basicIndex] = { ...basicAttributes[basicIndex], ...castAttr }
        }
      }
    }
    
    return basicAttributes
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching entity attributes for '${entityLogicalName}': ${error.message}`)
    }
    throw error
  }
}

/**
 * Fetch global option set definition
 * 
 * @param optionSetName - The name of the global option set
 * @returns Promise<GlobalOptionSetDefinition | null>
 */
export async function fetchGlobalOptionSet(optionSetName: string): Promise<GlobalOptionSetDefinition | null> {
  try {
    const url = `/api/data/v9.2/GlobalOptionSetDefinitions(Name='${optionSetName}')`
    
    const optionSetData = await globalRequestQueue.execute<GlobalOptionSetDefinition>(
      () => authenticatedFetch(url, { method: 'GET' }),
      { 
        url, 
        method: 'GET',
        priority: 0 // Normal priority for option sets
      }
    )
    
    return optionSetData
    
  } catch (error) {
    // Check if it's a 404 (option set not found) - this is expected sometimes
    if (error instanceof Error && error.message.includes('404')) {
      return null
    }
    
    if (error instanceof Error) {
      throw new Error(`Error fetching global option set '${optionSetName}': ${error.message}`)
    }
    throw error
  }
}

/**
 * Fetch entities by publisher prefix (not actual solution membership)
 * NOTE: Uses client-side filtering since startswith() is not supported by EntityDefinitions
 * 
 * @param publisherPrefix - The publisher prefix (e.g., 'pum')
 * @returns Promise<EntityDefinition[]>
 */
export async function fetchPublisherEntities(
  publisherPrefix: string
): Promise<EntityDefinition[]> {
  try {
    // Since startswith() is NOT SUPPORTED (Error 0x8006088a), fetch all custom entities
    // and filter client-side. See API-KNOWLEDGE.md for details.
    const allCustomEntities = await fetchAllEntities({
      customOnly: true,
      select: ['LogicalName', 'SchemaName', 'DisplayName', 'Description', 'IsCustomEntity', 'PrimaryIdAttribute', 'PrimaryNameAttribute']
    })
    
    // Filter client-side by publisher prefix
    const filterPattern = `${publisherPrefix}_`
    const solutionEntities = allCustomEntities.filter(entity => 
      entity.LogicalName.startsWith(filterPattern)
    )
    
    // Note: If no entities found, solutionEntities will be empty array
    
    return solutionEntities
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching publisher entities for publisher '${publisherPrefix}': ${error.message}`)
    }
    throw error
  }
}

/**
 * Fetch multiple entities by logical names
 * 
 * Uses OR-filter batching for optimal performance when cache is disabled
 * 
 * @param entityNames - Array of entity logical names
 * @param options - Options for customizing the fetch
 * @returns Promise<EntityDefinition[]>
 */
export async function fetchMultipleEntities(
  entityNames: string[],
  options: FetchEntityMetadataOptions & { onProgress?: ProgressCallback } = {}
): Promise<EntityDefinition[]> {
  if (entityNames.length === 0) {
    return []
  }

  const { onProgress, includeAttributes = true, includeRelationships = false } = options
  const cacheEnabled = process.env.DATAVERSE_CACHE_ENABLED === 'true'
  
  console.log(`🔍 [DEBUG] Cache detection: DATAVERSE_CACHE_ENABLED='${process.env.DATAVERSE_CACHE_ENABLED}', cacheEnabled=${cacheEnabled}`)
  
  let basicEntities: EntityDefinition[] = []

  if (cacheEnabled) {
    // When cache is enabled, use the original approach with larger batches
    console.log(`📦 Cache enabled - using traditional batching for ${entityNames.length} entities`)
    const batchSize = 100
    
    for (let i = 0; i < entityNames.length; i += batchSize) {
      const batch = entityNames.slice(i, i + batchSize)
      
      const batchPromises = batch.map(entityName => 
        fetchEntityMetadata(entityName, options).catch(error => {
          console.warn(`Failed to fetch entity '${entityName}':`, error)
          return null
        })
      )
      
      const batchResults = await Promise.all(batchPromises)
      
      // Add successful results to entities array
      for (const result of batchResults) {
        if (result) {
          basicEntities.push(result)
        }
      }
      
      // Report progress after each batch
      if (onProgress) {
        const currentCount = Math.min(i + batchSize, entityNames.length)
        const lastEntityInBatch = batch[batch.length - 1]
        onProgress(currentCount, entityNames.length, lastEntityInBatch)
      }
    }
  } else {
    // When cache is disabled, choose approach based on whether relationships are needed
    if (includeRelationships) {
      // When relationships are needed, OR-filter batching won't work (relationships require individual calls)
      // Fall back to individual fetchEntityMetadata calls for complete relationship data
      console.log(`🔗 Relationships needed - using individual entity calls for ${entityNames.length} entities`)
      const batchSize = 10 // Much smaller batches for relationship calls to avoid overwhelming Dataverse
      
      for (let i = 0; i < entityNames.length; i += batchSize) {
        const batch = entityNames.slice(i, i + batchSize)
        
        const batchPromises = batch.map(entityName => 
          fetchEntityMetadata(entityName, options).catch(error => {
            console.warn(`Failed to fetch entity '${entityName}':`, error)
            return null
          })
        )
        
        const batchResults = await Promise.all(batchPromises)
        
        // Add successful results to entities array
        for (const result of batchResults) {
          if (result) {
            basicEntities.push(result)
          }
        }
        
        // Report progress after each batch
        if (onProgress) {
          const currentCount = Math.min(i + batchSize, entityNames.length)
          const lastEntityInBatch = batch[batch.length - 1]
          onProgress(currentCount, entityNames.length, lastEntityInBatch)
        }
        
        // Add delay between batches to avoid overwhelming Dataverse with relationship calls
        if (i + batchSize < entityNames.length) {
          await new Promise(resolve => setTimeout(resolve, 500)) // 500ms delay between batches
        }
      }
    } else {
      // When no relationships needed, use OR-filter batching for optimal performance
      console.log(`🚀 Cache disabled - using OR-filter batching for optimal performance`)
      
      // First, get basic entity definitions using OR-filter batching
      basicEntities = await fetchEntitiesWithOrFilter(entityNames, [
        'LogicalName',
        'SchemaName', 
        'DisplayName',
        'Description',
        'HasActivities',
        'HasFeedback',
        'HasNotes',
        'IsActivity',
        'IsCustomEntity',
        'OwnershipType',
        'PrimaryIdAttribute',
        'PrimaryNameAttribute',
        'EntitySetName'
      ], onProgress ? (current: number, total: number, item?: string): void => {
        // When attributes are included, entity fetching is just the first phase
        // So we report progress as current/total but with "Basic" prefix to indicate phase
        if (includeAttributes) {
          onProgress(current, total, `Basic: ${item || ''}`)
        } else {
          // When no attributes needed, this is the final progress
          onProgress(current, total, item)
        }
      } : undefined)
    }
    
    console.log(`✅ Fetched ${basicEntities.length}/${entityNames.length} entities using ${includeRelationships ? 'individual calls (relationships)' : 'OR-filter batching'}`)
  }

  // If attributes are needed, fetch them for each entity using the concurrent queue
  if (includeAttributes && basicEntities.length > 0) {
    console.log(`📋 Fetching detailed attributes for ${basicEntities.length} entities using concurrent processing...`)
    
    // Track completed entities for accurate progress reporting
    let completedAttributeEntities = 0
    
    // Process attribute requests in batches to avoid Promise.all() overhead with 875+ entities
    const batchSize = 50 // Process 50 entities at a time
    const entitiesWithAttributes: EntityDefinition[] = []
    
    for (let i = 0; i < basicEntities.length; i += batchSize) {
      const batch = basicEntities.slice(i, i + batchSize)
      
      const batchPromises = batch.map(async (entity) => {
        try {
          const detailedAttributes = await fetchEntityAttributes(entity.LogicalName)
          entity.Attributes = detailedAttributes
          
          // Atomically increment and report progress (only every 1% to avoid spam)
          completedAttributeEntities++
          if (onProgress) {
            const percentComplete = Math.floor((completedAttributeEntities / basicEntities.length) * 100)
            const prevPercentComplete = Math.floor(((completedAttributeEntities - 1) / basicEntities.length) * 100)
            
            // Only report progress when percentage changes, or for the final entity
            if (percentComplete !== prevPercentComplete || completedAttributeEntities === basicEntities.length) {
              onProgress(completedAttributeEntities, basicEntities.length, entity.LogicalName)
            }
          }
          
          return entity
        } catch (error) {
          console.warn(`Failed to fetch attributes for ${entity.LogicalName}, using basic entity:`, error)
          
          // Still increment progress for failed entities (only every 1% to avoid spam)
          completedAttributeEntities++
          if (onProgress) {
            const percentComplete = Math.floor((completedAttributeEntities / basicEntities.length) * 100)
            const prevPercentComplete = Math.floor(((completedAttributeEntities - 1) / basicEntities.length) * 100)
            
            // Only report progress when percentage changes, or for the final entity
            if (percentComplete !== prevPercentComplete || completedAttributeEntities === basicEntities.length) {
              onProgress(completedAttributeEntities, basicEntities.length, entity.LogicalName)
            }
          }
          
          return entity // Return basic entity without detailed attributes
        }
      })
      
      const batchResults = await Promise.all(batchPromises)
      entitiesWithAttributes.push(...batchResults)
    }
    console.log(`✅ Successfully processed attributes for ${entitiesWithAttributes.length} entities`)
    
    return entitiesWithAttributes
  }
  
  return basicEntities
}

/**
 * Check if an entity exists
 * 
 * @param entityLogicalName - The logical name of the entity
 * @returns Promise<boolean>
 */
export async function entityExists(entityLogicalName: string): Promise<boolean> {
  try {
    const url = `/api/data/v9.2/EntityDefinitions(LogicalName='${entityLogicalName}')?$select=LogicalName`
    
    const response = await authenticatedFetch(url, { method: 'GET' })
    
    return response.ok
  } catch {
    return false
  }
}

/**
 * Get all available entities (EntityDefinitions endpoint does not support $top/$skip pagination)
 * 
 * @param options - Options for filtering (no pagination support)
 * @returns Promise<EntityDefinition[]>
 */
export async function fetchAllEntities(options: {
  filter?: string
  customOnly?: boolean
  select?: string[]
} = {}): Promise<EntityDefinition[]> {
  const {
    filter,
    customOnly = false,
    select = ['LogicalName', 'SchemaName', 'DisplayName', 'IsCustomEntity']
  } = options
  
  try {
    const params = new URLSearchParams()
    
    if (select.length > 0) {
      params.append('$select', select.join(','))
    }
    
    // Build filter
    const filters: string[] = []
    if (customOnly) {
      filters.push('IsCustomEntity eq true')
    }
    if (filter) {
      filters.push(filter)
    }
    
    if (filters.length > 0) {
      params.append('$filter', filters.join(' and '))
    }
    
    // Note: $top and $skip are NOT SUPPORTED by EntityDefinitions endpoint
    // See API-KNOWLEDGE.md for details - Error Code: 0x80060888
    
    const url = `/api/data/v9.2/EntityDefinitions?${params.toString()}`
    
    const response = await authenticatedFetch(url, { method: 'GET' })
    
    if (!response.ok) {
      await advancedLog(response, url, 'GET')
      const statusDescription = getStatusCodeDescription(response.status)
      throw new Error(`Failed to fetch all entities: ${response.status} ${response.statusText} - ${statusDescription}`)
    }
    
    const data = await response.json() as { value: EntityDefinition[] }
    
    // Since API doesn't support pagination, we need to implement client-side filtering if needed
    return data.value
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching all entities: ${error.message}`)
    }
    throw error
  }
}

/**
 * Find solution by unique name or friendly name
 * 
 * @param solutionName - Solution unique name or friendly name
 * @returns Promise<SolutionDefinition | null>
 */
export async function findSolution(solutionName: string): Promise<SolutionDefinition | null> {
  try {
    // First try by unique name (most common)
    let url = `/api/data/v9.2/solutions?$filter=uniquename eq '${solutionName}'&$select=solutionid,uniquename,friendlyname,version,publisherid,ismanaged,description`
    
    let response = await authenticatedFetch(url, { method: 'GET' })
    
    if (!response.ok) {
      await advancedLog(response, url, 'GET')
      const statusDescription = getStatusCodeDescription(response.status)
      throw new Error(`Failed to search solutions by unique name '${solutionName}': ${response.status} ${response.statusText} - ${statusDescription}`)
    }
    
    let data = await response.json() as { value: SolutionDefinition[] }
    
    if (data.value.length > 0) {
      return data.value[0]
    }
    
    // If not found by unique name, try by friendly name
    url = `/api/data/v9.2/solutions?$filter=friendlyname eq '${solutionName}'&$select=solutionid,uniquename,friendlyname,version,publisherid,ismanaged,description`
    
    response = await authenticatedFetch(url, { method: 'GET' })
    
    if (!response.ok) {
      await advancedLog(response, url, 'GET')
      const statusDescription = getStatusCodeDescription(response.status)
      throw new Error(`Failed to search solutions by friendly name '${solutionName}': ${response.status} ${response.statusText} - ${statusDescription}`)
    }
    
    data = await response.json() as { value: SolutionDefinition[] }
    
    return data.value.length > 0 ? data.value[0] : null
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error finding solution '${solutionName}': ${error.message}`)
    }
    throw error
  }
}

/**
 * Fetch solution components by solution ID
 * 
 * @param solutionId - The solution GUID
 * @param componentType - The component type to filter by (optional)
 * @returns Promise<SolutionComponent[]>
 */
export async function fetchSolutionComponents(
  solutionId: string,
  componentType?: number
): Promise<SolutionComponent[]> {
  try {
    const params = new URLSearchParams()
    
    // Build filter - solutionid needs to be properly formatted as GUID
    const filters: string[] = [`_solutionid_value eq '${solutionId}'`]
    if (componentType !== undefined) {
      filters.push(`componenttype eq ${componentType}`)
    }
    
    params.append('$filter', filters.join(' and '))
    params.append('$select', 'solutioncomponentid,solutionid,objectid,componenttype,rootcomponentbehavior,ismetadata')
    
    const url = `/api/data/v9.2/solutioncomponents?${params.toString()}`
    
    const response = await authenticatedFetch(url, { method: 'GET' })
    
    if (!response.ok) {
      await advancedLog(response, url, 'GET')
      const statusDescription = getStatusCodeDescription(response.status)
      throw new Error(`Failed to fetch solution components for solution '${solutionId}': ${response.status} ${response.statusText} - ${statusDescription}`)
    }
    
    const data = await response.json() as { value: SolutionComponent[] }
    return data.value
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching solution components for solution '${solutionId}': ${error.message}`)
    }
    throw error
  }
}

/**
 * Fetch entities from a specific solution by solution name (actual solution membership)
 * This provides true solution-based filtering, not just publisher prefix matching
 * 
 * @param solutionName - The solution unique name or friendly name
 * @returns Promise<EntityDefinition[]>
 */
export async function fetchSolutionEntities(solutionName: string): Promise<EntityDefinition[]> {
  try {
    // Find the solution
    const solution = await findSolution(solutionName)
    
    if (!solution) {
      return [] // Solution not found, return empty array
    }
    
    // Get entity components from the solution
    const entityComponents = await fetchSolutionComponents(solution.solutionid, COMPONENT_TYPES.ENTITY)
    
    if (entityComponents.length === 0) {
      return [] // No entity components in solution
    }
    
    // Fetch entity metadata for each component
    const entities: EntityDefinition[] = []
    
    // Process in batches - larger batches when cache is enabled
    const cacheEnabled = process.env.DATAVERSE_CACHE_ENABLED === 'true'
    const batchSize = cacheEnabled ? 100 : 15  // 100 when cached, 15 for API calls
    for (let i = 0; i < entityComponents.length; i += batchSize) {
      const batch = entityComponents.slice(i, i + batchSize)
      
      const batchPromises = batch.map(async (component) => {
        try {
          // Use the objectid to fetch the entity metadata by MetadataId
          const url = `/api/data/v9.2/EntityDefinitions?$filter=MetadataId eq ${component.objectid}&$select=LogicalName,SchemaName,DisplayName,Description,IsCustomEntity,PrimaryIdAttribute,PrimaryNameAttribute,EntitySetName`
          
          const response = await authenticatedFetch(url, { method: 'GET' })
          
          if (response.ok) {
            const data = await response.json() as { value: EntityDefinition[] }
            return data.value.length > 0 ? data.value[0] : null
          } else {
            console.warn(`Failed to fetch entity metadata for component ${component.objectid}:`, response.status, response.statusText)
            return null
          }
        } catch (error) {
          console.warn(`Failed to fetch entity for component ${component.objectid}:`, error)
          return null
        }
      })
      
      const batchResults = await Promise.all(batchPromises)
      
      // Add successful results to entities array
      for (const result of batchResults) {
        if (result) {
          entities.push(result)
        }
      }
      
      // Add delay between batches only when hitting the API (not when using cache)
      if (!cacheEnabled && i + batchSize < entityComponents.length) {
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }
    
    return entities
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching solution entities for solution '${solutionName}': ${error.message}`)
    }
    throw error
  }
}