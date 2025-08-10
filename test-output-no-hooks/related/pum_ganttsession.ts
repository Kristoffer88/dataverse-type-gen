// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'

/**
 * Status
 * Status of the GanttSession
 * LogicalName: pum_ganttsession_statecode
 * Global: false
 * Custom: true
 */
export const PumGanttsessionStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumGanttsessionStatecodeValue = (typeof PumGanttsessionStatecode)[keyof typeof PumGanttsessionStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the GanttSession
 * LogicalName: pum_ganttsession_statuscode
 * Global: false
 * Custom: true
 */
export const PumGanttsessionStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumGanttsessionStatuscodeValue = (typeof PumGanttsessionStatuscode)[keyof typeof PumGanttsessionStatuscode]["Value"];


/**
 * Gantt Session
 * This tables holds information about the users that are logged into the Gantt. The session tables becomes relevant if more than one user is connected at the same time.
 * Entity: pum_ganttsession
 * Schema: pum_GanttSession
 * Primary Key: pum_ganttsessionid
 * Primary Name: pum_name
 */
export interface pum_GanttSession {
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
    /** GanttSession - Unique identifier for entity instances */
    pum_ganttsessionid: string;
    /** LastAccessed */
    pum_lastaccessed?: Date | string;
    /** Name */
    pum_name?: string;
    /** Project */
    pum_project?: string; // Lookup to: pum_initiative
    /** _pum_project_value - Resolved lookup GUID value */
    _pum_project_value?: string; // Lookup value
    /** RefreshingTaskSequence */
    pum_refreshingtasksequence?: boolean;
    /** User */
    pum_user?: string; // Lookup to: systemuser
    /** _pum_user_value - Resolved lookup GUID value */
    _pum_user_value?: string; // Lookup value
    /** Status - Status of the GanttSession */
    statecode: PumGanttsessionStatecodeValue; // Option set: pum_ganttsession_statecode
    /** Status Reason - Reason for the status of the GanttSession */
    statuscode?: PumGanttsessionStatuscodeValue; // Option set: pum_ganttsession_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Gantt Session
 * Enables IntelliSense for $expand relationship names
 */
export type pum_GanttSessionExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_Project"
    | "pum_User"

/**
 * Type-safe expand options for Gantt Session
 * Supports both array format and object format with nested options
 */
export type pum_GanttSessionExpand =
    | pum_GanttSessionExpandableProperties[]
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
        "pum_project"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
        "pum_user"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
    }

/**
 * Type-safe expand options for Gantt Session
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_GanttSession @odata.bind operations
 */
export type pum_GanttSessionBindings = {
    'pum_Project@odata.bind'?: string; // Bind to: pum_initiative
    'pum_User@odata.bind'?: string; // Bind to: systemuser
};

/**
 * Type-safe helper functions for creating pum_GanttSession @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_GanttSessionBindings = {
    /** Create @odata.bind for pum_project -> pum_initiative */
    pum_project: (id: string): { 'pum_Project@odata.bind': string } => ({
        'pum_Project@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_user -> systemuser */
    pum_user: (id: string): { 'pum_User@odata.bind': string } => ({
        'pum_User@odata.bind': `/systemusers(${id})`
    }),
} as const;

export type pum_GanttSessionCreate = Partial<pum_GanttSession> & Partial<pum_GanttSessionBindings> & {
    pum_name: string; // Required for create
};

export type pum_GanttSessionUpdate = Partial<Omit<pum_GanttSession, 'pum_ganttsessionid'>> & Partial<pum_GanttSessionBindings> & {
    pum_ganttsessionid: string; // Required for update
};

/**
 * Runtime metadata for Gantt Session
 * Provides entity schema information for API operations
 */
export const pum_GanttSessionMeta = {
    logicalName: "pum_ganttsession",
    schemaName: "pum_GanttSession",
    displayName: "Gantt Session",
    entitySetName: "pum_ganttsessions",
    isCustomEntity: true,
    description: "This tables holds information about the users that are logged into the Gantt. The session tables becomes relevant if more than one user is connected at the same time.",
    primaryKey: {
        logicalName: "pum_ganttsessionid",
        attributeType: "Uniqueidentifier",
        displayName: "GanttSession"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_project", "pum_user"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "statecode"],
    optionSets: ["pum_ganttsession_statecode", "pum_ganttsession_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_Project", // Relationship
        "pum_User", // Relationship
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
        "pum_project": {
            relationshipName: "pum_project",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
        "pum_user": {
            relationshipName: "pum_user",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.104Z"
} as const;
