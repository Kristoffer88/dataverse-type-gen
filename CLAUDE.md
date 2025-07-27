# My name is Kristoffer Rasmussen (Context sanity check)

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dataverse Type Generator is a TypeScript library that generates comprehensive TypeScript types from Dataverse metadata with the best possible developer experience. It consumes Dataverse Web API metadata endpoints to create type-safe interfaces, enums, and utility types for Dataverse entities, attributes, and option sets.

The generator transforms EntityMetadata, AttributeMetadata, and OptionSetMetadata into production-ready TypeScript definitions that provide IntelliSense support, type-safe API calls, and auto-completion for choice values.

**Key Architecture Concepts:**

- **Metadata-Driven**: Uses Dataverse Web API `/EntityDefinitions`, `/GlobalOptionSetDefinitions`, and `/RelationshipDefinitions` endpoints
- **Performance-Optimized**: Implements OData filtering, selective properties, language limiting, and caching patterns
- **Composable Functions**: Pure functions for easy testing, no classes unless absolutely necessary
- **MSAL Authentication**: Uses `@azure/msal-node` with provided `getAzureAccessToken(resourceUrl)` function
- **CLI-First Approach**: Command-line interface for generating types with configuration-driven workflows

## Implementation Guidelines

### Authentication & API Access

- **ALWAYS use real Dataverse API calls** - NEVER use mocks for integration tests
- Use the provided `getAzureAccessToken(resourceUrl: string)` function for authentication
- Use relative URLs to API endpoints, not full URLs
- Do not call authentication setup inside tests - it's done in setup
- Follow existing test infrastructure patterns from the monorepo

### Metadata Processing Patterns

**Essential API Endpoints (memorize these):**

```typescript
// Entity metadata - BASIC CALL ONLY (see API-KNOWLEDGE.md for limitations)
GET /api/data/v9.1/EntityDefinitions

// Attribute metadata with casting for full properties
GET /api/data/v9.2/EntityDefinitions(LogicalName='account')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata?$expand=OptionSet

// Global choices
GET /api/data/v9.2/GlobalOptionSetDefinitions(Name='choice_name')

// Relationships
GET /api/data/v9.2/RelationshipDefinitions/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata
```

**⚠️ CRITICAL - API Limitations (refer to API-KNOWLEDGE.md):**

- **EntityDefinitions**: `$top`, `$skip`, `LabelLanguages` parameters NOT supported
- **Error Code 0x80060888**: "Invalid query parameter" - check API-KNOWLEDGE.md for workarounds
- **Always check API-KNOWLEDGE.md** before implementing new endpoint usage

**Performance Optimization (always apply):**

- Use `$select=LogicalName,SchemaName,AttributeType` to limit properties (where supported)
- Use `Consistency: Strong` header for immediate reads after writes
- Cache metadata responses between operations
- Always include `Prefer: odata.include-annotations="*"` for detailed error context
- Use `advancedLog()` function for comprehensive error debugging

### TypeScript Generation Mappings

**AttributeMetadata → TypeScript Types:**

- `StringAttributeMetadata` → `string`
- `IntegerAttributeMetadata` → `number`
- `BooleanAttributeMetadata` → `boolean`
- `DateTimeAttributeMetadata` → `Date | string`
- `MoneyAttributeMetadata` → `number`
- `PicklistAttributeMetadata` → Generated enum type
- `MultiSelectPicklistAttributeMetadata` → Array of enum values
- `LookupAttributeMetadata` → `string | EntityReference`

**OptionSet → Enum Generation Pattern:**

```typescript
// From: {Value: 727000000, Label: {LocalizedLabels: [{Label: "Active"}]}}
// Generate:
export const Status = {
    Active: { Value: 727000000, Label: "Active" },
} as const;
export type Status = (typeof Status)[keyof typeof Status]["Value"];
```

## Documentation Resources

**Primary References (use these first):**

- **`API-KNOWLEDGE.md`** - **CRITICAL**: Real-world API quirks, limitations, and error codes discovered through testing
- `index.md` - Optimized quick reference for TypeScript generation
- `plans/implementation-plan.md` - Comprehensive development roadmap
- `plans/documentation-analysis.md` - Complete API analysis findings

**Critical Examples (reference during implementation):**

- `docs/chunks/web-api-metadata-operations-sample_part_*.md` - Complete metadata operation examples
- `docs/chunks/create-update-column-definitions-using-web-api_part_*.md` - All AttributeMetadata types
- `docs/webapi/query-metadata-web-api.md` - Primary querying guide
- `docs/webapi/use-web-api-metadata.md` - Metadata API overview

## Code Quality Standards

**MANDATORY Quality Checks (run before completing any task):**

1. `pnpm lint` - ESLint validation
2. `pnpm check-types` - TypeScript type checking
3. `pnpm test` - All tests must pass
4. **A task is NOT complete until all checks pass**

**Code Style Preferences:**

- **Simple, readable functions** over classes unless classes provide clear benefits
- **Pure functions** for easy testing and composability
- **Explicit error handling** with proper TypeScript error types
- **Performance-first** - implement caching and batching patterns
- **Type-safe** - leverage TypeScript's type system fully

## Error Handling & Debugging

**Advanced Error Logging:**

- **Always use `advancedLog(response)` function** when API calls fail
- Provides comprehensive error context including:
  - Exact error codes (e.g., `0x80060888`)
  - Request URLs and parameters that caused the error
  - Dataverse-specific error annotations and trace text
  - Help links and operation status details

**Error Discovery Process:**

1. **When an API call fails**, use `advancedLog()` to capture full context
2. **Document the discovery** in `API-KNOWLEDGE.md` with test details
3. **Include error codes** and exact error messages in the knowledge base
4. **Develop workarounds** and update function implementations accordingly

**Common Debugging Workflow:**

```typescript
if (!response.ok) {
  await advancedLog(response, url, 'GET')
  // Error details automatically logged to console
  // Add findings to API-KNOWLEDGE.md
}
```

## Integration Testing

**Testing Philosophy:**

- **NEVER USE MOCKS** - always validate using real Dataverse API calls
- Use real metadata from actual Dataverse instances
- Test complete generation pipeline from metadata → TypeScript
- Validate generated types work correctly with actual data
- Do not call `setupDataverse` inside tests - it's done in setup
- **Document API discoveries** in API-KNOWLEDGE.md during testing

**Test Structure:**

- Integration tests in `../../integration/` directory
- Use existing monorepo test infrastructure and patterns
- Follow the authentication abstraction already established
- Test against real publisher/solution/table configurations
- **Failing tests are valuable** - they reveal API limitations to document

## File Organization

**Package Structure:**

```
packages/dataverse-type-gen/
├── src/
│   ├── auth/           # Authentication with MSAL
│   ├── client/         # Metadata API client
│   ├── processors/     # Metadata processing
│   ├── generators/     # Type generators
│   ├── codegen/        # Code generation
│   ├── cli/            # CLI interface
│   └── index.ts        # Public API
├── tests/              # Integration tests
├── index.md            # Quick reference
├── plans/              # Implementation plans
└── split-docs.sh       # Documentation utilities
```
