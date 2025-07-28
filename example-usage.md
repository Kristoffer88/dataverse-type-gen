# React Query Integration Example

This document demonstrates how to use the generated types and React Query hooks for Dataverse entities.

## Setup

```bash
npm install dataverse-type-gen @tanstack/react-query react
```

## Configuration

```typescript
// dataverse.config.json
{
  "outputDir": "./src/generated",
  "publisher": "pum",
  "typeGeneration": {
    "generateHooks": true,
    "includeComments": true,
    "includeMetadata": true
  }
}
```

## Generate Types and Hooks

```bash
npx dataverse-type-gen
```

This generates:
- `./src/generated/pum_initiative.ts` - Type definitions
- `./src/generated/hooks/pum_initiative.hooks.ts` - React Query hooks
- `./src/generated/index.ts` - Barrel exports

## App Setup

```typescript
// App.tsx
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureFetch, createAuthenticatedFetcher } from 'dataverse-type-gen'

// Configure authentication
const authenticatedFetch = createAuthenticatedFetcher()
configureFetch(authenticatedFetch)

// Create query client
const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InitiativesList />
    </QueryClientProvider>
  )
}
```

## Using Generated Hooks

```typescript
// components/InitiativesList.tsx
import React from 'react'
import { 
  usePumInitiativeList, 
  usePumInitiativeCount,
  PumInitiativeStatecode,
  PumStatus 
} from '../generated'

export function InitiativesList() {
  // Fetch active initiatives with type safety
  const { data: initiatives, isLoading, error } = usePumInitiativeList({
    statecode: PumInitiativeStatecode.Active.Value,
    pum_status: PumStatus._1Active.Value
  }, {
    $select: ['pum_name', 'pum_description', 'createdon'],
    $orderby: { createdon: 'desc' },
    $top: 10
  })

  // Get count for pagination
  const { data: totalCount } = usePumInitiativeCount({
    statecode: PumInitiativeStatecode.Active.Value
  })

  if (isLoading) return <div>Loading initiatives...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>Active Initiatives ({totalCount})</h2>
      <ul>
        {initiatives?.value?.map(initiative => (
          <li key={initiative.pum_initiativeid}>
            <h3>{initiative.pum_name}</h3>
            <p>{initiative.pum_description}</p>
            <small>Created: {new Date(initiative.createdon!).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## Single Entity Hook

```typescript
// components/InitiativeDetail.tsx
import React from 'react'
import { usePumInitiative } from '../generated'

interface Props {
  initiativeId: string
}

export function InitiativeDetail({ initiativeId }: Props) {
  const { data: initiative, isLoading, error } = usePumInitiative(initiativeId, {
    $select: ['pum_name', 'pum_description', 'pum_sponsor', 'pum_program'],
    $expand: ['pum_program', 'pum_portfolio']
  })

  if (isLoading) return <div>Loading initiative...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!initiative) return <div>Initiative not found</div>

  return (
    <div>
      <h1>{initiative.pum_name}</h1>
      <p>{initiative.pum_description}</p>
      <p>Sponsor: {initiative.pum_sponsorname}</p>
      <p>Program: {initiative.pum_programname}</p>
    </div>
  )
}
```

## Complex Filtering

```typescript
// components/InitiativeSearch.tsx
import React, { useState } from 'react'
import { usePumInitiativeList, PumInitiativeStatecode, PumStatus } from '../generated'

export function InitiativeSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const { data: results, isLoading } = usePumInitiativeList({
    $and: [
      { statecode: PumInitiativeStatecode.Active.Value },
      {
        $or: [
          { pum_name: { $contains: searchTerm } },
          { pum_description: { $contains: searchTerm } }
        ]
      }
    ]
  }, {
    $select: ['pum_name', 'pum_description', 'pum_status'],
    $orderby: { pum_name: 'asc' },
    enabled: searchTerm.length > 2 // Only search when user has typed at least 3 characters
  })

  return (
    <div>
      <input
        type="text"
        placeholder="Search initiatives..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {isLoading && <div>Searching...</div>}
      
      <ul>
        {results?.value?.map(initiative => (
          <li key={initiative.pum_initiativeid}>
            {initiative.pum_name} - {initiative.pum_statusname}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## Standalone URL Usage (without React Query)

```typescript
// utils/dataverseApi.ts
import { DataverseUrls, configureDataverseUrls } from 'dataverse-type-gen'
import { pum_InitiativeMetadata, PumInitiativeStatecode } from '../generated'

// Configure for your Dataverse instance
configureDataverseUrls({
  instanceUrl: 'https://yourorg.crm.dynamics.com',
  apiVersion: 'v9.2'
})

export async function fetchActiveInitiatives() {
  const url = DataverseUrls.entitySet(pum_InitiativeMetadata, {
    $filter: {
      statecode: PumInitiativeStatecode.Active.Value
    },
    $select: ['pum_name', 'pum_description', 'createdon'],
    $orderby: { createdon: 'desc' },
    $top: 10
  })
  
  const response = await authenticatedFetch(url)
  return response.json()
}

export async function countInitiatives() {
  const url = DataverseUrls.count(pum_InitiativeMetadata, {
    $filter: {
      statecode: PumInitiativeStatecode.Active.Value
    }
  })
  
  const response = await authenticatedFetch(url)
  return parseInt(await response.text(), 10)
}
```

## Cache Management

```typescript
// hooks/useInitiativeActions.ts
import { useQueryClient } from '@tanstack/react-query'
import { invalidateEntityQueries, PumInitiativeQueryKeys } from '../generated'

export function useInitiativeActions() {
  const queryClient = useQueryClient()
  
  const refreshAllInitiatives = () => {
    return invalidateEntityQueries(queryClient, 'pum_initiative')
  }
  
  const refreshInitiative = (id: string) => {
    return invalidateEntityQueries(queryClient, 'pum_initiative', {
      operation: 'single',
      id
    })
  }
  
  const prefetchInitiative = (id: string) => {
    return queryClient.prefetchQuery({
      queryKey: PumInitiativeQueryKeys.detail(id),
      queryFn: () => fetchInitiativeById(id)
    })
  }
  
  return {
    refreshAllInitiatives,
    refreshInitiative,
    prefetchInitiative
  }
}
```

## Key Features

### ✅ Full Type Safety
- All entity properties are strongly typed
- Option set values use generated constants
- OData operators are type-checked
- Relationship fields are properly typed

### ✅ Automatic Caching
- React Query handles caching automatically
- Configurable stale time and cache time
- Background refetching support

### ✅ Flexible Usage
- Use React Query hooks for reactive UIs
- Use standalone URLs for custom fetch logic
- Works with any fetch library or authentication method

### ✅ Performance Optimized
- Only fetch required fields with $select
- Efficient filtering with proper OData syntax
- Automatic batching and deduplication

### ✅ Option Set Support
- Generated constants for all option sets
- Type-safe filtering and comparison
- IntelliSense support for all values

This integration provides the best developer experience for working with Dataverse data in React applications, combining type safety, performance, and ease of use.