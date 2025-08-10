// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'

/**
 * Status
 * Status of the Roadmap Swimlane
 * LogicalName: pum_roadmapswimlane_statecode
 * Global: false
 * Custom: true
 */
export const PumRoadmapswimlaneStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumRoadmapswimlaneStatecodeValue = (typeof PumRoadmapswimlaneStatecode)[keyof typeof PumRoadmapswimlaneStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Roadmap Swimlane
 * LogicalName: pum_roadmapswimlane_statuscode
 * Global: false
 * Custom: true
 */
export const PumRoadmapswimlaneStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumRoadmapswimlaneStatuscodeValue = (typeof PumRoadmapswimlaneStatuscode)[keyof typeof PumRoadmapswimlaneStatuscode]["Value"];


/**
 * Roadmap Swimlane
 * Entity: pum_roadmapswimlane
 * Schema: pum_RoadmapSwimlane
 * Primary Key: pum_roadmapswimlaneid
 * Primary Name: pum_name
 */
export interface pum_RoadmapSwimlane {
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
    /** ColorCode */
    pum_colorcode?: string;
    /** End Date */
    pum_enddate?: Date | string;
    /** Name */
    pum_name?: string;
    /** Order */
    pum_order?: number;
    /** Related Roadmap */
    pum_relatedroadmap?: string; // Lookup to: pum_roadmap
    /** _pum_relatedroadmap_value - Resolved lookup GUID value */
    _pum_relatedroadmap_value?: string; // Lookup value
    /** Roadmap Swimlane - Unique identifier for entity instances */
    pum_roadmapswimlaneid: string;
    /** Start Date */
    pum_startdate?: Date | string;
    /** Status - Status of the Roadmap Swimlane */
    statecode: PumRoadmapswimlaneStatecodeValue; // Option set: pum_roadmapswimlane_statecode
    /** Status Reason - Reason for the status of the Roadmap Swimlane */
    statuscode?: PumRoadmapswimlaneStatuscodeValue; // Option set: pum_roadmapswimlane_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Roadmap Swimlane
 * Enables IntelliSense for $expand relationship names
 */
export type pum_RoadmapSwimlaneExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_RelatedRoadmap"

/**
 * Type-safe expand options for Roadmap Swimlane
 * Supports both array format and object format with nested options
 */
export type pum_RoadmapSwimlaneExpand =
    | pum_RoadmapSwimlaneExpandableProperties[]
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
    }

/**
 * Type-safe expand options for Roadmap Swimlane
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_RoadmapSwimlane @odata.bind operations
 */
export type pum_RoadmapSwimlaneBindings = {
    'pum_RelatedRoadmap@odata.bind'?: string; // Bind to: pum_roadmap
};

/**
 * Type-safe helper functions for creating pum_RoadmapSwimlane @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_RoadmapSwimlaneBindings = {
} as const;

export type pum_RoadmapSwimlaneCreate = Partial<pum_RoadmapSwimlane> & Partial<pum_RoadmapSwimlaneBindings> & {
    pum_name: string; // Required for create
};

export type pum_RoadmapSwimlaneUpdate = Partial<Omit<pum_RoadmapSwimlane, 'pum_roadmapswimlaneid'>> & Partial<pum_RoadmapSwimlaneBindings> & {
    pum_roadmapswimlaneid: string; // Required for update
};

/**
 * Runtime metadata for Roadmap Swimlane
 * Provides entity schema information for API operations
 */
export const pum_RoadmapSwimlaneMeta = {
    logicalName: "pum_roadmapswimlane",
    schemaName: "pum_RoadmapSwimlane",
    displayName: "Roadmap Swimlane",
    entitySetName: "pum_roadmapswimlanes",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_roadmapswimlaneid",
        attributeType: "Uniqueidentifier",
        displayName: "Roadmap Swimlane"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_relatedroadmap"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_name", "statecode"],
    optionSets: ["pum_roadmapswimlane_statecode", "pum_roadmapswimlane_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_RelatedRoadmap", // Relationship
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
        "pum_relatedroadmap": {
            relationshipName: "pum_relatedroadmap",
            targetEntityLogicalName: "pum_roadmap",
            targetEntitySetName: "pum_roadmaps",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.368Z"
} as const;
