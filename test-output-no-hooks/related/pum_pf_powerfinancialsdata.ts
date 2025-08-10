// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_pf_costplan_version } from './pum_pf_costplan_version.js'
import type { pum_pf_costplan_versionExpand } from './pum_pf_costplan_version.js'
import type { pum_pf_costspecification } from './pum_pf_costspecification.js'
import type { pum_pf_costspecificationExpand } from './pum_pf_costspecification.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { pum_Program } from './pum_program.js'
import type { pum_ProgramExpand } from './pum_program.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Status
 * Status of the Power Financials Data
 * LogicalName: pum_pf_powerfinancialsdata_statecode
 * Global: false
 * Custom: true
 */
export const PumPfPowerfinancialsdataStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumPfPowerfinancialsdataStatecodeValue = (typeof PumPfPowerfinancialsdataStatecode)[keyof typeof PumPfPowerfinancialsdataStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Power Financials Data
 * LogicalName: pum_pf_powerfinancialsdata_statuscode
 * Global: false
 * Custom: true
 */
export const PumPfPowerfinancialsdataStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumPfPowerfinancialsdataStatuscodeValue = (typeof PumPfPowerfinancialsdataStatuscode)[keyof typeof PumPfPowerfinancialsdataStatuscode]["Value"];


/**
 * Power Financials Data
 * Entity: pum_pf_powerfinancialsdata
 * Schema: pum_pf_powerfinancialsdata
 * Primary Key: pum_pf_powerfinancialsdataid
 * Primary Name: pum_pf_powerfinancialsdata_name
 */
export interface pum_pf_powerfinancialsdata {
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
    /** Amount */
    pum_amount?: number;
    /** Custom Cost Hierarchy */
    pum_customcosthierarchy?: string; // Lookup to: pum_customcosthierarchy
    /** _pum_customcosthierarchy_value - Resolved lookup GUID value */
    _pum_customcosthierarchy_value?: string; // Lookup value
    /** Financial Structure */
    pum_financialstructure?: string; // Lookup to: pum_financialstructure
    /** _pum_financialstructure_value - Resolved lookup GUID value */
    _pum_financialstructure_value?: string; // Lookup value
    /** Cost Area */
    pum_pf_costarea?: string; // Lookup to: pum_pf_costarea
    /** _pum_pf_costarea_value - Resolved lookup GUID value */
    _pum_pf_costarea_value?: string; // Lookup value
    /** Cost Area Definition */
    pum_pf_costareadef?: number;
    /** Cost Category */
    pum_pf_costcategory?: string; // Lookup to: pum_pf_costcategory
    /** _pum_pf_costcategory_value - Resolved lookup GUID value */
    _pum_pf_costcategory_value?: string; // Lookup value
    /** Cost Category Definition */
    pum_pf_costcategorydef?: number;
    /** Cost level mapping */
    pum_pf_costlevelmapping_customcolumns?: string;
    /** Cost Plan Version */
    pum_pf_costplan_version?: string; // Lookup to: pum_pf_costplan_version
    /** _pum_pf_costplan_version_value - Resolved lookup GUID value */
    _pum_pf_costplan_version_value?: string; // Lookup value
    /** Cost Specification */
    pum_pf_costspecification?: string; // Lookup to: pum_pf_costspecification
    /** _pum_pf_costspecification_value - Resolved lookup GUID value */
    _pum_pf_costspecification_value?: string; // Lookup value
    /** Cost Specification Def */
    pum_pf_costspecificationdef?: number;
    /** Cost Type */
    pum_pf_costtype?: string; // Lookup to: pum_pf_costtype
    /** _pum_pf_costtype_value - Resolved lookup GUID value */
    _pum_pf_costtype_value?: string; // Lookup value
    /** Cost Type Definition */
    pum_pf_costtypedef?: number;
    /** Initiative */
    pum_pf_initiative?: string; // Lookup to: pum_initiative
    /** _pum_pf_initiative_value - Resolved lookup GUID value */
    _pum_pf_initiative_value?: string; // Lookup value
    /** Month */
    pum_pf_month?: number;
    /** Name - Required name field */
    pum_pf_powerfinancialsdata_name?: string;
    /** Power Financials Data - Unique identifier for entity instances */
    pum_pf_powerfinancialsdataid: string;
    /** Program */
    pum_pf_program?: string; // Lookup to: pum_program
    /** _pum_pf_program_value - Resolved lookup GUID value */
    _pum_pf_program_value?: string; // Lookup value
    /** Value */
    pum_pf_value?: number;
    /** Value (Base) - Value of the Value in base currency. */
    pum_pf_value_base?: number;
    /** Value Dec */
    pum_pf_valuedec?: number;
    /** Year */
    pum_pf_year?: number;
    /** Rate (Unit) */
    pum_rateunit?: number;
    /** Status - Status of the Power Financials Data */
    statecode: PumPfPowerfinancialsdataStatecodeValue; // Option set: pum_pf_powerfinancialsdata_statecode
    /** Status Reason - Reason for the status of the Power Financials Data */
    statuscode?: PumPfPowerfinancialsdataStatuscodeValue; // Option set: pum_pf_powerfinancialsdata_statuscode
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
 * Type-safe expand properties for Power Financials Data
 * Enables IntelliSense for $expand relationship names
 */
export type pum_pf_powerfinancialsdataExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_CustomCostHierarchy"
    | "pum_FinancialStructure"
    | "pum_pf_costarea"
    | "pum_pf_costcategory"
    | "pum_pf_costplan_version"
    | "pum_pf_costspecification"
    | "pum_pf_costtype"
    | "pum_pf_initiative"
    | "pum_pf_program"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Power Financials Data
 * Supports both array format and object format with nested options
 */
export type pum_pf_powerfinancialsdataExpand =
    | pum_pf_powerfinancialsdataExpandableProperties[]
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
        "pum_pf_costplan_version"?: {
            $select?: (keyof pum_pf_costplan_version)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_costplan_versionExpand
        }
        "pum_pf_costspecification"?: {
            $select?: (keyof pum_pf_costspecification)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_costspecificationExpand
        }
        "pum_pf_initiative"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
        "pum_pf_program"?: {
            $select?: (keyof pum_Program)[]
            $top?: number
            $skip?: number
            $expand?: pum_ProgramExpand
        }
        "transactioncurrencyid"?: {
            $select?: (keyof TransactionCurrency)[]
            $top?: number
            $skip?: number
            $expand?: TransactionCurrencyExpand
        }
    }

/**
 * Type-safe expand options for Power Financials Data
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_pf_powerfinancialsdata @odata.bind operations
 */
export type pum_pf_powerfinancialsdataBindings = {
    'pum_CustomCostHierarchy@odata.bind'?: string; // Bind to: pum_customcosthierarchy
    'pum_FinancialStructure@odata.bind'?: string; // Bind to: pum_financialstructure
    'pum_pf_costarea@odata.bind'?: string; // Bind to: pum_pf_costarea
    'pum_pf_costcategory@odata.bind'?: string; // Bind to: pum_pf_costcategory
    'pum_pf_costplan_version@odata.bind'?: string; // Bind to: pum_pf_costplan_version
    'pum_pf_costspecification@odata.bind'?: string; // Bind to: pum_pf_costspecification
    'pum_pf_costtype@odata.bind'?: string; // Bind to: pum_pf_costtype
    'pum_pf_initiative@odata.bind'?: string; // Bind to: pum_initiative
    'pum_pf_program@odata.bind'?: string; // Bind to: pum_program
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating pum_pf_powerfinancialsdata @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_pf_powerfinancialsdataBindings = {
    /** Create @odata.bind for pum_pf_costplan_version -> pum_pf_costplan_version */
    pum_pf_costplan_version: (id: string): { 'pum_pf_costplan_version@odata.bind': string } => ({
        'pum_pf_costplan_version@odata.bind': `/pum_pf_costplan_versions(${id})`
    }),
    /** Create @odata.bind for pum_pf_costspecification -> pum_pf_costspecification */
    pum_pf_costspecification: (id: string): { 'pum_pf_costspecification@odata.bind': string } => ({
        'pum_pf_costspecification@odata.bind': `/pum_pf_costspecifications(${id})`
    }),
    /** Create @odata.bind for pum_pf_initiative -> pum_initiative */
    pum_pf_initiative: (id: string): { 'pum_pf_initiative@odata.bind': string } => ({
        'pum_pf_initiative@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_pf_program -> pum_program */
    pum_pf_program: (id: string): { 'pum_pf_program@odata.bind': string } => ({
        'pum_pf_program@odata.bind': `/pum_programs(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type pum_pf_powerfinancialsdataCreate = Partial<pum_pf_powerfinancialsdata> & Partial<pum_pf_powerfinancialsdataBindings> & {
    pum_pf_powerfinancialsdata_name: string; // Required for create
};

export type pum_pf_powerfinancialsdataUpdate = Partial<Omit<pum_pf_powerfinancialsdata, 'pum_pf_powerfinancialsdataid'>> & Partial<pum_pf_powerfinancialsdataBindings> & {
    pum_pf_powerfinancialsdataid: string; // Required for update
};

/**
 * Runtime metadata for Power Financials Data
 * Provides entity schema information for API operations
 */
export const pum_pf_powerfinancialsdataMeta = {
    logicalName: "pum_pf_powerfinancialsdata",
    schemaName: "pum_pf_powerfinancialsdata",
    displayName: "Power Financials Data",
    entitySetName: "pum_pf_powerfinancialsdatas",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_pf_powerfinancialsdataid",
        attributeType: "Uniqueidentifier",
        displayName: "Power Financials Data"
    },
    primaryName: {
        logicalName: "pum_pf_powerfinancialsdata_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_customcosthierarchy", "pum_financialstructure", "pum_pf_costarea", "pum_pf_costcategory", "pum_pf_costplan_version", "pum_pf_costspecification", "pum_pf_costtype", "pum_pf_initiative", "pum_pf_program", "transactioncurrencyid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_pf_costcategory", "pum_pf_costtype", "pum_pf_month", "pum_pf_value", "pum_pf_year", "statecode"],
    optionSets: ["pum_pf_powerfinancialsdata_statecode", "pum_pf_powerfinancialsdata_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_CustomCostHierarchy", // Relationship
        "pum_FinancialStructure", // Relationship
        "pum_pf_costarea", // Lookup field
        "pum_pf_costcategory", // Lookup field
        "pum_pf_costplan_version", // Lookup field
        "pum_pf_costspecification", // Lookup field
        "pum_pf_costtype", // Lookup field
        "pum_pf_initiative", // Lookup field
        "pum_pf_program", // Lookup field
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
        "pum_customcosthierarchy": {
            relationshipName: "pum_customcosthierarchy",
            targetEntityLogicalName: "pum_customcosthierarchy",
            targetEntitySetName: "pum_customcosthierarchys",
            relationshipType: "ManyToOne"
        },
        "pum_financialstructure": {
            relationshipName: "pum_financialstructure",
            targetEntityLogicalName: "pum_financialstructure",
            targetEntitySetName: "pum_financialstructures",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costarea": {
            relationshipName: "pum_pf_costarea",
            targetEntityLogicalName: "pum_pf_costarea",
            targetEntitySetName: "pum_pf_costareas",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costcategory": {
            relationshipName: "pum_pf_costcategory",
            targetEntityLogicalName: "pum_pf_costcategory",
            targetEntitySetName: "pum_pf_costcategorys",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costplan_version": {
            relationshipName: "pum_pf_costplan_version",
            targetEntityLogicalName: "pum_pf_costplan_version",
            targetEntitySetName: "pum_pf_costplan_versions",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costspecification": {
            relationshipName: "pum_pf_costspecification",
            targetEntityLogicalName: "pum_pf_costspecification",
            targetEntitySetName: "pum_pf_costspecifications",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costtype": {
            relationshipName: "pum_pf_costtype",
            targetEntityLogicalName: "pum_pf_costtype",
            targetEntitySetName: "pum_pf_costtypes",
            relationshipType: "ManyToOne"
        },
        "pum_pf_initiative": {
            relationshipName: "pum_pf_initiative",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
        "pum_pf_program": {
            relationshipName: "pum_pf_program",
            targetEntityLogicalName: "pum_program",
            targetEntitySetName: "pum_programs",
            relationshipType: "ManyToOne"
        },
        "transactioncurrencyid": {
            relationshipName: "transactioncurrencyid",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.362Z"
} as const;
