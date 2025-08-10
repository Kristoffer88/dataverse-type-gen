// Required imports
import type { PumCostunitdefinitionValue } from '../global-choices/pum_costunitdefinition.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Status
 * Status of the Cost Specification PF
 * LogicalName: pum_pf_costspecification_statecode
 * Global: false
 * Custom: true
 */
export const PumPfCostspecificationStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumPfCostspecificationStatecodeValue = (typeof PumPfCostspecificationStatecode)[keyof typeof PumPfCostspecificationStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Cost Specification PF
 * LogicalName: pum_pf_costspecification_statuscode
 * Global: false
 * Custom: true
 */
export const PumPfCostspecificationStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumPfCostspecificationStatuscodeValue = (typeof PumPfCostspecificationStatuscode)[keyof typeof PumPfCostspecificationStatuscode]["Value"];


/**
 * Cost Specification PF
 * Entity: pum_pf_costspecification
 * Schema: pum_pf_costspecification
 * Primary Key: pum_pf_costspecificationid
 * Primary Name: pum_costspecification
 */
export interface pum_pf_costspecification {
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
    /** Cost Specification - Required name field */
    pum_costspecification?: string;
    /** Cost Unit definition */
    pum_costunitdefinition?: PumCostunitdefinitionValue; // Option set: pum_costunitdefinition
    /** Default Financial Unit */
    pum_defaultfinancialunit?: string; // Lookup to: pum_pf_unit
    /** _pum_defaultfinancialunit_value - Resolved lookup GUID value */
    _pum_defaultfinancialunit_value?: string; // Lookup value
    /** Financial Structure */
    pum_financialstructure?: string; // Lookup to: pum_financialstructure
    /** _pum_financialstructure_value - Resolved lookup GUID value */
    _pum_financialstructure_value?: string; // Lookup value
    /** Order */
    pum_pf_costspec_order?: number;
    /** Cost Area */
    pum_pf_costspec_pf_costarea?: string; // Lookup to: pum_pf_costarea
    /** _pum_pf_costspec_pf_costarea_value - Resolved lookup GUID value */
    _pum_pf_costspec_pf_costarea_value?: string; // Lookup value
    /** Cost Category */
    pum_pf_costspec_pf_costcategory?: string; // Lookup to: pum_pf_costcategory
    /** _pum_pf_costspec_pf_costcategory_value - Resolved lookup GUID value */
    _pum_pf_costspec_pf_costcategory_value?: string; // Lookup value
    /** Cost Specification Definition */
    pum_pf_costspecificationdef?: number;
    /** Cost Specification - Unique identifier for entity instances */
    pum_pf_costspecificationid: string;
    /** Initiative pf */
    pum_pf_initiative_costspecification?: string; // Lookup to: pum_initiative
    /** _pum_pf_initiative_costspecification_value - Resolved lookup GUID value */
    _pum_pf_initiative_costspecification_value?: string; // Lookup value
    /** Currency */
    pum_transactioncurrency_pum_pf_costsp?: string; // Lookup to: transactioncurrency
    /** _pum_transactioncurrency_pum_pf_costsp_value - Resolved lookup GUID value */
    _pum_transactioncurrency_pum_pf_costsp_value?: string; // Lookup value
    /** Status - Status of the Cost Specification */
    statecode: PumPfCostspecificationStatecodeValue; // Option set: pum_pf_costspecification_statecode
    /** Status Reason - Reason for the status of the Cost Specification */
    statuscode?: PumPfCostspecificationStatuscodeValue; // Option set: pum_pf_costspecification_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Cost Specification PF
 * Enables IntelliSense for $expand relationship names
 */
export type pum_pf_costspecificationExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_DefaultFinancialUnit"
    | "pum_FinancialStructure"
    | "pum_pf_costspec_pf_costarea"
    | "pum_pf_costspec_pf_costcategory"
    | "pum_pf_initiative_costspecification"
    | "pum_TransactionCurrency_pum_pf_costsp"

/**
 * Type-safe expand options for Cost Specification PF
 * Supports both array format and object format with nested options
 */
export type pum_pf_costspecificationExpand =
    | pum_pf_costspecificationExpandableProperties[]
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
        "pum_pf_initiative_costspecification"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
        "pum_transactioncurrency_pum_pf_costsp"?: {
            $select?: (keyof TransactionCurrency)[]
            $top?: number
            $skip?: number
            $expand?: TransactionCurrencyExpand
        }
    }

/**
 * Type-safe expand options for Cost Specification PF
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_pf_costspecification @odata.bind operations
 */
export type pum_pf_costspecificationBindings = {
    'pum_DefaultFinancialUnit@odata.bind'?: string; // Bind to: pum_pf_unit
    'pum_FinancialStructure@odata.bind'?: string; // Bind to: pum_financialstructure
    'pum_pf_costspec_pf_costarea@odata.bind'?: string; // Bind to: pum_pf_costarea
    'pum_pf_costspec_pf_costcategory@odata.bind'?: string; // Bind to: pum_pf_costcategory
    'pum_pf_initiative_costspecification@odata.bind'?: string; // Bind to: pum_initiative
    'pum_TransactionCurrency_pum_pf_costsp@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating pum_pf_costspecification @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_pf_costspecificationBindings = {
    /** Create @odata.bind for pum_pf_initiative_costspecification -> pum_initiative */
    pum_pf_initiative_costspecification: (id: string): { 'pum_pf_initiative_costspecification@odata.bind': string } => ({
        'pum_pf_initiative_costspecification@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_transactioncurrency_pum_pf_costsp -> transactioncurrency */
    pum_transactioncurrency_pum_pf_costsp: (id: string): { 'pum_TransactionCurrency_pum_pf_costsp@odata.bind': string } => ({
        'pum_TransactionCurrency_pum_pf_costsp@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type pum_pf_costspecificationCreate = Partial<pum_pf_costspecification> & Partial<pum_pf_costspecificationBindings> & {
    pum_costspecification: string; // Required for create
};

export type pum_pf_costspecificationUpdate = Partial<Omit<pum_pf_costspecification, 'pum_pf_costspecificationid'>> & Partial<pum_pf_costspecificationBindings> & {
    pum_pf_costspecificationid: string; // Required for update
};

/**
 * Runtime metadata for Cost Specification PF
 * Provides entity schema information for API operations
 */
export const pum_pf_costspecificationMeta = {
    logicalName: "pum_pf_costspecification",
    schemaName: "pum_pf_costspecification",
    displayName: "Cost Specification PF",
    entitySetName: "pum_pf_costspecifications",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_pf_costspecificationid",
        attributeType: "Uniqueidentifier",
        displayName: "Cost Specification"
    },
    primaryName: {
        logicalName: "pum_costspecification",
        attributeType: "String",
        displayName: "Cost Specification",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_defaultfinancialunit", "pum_financialstructure", "pum_pf_costspec_pf_costarea", "pum_pf_costspec_pf_costcategory", "pum_pf_initiative_costspecification", "pum_transactioncurrency_pum_pf_costsp"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_costspecification", "pum_pf_costspecificationdef", "statecode"],
    optionSets: ["pum_costunitdefinition", "pum_pf_costspecification_statecode", "pum_pf_costspecification_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_DefaultFinancialUnit", // Relationship
        "pum_FinancialStructure", // Relationship
        "pum_pf_costspec_pf_costarea", // Lookup field
        "pum_pf_costspec_pf_costcategory", // Lookup field
        "pum_pf_initiative_costspecification", // Lookup field
        "pum_TransactionCurrency_pum_pf_costsp", // Relationship
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
        "pum_defaultfinancialunit": {
            relationshipName: "pum_defaultfinancialunit",
            targetEntityLogicalName: "pum_pf_unit",
            targetEntitySetName: "pum_pf_units",
            relationshipType: "ManyToOne"
        },
        "pum_financialstructure": {
            relationshipName: "pum_financialstructure",
            targetEntityLogicalName: "pum_financialstructure",
            targetEntitySetName: "pum_financialstructures",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costspec_pf_costarea": {
            relationshipName: "pum_pf_costspec_pf_costarea",
            targetEntityLogicalName: "pum_pf_costarea",
            targetEntitySetName: "pum_pf_costareas",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costspec_pf_costcategory": {
            relationshipName: "pum_pf_costspec_pf_costcategory",
            targetEntityLogicalName: "pum_pf_costcategory",
            targetEntitySetName: "pum_pf_costcategorys",
            relationshipType: "ManyToOne"
        },
        "pum_pf_initiative_costspecification": {
            relationshipName: "pum_pf_initiative_costspecification",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
        "pum_transactioncurrency_pum_pf_costsp": {
            relationshipName: "pum_transactioncurrency_pum_pf_costsp",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.222Z"
} as const;
