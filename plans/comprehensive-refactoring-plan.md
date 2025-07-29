# Comprehensive Refactoring Plan: Remove Hardcoded Values + Type Simplification

## 🎯 **Primary Goals**
1. **Remove ALL hardcoded entity/field references** (pum, cost, etc.) from type generation
2. **Simplify complex TypeScript types** that are making development difficult  
3. **Make code truly generic and reusable** for any Dataverse instance

---

## **Critical Issues Identified**

### **1. Hardcoded Entity References in Generated Code**
**Location**: `src/generators/query-hooks.ts:800-826`
```typescript
// PROBLEMATIC: These are hardcoded in generated documentation
lines.push(`const { data } = usePumInitiativeList({`)
lines.push(`      { pum_status: PumStatus.InProgress.Value }`)
lines.push(`  $select: ['pum_name', 'pum_description', 'createdon'],`)
lines.push(`await invalidateEntityQueries(queryClient, 'pum_initiative')`)
```
**Impact**: Generated code only works for PUM entities, not generic

### **2. Complex Unreadable TypeScript Types**
**Location**: `src/query/types.ts:249-256`
```typescript
// PROBLEMATIC: Impossible to debug or maintain
type EntityCreateInput<TEntity, TBindings = Record<string, never>> = 
  Partial<Omit<TEntity, string & keyof { [K in keyof TEntity]: TEntity[K] extends string ? K extends `${string}id` ? K : never : never }>> & 
  Partial<TBindings>
```
**Impact**: Makes development extremely difficult, cryptic error messages

### **3. Entity-Specific Examples Throughout Codebase**
**Locations**: Multiple files with hardcoded `pum_initiative`, `pum_name`, `PumInitiativeStatecode` references
**Impact**: Documentation and examples don't apply to other entities

---

## **Phase 1: Foundation & Hardcoded Cleanup** (Steps 1-3)

### **Step 1: Create Type Utilities Foundation**
**Files to Create**: `src/types/type-utilities.ts`
**Files to Modify**: None (pure addition)
**Goal**: Establish reusable helper types for complex patterns

```typescript
// New utility types to create:

// String manipulation helpers
export type StringEndingWith<T, Suffix extends string> = T extends `${string}${Suffix}` ? T : never
export type StringStartingWith<T, Prefix extends string> = T extends `${Prefix}${string}` ? T : never

// Object manipulation helpers  
export type EntityIdFields<T> = {
  [K in keyof T]: K extends string 
    ? T[K] extends string 
      ? StringEndingWith<K, 'id'>
      : never
    : never
}[keyof T]

export type NonIdFields<T> = Omit<T, EntityIdFields<T>>
export type OnlyIdFields<T> = Pick<T, EntityIdFields<T>>

// Type testing helpers
export type IsString<T> = T extends string ? true : false
export type IsNumber<T> = T extends number ? true : false  
export type IsBoolean<T> = T extends boolean ? true : false
export type IsDate<T> = T extends Date ? true : false
export type IsArray<T> = T extends (infer U)[] ? true : false
```

**Verification Steps**:
```bash
# 1. Type checking passes
pnpm check-types

# 2. Build succeeds  
pnpm build

# 3. Demo still compiles
cd pcf-demo && npm run build
```

### **Step 2: Remove Hardcoded Examples from Generated Code**
**Files to Modify**: `src/generators/query-hooks.ts` (lines 800-826)
**Goal**: Replace hardcoded PUM references with generic placeholders

```typescript
// Before (lines 804-805, 808, 820, 823):
lines.push(`      { statecode: PumInitiativeStatecode.Active.Value },`)
lines.push(`      { pum_status: PumStatus.InProgress.Value }`)
lines.push(`  $select: ['pum_name', 'pum_description', 'createdon'],`)
lines.push(`await invalidateEntityQueries(queryClient, 'pum_initiative')`)
lines.push(`await invalidateEntityQueries(queryClient, 'pum_initiative', {`)

// After: Use the actual entity being generated
lines.push(`      { statecode: ${pascalTypeName}Statecode.Active.Value },`)
lines.push(`      { ${primaryNameAttribute}: { $contains: 'search term' } }`)
lines.push(`  $select: ['${primaryNameAttribute}', '${primaryIdAttribute}', 'createdon'],`)
lines.push(`await invalidateEntityQueries(queryClient, '${entityMetadata.logicalName}')`)
lines.push(`await invalidateEntityQueries(queryClient, '${entityMetadata.logicalName}', {`)
```

**Verification Steps**:
```bash
# 1. Generate types for different entities - ensure no PUM references
node dist/bin/cli.cjs generate --entities contact,account --generate-related-entities
grep -r "pum\|Pum" generated/ # Should return empty

# 2. Generated examples match actual entity
# Check: Generated .hooks.ts files have entity-appropriate examples

# 3. All generation methods work
node dist/bin/cli.cjs generate --publisher test --generate-related-entities
node dist/bin/cli.cjs generate --config dataverse.config.json
```

### **Step 3: Refactor Entity CRUD Types**
**Files to Modify**: `src/query/types.ts` (lines 249-256)
**Goal**: Replace complex nested patterns with readable utility types

```typescript
// Before (lines 249-256):
type EntityCreateInput<TEntity, TBindings = Record<string, never>> = 
  Partial<Omit<TEntity, string & keyof { [K in keyof TEntity]: TEntity[K] extends string ? K extends `${string}id` ? K : never : never }>> & 
  Partial<TBindings>

type EntityUpdateInput<TEntity, TBindings = Record<string, never>> = 
  Partial<Omit<TEntity, string & keyof { [K in keyof TEntity]: TEntity[K] extends string ? K extends `${string}id` ? K : never : never }>> & 
  Partial<TBindings> &
  { [K in keyof TEntity]: K extends `${string}id` ? TEntity[K] : never }[keyof TEntity]

// After: Clean and readable
import type { NonIdFields, OnlyIdFields } from '../types/type-utilities.js'

type EntityCreateInput<TEntity, TBindings = Record<string, never>> = 
  Partial<NonIdFields<TEntity>> & Partial<TBindings>

type EntityUpdateInput<TEntity, TBindings = Record<string, never>> = 
  Partial<NonIdFields<TEntity>> & Partial<TBindings> & OnlyIdFields<TEntity>
```

**Verification Steps**:
```bash
# 1. CLI generation works
node dist/bin/cli.cjs generate --config dataverse.config.json

# 2. All generation methods work
node dist/bin/cli.cjs generate --entities contact,account --generate-related-entities
node dist/bin/cli.cjs generate --publisher test --generate-related-entities

# 3. Demo functionality maintained
cd pcf-demo && npm start
# Verify: Create/update operations still have correct types and IntelliSense
```

---

## **Phase 2: Generic Examples & Documentation** (Steps 4-5)

### **Step 4: Replace Hardcoded Test Examples**
**Files to Modify**: 
- `src/query/test-urls.ts` (multiple lines with `pum_name`, `pum_description`)
- `src/query/standalone.ts` (lines 47-48, 73-77, 123-126)
**Goal**: Use generic placeholders in documentation examples

```typescript
// Before (multiple locations):
$select: ['pum_name', 'pum_description', 'statecode']
$expand: ['pum_program', 'pum_portfolio']
{ pum_name: { $contains: 'project' } }

// After: Generic placeholders
$select: ['<primary_name_field>', '<description_field>', 'statecode']
$expand: ['<related_entity1>', '<related_entity2>']
{ '<name_field>': { $contains: 'search_term' } }
```

**Verification Steps**:
```bash
# 1. No hardcoded entity references in documentation
grep -r "pum_\|cost_" src/query/ --include="*.ts" | grep -v test-output | grep -v node_modules

# 2. Examples are generic and applicable to any entity
# Manual review: Documentation examples don't reference specific entity types

# 3. Type checking still passes
pnpm check-types
```

### **Step 5: Make Generated Hook Examples Generic**
**Files to Modify**: `src/generators/query-hooks.ts` (lines 699-702, 801-826)
**Goal**: Template-based examples using actual entity metadata

```typescript
// Create helper function for generating examples:
function generateEntitySpecificExamples(entityMetadata: ProcessedEntityMetadata): string[] {
  const pascalTypeName = toPascalCaseTypeName(entityMetadata.schemaName)
  const entityName = entityMetadata.logicalName
  const primaryName = entityMetadata.primaryNameAttribute || 'name'
  
  return [
    `// Single entity query`,
    `const { data: ${camelCase(pascalTypeName)} } = use${pascalTypeName}('123e4567-e89b-12d3-a456-426614174000')`,
    ``,
    `// Entity list query`,
    `const { data: ${camelCase(pascalTypeName)}List } = use${pascalTypeName}List({`,
    `  $filter: { statecode: 0 },`,
    `  $select: ['${primaryName}', '${entityMetadata.primaryIdAttribute}', 'createdon'],`,
    `  $orderby: { ${primaryName}: 'asc' }`,
    `})`
  ]
}

// Use in main generation function:
const exampleLines = generateEntitySpecificExamples(entityMetadata)
lines.push(...exampleLines)
```

**Verification Steps**:
```bash
# 1. Generated hooks have entity-appropriate examples
node dist/bin/cli.cjs generate --entities contact,account --generate-related-entities
# Check: Generated .hooks.ts files reference 'contact', 'account', not 'pum_initiative'

# 2. Examples match actual entity metadata
# Manual review: Generated examples use actual field names from the entity

# 3. All hook functionality maintained
cd pcf-demo && npm run build
```

---

## **Phase 3: Type System Improvements** (Steps 6-7)

### **Step 6: Simplify Filter Operator Types**
**Files to Modify**: `src/query/types.ts` (lines 82-89)
**Goal**: Break complex conditional chain into named, testable parts

```typescript
// Before (lines 82-89):
type FilterOperatorForType<T> = 
  T extends string ? StringOperators<T> | T :
  T extends number ? NumberOperators<T> | T :
  T extends boolean ? BooleanOperators | T :
  T extends Date ? DateOperators | T :
  T extends string | Date ? DateOperators | T :
  T extends (infer U)[] ? FilterOperatorForType<U> | U[] :
  StringOperators<T> | T

// After: Clear separation of concerns
type StringTypeOperators<T> = T extends string ? StringOperators<T> | T : never
type NumberTypeOperators<T> = T extends number ? NumberOperators<T> | T : never  
type BooleanTypeOperators<T> = T extends boolean ? BooleanOperators | T : never
type DateTypeOperators<T> = T extends Date ? DateOperators | T : never
type StringDateOperators<T> = T extends string | Date ? DateOperators | T : never
type ArrayTypeOperators<T> = T extends (infer U)[] ? FilterOperatorForType<U> | U[] : never

export type FilterOperatorForType<T> = 
  | StringTypeOperators<T>
  | NumberTypeOperators<T>
  | BooleanTypeOperators<T>
  | DateTypeOperators<T>
  | StringDateOperators<T>
  | ArrayTypeOperators<T>
  | StringOperators<T> // fallback
  | T
```

**Verification Steps**:
```bash
# 1. Type checking passes with improved performance
pnpm check-types

# 2. Demo filtering maintains IntelliSense quality
cd pcf-demo && npm run build
# Check: Filter operations still provide correct IntelliSense

# 3. CLI generates correct OData filter expressions
node dist/bin/cli.cjs generate --entities contact --generate-related-entities
# Test: Generated types work with complex filters
```

### **Step 7: Simplify TypeSafe Expand Types**
**Files to Modify**: `src/query/types.ts` (lines 129-135)
**Goal**: Extract metadata manipulation to helper types

```typescript
// Before (lines 129-135):
type TypeSafeExpand<TEntityMetadata> = TEntityMetadata extends {
  relatedEntities: infer TRelated
} ? {
  [K in keyof TRelated]?: TRelated[K] extends { targetEntityLogicalName: string }
    ? RelationshipExpandOption<any> : never
} : ExpandObject

// After: Helper types for clarity
type ExtractRelatedEntities<TMeta> = TMeta extends { relatedEntities: infer R } ? R : Record<string, never>

type ValidRelationship<TRelation> = TRelation extends { targetEntityLogicalName: string } 
  ? RelationshipExpandOption<any> 
  : never

export type TypeSafeExpand<TEntityMetadata> = {
  [K in keyof ExtractRelatedEntities<TEntityMetadata>]?: ValidRelationship<ExtractRelatedEntities<TEntityMetadata>[K]>
} | ExpandObject // fallback for compatibility
```

**Verification Steps**:
```bash
# 1. Demo expand operations maintain IntelliSense  
cd pcf-demo && npm start
# Verify: Expand operations still provide type safety and IntelliSense

# 2. CLI generates accurate expand types
node dist/bin/cli.cjs generate --config dataverse.config.json
# Check: Generated expand types have correct relationship mappings

# 3. Type error messages are clearer
# Manual test: Intentionally break expand type usage and verify error message clarity
```

---

## **Phase 4: Generator & Final Cleanup** (Step 8)

### **Step 8: Refactor Generator Logic & Documentation**
**Files to Modify**: 
- `src/generators/index.ts` (lines 456-567, 613-692)
- All modified files (add JSDoc, remove unused imports)
**Goal**: Extract generation helpers, improve maintainability

```typescript
// Extract binding generation helpers:

interface BindingGenerationContext {
  entityMetadata: ProcessedEntityMetadata
  pascalTypeName: string
  lookupAttributes: ProcessedAttributeMetadata[]
  options: TypeGenerationOptions
}

function generateBindingInterface(context: BindingGenerationContext): string[] {
  const { pascalTypeName, lookupAttributes } = context
  const lines: string[] = []
  
  lines.push(`export type ${pascalTypeName}Bindings = {`)
  
  for (const attr of lookupAttributes) {
    const bindingProperty = `${attr.schemaName}@odata.bind`
    const targets = attr.targets && attr.targets.length > 0 ? ` // Bind to: ${attr.targets.join(', ')}` : ''
    lines.push(`  '${bindingProperty}'?: string;${targets}`)
  }
  
  lines.push(`};`)
  return lines
}

function generateBindingHelpers(context: BindingGenerationContext): string[] {
  // Extract complex binding helper generation
  // ... implementation
}

function generateCrudTypes(context: BindingGenerationContext): string[] {
  // Extract Create/Update type generation
  // ... implementation
}

// Add JSDoc documentation to all new utility types:
/**
 * Extracts all field names ending with 'id' from an entity type.
 * Used to identify primary key and foreign key fields.
 * 
 * @example
 * type User = { userid: string, name: string, companyid: string }
 * type UserIdFields = EntityIdFields<User> // 'userid' | 'companyid'
 */
export type EntityIdFields<T> = {
  [K in keyof T]: K extends string 
    ? T[K] extends string 
      ? StringEndingWith<K, 'id'>
      : never
    : never
}[keyof T]
```

**Verification Steps**:
```bash
# 1. Full test suite passes
pnpm test

# 2. Type checking passes with improved error messages
pnpm check-types  

# 3. Linting passes
pnpm lint

# 4. Complete CLI workflow verification
node dist/bin/cli.cjs generate --config dataverse.config.json
cd pcf-demo && npm run build && npm start

# 5. Zero hardcoded references
grep -r "pum\|cost\|Pum\|Cost" src/ --include="*.ts" | grep -v test-output | grep -v "// example\|comment"
# Should only return generic examples or comments

# 6. Documentation is accurate
# Manual review: README and JSDoc comments match implementation
```

---

## **🧪 Testing Strategy Per Step**

### **Automated Testing Commands**
After each step, run these commands to ensure functionality:

```bash
# 1. Build the project
pnpm build

# 2. Type checking
pnpm check-types

# 3. Linting
pnpm lint

# 4. Test all CLI generation methods with different entity types
node dist/bin/cli.cjs generate --entities contact,account --generate-related-entities
node dist/bin/cli.cjs generate --entities systemuser,team --generate-related-entities  
node dist/bin/cli.cjs generate --publisher test --generate-related-entities
node dist/bin/cli.cjs generate --config dataverse.config.json

# 5. Verify no hardcoded references in generated code
grep -r "pum\|cost\|Pum\|Cost" generated/ 
# Should return empty or only generic examples

# 6. Verify generated files compile
pnpm check-types
```

### **Demo App Testing**
After each step, verify the demo maintains functionality:

```bash
cd pcf-demo
npm run build
npm start

# Verify these features still work:
# 1. Filter operations with IntelliSense 
# 2. Expand operations with type safety
# 3. Complex logical filters ($and, $or, $not)
# 4. Type-safe field selection ($select with IntelliSense)
```

### **Quality Gates (Run After Each Step)**
```bash
# All must pass before proceeding to next step
pnpm lint        # Code quality  
pnpm check-types # TypeScript compilation
pnpm test        # Unit tests

# Generated code quality check
grep -r "pum\|cost" generated/ # Should be empty
```

---

## **📈 Expected Benefits**

### **Hardcoded Issues Fixed**
- **Before**: Generated code only works for PUM entities
- **After**: Generated code works for ANY Dataverse entity
- **Impact**: Library becomes truly reusable across different customers/solutions

### **Type Readability Improvements**
- **Before**: `Partial<Omit<TEntity, string & keyof { [K in keyof TEntity]: TEntity[K] extends string ? K extends \`${string}id\` ? K : never : never }>>`
- **After**: `Partial<NonIdFields<TEntity>>`
- **Impact**: 95% reduction in type complexity, much easier to debug

### **Error Message Improvements**  
- **Before**: Cryptic error messages with nested conditional types
- **After**: Clear error messages referencing named utility types like "NonIdFields<T>"
- **Impact**: Faster debugging, better developer experience

### **IntelliSense Improvements**
- **Before**: Hover shows complex nested conditional logic  
- **After**: Hover shows clear type names with JSDoc documentation
- **Impact**: Better development experience, clearer type information

### **Maintainability Improvements**
- **Before**: Monolithic complex types scattered across files
- **After**: Composable utility types in dedicated modules  
- **Impact**: Easier to extend, modify, and understand

---

## **⚠️ Risk Mitigation**

### **Backwards Compatibility**
- Each step maintains API compatibility
- Generated code interfaces remain unchanged
- Demo functionality preserved throughout
- Existing consumer code continues to work

### **Rollback Strategy**  
- Each step is isolated and can be reverted independently
- Git commits per step for easy rollback
- Comprehensive testing before proceeding to next step

### **Type Safety Preservation**
- All existing type constraints maintained
- IntelliSense quality preserved or improved
- No relaxation of type checking strictness
- Full verification suite per step

---

## **📋 Success Criteria**

✅ **Zero hardcoded entity references** in any generated code  
✅ **All CLI generation methods work** with any entity type  
✅ **Complex types replaced** with readable, documented utilities  
✅ **Generated examples are generic** and professional  
✅ **Error messages are clear** and helpful  
✅ **Full test suite passes** after each step  
✅ **Demo maintains functionality** with improved types  
✅ **Type checking performance** maintained or improved  
✅ **Code quality metrics maintained** (lint, check-types)  
✅ **Documentation is accurate** and helpful  

---

This incremental approach ensures that both hardcoded entity references and complex TypeScript patterns are resolved systematically while preserving all existing functionality and improving the overall developer experience.