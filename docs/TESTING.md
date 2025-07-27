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
dataverse-type-gen/
├── src/
│   ├── *.test.ts                # Unit tests alongside source code
│   └── error-logger.ts          # Advanced error logging utilities
├── tests/
│   ├── integration/
│   │   ├── api.test.ts          # Real Dataverse API tests
│   │   ├── metadata.test.ts     # Metadata processing tests
│   │   ├── generation-e2e.test.ts # End-to-end generation tests
│   │   └── optionset-debug.test.ts # OptionSet debugging tests
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
export DATAVERSE_INSTANCE="https://yourorg.crm.dynamics.com"
```

### Authentication

This project uses **Azure Identity** for authentication, which automatically handles multiple credential types:

1. **Azure CLI** (recommended for development):
   ```bash
   az login
   ```

2. **Managed Identity** (automatic in Azure environments)
3. **Environment Variables** (for service principals):
   ```bash
   export AZURE_CLIENT_ID="your-app-registration-id"
   export AZURE_CLIENT_SECRET="your-client-secret"
   export AZURE_TENANT_ID="your-tenant-id"
   ```
4. **Visual Studio/VS Code** integrated authentication

### Test Configuration

Integration tests use real authentication and API calls. No mocking is used to ensure tests reflect actual behavior.

## Test Utilities

### Error Logging and Debugging

The project includes advanced error logging utilities:

```typescript
import { advancedLog } from '../src/error-logger.js'

// Log detailed API error information
if (!response.ok) {
  await advancedLog(response, url, 'GET')
}
```

This provides:
- Exact error codes (e.g., `0x80060888`)
- Request URLs and parameters that caused errors
- Dataverse-specific error annotations and trace text
- Help links and operation status details

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
2. **Check Environment**: Ensure `DATAVERSE_INSTANCE` environment variable is set
3. **Authentication**: Ensure you're logged in with Azure CLI (`az login`)
4. **Network Issues**: Verify Dataverse instance is accessible
5. **Permissions**: Check that your user has read permissions on Dataverse metadata
6. **API Limitations**: Check `API-KNOWLEDGE.md` for known API limitations and workarounds

## Best Practices

- Write tests that fail when the behavior changes
- Use descriptive test names that explain what is being tested
- Keep tests simple and focused on one thing
- Use real API calls in integration tests
- Document any special test setup requirements