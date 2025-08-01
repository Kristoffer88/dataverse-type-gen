# Type-Safe URL Generation Feature Plan

## Overview

Replace the current complex query builders with a dual approach:
1. **Simple URL helpers** for common fetch operations (80% use cases)
2. **Advanced query builders** for complex OData scenarios (20% use cases)

Both approaches must be **fully type-safe** with IntelliSense support.

## Current Problems

### Issues with Current Query Builders
- 200+ lines of complex code for simple URL construction
- Not useful without React Query hooks
- Users prefer simple fetch calls with clean URLs
- `--no-hooks` option provides minimal value

### User Pain Points
- Manual URL construction: `/api/data/v9.1/pum_gantttasks?$select=field1,field2`
- No type safety for field names or operators
- No IntelliSense for available fields or relationships
- Easy to make typos in field names or OData syntax

## Proposed Solution

### 1. Simple URL Helpers (New)

Generate clean, type-safe URL helpers for common operations:

```typescript
export const pum_GanttTaskUrls = {
  // Basic endpoints
  list: '/api/data/v9.1/pum_gantttasks',
  byId: (id: string) => `/api/data/v9.1/pum_gantttasks(${id})`,
  count: '/api/data/v9.1/pum_gantttasks/$count',
  
  // Type-safe single-parameter helpers
  withSelect: (fields: (keyof pum_GanttTask)[]) => 
    `/api/data/v9.1/pum_gantttasks?$select=${fields.join(',')}`,
    
  withFilter: (filter: string) => 
    `/api/data/v9.1/pum_gantttasks?$filter=${encodeURIComponent(filter)}`,
    
  withExpand: (relationships: pum_GanttTaskExpandableProperty[]) =>
    `/api/data/v9.1/pum_gantttasks?$expand=${relationships.join(',')}`,
    
  withOrderBy: (field: keyof pum_GanttTask, direction: 'asc' | 'desc' = 'asc') =>
    `/api/data/v9.1/pum_gantttasks?$orderby=${String(field)} ${direction}`,
    
  withTop: (count: number) =>
    `/api/data/v9.1/pum_gantttasks?$top=${count}`,
    
  // Combinable options - for more complex scenarios
  build: (options: SimpleUrlOptions<pum_GanttTask>) => 
    buildSimpleUrl('pum_gantttasks', options)
}
```

### 2. Advanced Query Builders (Enhanced)

Keep existing complex builders but improve them:

```typescript
export const pum_GanttTaskQueries = {
  // Full OData query building with type-safe filters
  buildEntityUrl: (id: string, options: EntityOptions<pum_GanttTask>) => string,
  buildListUrl: (options: EntityListOptions<pum_GanttTask>) => string,
  buildCountUrl: (options: Pick<EntityListOptions<pum_GanttTask>, '$filter'>) => string,
  
  // Type-safe filter building with operators
  buildFilter: (filter: ODataFilter<pum_GanttTask>) => string,
  buildOrderBy: (orderby: ODataOrderBy<pum_GanttTask>) => string,
  buildExpand: (expand: pum_GanttTaskExpand) => string,
}
```

## Type Safety Requirements

### 1. Field Name Validation
- `$select` fields must be `keyof EntityType`
- Compile-time validation of field names
- IntelliSense support for all entity properties

### 2. Relationship Validation  
- `$expand` relationships must be from generated `EntityExpandableProperty` type
- Validation against actual entity metadata
- IntelliSense for available relationships

### 3. Filter Type Safety
- Filter fields must be valid entity properties
- Operators must match field types (e.g., string operators for string fields)
- Support for nested filters with `$and`/`$or`

### 4. OData Compliance
- Proper URL encoding of values
- Correct OData syntax generation
- Support for all OData query options

## Implementation Plan

### Phase 1: Type Definitions
**Files to create/modify:**
- `src/types/url-generation.ts` - New type definitions
- `src/types/odata-types.ts` - Enhanced OData types

**New Types:**
```typescript
// Simple URL options
type SimpleUrlOptions<T> = {
  $select?: (keyof T)[]
  $filter?: string
  $expand?: string[]
  $orderby?: { field: keyof T; direction: 'asc' | 'desc' }
  $top?: number
  $skip?: number
}

// Expandable properties type (per entity)
type EntityExpandableProperty = 'relationship1' | 'relationship2' | ...

// Enhanced filter types with operator validation
type ODataFilter<T> = {
  [K in keyof T]?: T[K] | FilterOperators<T[K]>
} & {
  $and?: ODataFilter<T>[]
  $or?: ODataFilter<T>[]
}

type FilterOperators<T> = T extends string ? StringOperators<T> :
                         T extends number ? NumberOperators<T> :
                         T extends Date ? DateOperators<T> :
                         never
```

### Phase 2: Simple URL Generators
**Files to create:**
- `src/generators/simple-url-generator.ts` - Generate simple URL helpers
- `src/codegen/url-helper-templates.ts` - Templates for URL helpers

**Generated Output Structure:**
```typescript
// In generated/{entity}.urls.ts
export const pum_GanttTaskUrls = {
  // Static endpoints
  list: '/api/data/v9.1/pum_gantttasks',
  byId: (id: string) => `/api/data/v9.1/pum_gantttasks(${id})`,
  count: '/api/data/v9.1/pum_gantttasks/$count',
  
  // Type-safe helpers
  withSelect: (fields: (keyof pum_GanttTask)[]) => string,
  withFilter: (filter: string) => string,
  withExpand: (relationships: pum_GanttTaskExpandableProperty[]) => string,
  withOrderBy: (field: keyof pum_GanttTask, direction?: 'asc' | 'desc') => string,
  withTop: (count: number) => string,
  withSkip: (count: number) => string,
  
  // Combinable builder
  build: (options: SimpleUrlOptions<pum_GanttTask>) => string
}
```

### Phase 3: Enhanced Advanced Builders  
**Files to modify:**
- `src/generators/query-generator.ts` - Enhance existing query builders
- `src/codegen/query-templates.ts` - Update query templates

**Improvements:**
- Better type safety for filter operators
- Improved relationship validation
- More comprehensive error messages
- Performance optimizations

### Phase 4: CLI Integration
**Files to modify:**
- `src/cli/config/cli-config.ts` - Add URL generation options
- `src/cli/commands/generate.ts` - Handle new options
- `src/codegen/orchestrator.ts` - Integrate URL generation

**New CLI Options:**
```bash
# Generate simple URL helpers only (no hooks, no complex queries)
--urls-only

# Generate simple + advanced (no hooks)  
--no-hooks  # current behavior, but now includes simple URLs

# Generate everything (simple + advanced + hooks)
--hooks     # current behavior, enhanced with simple URLs
```

### Phase 5: Integration & Testing
**Files to create:**
- `tests/integration/simple-url-generation.test.ts`
- `tests/integration/type-safety-validation.test.ts`

**Test Scenarios:**
- Type safety validation (compile-time checks)
- Generated URL correctness
- IntelliSense functionality verification
- Integration with existing workflows

## Usage Examples

### Simple URL Helpers (Most Common)
```typescript
import { pum_GanttTaskUrls } from './generated'

// Basic list
const url = pum_GanttTaskUrls.list
// "/api/data/v9.1/pum_gantttasks"

// With type-safe field selection
const urlWithSelect = pum_GanttTaskUrls.withSelect(['pum_name', 'statecode'])
// "/api/data/v9.1/pum_gantttasks?$select=pum_name,statecode"

// Single entity
const entityUrl = pum_GanttTaskUrls.byId('123e4567-e89b-12d3-a456-426614174000')
// "/api/data/v9.1/pum_gantttasks(123e4567-e89b-12d3-a456-426614174000)"

// Combinable options
const complexUrl = pum_GanttTaskUrls.build({
  $select: ['pum_name', 'statecode'],
  $filter: "statecode eq 0",
  $top: 10,
  $orderby: { field: 'pum_name', direction: 'asc' }
})
```

### Advanced Query Builders (Complex Scenarios)
```typescript
import { pum_GanttTaskQueries } from './generated'

// Complex type-safe filtering
const url = pum_GanttTaskQueries.buildListUrl({
  $filter: {
    statecode: PumGanttTaskStatecode.Active.Value,
    pum_name: { $contains: 'important' },
    $and: [
      { createdon: { $gte: new Date('2024-01-01') } },
      { modifiedon: { $lt: new Date() } }
    ]
  },
  $expand: {
    pum_initiative: {
      $select: ['pum_name', 'statecode'],
      $filter: { statecode: 0 }
    }
  },
  $orderby: { pum_name: 'asc', createdon: 'desc' },
  $top: 50
})
```

### React Query Hooks (Full Integration)
```typescript
import { usepum_GanttTaskList } from './generated'

// Hooks use the URL builders internally
const { data, isLoading } = usepum_GanttTaskList({
  $select: ['pum_name', 'statecode'], // Type-safe field selection
  $filter: { 
    statecode: PumGanttTaskStatecode.Active.Value,
    pum_name: { $contains: 'task' }
  }
})
```

## Configuration Options

### New Config Properties
```typescript
type TypeGenerationConfig = {
  // Existing
  generateHooks: boolean
  
  // New URL generation options
  generateSimpleUrls: boolean      // Default: true
  generateAdvancedQueries: boolean // Default: true when generateHooks=true
  urlApiVersion: 'v9.1' | 'v9.2'  // Default: 'v9.1'
  includeUrlHelpers: {
    withSelect: boolean    // Default: true
    withFilter: boolean    // Default: true  
    withExpand: boolean    // Default: true
    withOrderBy: boolean   // Default: true
    withPagination: boolean // Default: true
    combinableBuilder: boolean // Default: true
  }
}
```

### CLI Option Matrix
| Option | Simple URLs | Advanced Queries | React Hooks |
|--------|-------------|------------------|-------------|
| `--urls-only` | ✅ | ❌ | ❌ |
| `--no-hooks` (default) | ✅ | ✅ | ❌ |
| `--hooks` | ✅ | ✅ | ✅ |

## File Generation Structure

```
generated/
├── pum_gantttask.ts           # Entity types (unchanged)
├── pum_gantttask.urls.ts      # 🆕 Simple URL helpers
├── pum_initiative.ts          # Entity types (unchanged)  
├── pum_initiative.urls.ts     # 🆕 Simple URL helpers
├── queries/
│   ├── pum_gantttask.queries.ts    # Enhanced advanced builders
│   └── pum_initiative.queries.ts   # Enhanced advanced builders
├── hooks/                     # Generated only with --hooks
│   ├── pum_gantttask.hooks.ts      # Uses both URL helpers and queries
│   └── pum_initiative.hooks.ts     # Uses both URL helpers and queries
└── index.ts                   # Barrel exports
```

## Benefits

### For Users
1. **Simple cases are simple**: Basic fetch calls use clean, obvious URLs
2. **Type safety everywhere**: IntelliSense for fields, relationships, operators
3. **Gradual complexity**: Start simple, add complexity only when needed
4. **No dependency requirements**: URL helpers work without React Query
5. **Better developer experience**: Less cognitive overhead for common tasks

### For Maintenance
1. **Cleaner generated code**: Less complex template logic
2. **Better separation of concerns**: URLs, queries, and hooks are distinct
3. **Easier testing**: Simple functions are easier to unit test
4. **More flexible**: Users can choose their own state management

## Migration Strategy

### Backward Compatibility
- Existing query builders remain unchanged for now
- React Query hooks continue to work as before
- Add deprecation warnings to old complex-only approach

### Migration Path
1. **Phase 1**: Generate both old and new approaches side-by-side
2. **Phase 2**: Update hooks to use new URL helpers internally
3. **Phase 3**: Add deprecation warnings for old query-only approach
4. **Phase 4**: Remove old approach in next major version

## Success Metrics

### Developer Experience
- Reduced lines of code for common operations
- Improved compile-time error detection
- Better IntelliSense coverage and accuracy

### Code Quality
- Fewer runtime errors from typos
- More consistent URL generation
- Cleaner separation between simple and complex scenarios

### Adoption
- Higher usage of `--no-hooks` option with useful output
- Positive feedback on simple URL helpers
- Maintained functionality for complex scenarios

## Risk Mitigation

### Breaking Changes
- **Risk**: New approach might conflict with existing patterns
- **Mitigation**: Generate both approaches side-by-side initially

### Performance
- **Risk**: Additional code generation might slow build times
- **Mitigation**: Optimize templates and use conditional generation

### Complexity
- **Risk**: Two approaches might confuse users
- **Mitigation**: Clear documentation and examples for each use case

### Type Safety Gaps
- **Risk**: Complex type-safe filters might have edge cases
- **Mitigation**: Comprehensive test coverage and gradual rollout

## Implementation Timeline

### Week 1: Foundation
- [ ] Create type definitions
- [ ] Set up simple URL generator structure
- [ ] Create basic templates

### Week 2: Simple URL Generation  
- [ ] Implement simple URL helper generation
- [ ] Add type-safe field selection
- [ ] Create combinable builder functionality

### Week 3: Advanced Enhancement
- [ ] Enhance existing query builders
- [ ] Improve type safety for filters and operators
- [ ] Add better relationship validation

### Week 4: Integration & Testing
- [ ] Integrate with CLI options
- [ ] Create comprehensive test suite
- [ ] Update documentation and examples

### Week 5: Polish & Deployment
- [ ] Performance optimization
- [ ] Error message improvements
- [ ] Final testing and validation