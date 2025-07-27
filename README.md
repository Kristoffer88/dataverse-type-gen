# Dataverse Type Generator

Generate TypeScript types from Microsoft Dataverse metadata with enterprise-grade CLI and programmatic API.

## Features

- 🚀 **Enterprise CLI**: Modern command-line interface with 2025 best practices
- 🔄 **Live Metadata**: Uses Dataverse Web API endpoints with real-time data
- 🎯 **Flexible Filtering**: Generate types by entities, publisher, or solution
- 📝 **Complete Types**: Interfaces, enums, create/update types, and metadata
- ⚡ **Optimized**: Efficient metadata processing with caching
- 🔒 **Secure**: Azure Identity integration with token caching
- 🛠️ **Developer-Friendly**: Dry-run, debug modes, and JSON output

## Quick Start

### Installation

```bash
npm install @pcf-vibe/dataverse-type-gen
# or
pnpm add @pcf-vibe/dataverse-type-gen
```

### Basic Usage

**CLI (Recommended):**

```bash
# Initialize configuration
npx dataverse-type-gen init

# Generate types for specific entities
npx dataverse-type-gen generate --entities account,contact,opportunity

# Generate types for all entities from a publisher  
npx dataverse-type-gen generate --publisher your_prefix

# Generate types from a solution
npx dataverse-type-gen generate --solution "My Solution"

# Preview without creating files
npx dataverse-type-gen generate --entities account --dry-run
```

**Programmatic API:**

```typescript
import { generateMultipleEntityTypes } from '@pcf-vibe/dataverse-type-gen'

// Generate types for specific entities
const result = await generateMultipleEntityTypes(processedEntities, {
  outputDir: './types',
  fileExtension: '.ts',
  typeGenerationOptions: {
    includeComments: true,
    includeMetadata: true,
    includeValidation: true
  }
})
```

### Environment Setup

Set your Dataverse instance URL:

```bash
export VITE_DATAVERSE_INSTANCE="https://yourorg.crm.dynamics.com"
```

Or specify via CLI:
```bash
npx dataverse-type-gen generate --dataverse-url https://yourorg.crm.dynamics.com --entities account
```

## Modern CLI Features

### 🎯 Production-Ready Options

```bash
# Dry-run mode - preview without creating files
npx dataverse-type-gen generate --entities account --dry-run

# Quiet mode - suppress output for automation
npx dataverse-type-gen generate --publisher pum --quiet

# Debug mode - detailed logging for troubleshooting
npx dataverse-type-gen generate --entities account --debug

# JSON output - structured data for CI/CD
npx dataverse-type-gen generate --entities account --output-format json
```

### 🚦 Visual Progress & Feedback

- **Progress bars**: Visual progress with Unicode block characters
- **Smart logging**: Contextual messages with actionable error hints
- **Statistics**: Detailed generation reports with file counts and sizes
- **Input validation**: Early error detection with helpful suggestions

### ⚙️ Advanced Configuration

```bash
# Custom output directory and file extension
npx dataverse-type-gen generate --entities account --output-dir ./src/types --file-extension .d.ts

# Configuration file support
npx dataverse-type-gen generate --config ./dataverse.config.json

# Disable specific features
npx dataverse-type-gen generate --entities account --no-comments --no-metadata
```

## Generated Types

### Entity Interfaces

```typescript
// Generated from account entity
export interface Account {
  accountid?: string
  name?: string
  telephone1?: string
  accountcategorycode?: AccountCategoryCode
  // ... all attributes with proper TypeScript types
}

export interface AccountCreate {
  name: string
  telephone1?: string
  // ... required vs optional fields for creation
}

export interface AccountUpdate {
  accountid: string
  name?: string
  // ... all fields optional except ID for updates
}
```

### Choice/Option Set Enums

```typescript
export const AccountCategoryCode = {
  PreferredCustomer: { Value: 1, Label: "Preferred Customer" },
  Standard: { Value: 2, Label: "Standard" },
  // ... all choice values with labels
} as const

export type AccountCategoryCode = (typeof AccountCategoryCode)[keyof typeof AccountCategoryCode]["Value"]
```

### Metadata Objects

```typescript
export const AccountMetadata = {
  logicalName: 'account',
  schemaName: 'Account',
  primaryIdAttribute: 'accountid',
  primaryNameAttribute: 'name',
  attributes: {
    accountid: { type: 'Uniqueidentifier', required: false },
    name: { type: 'String', required: true, maxLength: 160 },
    // ... complete attribute metadata
  }
} as const
```

## CLI Commands

### `generate` - Generate TypeScript Types

```bash
dataverse-type-gen generate [options]

Filtering Options:
  -e, --entities <entities>     Comma-separated entity logical names
  -p, --publisher <prefix>      Publisher prefix to filter entities  
  -s, --solution <name>         Solution name to filter entities

Output Options:
  -o, --output-dir <dir>        Output directory (default: ./generated)
  --file-extension <ext>        File extension (.ts or .d.ts)
  --no-comments                 Exclude comments from generated code
  --no-metadata                 Exclude metadata objects
  --no-validation               Exclude validation functions
  --no-overwrite                Do not overwrite existing files

Connection Options:
  --dataverse-url <url>         Dataverse instance URL
  -c, --config <path>           Configuration file path

Control Options:
  --dry-run                     Preview what would be generated
  -q, --quiet                   Suppress non-error output
  --debug                       Enable debug mode with detailed logging
  -v, --verbose                 Verbose output
  --output-format <format>      Output format: text or json

Examples:
  dataverse-type-gen generate --entities account,contact,opportunity
  dataverse-type-gen generate --publisher your_prefix --dry-run
  dataverse-type-gen generate --solution MySolution --quiet
  dataverse-type-gen generate --entities account --debug --output-format json
```

### `init` - Initialize Configuration

```bash
dataverse-type-gen init [options]

Options:
  -o, --output-dir <dir>        Output directory (default: ./generated)
  -c, --config <path>           Configuration file path
  -v, --verbose                 Verbose output

Creates:
  - dataverse.config.json       Configuration file with defaults
  - ./generated/.gitignore      Ignore generated files in git
```

### `validate` - Validate Setup

```bash
dataverse-type-gen validate [options]

Options:
  -c, --config <path>           Configuration file path
  -v, --verbose                 Verbose output
  --debug                       Enable debug mode
  --output-format <format>      Output format: text or json

Validates:
  - Environment variables
  - Dataverse connection
  - Authentication
  - Configuration file
```

### `info` - System Information

```bash
dataverse-type-gen info

Shows:
  - Environment variables
  - Current directory
  - Node.js version
  - Package information
```

## Configuration

### Configuration File (dataverse.config.json)

```json
{
  "outputDir": "./generated",
  "fileExtension": ".ts",
  "includeComments": true,
  "includeMetadata": true,
  "includeValidation": true,
  "entities": [
    "account",
    "contact",
    "opportunity"
  ],
  "publisher": "your_prefix",
  "solution": "Your Solution Name",
  "typeGenerationOptions": {
    "useExactTypes": true
  }
}
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_DATAVERSE_INSTANCE` | Dataverse instance URL | `https://yourorg.crm.dynamics.com` |
| `DATAVERSE_INSTANCE` | Alternative instance URL | `https://yourorg.crm.dynamics.com` |

## Authentication

This package uses **Azure Identity** for secure authentication with multiple credential providers:

### Supported Authentication Methods

1. **Azure CLI** - `az login` (recommended for development)
2. **Managed Identity** - Automatic in Azure environments
3. **Environment Variables** - `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, `AZURE_TENANT_ID`
4. **Visual Studio/VS Code** - Integrated Azure extensions

### Required Permissions

Your Azure AD app registration needs:
- **API Permissions**: `Dynamics CRM` → `user_impersonation`
- **Dataverse User**: System user with read permissions on metadata

### Token Caching

Authentication tokens are automatically cached:
- **In-memory**: For the current session
- **Disk cache**: `~/.dataverse-type-gen/token-cache.json`
- **Automatic refresh**: Handles token expiry transparently

## Error Handling & Troubleshooting

### Common Issues

**Connection Failed:**
```bash
# Test your connection
npx dataverse-type-gen validate --debug

# Check authentication
az login
az account show
```

**Invalid Entity Names:**
```bash
# Use valid Dataverse logical names (lowercase, underscore separated)
npx dataverse-type-gen generate --entities account --debug
```

**Permission Errors:**
```bash
# Check output directory permissions
npx dataverse-type-gen generate --entities account --debug
```

### Debug Mode

Enable comprehensive logging:
```bash
npx dataverse-type-gen generate --entities account --debug
```

Provides:
- Configuration details
- API request/response logging
- Token acquisition details  
- Detailed error context with actionable hints

## Development

### Build Commands

```bash
# Install dependencies
pnpm install

# Build package
pnpm build

# Run tests
pnpm test

# Quality checks (lint + types + tests)
pnpm quality

# Full CI pipeline
pnpm ci
```

### Testing

```bash
# Run integration tests (requires Dataverse connection)
pnpm test

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

**Note**: Tests use real Dataverse API calls, not mocks, ensuring reliable validation.

## Architecture

### Core Components

- **CLI** (`src/cli/`): Commander.js-based interface with modern UX
- **Authentication** (`src/auth/`): Azure Identity integration with caching
- **Client** (`src/client/`): Optimized Dataverse Web API calls
- **Processors** (`src/processors/`): Transform raw metadata to structured data
- **Generators** (`src/generators/`): Create TypeScript code from processed metadata
- **Code Generation** (`src/codegen/`): File system operations with formatting

### Performance Features

- **Request Caching**: Avoids duplicate API calls
- **Batch Processing**: Efficient handling of multiple entities
- **Token Caching**: Reduces authentication overhead
- **Selective Properties**: OData filtering for minimal data transfer
- **Retry Logic**: Handles transient network failures

## API Limitations & Workarounds

This package includes comprehensive handling for Dataverse API limitations:

- **EntityDefinitions**: No `$top`/`$skip` pagination support
- **String Functions**: `startswith()` not supported on EntityDefinitions
- **Client-side Filtering**: Used where server-side filtering unavailable
- **Error Code Mapping**: Detailed error handling with actionable hints

See `API-KNOWLEDGE.md` for complete documentation of discovered limitations.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes with tests
4. Run quality checks: `pnpm quality`
5. Submit a pull request

### Code Standards

- **TypeScript**: Strict mode with comprehensive types
- **Testing**: Integration tests with real Dataverse API
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Consistent code style
- **Documentation**: Complete API documentation

## License

ISC License - see LICENSE file for details.

---

## Examples

### Basic Entity Generation

```bash
# Generate types for CRM entities
npx dataverse-type-gen generate --entities account,contact,lead,opportunity

# Generate types for custom entities only
npx dataverse-type-gen generate --publisher your_prefix
```

### Advanced Workflows

```bash
# Development workflow with preview
npx dataverse-type-gen generate --entities account --dry-run --debug

# Production deployment with automation
npx dataverse-type-gen generate --solution "Production Solution" --quiet --output-format json

# Custom output configuration
npx dataverse-type-gen generate --entities account --output-dir ./src/types --file-extension .d.ts --no-validation
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Generate Dataverse Types
  run: |
    npx dataverse-type-gen generate \
      --solution "My Solution" \
      --output-format json \
      --quiet \
      > type-generation-report.json
  env:
    VITE_DATAVERSE_INSTANCE: ${{ secrets.DATAVERSE_INSTANCE }}
```

**Built with modern CLI best practices for 2025** 🚀