# Implementation Plan: Type-Safe Nested Expand with Target Entity Field Names

## Problem Statement

We need to implement nested expand functionality where `$select` within `$expand` shows **actual field names from the target entities**, not the current entity.

**Goal:**
```typescript
$expand: {
  pum_program: { 
    $select: ['pum_name', 'pum_description'] // These should be pum_program fields with IntelliSense
  },
  pum_initiative_pum_gantttasks: { 
    $select: ['pum_name', 'pum_startdate'], // These should be pum_gantttask fields with IntelliSense  
    $top: 5,
    $filter: { statecode: 0 } // Filter on pum_gantttask fields
  }
}
```

## Implementation Strategy

Since no one is using this feature yet, we can implement the correct type-safe approach from the beginning without backward compatibility concerns.

## Phase 1: Configuration & Metadata Collection

**Files to modify:**
- `src/config/index.ts` - Add configuration options
- `src/client/index.ts` - Enhance metadata fetching
- `src/processors/index.ts` - Update ProcessedEntityMetadata

### 1.1 Add Configuration Option
```typescript
export interface DataverseTypeGenConfig {
  // ... existing options
  
  /** Generate metadata for related entities to enable type-safe nested expands */
  generateRelatedEntities?: boolean // Default: true (since it's a new feature)
  
  /** Maximum depth for related entity generation (prevents infinite recursion) */
  maxRelatedEntityDepth?: number // Default: 2
}
```

### 1.2 Enhance Metadata Collection
```typescript
// In fetchEntityMetadata, when generateRelatedEntities = true:
// 1. Extract relationship information from current entity
// 2. Recursively fetch metadata for target entities (up to maxDepth)
// 3. Build a dependency graph to handle circular references
// 4. Cache metadata to avoid duplicate API calls

export interface RelatedEntityInfo {
  relationshipName: string // e.g., "pum_program"
  targetEntityLogicalName: string // e.g., "pum_program" 
  targetEntitySetName: string // e.g., "pum_programs"
  relationshipType: 'OneToMany' | 'ManyToOne' | 'ManyToMany'
  metadata: ProcessedEntityMetadata // Full metadata of target entity
}
```

### 1.3 Update ProcessedEntityMetadata
```typescript
export interface ProcessedEntityMetadata {
  // ... existing properties
  
  /** Related entities with their full metadata for type-safe expands */
  relatedEntities: Record<string, RelatedEntityInfo>
}
```

## Phase 2: Type-Safe Expand Types

**Files to modify:**
- `src/query/types.ts` - Create relationship-aware types

### 2.1 Create Target Entity Type Mapping
```typescript
// Helper type to extract entity interface from metadata
type EntityFromMetadata<TMeta> = TMeta extends ProcessedEntityMetadata ? {
  [K in TMeta['attributes'][number]['logicalName']]: any
} : never

// Type for individual expand options with target entity awareness
type RelationshipExpandOption<TTargetEntity> = {
  $select?: (keyof TTargetEntity)[]
  $filter?: ODataFilter<TTargetEntity>  
  $orderby?: ODataOrderBy<TTargetEntity>
  $top?: number
}

// Main type that maps relationship names to their target entity types
export type TypeSafeExpand<TEntityMetadata> = TEntityMetadata extends {
  relatedEntities: infer TRelated
} ? {
  [K in keyof TRelated]?: TRelated[K] extends RelatedEntityInfo
    ? RelationshipExpandOption<EntityFromMetadata<TRelated[K]['metadata']>>
    : never
} : never
```

### 2.2 Update Main Expand Type
```typescript
// Replace the current expand types with the type-safe version
export type ODataExpand<TEntityMetadata = any> = 
  | string[] // Simple array format: ['rel1', 'rel2'] 
  | TypeSafeExpand<TEntityMetadata> // Type-safe object format

// Update helper type
export type ExpandablePropertiesOf<T> = ODataExpand<T>
```

## Phase 3: Enhanced Code Generation

**Files to modify:**
- `src/codegen/index.ts` - Generate related entities
- `src/generators/query-hooks.ts` - Update hook generation

### 3.1 Generate Related Entity Files
```typescript
// In generateMultipleEntityTypes:
// 1. For each entity with generateRelatedEntities = true
// 2. Collect all unique related entities across all primary entities  
// 3. Generate TypeScript files for related entities
// 4. Ensure proper import/export structure

// Generated file structure:
// - pum_initiative.ts (primary entity)
// - pum_program.ts (related entity)
// - pum_gantttask.ts (related entity)
// - hooks/pum_initiative.hooks.ts (with proper imports)
```

### 3.2 Update Hook Generation
```typescript
// In generated hooks, import related entity types
import type { pum_Program } from '../pum_program'
import type { pum_GanttTask } from '../pum_gantttask'

// Update EntityOptions type to use the metadata-aware expand
type EntityOptions<T, TMeta> = {
  $select?: ODataSelect<T>
  $expand?: ExpandablePropertiesOf<TMeta>
}

// Use in hook signatures
export function usePumInitiative(
  id: string | undefined,
  options: EntityOptions<pum_Initiative, typeof pum_InitiativeMetadata> = {}
): UseQueryResult<pum_Initiative>
```

## Phase 4: Runtime Query Building

**Files to modify:**
- `src/generators/query-hooks.ts` - Update buildExpand function

### 4.1 Enhanced buildExpand Function
```typescript
// Update to use entity metadata for validation and better error messages
const buildExpand = (expand: any, entityMetadata: ProcessedEntityMetadata): string => {
  if (typeof expand === 'object' && expand !== null) {
    return Object.entries(expand)
      .map(([relationshipName, options]: [string, any]) => {
        // Validate relationship exists
        const relationship = entityMetadata.relatedEntities[relationshipName]
        if (!relationship) {
          throw new Error(`Unknown relationship '${relationshipName}' on entity '${entityMetadata.logicalName}'. Available relationships: ${Object.keys(entityMetadata.relatedEntities).join(', ')}`)
        }
        
        // Build nested parameters
        const nestedParams: string[] = []
        if (options.$select && Array.isArray(options.$select)) {
          // Optional: Validate field names against target entity metadata
          nestedParams.push(`$select=${options.$select.join(',')}`)
        }
        if (options.$filter) {
          nestedParams.push(`$filter=${buildExpandFilter(options.$filter)}`)
        }
        if (options.$orderby) {
          nestedParams.push(`$orderby=${buildExpandOrderBy(options.$orderby)}`)
        }
        if (options.$top !== undefined) {
          nestedParams.push(`$top=${options.$top}`)
        }
        
        return nestedParams.length > 0
          ? `${relationshipName}(${nestedParams.join(';')})`
          : relationshipName
      })
      .join(',')
  }
  
  // Handle array format
  if (Array.isArray(expand)) {
    return expand.join(',')
  }
  
  return String(expand)
}
```

## Phase 5: CLI and Configuration Updates

**Files to modify:**
- `src/cli/index.ts` - Add CLI options
- `dataverse.config.json` examples

### 5.1 CLI Options
```bash
# Add new CLI flags
dataverse-type-gen generate --generate-related-entities --max-related-depth 2

# Or via config file
{
  "generateRelatedEntities": true,
  "maxRelatedEntityDepth": 2,
  "entities": ["pum_initiative", "pum_gantttask"]
}
```

### 5.2 Progress Reporting
```typescript
// Enhanced progress reporting for related entity generation
console.log('📥 Fetching metadata for 2 primary entities...')
console.log('🔗 Discovering related entities...')
console.log('📥 Fetching metadata for 5 related entities...')
console.log('📝 Generating 7 entity type files...')
```

## Implementation Order

1. **Phase 1**: Start with configuration and metadata collection
2. **Phase 2**: Implement type system (can be done in parallel with Phase 1)
3. **Phase 3**: Update code generation to use new types
4. **Phase 4**: Enhance runtime query building
5. **Phase 5**: Polish CLI and add examples

## Testing Strategy

### Unit Tests
- Test relationship discovery and metadata fetching
- Verify type generation with various relationship scenarios
- Test circular reference handling

### Integration Tests  
- Test complete generation workflow with real Dataverse entities
- Verify generated OData queries are syntactically correct
- Test with various relationship types (1:M, M:1, M:M)

### PCF Demo
```typescript
// Updated PCF demo with proper field names
const { data: initiatives } = usePumInitiativeList({
  $top: 5,
  $expand: {
    pum_program: { 
      $select: ['pum_name', 'pum_description', 'statecode'] // pum_program fields
    },
    pum_initiative_pum_gantttasks: { 
      $select: ['pum_name', 'pum_startdate', 'pum_enddate'], // pum_gantttask fields
      $filter: { statecode: 0 }, // Filter on gantttask statecode
      $top: 3 
    }
  }
})
```

## Key Design Decisions

1. **Type-Safe by Default**: New feature implements proper type safety from the start
2. **Metadata-Driven**: Leverage Dataverse metadata to provide accurate IntelliSense  
3. **Performance Conscious**: Cache metadata and provide depth limits
4. **Error-Friendly**: Provide helpful error messages for invalid relationships/fields
5. **Simple Configuration**: Single boolean flag to enable the feature

## Deliverables

1. **Full Type Safety**: IntelliSense shows actual target entity field names
2. **Runtime Validation**: Helpful errors for invalid relationships
3. **Comprehensive Examples**: PCF demo with real-world usage patterns
4. **Documentation**: Clear setup and usage guide
5. **Performance**: Efficient metadata caching and reasonable generation times

## Success Criteria

✅ Developer types `pum_program: { $select: [` and sees actual pum_program field names  
✅ Invalid relationship names show clear error messages  
✅ Generated OData queries work correctly with Dataverse  
✅ Build time remains reasonable (< 30 seconds for typical project)  
✅ PCF demo compiles and runs with type-safe examples  

This implementation will provide the best possible developer experience for nested expand operations from day one.