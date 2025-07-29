# Updated Refactoring Plan: Remove Hardcoded Values + Type Simplification

## 🎯 **Current State Assessment**
**⚠️ NONE of the original refactoring plan has been implemented**

**Critical Issues Remaining:**
- ❌ Hardcoded PUM references in generated code & documentation
- ❌ Complex unreadable TypeScript types causing development difficulty  
- ❌ No type utilities foundation exists
- ✅ **Tests can keep PUM hardcoding until new test environment available**

---

## **PRIORITY 1: Type System Foundation**

### **Step 1: Create Type Utilities** ⭐ **START HERE**
**Create**: `src/types/type-utilities.ts`

```typescript
/**
 * Utility types for simplifying complex TypeScript patterns
 */

// String manipulation helpers
export type StringEndingWith<T, Suffix extends string> = T extends `${string}${Suffix}` ? T : never
export type StringStartingWith<T, Prefix extends string> = T extends `${Prefix}${string}` ? T : never

/**
 * Extracts all field names ending with 'id' (primary/foreign keys)
 * @example EntityIdFields<{userid: string, name: string, companyid: string}> = 'userid' | 'companyid'
 */
export type EntityIdFields<T> = {
  [K in keyof T]: K extends string 
    ? T[K] extends string 
      ? StringEndingWith<K, 'id'>
      : never
    : never
}[keyof T]

/**
 * All fields except ID fields (safe for create operations)
 */
export type NonIdFields<T> = Omit<T, EntityIdFields<T>>

/**
 * Only ID fields (required for update operations)
 */
export type OnlyIdFields<T> = Pick<T, EntityIdFields<T>>

// Type checking helpers
export type IsString<T> = T extends string ? true : false
export type IsNumber<T> = T extends number ? true : false  
export type IsBoolean<T> = T extends boolean ? true : false
export type IsDate<T> = T extends Date ? true : false
export type IsArray<T> = T extends (infer U)[] ? true : false
```

**Verify**: `pnpm check-types && pnpm build`

### **Step 2: Simplify CRUD Types** ⭐ **CRITICAL**
**Modify**: `src/query/types.ts` (lines 249-256)

```typescript
// REPLACE the unreadable nested conditionals:
import type { NonIdFields, OnlyIdFields } from '../types/type-utilities.js'

export type EntityCreateInput<TEntity, TBindings = Record<string, never>> = 
  Partial<NonIdFields<TEntity>> & Partial<TBindings>

export type EntityUpdateInput<TEntity, TBindings = Record<string, never>> = 
  Partial<NonIdFields<TEntity>> & Partial<TBindings> & OnlyIdFields<TEntity>
```

**Impact**: 95% reduction in type complexity, readable error messages

**Verify**: 
```bash
node dist/bin/cli.cjs generate --entities contact,account --generate-related-entities
pnpm check-types
```

---

## **PRIORITY 2: Remove Hardcoded Examples**

### **Step 3: Fix Generated Hook Examples** ⭐ **HIGH PRIORITY**
**Modify**: `src/generators/query-hooks.ts` (lines 756-880)

**Replace hardcoded PUM references with dynamic entity-based examples:**

```typescript
// Create helper function:
function generateEntitySpecificExamples(entityMetadata: ProcessedEntityMetadata): string[] {
  const pascalTypeName = toPascalCaseTypeName(entityMetadata.schemaName)
  const entityName = entityMetadata.logicalName
  const primaryName = entityMetadata.primaryNameAttribute || 'name'
  
  return [
    ` * import { use${pascalTypeName}, use${pascalTypeName}List } from './hooks'`,
    ` * const { data: entity } = use${pascalTypeName}('123e4567-e89b-12d3-a456-426614174000')`,
    ` * const { data: entities } = use${pascalTypeName}List({ statecode: 0 })`,
    `      { statecode: ${pascalTypeName}Statecode.Active.Value }`,
    `  $select: ['${primaryName}', '${entityMetadata.primaryIdAttribute}', 'createdon'],`,
    `await invalidateEntityQueries(queryClient, '${entityName}')`
  ]
}

// Use in place of hardcoded PUM examples
```

**Verify**: 
```bash
node dist/bin/cli.cjs generate --entities contact,account --generate-related-entities
grep -r "pum\|Pum" generated/ # MUST be empty
```

### **Step 4: Fix Documentation Examples**
**Modify**: 
- `src/query/standalone.ts` (lines 46-48, 71-77, 123-126)
- `example-usage.md`

**Replace with generic placeholders:**
```typescript
// BEFORE:
$select: ['pum_name', 'pum_description', 'statecode']
{ pum_name: { $contains: 'project' } }

// AFTER:
$select: ['<primary_name_field>', '<description_field>', 'statecode']
{ '<name_field>': { $contains: 'search_term' } }
```

---

## **PRIORITY 3: Type System Improvements**

### **Step 5: Simplify Filter Types**
**Modify**: `src/query/types.ts` (lines 82-89)

```typescript
// REPLACE complex conditional chain with clear separation:
type StringTypeOperators<T> = T extends string ? StringOperators<T> | T : never
type NumberTypeOperators<T> = T extends number ? NumberOperators<T> | T : never  
type BooleanTypeOperators<T> = T extends boolean ? BooleanOperators | T : never
type DateTypeOperators<T> = T extends Date ? DateOperators | T : never
type ArrayTypeOperators<T> = T extends (infer U)[] ? FilterOperatorForType<U> | U[] : never

export type FilterOperatorForType<T> = 
  | StringTypeOperators<T>
  | NumberTypeOperators<T>
  | BooleanTypeOperators<T>
  | DateTypeOperators<T>
  | ArrayTypeOperators<T>
  | StringOperators<T> // fallback
  | T
```

### **Step 6: Simplify Expand Types**
**Modify**: `src/query/types.ts` (lines 129-135)

```typescript
// REPLACE complex nested pattern with helper types:
type ExtractRelatedEntities<TMeta> = TMeta extends { relatedEntities: infer R } ? R : Record<string, never>

type ValidRelationship<TRelation> = TRelation extends { targetEntityLogicalName: string } 
  ? RelationshipExpandOption<any> 
  : never

export type TypeSafeExpand<TEntityMetadata> = {
  [K in keyof ExtractRelatedEntities<TEntityMetadata>]?: ValidRelationship<ExtractRelatedEntities<TEntityMetadata>[K]>
} | ExpandObject
```

---

## **FILES TO EXCLUDE FROM HARDCODING CLEANUP**
**✅ Can keep PUM references until new test environment:**
- `src/query/test-urls.ts`
- `tests/integration/*.test.ts`
- Any file in `tests/` directory
- `test-output/` directory

---

## **QUALITY GATES - MUST PASS AFTER EACH STEP**

```bash
# 1. Build & Type Checking
pnpm build && pnpm check-types && pnpm lint

# 2. Zero Hardcoded References (excluding tests)
grep -r "pum\|Pum" src/ --include="*.ts" --exclude-dir=tests | grep -v test-urls.ts | grep -v "// example"
# MUST return empty

# 3. Generated Code Works
node dist/bin/cli.cjs generate --entities contact,account --generate-related-entities
grep -r "pum\|Pum" generated/ # MUST be empty

# 4. Demo Functionality 
cd pcf-demo && npm run build && npm start
```

---

## **🎯 SUCCESS CRITERIA**

**MUST ACHIEVE:**
✅ Complex types replaced with readable utilities (`NonIdFields<T>` vs nested conditionals)  
✅ Generated code works with ANY entity (contact, account, systemuser, etc.)  
✅ Zero hardcoded entity references in generated code  
✅ Professional documentation with generic examples  
✅ All existing functionality preserved  
✅ Tests can keep PUM references for now  

**IMPACT:**
- 95% reduction in type complexity
- Universal Dataverse compatibility  
- Professional appearance for any customer
- Better developer experience with clear error messages

---

## **EXECUTION ORDER**
1. **Step 1**: Create type utilities foundation
2. **Step 2**: Simplify CRUD types (immediate developer experience improvement)
3. **Step 3**: Fix generated examples (customer-facing impact)
4. **Step 4**: Clean documentation examples
5. **Step 5-6**: Simplify remaining complex types

**Each step must pass quality gates before proceeding to next.**