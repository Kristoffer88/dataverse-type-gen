// Required imports
import type { PumKpiLookupValue } from '../global-choices/pum_kpi_lookup.js'
import type { PumStatuscategoryValue } from '../global-choices/pum_statuscategory.js'
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
 * Status of the Status Reporting
 * LogicalName: pum_statusreporting_statecode
 * Global: false
 * Custom: true
 */
export const PumStatusreportingStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumStatusreportingStatecodeValue = (typeof PumStatusreportingStatecode)[keyof typeof PumStatusreportingStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Status Reporting
 * LogicalName: pum_statusreporting_statuscode
 * Global: false
 * Custom: true
 */
export const PumStatusreportingStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumStatusreportingStatuscodeValue = (typeof PumStatusreportingStatuscode)[keyof typeof PumStatusreportingStatuscode]["Value"];


/**
 * Status Reporting
 * Entity: pum_statusreporting
 * Schema: pum_StatusReporting
 * Primary Key: pum_statusreportingid
 * Primary Name: pum_name
 */
export interface pum_StatusReporting {
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
    /** Actual Cost */
    pum_actualcost?: number;
    /** Actual Cost (Base) - Value of the Actual Cost in base currency. */
    pum_actualcost_base?: number;
    /** Budget */
    pum_budget?: number;
    /** Budget (Base) - Value of the Budget in base currency. */
    pum_budget_base?: number;
    /** Comment */
    pum_comment?: string;
    /** Current Phase */
    pum_currentphase?: string;
    /** Initiative */
    pum_initiative?: string; // Lookup to: pum_initiative
    /** _pum_initiative_value - Resolved lookup GUID value */
    _pum_initiative_value?: string; // Lookup value
    /** KPI Current Cost */
    pum_kpicurrentcost?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** KPI Current Quality */
    pum_kpicurrentquality?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** KPI Current Resources */
    pum_kpicurrentresources?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** KPI Current Schedule */
    pum_kpicurrentschedule?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** KPI Current Scope */
    pum_kpicurrentscope?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** KPI Current Summary */
    pum_kpicurrentsummary?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** Cost */
    pum_kpinewcost?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** Quality */
    pum_kpinewquality?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** Resources */
    pum_kpinewresources?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** Schedule */
    pum_kpinewschedule?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** Scope */
    pum_kpinewscope?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** Summary */
    pum_kpinewsummary?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** Name - Required name field */
    pum_name?: string;
    /** Schedule Progress */
    pum_scheduleprogress?: number;
    /** Status Category */
    pum_statuscategory?: PumStatuscategoryValue; // Option set: pum_statuscategory
    /** Status Date */
    pum_statusdate?: Date | string;
    /** Status Reporting - Unique identifier for entity instances */
    pum_statusreportingid: string;
    /** Status - Status of the Status Reporting */
    statecode: PumStatusreportingStatecodeValue; // Option set: pum_statusreporting_statecode
    /** Status Reason - Reason for the status of the Status Reporting */
    statuscode?: PumStatusreportingStatuscodeValue; // Option set: pum_statusreporting_statuscode
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
 * Type-safe expand properties for Status Reporting
 * Enables IntelliSense for $expand relationship names
 */
export type pum_StatusReportingExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_Initiative"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Status Reporting
 * Supports both array format and object format with nested options
 */
export type pum_StatusReportingExpand =
    | pum_StatusReportingExpandableProperties[]
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
        "transactioncurrencyid"?: {
            $select?: (keyof TransactionCurrency)[]
            $top?: number
            $skip?: number
            $expand?: TransactionCurrencyExpand
        }
    }

/**
 * Type-safe expand options for Status Reporting
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_StatusReporting @odata.bind operations
 */
export type pum_StatusReportingBindings = {
    'pum_Initiative@odata.bind'?: string; // Bind to: pum_initiative
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating pum_StatusReporting @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_StatusReportingBindings = {
    /** Create @odata.bind for pum_initiative -> pum_initiative */
    pum_initiative: (id: string): { 'pum_Initiative@odata.bind': string } => ({
        'pum_Initiative@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type pum_StatusReportingCreate = Partial<pum_StatusReporting> & Partial<pum_StatusReportingBindings> & {
    pum_name: string; // Required for create
};

export type pum_StatusReportingUpdate = Partial<Omit<pum_StatusReporting, 'pum_statusreportingid'>> & Partial<pum_StatusReportingBindings> & {
    pum_statusreportingid: string; // Required for update
};

/**
 * Runtime metadata for Status Reporting
 * Provides entity schema information for API operations
 */
export const pum_StatusReportingMeta = {
    logicalName: "pum_statusreporting",
    schemaName: "pum_StatusReporting",
    displayName: "Status Reporting",
    entitySetName: "pum_statusreportings",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_statusreportingid",
        attributeType: "Uniqueidentifier",
        displayName: "Status Reporting"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_initiative", "transactioncurrencyid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_name", "statecode"],
    optionSets: ["pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_statuscategory", "pum_statusreporting_statecode", "pum_statusreporting_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_Initiative", // Relationship
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
        "transactioncurrencyid": {
            relationshipName: "transactioncurrencyid",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.371Z"
} as const;
