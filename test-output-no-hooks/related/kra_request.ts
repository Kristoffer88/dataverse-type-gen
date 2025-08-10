// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { pum_GanttTask } from './pum_gantttask.js'
import type { pum_GanttTaskExpand } from './pum_gantttask.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Status
 * Status of the Request
 * LogicalName: kra_request_statecode
 * Global: false
 * Custom: true
 */
export const KraRequestStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type KraRequestStatecodeValue = (typeof KraRequestStatecode)[keyof typeof KraRequestStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Request
 * LogicalName: kra_request_statuscode
 * Global: false
 * Custom: true
 */
export const KraRequestStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type KraRequestStatuscodeValue = (typeof KraRequestStatuscode)[keyof typeof KraRequestStatuscode]["Value"];


/**
 * Request
 * Entity: kra_request
 * Schema: kra_Request
 * Primary Key: kra_requestid
 * Primary Name: kra_name
 */
export interface kra_Request {
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
    /** Initiative */
    kra_initiative?: string; // Lookup to: pum_initiative
    /** _kra_initiative_value - Resolved lookup GUID value */
    _kra_initiative_value?: string; // Lookup value
    /** Name */
    kra_name?: string;
    /** Penge */
    kra_penge?: number;
    /** Penge (Base) - Value of the Penge in base currency. */
    kra_penge_base?: number;
    /** Planned Work */
    kra_plannedwork?: number;
    /** Request - Unique identifier for entity instances */
    kra_requestid: string;
    /** Resource */
    kra_resource?: string; // Lookup to: pum_resource
    /** _kra_resource_value - Resolved lookup GUID value */
    _kra_resource_value?: string; // Lookup value
    /** Task */
    kra_task?: string; // Lookup to: pum_gantttask
    /** _kra_task_value - Resolved lookup GUID value */
    _kra_task_value?: string; // Lookup value
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
    /** Status - Status of the Request */
    statecode: KraRequestStatecodeValue; // Option set: kra_request_statecode
    /** Status Reason - Reason for the status of the Request */
    statuscode?: KraRequestStatuscodeValue; // Option set: kra_request_statuscode
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
 * Type-safe expand properties for Request
 * Enables IntelliSense for $expand relationship names
 */
export type kra_RequestExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "kra_Initiative"
    | "kra_Resource"
    | "kra_Task"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Request
 * Supports both array format and object format with nested options
 */
export type kra_RequestExpand =
    | kra_RequestExpandableProperties[]
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
        "kra_initiative"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
        "kra_task"?: {
            $select?: (keyof pum_GanttTask)[]
            $top?: number
            $skip?: number
            $expand?: pum_GanttTaskExpand
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
 * Type-safe expand options for Request
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for kra_Request @odata.bind operations
 */
export type kra_RequestBindings = {
    'kra_Initiative@odata.bind'?: string; // Bind to: pum_initiative
    'kra_Resource@odata.bind'?: string; // Bind to: pum_resource
    'kra_Task@odata.bind'?: string; // Bind to: pum_gantttask
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating kra_Request @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const kra_RequestBindings = {
    /** Create @odata.bind for kra_initiative -> pum_initiative */
    kra_initiative: (id: string): { 'kra_Initiative@odata.bind': string } => ({
        'kra_Initiative@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for kra_task -> pum_gantttask */
    kra_task: (id: string): { 'kra_Task@odata.bind': string } => ({
        'kra_Task@odata.bind': `/pum_gantttasks(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type kra_RequestCreate = Partial<kra_Request> & Partial<kra_RequestBindings> & {
    kra_name: string; // Required for create
};

export type kra_RequestUpdate = Partial<Omit<kra_Request, 'kra_requestid'>> & Partial<kra_RequestBindings> & {
    kra_requestid: string; // Required for update
};

/**
 * Runtime metadata for Request
 * Provides entity schema information for API operations
 */
export const kra_RequestMeta = {
    logicalName: "kra_request",
    schemaName: "kra_Request",
    displayName: "Request",
    entitySetName: "kra_requests",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "kra_requestid",
        attributeType: "Uniqueidentifier",
        displayName: "Request"
    },
    primaryName: {
        logicalName: "kra_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "kra_initiative", "kra_resource", "kra_task", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "transactioncurrencyid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "kra_name", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "statecode"],
    optionSets: ["kra_request_statecode", "kra_request_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "kra_Initiative", // Relationship
        "kra_Resource", // Relationship
        "kra_Task", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
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
        "kra_initiative": {
            relationshipName: "kra_initiative",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
        "kra_resource": {
            relationshipName: "kra_resource",
            targetEntityLogicalName: "pum_resource",
            targetEntitySetName: "pum_resources",
            relationshipType: "ManyToOne"
        },
        "kra_task": {
            relationshipName: "kra_task",
            targetEntityLogicalName: "pum_gantttask",
            targetEntitySetName: "pum_gantttasks",
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
        "transactioncurrencyid": {
            relationshipName: "transactioncurrencyid",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.841Z"
} as const;
