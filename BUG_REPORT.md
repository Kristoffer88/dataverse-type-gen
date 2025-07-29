# Bug Report: EntityListOptionsWithMetadata Type Not Found

## Summary
The generated React Query hooks are importing and using a non-existent type `EntityListOptionsWithMetadata`, causing TypeScript compilation errors in the PCF demo application.

## Expected Behavior
The generated hooks should use the correct type `EntityListOptions<TEntity, TMetadata>` as defined in `src/query/types.ts`.

## Actual Behavior
Generated hook files contain imports and usage of `EntityListOptionsWithMetadata<TEntity, TMetadata>` which doesn't exist in the type system.

## Steps to Reproduce
1. Run type generation with related entities feature: `npx dataverse-type-gen generate --generate-related-entities`
2. Check generated hooks file: `pcf-demo/generated/hooks/pum_initiative.hooks.ts`
3. Notice incorrect import and usage of `EntityListOptionsWithMetadata`

## Evidence

### Generated Code (Incorrect)
```typescript
// In pcf-demo/generated/hooks/pum_initiative.hooks.ts
import type {
    ODataFilter,
    ODataSelect,
    ODataExpand,
    ODataOrderBy,
    ODataResponse,
    EntityListOptions,
    EntityListOptionsWithMetadata,  // <- This type doesn't exist
    ExpandablePropertiesOf
} from 'dataverse-type-gen'

export function usePumInitiativeList(
    options: EntityListOptionsWithMetadata<pum_Initiative, typeof pum_InitiativeMetadata> & Omit<UseQueryOptions<ODataResponse<pum_Initiative>>, 'queryKey' | 'queryFn'> = {}
): UseQueryResult<ODataResponse<pum_Initiative>> {
    // Function body...
}
```

### Source Code (Correct)
```typescript
// In src/generators/query-hooks.ts lines 39-40
lines.push(`  EntityListOptions,`)
lines.push(`  ExpandablePropertiesOf`)

// And in function signature generation:
lines.push(`  options: EntityListOptions<${interfaceName}, typeof ${interfaceName}Metadata> & Omit<UseQueryOptions<ODataResponse<${interfaceName}>>, 'queryKey' | 'queryFn'> = {}`)
```

## Investigation Details

### What We Know
1. **Source code is correct**: `src/generators/query-hooks.ts` uses `EntityListOptions` correctly
2. **Type exists**: `EntityListOptions<TEntity, TMetadata>` is properly defined in `src/query/types.ts`  
3. **Build succeeds**: Main project compiles without TypeScript errors
4. **Generated output is wrong**: Hook files contain the non-existent type
5. **No source references**: `EntityListOptionsWithMetadata` doesn't exist anywhere in src/

### Search Results
```bash
# No references in source code
$ grep -r "EntityListOptionsWithMetadata" /Users/kristoffer/private/repos/dataverse-type-gen/src/
# No results

# But appears in generated files
$ grep "EntityListOptionsWithMetadata" pcf-demo/generated/hooks/pum_initiative.hooks.ts
# Multiple matches found
```

## Possible Causes
1. **Template caching**: There may be some build/template caching that's using an old version
2. **Hidden template**: There might be another template file or string literal that generates this
3. **Dynamic type generation**: Some code might be dynamically creating this type name
4. **Post-processing**: There could be post-processing that transforms the correct type to the incorrect one

## Impact
- **High**: Blocks usage of the new type-safe nested expand functionality
- PCF demo application cannot compile due to TypeScript errors
- Generated hooks are unusable until this is resolved

## Workaround
Currently, the demo App.tsx had to revert to array-based expand syntax instead of the new object-based syntax to avoid compilation errors.

## Files Affected
- `pcf-demo/generated/hooks/pum_initiative.hooks.ts`
- `pcf-demo/generated/hooks/pum_gantttask.hooks.ts`
- Any other generated hook files when using `--generate-related-entities`

## Build Information
- TypeScript: 5.8.0
- Node: Recent version
- Project builds successfully with `pnpm build`
- CLI generation completes without errors
- Only TypeScript compilation of generated files fails

## Next Steps
1. **Find the root cause**: Identify where `EntityListOptionsWithMetadata` is being generated from
2. **Fix the template/generator**: Update the source to use correct type
3. **Test fix**: Regenerate types and verify TypeScript compilation passes
4. **Update demo**: Enable the new object-based expand syntax in App.tsx examples

---

**Note**: This issue surfaced during implementation of the type-safe nested expand functionality where the object-based expand syntax requires proper typing to work correctly.