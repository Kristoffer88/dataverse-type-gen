// Required imports
import type { PumIdeatypeValue } from '../global-choices/pum_ideatype.js'
import type { PumRatingValue } from '../global-choices/pum_rating.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_InvestmentCategory } from './pum_investmentcategory.js'
import type { pum_InvestmentCategoryExpand } from './pum_investmentcategory.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { pum_Portfolio } from './pum_portfolio.js'
import type { pum_PortfolioExpand } from './pum_portfolio.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Status
 * Status of the Idea
 * LogicalName: pum_idea_statecode
 * Global: false
 * Custom: true
 */
export const PumIdeaStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumIdeaStatecodeValue = (typeof PumIdeaStatecode)[keyof typeof PumIdeaStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Idea
 * LogicalName: pum_idea_statuscode
 * Global: false
 * Custom: true
 */
export const PumIdeaStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumIdeaStatuscodeValue = (typeof PumIdeaStatuscode)[keyof typeof PumIdeaStatuscode]["Value"];


/**
 * Idea
 * Entity: pum_idea
 * Schema: pum_Idea
 * Primary Key: pum_ideaid
 * Primary Name: pum_name
 */
export interface pum_Idea {
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
    /** Benefits Estimate */
    pum_benefitsestimate?: number;
    /** Benefits Estimate (Base) - Value of the Benefits Estimate in base currency. */
    pum_benefitsestimate_base?: number;
    /** Budget Estimate */
    pum_budgetestimate?: number;
    /** Budget Estimate (Base) - Value of the Budget Estimate in base currency. */
    pum_budgetestimate_base?: number;
    /** Category */
    pum_category?: string; // Lookup to: pum_investmentcategory
    /** _pum_category_value - Resolved lookup GUID value */
    _pum_category_value?: string; // Lookup value
    /** Create Initiative? */
    pum_createinitiative?: boolean;
    /** Description */
    pum_description?: string;
    /** Has Initiative? */
    pum_hasinitiative?: boolean;
    /** Idea - Unique identifier for entity instances */
    pum_ideaid: string;
    /** Idea Score */
    pum_ideascore?: number;
    /** Type */
    pum_ideatype?: PumIdeatypeValue; // Option set: pum_ideatype
    /** Index */
    pum_index?: number;
    /** Linked Initiative */
    pum_linkedinitiative?: string; // Lookup to: pum_initiative
    /** _pum_linkedinitiative_value - Resolved lookup GUID value */
    _pum_linkedinitiative_value?: string; // Lookup value
    /** Name - Required name field */
    pum_name?: string;
    /** Portfolio */
    pum_portfolio?: string; // Lookup to: pum_portfolio
    /** _pum_portfolio_value - Resolved lookup GUID value */
    _pum_portfolio_value?: string; // Lookup value
    /** Primary Objective */
    pum_primaryobjective?: string; // Lookup to: pum_strategicobjectives
    /** _pum_primaryobjective_value - Resolved lookup GUID value */
    _pum_primaryobjective_value?: string; // Lookup value
    /** Proposed End */
    pum_proposedend?: Date | string;
    /** Proposed Start */
    pum_proposedstart?: Date | string;
    /** Rating */
    pum_rating?: PumRatingValue; // Option set: pum_rating
    /** Revenue Comments */
    pum_revenuecomments?: string;
    /** Revenue Growth */
    pum_revenuegrowth?: number;
    /** ROI */
    pum_roi?: number;
    /** Strategic Fit */
    pum_strategicfit?: number;
    /** Strategy Comments */
    pum_strategycomments?: string;
    /** 3Y Benefits Estimate */
    pum_ybenefitsestimate?: number;
    /** 3Y Benefits Estimate (Base) - Value of the 3Y Benefits Estimate in base currency. */
    pum_ybenefitsestimate_base?: number;
    /** Status - Status of the Idea */
    statecode: PumIdeaStatecodeValue; // Option set: pum_idea_statecode
    /** Status Reason - Reason for the status of the Idea */
    statuscode?: PumIdeaStatuscodeValue; // Option set: pum_idea_statuscode
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
 * Type-safe expand properties for Idea
 * Enables IntelliSense for $expand relationship names
 */
export type pum_IdeaExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_Category"
    | "pum_LinkedInitiative"
    | "pum_Portfolio"
    | "pum_PrimaryObjective"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Idea
 * Supports both array format and object format with nested options
 */
export type pum_IdeaExpand =
    | pum_IdeaExpandableProperties[]
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
        "pum_linkedinitiative"?: {
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
        "transactioncurrencyid"?: {
            $select?: (keyof TransactionCurrency)[]
            $top?: number
            $skip?: number
            $expand?: TransactionCurrencyExpand
        }
    }

/**
 * Type-safe expand options for Idea
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_Idea @odata.bind operations
 */
export type pum_IdeaBindings = {
    'pum_Category@odata.bind'?: string; // Bind to: pum_investmentcategory
    'pum_LinkedInitiative@odata.bind'?: string; // Bind to: pum_initiative
    'pum_Portfolio@odata.bind'?: string; // Bind to: pum_portfolio
    'pum_PrimaryObjective@odata.bind'?: string; // Bind to: pum_strategicobjectives
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating pum_Idea @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_IdeaBindings = {
    /** Create @odata.bind for pum_category -> pum_investmentcategory */
    pum_category: (id: string): { 'pum_Category@odata.bind': string } => ({
        'pum_Category@odata.bind': `/pum_investmentcategories(${id})`
    }),
    /** Create @odata.bind for pum_linkedinitiative -> pum_initiative */
    pum_linkedinitiative: (id: string): { 'pum_LinkedInitiative@odata.bind': string } => ({
        'pum_LinkedInitiative@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_portfolio -> pum_portfolio */
    pum_portfolio: (id: string): { 'pum_Portfolio@odata.bind': string } => ({
        'pum_Portfolio@odata.bind': `/pum_portfolios(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type pum_IdeaCreate = Partial<pum_Idea> & Partial<pum_IdeaBindings> & {
    pum_name: string; // Required for create
};

export type pum_IdeaUpdate = Partial<Omit<pum_Idea, 'pum_ideaid'>> & Partial<pum_IdeaBindings> & {
    pum_ideaid: string; // Required for update
};

/**
 * Runtime metadata for Idea
 * Provides entity schema information for API operations
 */
export const pum_IdeaMeta = {
    logicalName: "pum_idea",
    schemaName: "pum_Idea",
    displayName: "Idea",
    entitySetName: "pum_ideas",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_ideaid",
        attributeType: "Uniqueidentifier",
        displayName: "Idea"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_category", "pum_linkedinitiative", "pum_portfolio", "pum_primaryobjective", "transactioncurrencyid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_name", "statecode"],
    optionSets: ["pum_ideatype", "pum_rating", "pum_idea_statecode", "pum_idea_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_Category", // Relationship
        "pum_LinkedInitiative", // Relationship
        "pum_Portfolio", // Relationship
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
        "pum_category": {
            relationshipName: "pum_category",
            targetEntityLogicalName: "pum_investmentcategory",
            targetEntitySetName: "pum_investmentcategorys",
            relationshipType: "ManyToOne"
        },
        "pum_linkedinitiative": {
            relationshipName: "pum_linkedinitiative",
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
    generated: "2025-08-10T19:04:21.849Z"
} as const;
