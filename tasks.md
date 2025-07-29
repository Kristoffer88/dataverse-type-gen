# Generator Refactoring Tasks

## Overview
Refactor large generator files into smaller, maintainable modules for better readability and maintainability.

## Critical Testing Requirements
- **ALWAYS USE CACHE** - API must not be hit directly to avoid rate limits
- Test after EACH phase with different configurations
- Verify no regressions in generated code quality
- Run all quality gates: `pnpm build && pnpm check-types && pnpm lint`

## Phase 1: Split Generators Core (Priority: HIGH) ✅ COMPLETED
**Target**: `src/generators/index.ts` (864 lines)

### Tasks:
- [x] Extract entity interface generation logic → `src/generators/entity-interface.ts`
- [x] Extract option set generation logic → `src/generators/optionset-generation.ts` 
- [x] Extract metadata object generation → `src/generators/metadata-generation.ts`
- [x] Extract import utilities → `src/generators/import-generation.ts`
- [x] Extract shared utilities → `src/generators/utils.ts`
- [x] Extract binding types → `src/generators/binding-types.ts`
- [x] Extract expand types → `src/generators/expand-types.ts`
- [x] Update main `src/generators/index.ts` to re-export from modules
- [x] **TESTING**: Generate types with cache using different configs:
  - [x] `--entities contact,account --generate-related-entities`
  - [x] `--publisher pum --generate-related-entities` 
  - [ ] `--config test-config-depth.json`
- [x] Verify generated code quality unchanged
- [x] Run quality gates: `pnpm build && pnpm check-types && pnpm lint`

**Result**: Successfully split 864-line file into 7 focused modules (avg ~120 lines each). Core entity generation works perfectly.

**✅ CONFIRMED**: App.tsx imports work correctly for basic entity types and interfaces.
**⚠️ NOTE**: Found pre-existing bug in hooks generator (Phase 2) - import naming mismatch between `pum_gantttaskMetadata` (camelCase) and `pum_GanttTaskMetadata` (PascalCase). This will be fixed in Phase 2.

## Phase 2: Split Query Hooks Generator (Priority: HIGH)
**Target**: `src/generators/query-hooks.ts` (915 lines)

### Tasks:
- [ ] Extract individual entity hooks → `src/generators/hooks/entity-hooks.ts`
- [ ] Extract list/query hooks → `src/generators/hooks/list-hooks.ts`
- [ ] Extract query builders → `src/generators/hooks/query-builders.ts`
- [ ] Extract hook utilities → `src/generators/hooks/utilities.ts`
- [ ] Create hooks module orchestrator → `src/generators/hooks/index.ts`
- [ ] Update main query-hooks.ts imports
- [ ] **TESTING**: Generate hooks with cache using different configs:
  - [ ] Test hook file generation for different entities
  - [ ] Verify React Query integration works
  - [ ] Test with nested expand configurations
- [ ] Verify generated hooks quality unchanged
- [ ] Run quality gates: `pnpm build && pnpm check-types && pnpm lint`

## Phase 3: Split Code Generation Orchestrator (Priority: MEDIUM)
**Target**: `src/codegen/index.ts` (1109 lines)

### Tasks:
- [ ] Extract file writing operations → `src/codegen/file-writer.ts`
- [ ] Extract directory management → `src/codegen/directory-manager.ts`
- [ ] Extract formatting utilities → `src/codegen/formatter.ts`
- [ ] Extract result tracking → `src/codegen/result-tracking.ts`
- [ ] Extract main orchestration → `src/codegen/orchestrator.ts`
- [ ] Update main index.ts for clean exports
- [ ] **TESTING**: Full generation pipeline with cache:
  - [ ] Test directory organization features
  - [ ] Test file formatting (prettier/eslint)
  - [ ] Test result aggregation and reporting
  - [ ] Test with various output configurations
- [ ] Verify generation pipeline unchanged
- [ ] Run quality gates: `pnpm build && pnpm check-types && pnpm lint`

## Phase 4: Split CLI Command Handler (Priority: MEDIUM)
**Target**: `src/cli/index.ts` (1122 lines)

### Tasks:
- [ ] Extract generate command → `src/cli/commands/generate.ts`
- [ ] Extract cache commands → `src/cli/commands/cache.ts`
- [ ] Extract URL validation → `src/cli/validation/url-validator.ts`
- [ ] Extract user prompts → `src/cli/prompts/user-prompts.ts`
- [ ] Extract CLI configuration → `src/cli/config/cli-config.ts`
- [ ] Extract output formatters → `src/cli/output/formatters.ts`
- [ ] Update main CLI setup in index.ts
- [ ] **TESTING**: CLI commands with cache:
  - [ ] Test generate command variations
  - [ ] Test cache management commands
  - [ ] Test interactive prompts and validation
  - [ ] Test configuration file loading
- [ ] Verify CLI functionality unchanged
- [ ] Run quality gates: `pnpm build && pnpm check-types && pnpm lint`

## Testing Configuration Matrix
Use these configurations for comprehensive testing after each phase:

### Basic Entity Testing
```bash
# Always use cache - never hit API directly
DATAVERSE_INSTANCE=https://ssopowerppm.crm4.dynamics.com node dist/bin/cli.cjs generate --entities contact,account --generate-related-entities
```

### Publisher Testing
```bash
DATAVERSE_INSTANCE=https://ssopowerppm.crm4.dynamics.com node dist/bin/cli.cjs generate --publisher pum --generate-related-entities
```

### Configuration File Testing
```bash
# Test with various config files
node dist/bin/cli.cjs generate --config test-config-depth.json
node dist/bin/cli.cjs generate --config test-config-no-hooks.json
node dist/bin/cli.cjs generate --config test-config-primary-only.json
```

## Success Criteria
- [ ] All large files split into focused modules (< 300 lines each)
- [ ] No regressions in generated code quality
- [ ] All tests pass after each phase
- [ ] Improved maintainability and readability
- [ ] Preserved all existing functionality and APIs
- [ ] Documentation updated for new module structure

## Notes
- Each phase must be completed and tested before moving to next
- Use barrel exports to maintain existing import paths
- Focus on single responsibility principle for each new module
- Maintain backward compatibility throughout refactoring