import type { EntityDefinitionResponse, EntityDefinition } from './types.js'
import { advancedLog, getStatusCodeDescription } from './error-logger.js'
import { createAuthenticatedFetcher } from './auth/index.js'

export interface GetEntityDefinitionsOptions {
  filter?: string
  select?: string[]
  expand?: string[]
  // Note: $top and $skip are NOT SUPPORTED by EntityDefinitions endpoint
  // See API-KNOWLEDGE.md - Error Code: 0x80060888
}

// Create a default authenticated fetcher instance
const authenticatedFetch = createAuthenticatedFetcher()

export async function getEntityDefinitions(
  options: GetEntityDefinitionsOptions = {}
): Promise<EntityDefinition[]> {
  const baseUrl = '/api/data/v9.1/EntityDefinitions'
  const params = new URLSearchParams()
  
  if (options.select && options.select.length > 0) {
    params.append('$select', options.select.join(','))
  }
  
  if (options.filter) {
    params.append('$filter', options.filter)
  }
  
  if (options.expand && options.expand.length > 0) {
    params.append('$expand', options.expand.join(','))
  }
  
  // $top and $skip parameters are NOT SUPPORTED by EntityDefinitions endpoint
  // This was causing Error Code: 0x80060888 "The query parameter is not supported"
  
  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
  
  // Use authenticated fetch with automatic token management and retry logic
  const response = await authenticatedFetch(url, {
    method: 'GET'
  })
  
  if (!response.ok) {
    await advancedLog(response, url, 'GET')
    const statusDescription = getStatusCodeDescription(response.status)
    throw new Error(`Failed to fetch entity definitions: ${response.status} ${response.statusText} - ${statusDescription}`)
  }
  
  const data = await response.json() as EntityDefinitionResponse
  return data.value
}

export async function getEntityDefinition(logicalName: string): Promise<EntityDefinition | null> {
  const results = await getEntityDefinitions({
    filter: `LogicalName eq '${logicalName}'`,
    select: ['LogicalName', 'SchemaName', 'DisplayName', 'Description', 'HasActivities', 'HasFeedback', 'HasNotes', 'IsActivity', 'IsCustomEntity', 'OwnershipType', 'PrimaryIdAttribute', 'PrimaryNameAttribute', 'EntitySetName'],
    expand: ['Attributes']
  })
  
  return results.length > 0 ? results[0] : null
}