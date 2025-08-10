// Required imports
import type { PumKpiLookupValue } from '../global-choices/pum_kpi_lookup.js'
import type { PumLinktocalendaryearValue } from '../global-choices/pum_linktocalendaryear.js'
import type { PumPortfoliotypeValue } from '../global-choices/pum_portfoliotype.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Status
 * Status of the Portfolio
 * LogicalName: pum_portfolio_statecode
 * Global: false
 * Custom: true
 */
export const PumPortfolioStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumPortfolioStatecodeValue = (typeof PumPortfolioStatecode)[keyof typeof PumPortfolioStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Portfolio
 * LogicalName: pum_portfolio_statuscode
 * Global: false
 * Custom: true
 */
export const PumPortfolioStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumPortfolioStatuscodeValue = (typeof PumPortfolioStatuscode)[keyof typeof PumPortfolioStatuscode]["Value"];


/**
 * Portfolio
 * Entity: pum_portfolio
 * Schema: pum_Portfolio
 * Primary Key: pum_portfolioid
 * Primary Name: pum_portfolio
 */
export interface pum_Portfolio {
    /** Created By - Unique identifier of the user who created the record. */
    createdby?: string; // Lookup to: systemuser
    /** _createdby_value - Resolved lookup GUID value */
    _createdby_value?: string; // Lookup value
    /** Created On - Date and time when the record was created. */
    createdon?: Date | string;
    /** Created By (Delegate) - Unique identifier of the delegate user who created the record. */
    createdonbehalfby?: string; // Lookup to: systemuser
    /** _createdonbehalfby_value - Resolved lookup GUID value */
    _createdonbehalfby_value?: string; // Lookup value
    /** Exchange Rate - Exchange rate for the currency associated with the entity with respect to the base currency. */
    exchangerate?: number;
    /** Import Sequence Number - Sequence number of the import that created this record. */
    importsequencenumber?: number;
    /** AI Description */
    kra_aidescription?: string;
    /** Budget Limit */
    kra_budgetlimit?: number;
    /** Budget Limit (Base) - Value of the Budget Limit in base currency. */
    kra_budgetlimit_base?: number;
    /** Modified By - Unique identifier of the user who modified the record. */
    modifiedby?: string; // Lookup to: systemuser
    /** _modifiedby_value - Resolved lookup GUID value */
    _modifiedby_value?: string; // Lookup value
    /** Modified On - Date and time when the record was modified. */
    modifiedon?: Date | string;
    /** Modified By (Delegate) - Unique identifier of the delegate user who modified the record. */
    modifiedonbehalfby?: string; // Lookup to: systemuser
    /** _modifiedonbehalfby_value - Resolved lookup GUID value */
    _modifiedonbehalfby_value?: string; // Lookup value
    /** Record Created On - Date and time that the record was migrated. */
    overriddencreatedon?: Date | string;
    /** Owner - Owner Id */
    ownerid: string; // Lookup to: systemuser, team
    /** Owning Business Unit - Unique identifier for the business unit that owns the record */
    owningbusinessunit?: string; // Lookup to: businessunit
    /** _owningbusinessunit_value - Resolved lookup GUID value */
    _owningbusinessunit_value?: string; // Lookup value
    /** Owning Team - Unique identifier for the team that owns the record. */
    owningteam?: string; // Lookup to: team
    /** _owningteam_value - Resolved lookup GUID value */
    _owningteam_value?: string; // Lookup value
    /** Owning User - Unique identifier for the user that owns the record. */
    owninguser?: string; // Lookup to: systemuser
    /** _owninguser_value - Resolved lookup GUID value */
    _owninguser_value?: string; // Lookup value
    /** Description */
    pum_description?: string;
    /** KPI */
    pum_kpi?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** Link to Calendar Year */
    pum_linktocalendaryear?: PumLinktocalendaryearValue; // Option set: pum_linktocalendaryear
    /** # of Initiatives */
    pum_ofinitiatives?: number;
    /** # of Initiatives (Last Updated On) - Last Updated time of rollup field # of Initiatives. */
    pum_ofinitiatives_date?: Date | string;
    /** # of Initiatives (State) - State of rollup field # of Initiatives. */
    pum_ofinitiatives_state?: number;
    /** Portfolio - Required name field */
    pum_portfolio?: string;
    /** Portfolio - Unique identifier for entity instances */
    pum_portfolioid: string;
    /** Portfolio Type */
    pum_portfoliotype?: PumPortfoliotypeValue; // Option set: pum_portfoliotype
    /** Primary Objective */
    pum_primaryobjective?: string; // Lookup to: pum_strategicobjectives
    /** _pum_primaryobjective_value - Resolved lookup GUID value */
    _pum_primaryobjective_value?: string; // Lookup value
    /** Total Budget */
    pum_totalbudget?: number;
    /** Total Budget (Base) - Value of the Total Budget in base currency. */
    pum_totalbudget_base?: number;
    /** Status - Status of the Portfolio */
    statecode: PumPortfolioStatecodeValue; // Option set: pum_portfolio_statecode
    /** Status Reason - Reason for the status of the Portfolio */
    statuscode?: PumPortfolioStatuscodeValue; // Option set: pum_portfolio_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** Currency - Unique identifier of the currency associated with the entity. */
    transactioncurrencyid?: string; // Lookup to: transactioncurrency
    /** _transactioncurrencyid_value - Resolved lookup GUID value */
    _transactioncurrencyid_value?: string; // Lookup value
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Portfolio
 * Enables IntelliSense for $expand relationship names
 */
export type pum_PortfolioExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_PrimaryObjective"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Portfolio
 * Supports both array format and object format with nested options
 */
export type pum_PortfolioExpand =
    | pum_PortfolioExpandableProperties[]
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
        "owningbusinessunit"?: {
            $select?: (keyof BusinessUnit)[]
            $top?: number
            $skip?: number
            $expand?: BusinessUnitExpand
        }
        "owningteam"?: {
            $select?: (keyof Team)[]
            $top?: number
            $skip?: number
            $expand?: TeamExpand
        }
        "owninguser"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
        "transactioncurrencyid"?: {
            $select?: (keyof TransactionCurrency)[]
            $top?: number
            $skip?: number
            $expand?: TransactionCurrencyExpand
        }
    }

/**
 * Type-safe expand options for Portfolio
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_Portfolio @odata.bind operations
 */
export type pum_PortfolioBindings = {
    'pum_PrimaryObjective@odata.bind'?: string; // Bind to: pum_strategicobjectives
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating pum_Portfolio @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_PortfolioBindings = {
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type pum_PortfolioCreate = Partial<pum_Portfolio> & Partial<pum_PortfolioBindings> & {
    pum_portfolio: string; // Required for create
};

export type pum_PortfolioUpdate = Partial<Omit<pum_Portfolio, 'pum_portfolioid'>> & Partial<pum_PortfolioBindings> & {
    pum_portfolioid: string; // Required for update
};

/**
 * Runtime metadata for Portfolio
 * Provides entity schema information for API operations
 */
export const pum_PortfolioMeta = {
    logicalName: "pum_portfolio",
    schemaName: "pum_Portfolio",
    displayName: "Portfolio",
    entitySetName: "pum_portfolios",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_portfolioid",
        attributeType: "Uniqueidentifier",
        displayName: "Portfolio"
    },
    primaryName: {
        logicalName: "pum_portfolio",
        attributeType: "String",
        displayName: "Portfolio",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_primaryobjective", "transactioncurrencyid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_portfolio", "statecode"],
    optionSets: ["pum_kpi_lookup", "pum_linktocalendaryear", "pum_portfoliotype", "pum_portfolio_statecode", "pum_portfolio_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_PrimaryObjective", // Relationship
        "TransactionCurrencyId", // Relationship
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
        "owningbusinessunit": {
            relationshipName: "owningbusinessunit",
            targetEntityLogicalName: "businessunit",
            targetEntitySetName: "businessunits",
            relationshipType: "ManyToOne"
        },
        "owningteam": {
            relationshipName: "owningteam",
            targetEntityLogicalName: "team",
            targetEntitySetName: "teams",
            relationshipType: "ManyToOne"
        },
        "owninguser": {
            relationshipName: "owninguser",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
        "pum_primaryobjective": {
            relationshipName: "pum_primaryobjective",
            targetEntityLogicalName: "pum_strategicobjectives",
            targetEntitySetName: "pum_strategicobjectivess",
            relationshipType: "ManyToOne"
        },
        "transactioncurrencyid": {
            relationshipName: "transactioncurrencyid",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.962Z"
} as const;
