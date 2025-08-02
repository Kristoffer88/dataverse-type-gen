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


## Additional Features


### Type-Safe Expand Support

Query builders support type-safe expand operations with IntelliSense and compile-time validation for related entities.


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