import type { EntityDefinition } from '../types.js'
import { createAuthenticatedFetcher } from '../auth/index.js'
import { globalRequestQueue } from './concurrent-queue.js'

// Create authenticated fetcher instance
const authenticatedFetch = createAuthenticatedFetcher()

/**
 * Batch size for OR filter conditions
 * Based on testing in API-KNOWLEDGE.md, up to 15 OR conditions work reliably
 */
const OR_BATCH_SIZE = 15

/**
 * Progress callback for OR-filter batching
 */
export type OrFilterProgressCallback = (current: number, total: number, item?: string) => void

/**
 * Fetch multiple entities using OR filter batching for optimal performance
 * 
 * This leverages the API capability to filter multiple entities in a single request:
 * $filter=LogicalName eq 'entity1' or LogicalName eq 'entity2' or ...
 * 
 * Based on API testing documented in API-KNOWLEDGE.md:
 * - Up to 15 OR conditions tested successfully
 * - Reduces API calls by 15x compared to individual requests
 * - Filter length up to 420 characters, URL length up to 608 characters
 * 
 * @param entityNames - Array of entity logical names to fetch
 * @param select - Fields to select for each entity
 * @param onProgress - Optional progress callback
 * @returns Promise<EntityDefinition[]>
 */
export async function fetchEntitiesWithOrFilter(
  entityNames: string[],
  select: string[] = [
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
  ],
  onProgress?: OrFilterProgressCallback
): Promise<EntityDefinition[]> {
  if (entityNames.length === 0) {
    return []
  }

  const allEntities: EntityDefinition[] = []
  let processedCount = 0
  
  // Process entity names in batches for OR filter
  for (let i = 0; i < entityNames.length; i += OR_BATCH_SIZE) {
    const batch = entityNames.slice(i, i + OR_BATCH_SIZE)
    
    try {
      const batchEntities = await fetchEntityBatchWithOrFilter(batch, select)
      allEntities.push(...batchEntities)
      processedCount += batch.length
      
      // Report progress after each batch
      if (onProgress) {
        const lastEntityInBatch = batch[batch.length - 1]
        onProgress(processedCount, entityNames.length, lastEntityInBatch)
      }
    } catch (error) {
      console.warn(`Failed to fetch entity batch [${batch.join(', ')}]:`, error)
      
      // Fallback: Try individual requests for this batch
      console.log(`Falling back to individual requests for batch: ${batch.join(', ')}`)
      for (const entityName of batch) {
        try {
          const entity = await fetchSingleEntityWithQueue(entityName, select)
          if (entity) {
            allEntities.push(entity)
          }
          processedCount++
          
          // Report progress for individual fallback requests
          if (onProgress) {
            onProgress(processedCount, entityNames.length, entityName)
          }
        } catch (singleError) {
          console.warn(`Failed to fetch individual entity '${entityName}':`, singleError)
          processedCount++
          
          // Still report progress even for failed entities
          if (onProgress) {
            onProgress(processedCount, entityNames.length, entityName)
          }
        }
      }
    }
  }

  return allEntities
}

/**
 * Fetch a batch of entities using OR filter in a single API call
 */
async function fetchEntityBatchWithOrFilter(
  entityNames: string[],
  select: string[]
): Promise<EntityDefinition[]> {
  // Build OR filter: LogicalName eq 'entity1' or LogicalName eq 'entity2' or ...
  const orConditions = entityNames.map(name => `LogicalName eq '${name}'`)
  const filter = orConditions.join(' or ')
  
  // Build URL parameters
  const params = new URLSearchParams()
  if (select.length > 0) {
    params.append('$select', select.join(','))
  }
  params.append('$filter', filter)
  
  const url = `/api/data/v9.1/EntityDefinitions?${params.toString()}`
  
  // Use the concurrent queue for this request
  const response = await globalRequestQueue.execute<{ value: EntityDefinition[] }>(
    () => authenticatedFetch(url, { method: 'GET' }),
    { 
      url, 
      method: 'GET',
      priority: 1 // High priority for entity metadata
    }
  )
  
  return response.value || []
}

/**
 * Fetch a single entity using the concurrent queue (fallback method)
 */
async function fetchSingleEntityWithQueue(
  entityLogicalName: string,
  select: string[]
): Promise<EntityDefinition | null> {
  try {
    const params = new URLSearchParams()
    if (select.length > 0) {
      params.append('$select', select.join(','))
    }
    
    const url = `/api/data/v9.2/EntityDefinitions(LogicalName='${entityLogicalName}')${params.toString() ? `?${params.toString()}` : ''}`
    
    const response = await globalRequestQueue.execute<EntityDefinition>(
      () => authenticatedFetch(url, { method: 'GET' }),
      { 
        url, 
        method: 'GET',
        priority: 1
      }
    )
    
    return response
    
  } catch (error) {
    // Check if it's a 404 (entity not found) - this is expected sometimes
    if (error instanceof Error && error.message.includes('404')) {
      return null
    }
    throw error
  }
}

/**
 * Calculate optimal batch configuration based on entity names
 * 
 * This analyzes the entity names to determine the best batching strategy
 * considering URL length limits and API capabilities.
 */
export function calculateOptimalBatching(entityNames: string[]): {
  batchSize: number
  estimatedRequests: number
  averageEntityNameLength: number
} {
  if (entityNames.length === 0) {
    return { batchSize: 0, estimatedRequests: 0, averageEntityNameLength: 0 }
  }

  const averageEntityNameLength = entityNames.reduce((sum, name) => sum + name.length, 0) / entityNames.length
  
  // Calculate estimated filter length for OR_BATCH_SIZE entities
  // Format: LogicalName eq 'entity1' or LogicalName eq 'entity2' or ...
  // Each condition: "LogicalName eq '" + entityName + "'" (17 chars + entity name length)
  // Plus " or " between conditions (4 chars)
  const estimatedFilterLength = OR_BATCH_SIZE * (17 + averageEntityNameLength) + (OR_BATCH_SIZE - 1) * 4
  
  let optimalBatchSize = OR_BATCH_SIZE
  
  // If estimated filter length is too long, reduce batch size
  // API-KNOWLEDGE.md shows 420 characters tested successfully, so use 400 as safe limit
  if (estimatedFilterLength > 400) {
    optimalBatchSize = Math.floor(400 / (17 + averageEntityNameLength + 4))
    optimalBatchSize = Math.max(1, Math.min(optimalBatchSize, OR_BATCH_SIZE))
  }
  
  const estimatedRequests = Math.ceil(entityNames.length / optimalBatchSize)
  
  return {
    batchSize: optimalBatchSize,
    estimatedRequests,
    averageEntityNameLength
  }
}

/**
 * Analyze and log batching performance information (debug mode only)
 */
export function logBatchingAnalysis(entityNames: string[], debugMode: boolean = false): void {
  if (!debugMode) return
  
  const analysis = calculateOptimalBatching(entityNames)
  
  console.log(`📊 OR-Filter Batching Analysis:`)
  console.log(`   • Total entities: ${entityNames.length}`)
  console.log(`   • Optimal batch size: ${analysis.batchSize}`)
  console.log(`   • Estimated API requests: ${analysis.estimatedRequests}`)
  console.log(`   • Average entity name length: ${analysis.averageEntityNameLength.toFixed(1)} chars`)
  console.log(`   • Performance improvement: ${Math.round((entityNames.length / analysis.estimatedRequests) * 10) / 10}x fewer requests`)
}