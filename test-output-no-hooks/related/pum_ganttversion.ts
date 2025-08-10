// Required imports
import type { PumPublishingstateValue } from '../global-choices/pum_publishingstate.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { pum_Program } from './pum_program.js'
import type { pum_ProgramExpand } from './pum_program.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'

/**
 * Status
 * Status of the Gantt Version
 * LogicalName: pum_ganttversion_statecode
 * Global: false
 * Custom: true
 */
export const PumGanttversionStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumGanttversionStatecodeValue = (typeof PumGanttversionStatecode)[keyof typeof PumGanttversionStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Gantt Version
 * LogicalName: pum_ganttversion_statuscode
 * Global: false
 * Custom: true
 */
export const PumGanttversionStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumGanttversionStatuscodeValue = (typeof PumGanttversionStatuscode)[keyof typeof PumGanttversionStatuscode]["Value"];


/**
 * Gantt Version
 * Entity: pum_ganttversion
 * Schema: pum_GanttVersion
 * Primary Key: pum_ganttversionid
 * Primary Name: pum_name
 */
export interface pum_GanttVersion {
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
    /** Program */
    kra_program?: string; // Lookup to: pum_program
    /** _kra_program_value - Resolved lookup GUID value */
    _kra_program_value?: string; // Lookup value
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
    /** Gantt Version - Unique identifier for entity instances */
    pum_ganttversionid: string;
    /** Master Version */
    pum_masterversion?: string; // Lookup to: pum_ganttversion
    /** _pum_masterversion_value - Resolved lookup GUID value */
    _pum_masterversion_value?: string; // Lookup value
    /** Name */
    pum_name?: string;
    /** Publishing State */
    pum_publishingstate?: PumPublishingstateValue; // Option set: pum_publishingstate
    /** Publish Started On */
    pum_publishstartedon?: Date | string;
    /** Status - Status of the Gantt Version */
    statecode: PumGanttversionStatecodeValue; // Option set: pum_ganttversion_statecode
    /** Status Reason - Reason for the status of the Gantt Version */
    statuscode?: PumGanttversionStatuscodeValue; // Option set: pum_ganttversion_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Gantt Version
 * Enables IntelliSense for $expand relationship names
 */
export type pum_GanttVersionExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "kra_Initiative"
    | "kra_Program"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_MasterVersion"

/**
 * Type-safe expand options for Gantt Version
 * Supports both array format and object format with nested options
 */
export type pum_GanttVersionExpand =
    | pum_GanttVersionExpandableProperties[]
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
        "kra_program"?: {
            $select?: (keyof pum_Program)[]
            $top?: number
            $skip?: number
            $expand?: pum_ProgramExpand
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
        "pum_masterversion"?: {
            $select?: (keyof pum_GanttVersion)[]
            $top?: number
            $skip?: number
            $expand?: pum_GanttVersionExpand
        }
    }

/**
 * Type-safe expand options for Gantt Version
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_GanttVersion @odata.bind operations
 */
export type pum_GanttVersionBindings = {
    'kra_Initiative@odata.bind'?: string; // Bind to: pum_initiative
    'kra_Program@odata.bind'?: string; // Bind to: pum_program
    'pum_MasterVersion@odata.bind'?: string; // Bind to: pum_ganttversion
};

/**
 * Type-safe helper functions for creating pum_GanttVersion @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_GanttVersionBindings = {
    /** Create @odata.bind for kra_initiative -> pum_initiative */
    kra_initiative: (id: string): { 'kra_Initiative@odata.bind': string } => ({
        'kra_Initiative@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for kra_program -> pum_program */
    kra_program: (id: string): { 'kra_Program@odata.bind': string } => ({
        'kra_Program@odata.bind': `/pum_programs(${id})`
    }),
    /** Create @odata.bind for pum_masterversion -> pum_ganttversion */
    pum_masterversion: (id: string): { 'pum_MasterVersion@odata.bind': string } => ({
        'pum_MasterVersion@odata.bind': `/pum_ganttversions(${id})`
    }),
} as const;

export type pum_GanttVersionCreate = Partial<pum_GanttVersion> & Partial<pum_GanttVersionBindings> & {
    pum_name: string; // Required for create
};

export type pum_GanttVersionUpdate = Partial<Omit<pum_GanttVersion, 'pum_ganttversionid'>> & Partial<pum_GanttVersionBindings> & {
    pum_ganttversionid: string; // Required for update
};

/**
 * Runtime metadata for Gantt Version
 * Provides entity schema information for API operations
 */
export const pum_GanttVersionMeta = {
    logicalName: "pum_ganttversion",
    schemaName: "pum_GanttVersion",
    displayName: "Gantt Version",
    entitySetName: "pum_ganttversions",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_ganttversionid",
        attributeType: "Uniqueidentifier",
        displayName: "Gantt Version"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "kra_initiative", "kra_program", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_masterversion"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_name", "statecode"],
    optionSets: ["pum_publishingstate", "pum_ganttversion_statecode", "pum_ganttversion_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "kra_Initiative", // Relationship
        "kra_Program", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_MasterVersion", // Relationship
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
        "kra_program": {
            relationshipName: "kra_program",
            targetEntityLogicalName: "pum_program",
            targetEntitySetName: "pum_programs",
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
        "pum_masterversion": {
            relationshipName: "pum_masterversion",
            targetEntityLogicalName: "pum_ganttversion",
            targetEntitySetName: "pum_ganttversions",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.112Z"
} as const;
