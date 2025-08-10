// Required imports
import type { PumKpiLookupValue } from '../global-choices/pum_kpi_lookup.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_InvestmentCategory } from './pum_investmentcategory.js'
import type { pum_InvestmentCategoryExpand } from './pum_investmentcategory.js'
import type { pum_KeyResults } from './pum_keyresults.js'
import type { pum_KeyResultsExpand } from './pum_keyresults.js'
import type { pum_Portfolio } from './pum_portfolio.js'
import type { pum_PortfolioExpand } from './pum_portfolio.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Status
 * Status of the Program
 * LogicalName: pum_program_statecode
 * Global: false
 * Custom: true
 */
export const PumProgramStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumProgramStatecodeValue = (typeof PumProgramStatecode)[keyof typeof PumProgramStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Program
 * LogicalName: pum_program_statuscode
 * Global: false
 * Custom: true
 */
export const PumProgramStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumProgramStatuscodeValue = (typeof PumProgramStatuscode)[keyof typeof PumProgramStatuscode]["Value"];


/**
 * Program
 * Entity: pum_program
 * Schema: pum_Program
 * Primary Key: pum_programid
 * Primary Name: pum_program
 */
export interface pum_Program {
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
    /** Budget */
    kra_budget?: number;
    /** Budget (Base) - Value of the Budget in base currency. */
    kra_budget_base?: number;
    /** Included */
    kra_included?: boolean;
    /** Must Run */
    kra_mustrun?: boolean;
    /** Rank */
    kra_rank?: number;
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
    /** Program Owner - Owner Id */
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
    /** Process Id - Contains the id of the process associated with the entity. */
    processid?: string;
    /** Category */
    pum_category?: string; // Lookup to: pum_investmentcategory
    /** _pum_category_value - Resolved lookup GUID value */
    _pum_category_value?: string; // Lookup value
    /** Description */
    pum_description?: string;
    /** Initiative(s) Count */
    pum_initiativescount?: number;
    /** Initiative(s) Count (Last Updated On) - Last Updated time of rollup field Initiative(s) Count. */
    pum_initiativescount_date?: Date | string;
    /** Initiative(s) Count (State) - State of rollup field Initiative(s) Count. */
    pum_initiativescount_state?: number;
    /** Key Results */
    pum_keyresults?: string; // Lookup to: pum_keyresults
    /** _pum_keyresults_value - Resolved lookup GUID value */
    _pum_keyresults_value?: string; // Lookup value
    /** OKR? */
    pum_okr?: boolean;
    /** Portfolio */
    pum_portfolio?: string; // Lookup to: pum_portfolio
    /** _pum_portfolio_value - Resolved lookup GUID value */
    _pum_portfolio_value?: string; // Lookup value
    /** Program - Required name field */
    pum_program?: string;
    /** Program Finish */
    pum_programfinish?: Date | string;
    /** Program - Unique identifier for entity instances */
    pum_programid: string;
    /** Program Start */
    pum_programstart?: Date | string;
    /** Program Status */
    pum_programstatus?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** Progress */
    pum_progress?: number;
    /** Progress (Last Updated On) - Last Updated time of rollup field Progress. */
    pum_progress_date?: Date | string;
    /** Progress (State) - State of rollup field Progress. */
    pum_progress_state?: number;
    /** Progress (%) */
    pum_progressforviews?: string;
    /** Schedule Completion */
    pum_schedulecompletion?: number;
    /** Schedule Completion (CountAverage) - Schedule Completion (CountAverageDescription) */
    pum_schedulecompletion_count?: number;
    /** Schedule Completion (Last Updated On) - Last Updated time of rollup field Schedule Completion. */
    pum_schedulecompletion_date?: Date | string;
    /** Schedule Completion (State) - State of rollup field Schedule Completion. */
    pum_schedulecompletion_state?: number;
    /** Schedule Completion (SumAverage) - Schedule Completion (SumAverageDescription) */
    pum_schedulecompletion_sum?: number;
    /** Sponsor */
    pum_sponsor?: string; // Lookup to: systemuser
    /** _pum_sponsor_value - Resolved lookup GUID value */
    _pum_sponsor_value?: string; // Lookup value
    /** Total Work */
    pum_totalwork?: number;
    /** Total Work (Last Updated On) - Last Updated time of rollup field Total Work. */
    pum_totalwork_date?: Date | string;
    /** Total Work (State) - State of rollup field Total Work. */
    pum_totalwork_state?: number;
    /** (Deprecated) Stage Id - Contains the id of the stage where the entity is located. */
    stageid?: string;
    /** Status - Status of the Program */
    statecode: PumProgramStatecodeValue; // Option set: pum_program_statecode
    /** Status Reason - Reason for the status of the Program */
    statuscode?: PumProgramStatuscodeValue; // Option set: pum_program_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** Currency - Unique identifier of the currency associated with the entity. */
    transactioncurrencyid?: string; // Lookup to: transactioncurrency
    /** _transactioncurrencyid_value - Resolved lookup GUID value */
    _transactioncurrencyid_value?: string; // Lookup value
    /** (Deprecated) Traversed Path - A comma separated list of string values representing the unique identifiers of stages in a Business Process Flow Instance in the order that they occur. */
    traversedpath?: string;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Program
 * Enables IntelliSense for $expand relationship names
 */
export type pum_ProgramExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_Category"
    | "pum_KeyResults"
    | "pum_Portfolio"
    | "pum_Sponsor"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Program
 * Supports both array format and object format with nested options
 */
export type pum_ProgramExpand =
    | pum_ProgramExpandableProperties[]
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
        "pum_category"?: {
            $select?: (keyof pum_InvestmentCategory)[]
            $top?: number
            $skip?: number
            $expand?: pum_InvestmentCategoryExpand
        }
        "pum_keyresults"?: {
            $select?: (keyof pum_KeyResults)[]
            $top?: number
            $skip?: number
            $expand?: pum_KeyResultsExpand
        }
        "pum_portfolio"?: {
            $select?: (keyof pum_Portfolio)[]
            $top?: number
            $skip?: number
            $expand?: pum_PortfolioExpand
        }
        "pum_sponsor"?: {
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
 * Type-safe expand options for Program
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_Program @odata.bind operations
 */
export type pum_ProgramBindings = {
    'pum_Category@odata.bind'?: string; // Bind to: pum_investmentcategory
    'pum_KeyResults@odata.bind'?: string; // Bind to: pum_keyresults
    'pum_Portfolio@odata.bind'?: string; // Bind to: pum_portfolio
    'pum_Sponsor@odata.bind'?: string; // Bind to: systemuser
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating pum_Program @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_ProgramBindings = {
    /** Create @odata.bind for pum_category -> pum_investmentcategory */
    pum_category: (id: string): { 'pum_Category@odata.bind': string } => ({
        'pum_Category@odata.bind': `/pum_investmentcategories(${id})`
    }),
    /** Create @odata.bind for pum_keyresults -> pum_keyresults */
    pum_keyresults: (id: string): { 'pum_KeyResults@odata.bind': string } => ({
        'pum_KeyResults@odata.bind': `/pum_keyresultses(${id})`
    }),
    /** Create @odata.bind for pum_portfolio -> pum_portfolio */
    pum_portfolio: (id: string): { 'pum_Portfolio@odata.bind': string } => ({
        'pum_Portfolio@odata.bind': `/pum_portfolios(${id})`
    }),
    /** Create @odata.bind for pum_sponsor -> systemuser */
    pum_sponsor: (id: string): { 'pum_Sponsor@odata.bind': string } => ({
        'pum_Sponsor@odata.bind': `/systemusers(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type pum_ProgramCreate = Partial<pum_Program> & Partial<pum_ProgramBindings> & {
    pum_program: string; // Required for create
};

export type pum_ProgramUpdate = Partial<Omit<pum_Program, 'pum_programid'>> & Partial<pum_ProgramBindings> & {
    pum_programid: string; // Required for update
};

/**
 * Runtime metadata for Program
 * Provides entity schema information for API operations
 */
export const pum_ProgramMeta = {
    logicalName: "pum_program",
    schemaName: "pum_Program",
    displayName: "Program",
    entitySetName: "pum_programs",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_programid",
        attributeType: "Uniqueidentifier",
        displayName: "Program"
    },
    primaryName: {
        logicalName: "pum_program",
        attributeType: "String",
        displayName: "Program",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_category", "pum_keyresults", "pum_portfolio", "pum_sponsor", "transactioncurrencyid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_program", "statecode"],
    optionSets: ["pum_kpi_lookup", "pum_program_statecode", "pum_program_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_Category", // Relationship
        "pum_KeyResults", // Relationship
        "pum_Portfolio", // Relationship
        "pum_Sponsor", // Relationship
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
        "pum_category": {
            relationshipName: "pum_category",
            targetEntityLogicalName: "pum_investmentcategory",
            targetEntitySetName: "pum_investmentcategorys",
            relationshipType: "ManyToOne"
        },
        "pum_keyresults": {
            relationshipName: "pum_keyresults",
            targetEntityLogicalName: "pum_keyresults",
            targetEntitySetName: "pum_keyresultss",
            relationshipType: "ManyToOne"
        },
        "pum_portfolio": {
            relationshipName: "pum_portfolio",
            targetEntityLogicalName: "pum_portfolio",
            targetEntitySetName: "pum_portfolios",
            relationshipType: "ManyToOne"
        },
        "pum_sponsor": {
            relationshipName: "pum_sponsor",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
        "transactioncurrencyid": {
            relationshipName: "transactioncurrencyid",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.967Z"
} as const;
