// Required imports
import type { PumKanbanassignmentchoicesValue } from '../global-choices/pum_kanbanassignmentchoices.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_GanttTask } from './pum_gantttask.js'
import type { pum_GanttTaskExpand } from './pum_gantttask.js'
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
 * Status of the Assignment
 * LogicalName: pum_assignment_statecode
 * Global: false
 * Custom: true
 */
export const PumAssignmentStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumAssignmentStatecodeValue = (typeof PumAssignmentStatecode)[keyof typeof PumAssignmentStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Assignment
 * LogicalName: pum_assignment_statuscode
 * Global: false
 * Custom: true
 */
export const PumAssignmentStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumAssignmentStatuscodeValue = (typeof PumAssignmentStatuscode)[keyof typeof PumAssignmentStatuscode]["Value"];


/**
 * Assignment
 * Entity: pum_assignment
 * Schema: pum_Assignment
 * Primary Key: pum_assignmentid
 * Primary Name: pum_taskname
 */
export interface pum_Assignment {
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
    /** Actual work */
    pum_assignmentactualwork?: number;
    /** Assignment - Unique identifier for entity instances */
    pum_assignmentid: string;
    /** Rate */
    pum_assignmentrate?: number;
    /** Rate (Base) - Value of the Rate in base currency. */
    pum_assignmentrate_base?: number;
    /** Work */
    pum_assignmentwork?: number;
    /** Task */
    pum_asstask?: string; // Lookup to: pum_gantttask
    /** _pum_asstask_value - Resolved lookup GUID value */
    _pum_asstask_value?: string; // Lookup value
    /** Initiative */
    pum_initiative?: string; // Lookup to: pum_initiative
    /** _pum_initiative_value - Resolved lookup GUID value */
    _pum_initiative_value?: string; // Lookup value
    /** Kanban Status */
    pum_kanbanstatus?: PumKanbanassignmentchoicesValue; // Option set: pum_kanbanassignmentchoices
    /** Portfolio */
    pum_portfolio1?: string; // Lookup to: pum_portfolio
    /** _pum_portfolio1_value - Resolved lookup GUID value */
    _pum_portfolio1_value?: string; // Lookup value
    /** Program */
    pum_program1?: string; // Lookup to: pum_program
    /** _pum_program1_value - Resolved lookup GUID value */
    _pum_program1_value?: string; // Lookup value
    /** Resource */
    pum_resource?: string; // Lookup to: pum_resource
    /** _pum_resource_value - Resolved lookup GUID value */
    _pum_resource_value?: string; // Lookup value
    /** Task Name - Required name field */
    pum_taskname?: string;
    /** User */
    pum_user?: string; // Lookup to: systemuser
    /** _pum_user_value - Resolved lookup GUID value */
    _pum_user_value?: string; // Lookup value
    /** Status - Status of the Assignment */
    statecode: PumAssignmentStatecodeValue; // Option set: pum_assignment_statecode
    /** Status Reason - Reason for the status of the Assignment */
    statuscode?: PumAssignmentStatuscodeValue; // Option set: pum_assignment_statuscode
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
 * Type-safe expand properties for Assignment
 * Enables IntelliSense for $expand relationship names
 */
export type pum_AssignmentExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_AssTask"
    | "pum_Initiative"
    | "pum_Portfolio1"
    | "pum_Program1"
    | "pum_Resource"
    | "pum_User"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Assignment
 * Supports both array format and object format with nested options
 */
export type pum_AssignmentExpand =
    | pum_AssignmentExpandableProperties[]
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
        "pum_asstask"?: {
            $select?: (keyof pum_GanttTask)[]
            $top?: number
            $skip?: number
            $expand?: pum_GanttTaskExpand
        }
        "pum_initiative"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
        "pum_portfolio1"?: {
            $select?: (keyof pum_Portfolio)[]
            $top?: number
            $skip?: number
            $expand?: pum_PortfolioExpand
        }
        "pum_program1"?: {
            $select?: (keyof pum_Program)[]
            $top?: number
            $skip?: number
            $expand?: pum_ProgramExpand
        }
        "pum_user"?: {
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
 * Type-safe expand options for Assignment
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_Assignment @odata.bind operations
 */
export type pum_AssignmentBindings = {
    'pum_AssTask@odata.bind'?: string; // Bind to: pum_gantttask
    'pum_Initiative@odata.bind'?: string; // Bind to: pum_initiative
    'pum_Portfolio1@odata.bind'?: string; // Bind to: pum_portfolio
    'pum_Program1@odata.bind'?: string; // Bind to: pum_program
    'pum_Resource@odata.bind'?: string; // Bind to: pum_resource
    'pum_User@odata.bind'?: string; // Bind to: systemuser
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating pum_Assignment @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_AssignmentBindings = {
    /** Create @odata.bind for pum_asstask -> pum_gantttask */
    pum_asstask: (id: string): { 'pum_AssTask@odata.bind': string } => ({
        'pum_AssTask@odata.bind': `/pum_gantttasks(${id})`
    }),
    /** Create @odata.bind for pum_initiative -> pum_initiative */
    pum_initiative: (id: string): { 'pum_Initiative@odata.bind': string } => ({
        'pum_Initiative@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_portfolio1 -> pum_portfolio */
    pum_portfolio1: (id: string): { 'pum_Portfolio1@odata.bind': string } => ({
        'pum_Portfolio1@odata.bind': `/pum_portfolios(${id})`
    }),
    /** Create @odata.bind for pum_program1 -> pum_program */
    pum_program1: (id: string): { 'pum_Program1@odata.bind': string } => ({
        'pum_Program1@odata.bind': `/pum_programs(${id})`
    }),
    /** Create @odata.bind for pum_user -> systemuser */
    pum_user: (id: string): { 'pum_User@odata.bind': string } => ({
        'pum_User@odata.bind': `/systemusers(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type pum_AssignmentCreate = Partial<pum_Assignment> & Partial<pum_AssignmentBindings> & {
    pum_taskname: string; // Required for create
};

export type pum_AssignmentUpdate = Partial<Omit<pum_Assignment, 'pum_assignmentid'>> & Partial<pum_AssignmentBindings> & {
    pum_assignmentid: string; // Required for update
};

/**
 * Runtime metadata for Assignment
 * Provides entity schema information for API operations
 */
export const pum_AssignmentMeta = {
    logicalName: "pum_assignment",
    schemaName: "pum_Assignment",
    displayName: "Assignment",
    entitySetName: "pum_assignments",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_assignmentid",
        attributeType: "Uniqueidentifier",
        displayName: "Assignment"
    },
    primaryName: {
        logicalName: "pum_taskname",
        attributeType: "String",
        displayName: "Task Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_asstask", "pum_initiative", "pum_portfolio1", "pum_program1", "pum_resource", "pum_user", "transactioncurrencyid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_taskname", "statecode"],
    optionSets: ["pum_kanbanassignmentchoices", "pum_assignment_statecode", "pum_assignment_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_AssTask", // Relationship
        "pum_Initiative", // Relationship
        "pum_Portfolio1", // Relationship
        "pum_Program1", // Relationship
        "pum_Resource", // Relationship
        "pum_User", // Relationship
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
        "pum_asstask": {
            relationshipName: "pum_asstask",
            targetEntityLogicalName: "pum_gantttask",
            targetEntitySetName: "pum_gantttasks",
            relationshipType: "ManyToOne"
        },
        "pum_initiative": {
            relationshipName: "pum_initiative",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
        "pum_portfolio1": {
            relationshipName: "pum_portfolio1",
            targetEntityLogicalName: "pum_portfolio",
            targetEntitySetName: "pum_portfolios",
            relationshipType: "ManyToOne"
        },
        "pum_program1": {
            relationshipName: "pum_program1",
            targetEntityLogicalName: "pum_program",
            targetEntitySetName: "pum_programs",
            relationshipType: "ManyToOne"
        },
        "pum_resource": {
            relationshipName: "pum_resource",
            targetEntityLogicalName: "pum_resource",
            targetEntitySetName: "pum_resources",
            relationshipType: "ManyToOne"
        },
        "pum_user": {
            relationshipName: "pum_user",
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
    generated: "2025-08-10T19:04:22.101Z"
} as const;
