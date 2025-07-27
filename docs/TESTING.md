# Testing Guide

This guide covers the testing infrastructure for the Dataverse Type Generator.

## Table of Contents

- [Overview](#overview)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Integration Testing](#integration-testing)
- [Test Utilities](#test-utilities)

## Overview

The testing infrastructure provides:

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test against real Dataverse API endpoints
- **Test Utilities**: Simple mock data generation for testing

## Test Structure

```
packages/dataverse-type-gen/
├── src/
│   ├── test-utils.ts            # Simple mock data utilities
│   └── testing/
│       └── index.ts             # Basic testing helpers
├── tests/
│   ├── integration/
│   │   ├── api.test.ts          # Real Dataverse API tests
│   │   ├── metadata.test.ts     # Metadata processing tests
│   │   └── generation-e2e.test.ts # End-to-end generation tests
│   └── setup-integration.ts     # Test setup and configuration
```

## Running Tests

### All Tests
```bash
pnpm test
```

### Integration Tests Only
```bash
pnpm test tests/integration
```

### With Coverage
```bash
pnpm test:coverage
```

## Integration Testing

Integration tests run against real Dataverse API endpoints to ensure:

- Metadata fetching works correctly
- Type generation produces valid TypeScript
- Authentication flows properly
- Error handling works as expected

### Prerequisites

Set required environment variables:

```bash
export VITE_DATAVERSE_INSTANCE="https://yourorg.crm.dynamics.com"
export VITE_AZURE_CLIENT_ID="your-app-registration-id"
export VITE_AZURE_TENANT_ID="your-tenant-id"
```

### Test Configuration

Integration tests use real authentication and API calls. No mocking is used to ensure tests reflect actual behavior.

## Test Utilities

### Mock Data Generation

Simple utilities for creating test data:

```typescript
import { createMockData } from '../src/testing/index.js'
import { createMockEntityMetadata } from '../src/test-utils.js'

// Create mock entity metadata
const mockEntity = createMockEntityMetadata('account')

// Generate simple test data
const testData = createMockData(processedEntity, 5)
```

### Basic Helpers

```typescript
// Generate simple GUID for testing
function generateGuid(): string

// Create mock attribute metadata
function createMockAttributeMetadata(name: string, type: string): unknown
```

## Development Workflows

### Adding New Tests

1. **Unit Tests**: Add to `src/` alongside the code being tested
2. **Integration Tests**: Add to `tests/integration/` 
3. **Test Real Behavior**: Always test against actual Dataverse API when possible

### Test Philosophy

- **Real API Calls**: Integration tests use real Dataverse endpoints
- **Simple Mocks**: Only use basic mocks for unit tests when necessary
- **End-to-End**: Test the complete workflow from metadata to generated types

### Debugging Tests

1. **Enable Verbose Logging**: Use `--verbose` flag with test runner
2. **Check Environment**: Ensure all required environment variables are set
3. **Network Issues**: Verify Dataverse instance is accessible
4. **Authentication**: Check Azure app registration permissions

## Best Practices

- Write tests that fail when the behavior changes
- Use descriptive test names that explain what is being tested
- Keep tests simple and focused on one thing
- Use real API calls in integration tests
- Document any special test setup requirements