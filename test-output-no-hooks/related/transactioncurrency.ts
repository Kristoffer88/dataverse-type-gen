// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'

/**
 * CurrencyType
 * Used Transaction Currency entity
 * LogicalName: transactioncurrency_currencytype
 * Global: false
 * Custom: false
 */
export const TransactioncurrencyCurrencytype = {
    System: { Value: 0, Label: "System" },
    Custom: { Value: 1, Label: "Custom" }
} as const;

/** CurrencyType option values */
export type TransactioncurrencyCurrencytypeValue = (typeof TransactioncurrencyCurrencytype)[keyof typeof TransactioncurrencyCurrencytype]["Value"];

/**
 * Status
 * Status of the transaction currency.
 * LogicalName: transactioncurrency_statecode
 * Global: false
 * Custom: false
 */
export const TransactioncurrencyStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type TransactioncurrencyStatecodeValue = (typeof TransactioncurrencyStatecode)[keyof typeof TransactioncurrencyStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the transaction currency.
 * LogicalName: transactioncurrency_statuscode
 * Global: false
 * Custom: false
 */
export const TransactioncurrencyStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type TransactioncurrencyStatuscodeValue = (typeof TransactioncurrencyStatuscode)[keyof typeof TransactioncurrencyStatuscode]["Value"];


/**
 * Currency
 * Currency in which a financial transaction is carried out.
 * Entity: transactioncurrency
 * Schema: TransactionCurrency
 * Primary Key: transactioncurrencyid
 * Primary Name: currencyname
 */
export interface TransactionCurrency {
    /** Created By - Unique identifier of the user who created the transaction currency. */
    createdby?: string; // Lookup to: systemuser
    /** _createdby_value - Resolved lookup GUID value */
    _createdby_value?: string; // Lookup value
    /** Created On - Date and time when the transaction currency was created. */
    createdon?: Date | string;
    /** Created By (Delegate) - Unique identifier of the delegate user who created the transactioncurrency. */
    createdonbehalfby?: string; // Lookup to: systemuser
    /** _createdonbehalfby_value - Resolved lookup GUID value */
    _createdonbehalfby_value?: string; // Lookup value
    /** Currency Name - Name of the transaction currency. */
    currencyname: string;
    /** Currency Precision - Number of decimal places that can be used for currency. */
    currencyprecision: number;
    /** Currency Symbol - Symbol for the transaction currency. */
    currencysymbol: string;
    /** Currency Type - Currency type that can be used for new currency. */
    currencytype: TransactioncurrencyCurrencytypeValue; // Option set: transactioncurrency_currencytype
    /** Entity Image Id - For internal use only. */
    entityimageid?: string;
    /** Exchange Rate - Exchange rate between the transaction currency and the base currency. */
    exchangerate: number;
    /** Import Sequence Number - Unique identifier of the data import or data migration that created this record. */
    importsequencenumber?: number;
    /** Currency Code - ISO currency code for the transaction currency. */
    isocurrencycode: string;
    /** Modified By - Unique identifier of the user who last modified the transaction currency. */
    modifiedby?: string; // Lookup to: systemuser
    /** _modifiedby_value - Resolved lookup GUID value */
    _modifiedby_value?: string; // Lookup value
    /** Modified On - Date and time when the transaction currency was last modified. */
    modifiedon?: Date | string;
    /** Modified By (Delegate) - Unique identifier of the delegate user who last modified the transactioncurrency. */
    modifiedonbehalfby?: string; // Lookup to: systemuser
    /** _modifiedonbehalfby_value - Resolved lookup GUID value */
    _modifiedonbehalfby_value?: string; // Lookup value
    /** Organization - Unique identifier of the organization associated with the transaction currency. */
    organizationid: string; // Lookup to: organization
    /** _organizationid_value - Resolved lookup GUID value */
    _organizationid_value?: string; // Lookup value
    /** Record Created On - Date and time that the record was migrated. */
    overriddencreatedon?: Date | string;
    /** Status - Status of the transaction currency. */
    statecode: TransactioncurrencyStatecodeValue; // Option set: transactioncurrency_statecode
    /** Status Reason - Reason for the status of the transaction currency. */
    statuscode?: TransactioncurrencyStatuscodeValue; // Option set: transactioncurrency_statuscode
    /** Transaction Currency - Unique identifier of the transaction currency. */
    transactioncurrencyid: string;
    /** UniqueDscId - For internal use only. */
    uniquedscid?: string;
    /** Version Number - Version number of the transaction currency. */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Currency
 * Enables IntelliSense for $expand relationship names
 */
export type TransactionCurrencyExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OrganizationId"

/**
 * Type-safe expand options for Currency
 * Supports both array format and object format with nested options
 */
export type TransactionCurrencyExpand =
    | TransactionCurrencyExpandableProperties[]
    | {
        "createdby"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
        "createdonbehalfby"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
        "modifiedby"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
        "modifiedonbehalfby"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
    }

/**
 * Type-safe expand options for Currency
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for TransactionCurrency @odata.bind operations
 */
export type TransactionCurrencyBindings = {
    'OrganizationId@odata.bind'?: string; // Bind to: organization
};

/**
 * Type-safe helper functions for creating TransactionCurrency @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const TransactionCurrencyBindings = {
} as const;

export type TransactionCurrencyCreate = Partial<TransactionCurrency> & Partial<TransactionCurrencyBindings> & {
    currencyname: string; // Required for create
};

export type TransactionCurrencyUpdate = Partial<Omit<TransactionCurrency, 'transactioncurrencyid'>> & Partial<TransactionCurrencyBindings> & {
    transactioncurrencyid: string; // Required for update
};

/**
 * Runtime metadata for Currency
 * Provides entity schema information for API operations
 */
export const TransactionCurrencyMeta = {
    logicalName: "transactioncurrency",
    schemaName: "TransactionCurrency",
    displayName: "Currency",
    entitySetName: "transactioncurrencies",
    isCustomEntity: false,
    description: "Currency in which a financial transaction is carried out.",
    primaryKey: {
        logicalName: "transactioncurrencyid",
        attributeType: "Uniqueidentifier",
        displayName: "Transaction Currency"
    },
    primaryName: {
        logicalName: "currencyname",
        attributeType: "String",
        displayName: "Currency Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "organizationid"],
    requiredAttributes: ["currencyname", "currencyprecision", "currencysymbol", "currencytype", "exchangerate", "isocurrencycode", "organizationid", "statecode"],
    optionSets: ["transactioncurrency_currencytype", "transactioncurrency_statecode", "transactioncurrency_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OrganizationId", // Relationship
    ],
    relatedEntities: {
        "createdby": {
            relationshipName: "createdby",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
        "createdonbehalfby": {
            relationshipName: "createdonbehalfby",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
        "modifiedby": {
            relationshipName: "modifiedby",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
        "modifiedonbehalfby": {
            relationshipName: "modifiedonbehalfby",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
        "organizationid": {
            relationshipName: "organizationid",
            targetEntityLogicalName: "organization",
            targetEntitySetName: "organizations",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.986Z"
} as const;
