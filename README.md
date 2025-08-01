# Dataverse Type Generator

Generate TypeScript types from Microsoft Dataverse metadata.

> **⚠️ CAUTION: AI-Generated Code**
> 
> This project was developed using AI assistance (Claude Code). Users should evaluate the code thoroughly before production use.

## Features

- CLI for automated type generation
- Generate types by entities, publisher, or solution
- TypeScript interfaces and choice value enums
- Azure Identity integration for authentication
- Optional React Query hooks and query builders

## Quick Start

### Basic Usage

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

## CLI Options

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

### Configuration

```bash
# Custom output directory and file extension
npx dataverse-type-gen generate --entities account --output-dir ./src/types --file-extension .d.ts

# Configuration file support
npx dataverse-type-gen generate --config ./dataverse.config.json

# Filter out auxiliary attributes for cleaner interfaces
npx dataverse-type-gen generate --entities account --exclude-auxiliary-attributes

# Generate with nested expand support for complex relationships
npx dataverse-type-gen generate --entities account --generate-related-entities --nested-expand
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

### Query Builders with Type-Safe Filtering

**Query Building**: The generator creates query builders with type-safe OData filtering for URL construction:

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

Query Builder Benefits:

- Generated code is visible and modifiable
- No abstraction layer to troubleshoot
- Edit generated functions for specific needs
- TypeScript support with entity-specific types
- Each entity has its own query logic

**Migration from DataverseUrls:**

```typescript
// ❌ Old approach (abstract, hard to debug)
import { DataverseUrls } from 'dataverse-type-gen'
const url = DataverseUrls.entitySet(metadata, options)

// ✅ New approach (transparent, modifiable)
import { AccountQueries } from './generated/queries/account.queries'
const url = AccountQueries.buildListUrl(options)
```

## Additional Features

### Auxiliary Attribute Filtering  

Clean up generated interfaces by filtering out auxiliary attributes:

```bash
# Generate cleaner interfaces without auxiliary attributes
npx dataverse-type-gen generate --entities account --exclude-auxiliary-attributes
```

**Before filtering:**
```typescript
export interface Account {
  accountid?: string
  name?: string
  createdbyname?: string        // Auxiliary attribute
  createdbyyominame?: string    // Auxiliary attribute  
  modifiedbyname?: string       // Auxiliary attribute
  // ... 50+ more auxiliary attributes
}
```

**After filtering:**
```typescript
export interface Account {
  accountid?: string
  name?: string
  createdby?: string           // Primary lookup attribute
  modifiedby?: string          // Primary lookup attribute
  // ... only essential attributes
}
```

### Type-Safe Expand Support

Fully type-safe expand with IntelliSense and compile-time validation:

```typescript
// ✅ Type-safe expand with field selection and filtering
const ganttTasks = await fetch(pum_GanttTaskQueries.buildListUrl({
  $expand: {
    pum_initiative: {
      $select: ['pum_name', 'pum_description'], // ✅ IntelliSense for Initiative fields
      $filter: { statecode: 0 }, // ✅ Type-safe filtering on Initiative
      $orderby: { createdon: 'desc' }, // ✅ Type-safe ordering
      $top: 5
    }
  }
}))

// ❌ TypeScript will catch invalid field names:
// $select: ['invalid_field'] // Error: not assignable to keyof pum_Initiative
```

## CLI Usage

### Basic Commands

```bash
# Generate types for specific entities
npx dataverse-type-gen generate --entities account,contact,opportunity

# Generate types by publisher prefix
npx dataverse-type-gen generate --publisher your_prefix

# Generate types from a solution
npx dataverse-type-gen generate --solution "My Solution"

# Initialize configuration file
npx dataverse-type-gen init

# Validate setup
npx dataverse-type-gen validate

# Preview without creating files
npx dataverse-type-gen generate --entities account --dry-run
```

For complete options and help:
```bash
npx dataverse-type-gen --help
npx dataverse-type-gen generate --help
npx dataverse-type-gen init --help
npx dataverse-type-gen validate --help
```

## Configuration

### Configuration File (dataverse.config.json)

```json
{
  "dataverseUrl": "https://yourorg.crm.dynamics.com",
  "outputDir": "./generated",
  "fileExtension": ".ts",
  "entities": ["account", "contact", "opportunity"],
  "publisher": "your_prefix",
  "solution": "Your Solution Name",
  "fullMetadata": false,
  "typeGeneration": {
    "includeComments": true,
    "useExactTypes": true,
    "generateHooks": false
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


## License

MIT License - see LICENSE file for details.