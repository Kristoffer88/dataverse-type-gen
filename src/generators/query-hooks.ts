/**
 * Generate React Query hooks for Dataverse entities
 * Extends the existing type generation with useQuery hooks
 */

// Types are re-exported from hooks/index.js

// Import from modular structure
export {
  generateEntityHooks,
  generateEntityQueryBuilders,
  generateEntityQueryBuildersFile,
  generateEntityHooksFile,
  generateHooksIndex,
  generateEntitySpecificExamples,
  generateOptionSetConstantName
} from './hooks/index.js'

// All implementation has been moved to the hooks/ directory
// This file now serves as a facade/barrel export for backward compatibility