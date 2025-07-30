# Dataverse Type Generator

Generate TypeScript types from Microsoft Dataverse metadata with enterprise-grade CLI and programmatic API.

> **⚠️ CAUTION: AI-Generated Code**
> 
> This project was developed using AI assistance (Claude Code). Users should evaluate the code thoroughly before production use.

## Features

- 🚀 **Enterprise CLI**: Modern command-line interface with 2025 best practices
- 🔄 **Live Metadata**: Uses Dataverse Web API endpoints with real-time data
- 🎯 **Flexible Filtering**: Generate types by entities, publisher, or solution
- 📝 **Complete Types**: Interfaces, enums, create/update types, and metadata
- ⚡ **Optimized**: Efficient metadata processing with caching
- 🔒 **Secure**: Azure Identity integration with token caching
- 🛠️ **Developer-Friendly**: Dry-run, debug modes, and JSON output

## Quick Start

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

### Installation

```bash
npm install dataverse-type-gen
# or
pnpm add dataverse-type-gen
```

**Programmatic API:**

```typescript
import { generateMultipleEntityTypes } from 'dataverse-type-gen'

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
export DATAVERSE_INSTANCE="https://yourorg.crm.dynamics.com"
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

### Lookup Properties & Bindings

Generates lookup properties (`_xx_value`) and type-safe `@odata.bind` helpers:

```typescript
export interface Account {
  primarycontactid?: string
  _primarycontactid_value?: string; // Lookup property - GUID value
}

export type AccountBindings = {
  'PrimaryContactId@odata.bind'?: string; // Bind to: contact
};

export const AccountBindings = {
  primarycontactid: (id: string) => ({ 'PrimaryContactId@odata.bind': `/contacts(${id})` })
};
```

### React Query Hooks

When `generateHooks: true` is enabled, the generator creates type-safe React Query hooks:

```typescript
import { useAccountList, useAccount } from './generated'

// List accounts with type-safe filtering
const { data: accounts } = useAccountList({
  $select: ['name', 'telephone1'], // ✅ IntelliSense support
  $filter: { name: { $contains: 'contoso' } },
  $top: 10
})

// Get single account
const { data: account } = useAccount(accountId, {
  $select: ['name', 'primarycontactid']
})
```

### Query Builders (Recommended)

**🎯 New Approach**: The generator now creates transparent, modifiable query builders alongside hooks. This gives you full control and visibility over URL construction:

```typescript
import { AccountQueries } from './generated/queries/account.queries'

// Build URLs with full transparency - you can see exactly what's generated
const listUrl = AccountQueries.buildListUrl({
  $filter: { name: { $contains: 'contoso' } },
  $select: ['name', 'telephone1'],
  $orderby: { name: 'asc' },
  $top: 10
})
// Result: /api/data/v9.2/accounts?$filter=contains(name,'contoso')&$select=name,telephone1&$orderby=name asc&$top=10

const singleUrl = AccountQueries.buildEntityUrl(accountId, {
  $select: ['name', 'primarycontactid']
})

const countUrl = AccountQueries.buildCountUrl({
  $filter: { statecode: 0 }
})
```

**Why Query Builders are Better:**

- ✅ **Transparent**: You can see and modify the generated code
- ✅ **Debuggable**: No abstraction layer to troubleshoot through
- ✅ **Customizable**: Edit the generated functions for specific needs
- ✅ **Type-safe**: Full TypeScript support with entity-specific types
- ✅ **Self-contained**: Each entity has its own complete query logic

**Migration from DataverseUrls:**

```typescript
// ❌ Old approach (abstract, hard to debug)
import { DataverseUrls } from 'dataverse-type-gen'
const url = DataverseUrls.entitySet(metadata, options)

// ✅ New approach (transparent, modifiable)
import { AccountQueries } from './generated/queries/account.queries'
const url = AccountQueries.buildListUrl(options)
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
| `DATAVERSE_INSTANCE` | Dataverse instance URL | `https://yourorg.crm.dynamics.com` |

## Authentication

This package uses **Azure Identity** for secure authentication with multiple credential providers:

### Supported Authentication Methods

1. **Azure CLI** - `az login` (recommended for development)
2. **Managed Identity** - Automatic in Azure environments
3. **Environment Variables** - `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, `AZURE_TENANT_ID`
4. **Visual Studio/VS Code** - Integrated Azure extensions

### Required Permissions

- **Dataverse User**: App user with read permissions on metadata

### Token Caching

Authentication tokens are handled by the Azure Identity SDK:
- **Secure storage**: Azure CLI/SDK manages token caching securely
- **Automatic refresh**: Handles token expiry transparently

## License

MIT License - see LICENSE file for details.