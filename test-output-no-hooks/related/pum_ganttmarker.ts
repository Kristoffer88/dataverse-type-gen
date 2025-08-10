// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'

/**
 * Status
 * Status of the Gantt Marker
 * LogicalName: pum_ganttmarker_statecode
 * Global: false
 * Custom: true
 */
export const PumGanttmarkerStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumGanttmarkerStatecodeValue = (typeof PumGanttmarkerStatecode)[keyof typeof PumGanttmarkerStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Gantt Marker
 * LogicalName: pum_ganttmarker_statuscode
 * Global: false
 * Custom: true
 */
export const PumGanttmarkerStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumGanttmarkerStatuscodeValue = (typeof PumGanttmarkerStatuscode)[keyof typeof PumGanttmarkerStatuscode]["Value"];


/**
 * Gantt Marker
 * Used for storing markers on project level that are visualized in Power Gantt as vertical lines
 * Entity: pum_ganttmarker
 * Schema: pum_GanttMarker
 * Primary Key: pum_ganttmarkerid
 * Primary Name: pum_name
 */
export interface pum_GanttMarker {
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
    /** Initiative */
    kra_initiative?: string; // Lookup to: pum_initiative
    /** _kra_initiative_value - Resolved lookup GUID value */
    _kra_initiative_value?: string; // Lookup value
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
    /** End Date */
    pum_enddate?: Date | string;
    /** Gantt Marker - Unique identifier for entity instances */
    pum_ganttmarkerid: string;
    /** Title */
    pum_name?: string;
    /** Start Date */
    pum_startdate?: Date | string;
    /** Status - Status of the Gantt Marker */
    statecode: PumGanttmarkerStatecodeValue; // Option set: pum_ganttmarker_statecode
    /** Status Reason - Reason for the status of the Gantt Marker */
    statuscode?: PumGanttmarkerStatuscodeValue; // Option set: pum_ganttmarker_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Gantt Marker
 * Enables IntelliSense for $expand relationship names
 */
export type pum_GanttMarkerExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "kra_Initiative"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"

/**
 * Type-safe expand options for Gantt Marker
 * Supports both array format and object format with nested options
 */
export type pum_GanttMarkerExpand =
    | pum_GanttMarkerExpandableProperties[]
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
    }

/**
 * Type-safe expand options for Gantt Marker
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_GanttMarker @odata.bind operations
 */
export type pum_GanttMarkerBindings = {
    'kra_Initiative@odata.bind'?: string; // Bind to: pum_initiative
};

/**
 * Type-safe helper functions for creating pum_GanttMarker @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_GanttMarkerBindings = {
    /** Create @odata.bind for kra_initiative -> pum_initiative */
    kra_initiative: (id: string): { 'kra_Initiative@odata.bind': string } => ({
        'kra_Initiative@odata.bind': `/pum_initiatives(${id})`
    }),
} as const;

export type pum_GanttMarkerCreate = Partial<pum_GanttMarker> & Partial<pum_GanttMarkerBindings> & {
    pum_name: string; // Required for create
};

export type pum_GanttMarkerUpdate = Partial<Omit<pum_GanttMarker, 'pum_ganttmarkerid'>> & Partial<pum_GanttMarkerBindings> & {
    pum_ganttmarkerid: string; // Required for update
};

/**
 * Runtime metadata for Gantt Marker
 * Provides entity schema information for API operations
 */
export const pum_GanttMarkerMeta = {
    logicalName: "pum_ganttmarker",
    schemaName: "pum_GanttMarker",
    displayName: "Gantt Marker",
    entitySetName: "pum_ganttmarkers",
    isCustomEntity: true,
    description: "Used for storing markers on project level that are visualized in Power Gantt as vertical lines",
    primaryKey: {
        logicalName: "pum_ganttmarkerid",
        attributeType: "Uniqueidentifier",
        displayName: "Gantt Marker"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Title",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "kra_initiative", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_startdate", "statecode"],
    optionSets: ["pum_ganttmarker_statecode", "pum_ganttmarker_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "kra_Initiative", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
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
    },
    generated: "2025-08-10T19:04:22.346Z"
} as const;
