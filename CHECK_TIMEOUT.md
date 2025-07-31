# CLI Testing Issues Found

## 1. Cache Cleanup Timeout Issue

### Command that timed out:
```bash
DATAVERSE_CACHE_ENABLED=true DATAVERSE_INSTANCE=https://krapowerppm.crm4.dynamics.com node dist/bin/cli.cjs cache cleanup
```

### Symptoms:
- Command started with message: "🧹 Cleaning up expired cache files..."
- Timed out after 2 minutes
- No completion message

### Context:
- Cache has 58,729 files totaling ~1.98GB
- Oldest file: 18 hours ago  
- Newest file: 15 minutes ago
- Cache TTL is typically 2 hours

### Likely Issue:
The cleanup process may be scanning all 58,729 files to check expiration dates, which is taking longer than the 2-minute timeout.

### Recommendation:
Please run this command manually to see:
1. If it completes successfully (just takes longer than 2 minutes)
2. The actual completion message and file counts
3. Any error messages that might indicate the root cause

## 2. Generated Code Compilation Errors

### Issue:
Generated TypeScript files have import path issues causing compilation errors in pcf-demo.

### Key Errors:
1. **Missing imports**: Hooks looking for query files that don't exist in expected locations
   - `Can't resolve '../pum_gantttask.queries.js'` 
   - `Can't resolve '../pum_initiative.queries.js'`
   - `Can't resolve '../../related/pum_gantttask.js'`

2. **CRITICAL BUG - File structure mismatch**: Primary entities incorrectly placed in `related/` folder
   - Expected: `generated/pum_initiative.ts`
   - Actual: `generated/related/pum_initiative.ts`
   - Root cause: Primary entities (specified with `--entities`) should be in root, not `related/` subfolder
   - Impact: All import paths are wrong, causing compilation failures

3. **TypeScript issues**: Missing query types and `any` parameter errors

### Generation Command Used:
```bash
DATAVERSE_CACHE_ENABLED=true DATAVERSE_INSTANCE=https://krapowerppm.crm4.dynamics.com node dist/bin/cli.cjs generate --entities pum_initiative,pum_gantttask --generate-related-entities --output-dir pcf-demo/generated
```

### Status:
- 84 files generated successfully
- 29 files failed to generate (missing related entities)
- App.tsx compilation fails due to import path issues

### Recommendation:
1. Fix the file generation logic to place primary entities in correct locations
2. Fix import paths in hooks and queries to match actual file structure
3. Test with `--nested-expand` option to see if it resolves missing entity dependencies