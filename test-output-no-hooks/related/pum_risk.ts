// Required imports
import type { PumRiskprobabilityValue } from '../global-choices/pum_riskprobability.js'
import type { PumRiskimpactValue } from '../global-choices/pum_riskimpact.js'
import type { PumRiskstatusValue } from '../global-choices/pum_riskstatus.js'
import type { PumRisklevelValue } from '../global-choices/pum_risklevel.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { pum_Portfolio } from './pum_portfolio.js'
import type { pum_PortfolioExpand } from './pum_portfolio.js'
import type { pum_Program } from './pum_program.js'
import type { pum_ProgramExpand } from './pum_program.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Status
 * Status of the Risk
 * LogicalName: pum_risk_statecode
 * Global: false
 * Custom: true
 */
export const PumRiskStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumRiskStatecodeValue = (typeof PumRiskStatecode)[keyof typeof PumRiskStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Risk
 * LogicalName: pum_risk_statuscode
 * Global: false
 * Custom: true
 */
export const PumRiskStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumRiskStatuscodeValue = (typeof PumRiskStatuscode)[keyof typeof PumRiskStatuscode]["Value"];


/**
 * Risk
 * Entity: pum_risk
 * Schema: pum_Risk
 * Primary Key: pum_riskid
 * Primary Name: pum_name
 */
export interface pum_Risk {
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
    /** Id */
    pum_id?: string;
    /** Initiative */
    pum_initiative?: string; // Lookup to: pum_initiative
    /** _pum_initiative_value - Resolved lookup GUID value */
    _pum_initiative_value?: string; // Lookup value
    /** Name - Required name field */
    pum_name?: string;
    /** Portfolio */
    pum_portfolio?: string; // Lookup to: pum_portfolio
    /** _pum_portfolio_value - Resolved lookup GUID value */
    _pum_portfolio_value?: string; // Lookup value
    /** Probability */
    pum_probability?: PumRiskprobabilityValue; // Option set: pum_riskprobability
    /** Program */
    pum_program?: string; // Lookup to: pum_program
    /** _pum_program_value - Resolved lookup GUID value */
    _pum_program_value?: string; // Lookup value
    /** Cost */
    pum_riskcost?: number;
    /** Cost (Base) - Value of the Cost in base currency. */
    pum_riskcost_base?: number;
    /** Description */
    pum_riskdescription?: string;
    /** Due Date */
    pum_riskduedate?: Date | string;
    /** Guid - Unique identifier for entity instances */
    pum_riskid: string;
    /** Impact */
    pum_riskimpact?: PumRiskimpactValue; // Option set: pum_riskimpact
    /** Mitigation */
    pum_riskmitigation?: string;
    /** Id */
    pum_risksid?: string;
    /** Risk Status */
    pum_riskstatus?: PumRiskstatusValue; // Option set: pum_riskstatus
    /** Risk Type */
    pum_risktype?: PumRisklevelValue; // Option set: pum_risklevel
    /** Status - Status of the Risk */
    statecode: PumRiskStatecodeValue; // Option set: pum_risk_statecode
    /** Status Reason - Reason for the status of the Risk */
    statuscode?: PumRiskStatuscodeValue; // Option set: pum_risk_statuscode
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
 * Type-safe expand properties for Risk
 * Enables IntelliSense for $expand relationship names
 */
export type pum_RiskExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_Initiative"
    | "pum_Portfolio"
    | "pum_Program"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Risk
 * Supports both array format and object format with nested options
 */
export type pum_RiskExpand =
    | pum_RiskExpandableProperties[]
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
        "pum_initiative"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
        "pum_portfolio"?: {
            $select?: (keyof pum_Portfolio)[]
            $top?: number
            $skip?: number
            $expand?: pum_PortfolioExpand
        }
        "pum_program"?: {
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
 * Type-safe expand options for Risk
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_Risk @odata.bind operations
 */
export type pum_RiskBindings = {
    'pum_Initiative@odata.bind'?: string; // Bind to: pum_initiative
    'pum_Portfolio@odata.bind'?: string; // Bind to: pum_portfolio
    'pum_Program@odata.bind'?: string; // Bind to: pum_program
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating pum_Risk @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_RiskBindings = {
    /** Create @odata.bind for pum_initiative -> pum_initiative */
    pum_initiative: (id: string): { 'pum_Initiative@odata.bind': string } => ({
        'pum_Initiative@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_portfolio -> pum_portfolio */
    pum_portfolio: (id: string): { 'pum_Portfolio@odata.bind': string } => ({
        'pum_Portfolio@odata.bind': `/pum_portfolios(${id})`
    }),
    /** Create @odata.bind for pum_program -> pum_program */
    pum_program: (id: string): { 'pum_Program@odata.bind': string } => ({
        'pum_Program@odata.bind': `/pum_programs(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type pum_RiskCreate = Partial<pum_Risk> & Partial<pum_RiskBindings> & {
    pum_name: string; // Required for create
};

export type pum_RiskUpdate = Partial<Omit<pum_Risk, 'pum_riskid'>> & Partial<pum_RiskBindings> & {
    pum_riskid: string; // Required for update
};

/**
 * Runtime metadata for Risk
 * Provides entity schema information for API operations
 */
export const pum_RiskMeta = {
    logicalName: "pum_risk",
    schemaName: "pum_Risk",
    displayName: "Risk",
    entitySetName: "pum_risks",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_riskid",
        attributeType: "Uniqueidentifier",
        displayName: "Guid"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_initiative", "pum_portfolio", "pum_program", "transactioncurrencyid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_name", "statecode"],
    optionSets: ["pum_riskprobability", "pum_riskimpact", "pum_riskstatus", "pum_risklevel", "pum_risk_statecode", "pum_risk_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_Initiative", // Relationship
        "pum_Portfolio", // Relationship
        "pum_Program", // Relationship
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
        "pum_initiative": {
            relationshipName: "pum_initiative",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
        "pum_portfolio": {
            relationshipName: "pum_portfolio",
            targetEntityLogicalName: "pum_portfolio",
            targetEntitySetName: "pum_portfolios",
            relationshipType: "ManyToOne"
        },
        "pum_program": {
            relationshipName: "pum_program",
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
    generated: "2025-08-10T19:04:22.233Z"
} as const;
