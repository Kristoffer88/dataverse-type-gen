# Plan: Implement Auxiliary Attribute Filtering Using AttributeOf

## Overview
Filter out auxiliary attributes during type generation using the `AttributeOf` field to create cleaner, more focused TypeScript interfaces that only include primary business attributes.

## Research Findings

### AttributeOf Field - Detailed Understanding

**Core Concept:**
- **Primary Purpose**: Distinguishes between actual stored database columns (`AttributeOf: null`) and system-generated auxiliary/calculated attributes (`AttributeOf: <reference_field>`)
- **Common Examples**: 
  - `createdbyname` has `AttributeOf: "createdby"` 
  - `modifiedbyname` has `AttributeOf: "modifiedby"`
  - Custom lookup name fields follow pattern `<lookup_field>name` with `AttributeOf: "<lookup_field>"`

**Technical Implementation:**
- Query pattern: `$expand=Attributes($select=LogicalName,AttributeOf)` 
- Filtering logic: Exclude attributes where `AttributeOf !== null`
- Performance benefit: Reduces metadata payload and processing overhead

### System-Generated Auxiliary Attributes

**Lookup Field Conventions:**
- **GUID Fields**: Primary lookup attributes store GUID references
- **Name Fields**: Auxiliary attributes with `_name` suffix store display names
- **Navigation Properties**: Use patterns like `xxxx_InternalContactId` for related entity access
- **Read-Only Nature**: Have `IsValidForCreate` and `IsValidForUpdate` set to `false`

**Formula/Calculated Columns:**
- **Modern Approach**: Power FX formula columns (virtual, computed server-side)
- **Legacy Approach**: Traditional calculated columns with limited capabilities
- **Virtual Nature**: Don't store data, compute values dynamically
- **Relationship Spanning**: Limited to two-table relationships maximum

### TypeScript Generation Best Practices

**Industry Patterns:**
- **OData Generators**: SAP Cloud SDK, Microsoft Connected Service provide attribute filtering
- **System Field Exclusion**: Common practice to exclude `CreatedBy`, `ModifiedBy`, timestamps
- **Configuration-Driven**: Allow opt-in/opt-out for different attribute categories
- **Type Safety**: Maintain clean client models while preserving backend functionality

### Current Issue Analysis
- **Generator includes ALL attributes**: Making interfaces cluttered with system-generated auxiliary attributes
- **User feedback**: Filtering by `AttributeOf` will remove "trivial" attributes and improve type clarity
- **Performance impact**: Large metadata payloads slow down generation and increase memory usage

## Implementation Plan

### 1. Update AttributeMetadata Types
- Add `AttributeOf` field to `AttributeMetadata` interface in `src/types.ts`
- Add `AttributeOf` field to `ProcessedAttributeMetadata` interface in `src/processors/index.ts`

### 2. Update Metadata Fetching
- Modify `src/generator.ts` to include `AttributeOf` in the `$select` parameter when fetching attribute metadata
- Consider enhanced query: `$select=LogicalName,AttributeOf,IsValidForCreate,IsValidForUpdate` for comprehensive filtering
- Ensure the field is properly extracted during metadata processing

### 3. Add Filtering Logic
- Create filtering function in `src/processors/index.ts`: `filterAuxiliaryAttributes()`
- Add configuration option to control filtering behavior (enabled by default)
- Update `processAttributeMetadata()` to capture the `AttributeOf` field
- Consider combining `AttributeOf` filtering with `IsValidForCreate/Update` checks for comprehensive system field exclusion

### 4. Update Generator Logic
- Modify `generateEntityTypeScript()` in `src/generator.ts` to apply auxiliary attribute filtering
- Add filtering step before processing detailed attribute metadata
- Ensure filtered attributes are excluded from type generation

### 5. Add Configuration Support
- Add `excludeAuxiliaryAttributes` option to `GenerateEntityTypeOptions` interface
- Default to `true` (filter out auxiliary attributes)
- Allow users to opt-in to include auxiliary attributes if needed

### 6. Update Documentation
- Add explanation of auxiliary attribute filtering to configuration docs
- Document the new option and its impact on generated types

## Expected Benefits
- **Cleaner interfaces**: Remove system-generated auxiliary attributes
- **Better developer experience**: Focus on business-relevant attributes
- **Configurable**: Users can opt-in to include auxiliary attributes if needed
- **Backward compatible**: Existing functionality preserved with opt-out option
- **Performance improvement**: Reduced metadata payload and processing overhead
- **Industry alignment**: Follows established patterns from OData generators and TypeScript tooling

## Additional Implementation Considerations

### Performance Optimization
- Use `$select=LogicalName,AttributeOf,IsValidForCreate,IsValidForUpdate` for comprehensive filtering
- Implement caching for metadata responses to reduce API calls
- Consider batch processing for large entity sets

### Enhanced Filtering Logic
- Combine `AttributeOf` filtering with `IsValidForCreate/Update` checks
- Filter formula columns separately if needed
- Preserve relationship navigation properties for type generation

### Validation Against Industry Standards
This approach aligns with established TypeScript generation tools:
- SAP Cloud SDK's OData generator provides similar attribute filtering
- Microsoft Connected Service excludes system fields by default
- Common practice to exclude `CreatedBy`, `ModifiedBy`, timestamps in client models