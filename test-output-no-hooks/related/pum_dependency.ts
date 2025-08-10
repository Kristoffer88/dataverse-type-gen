// Required imports
import type { PumDependencystatusValue } from '../global-choices/pum_dependencystatus.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_Idea } from './pum_idea.js'
import type { pum_IdeaExpand } from './pum_idea.js'

/**
 * Status
 * Status of the Dependency
 * LogicalName: pum_dependency_statecode
 * Global: false
 * Custom: true
 */
export const PumDependencyStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumDependencyStatecodeValue = (typeof PumDependencyStatecode)[keyof typeof PumDependencyStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Dependency
 * LogicalName: pum_dependency_statuscode
 * Global: false
 * Custom: true
 */
export const PumDependencyStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumDependencyStatuscodeValue = (typeof PumDependencyStatuscode)[keyof typeof PumDependencyStatuscode]["Value"];


/**
 * Dependency
 * Entity: pum_dependency
 * Schema: pum_Dependency
 * Primary Key: pum_dependencyid
 * Primary Name: pum_name
 */
export interface pum_Dependency {
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
    /** Dependency - Unique identifier for entity instances */
    pum_dependencyid: string;
    /** Due Date */
    pum_duedate?: Date | string;
    /** From */
    pum_from?: string; // Lookup to: pum_idea, pum_initiative, pum_program
    /** _pum_from_value - Resolved lookup GUID value */
    _pum_from_value?: string; // Lookup value
    /** KPI */
    pum_kpi?: PumDependencystatusValue; // Option set: pum_dependencystatus
    /** Dependency Title */
    pum_name?: string;
    /** To */
    pum_to?: string; // Lookup to: pum_idea, pum_initiative, pum_program
    /** _pum_to_value - Resolved lookup GUID value */
    _pum_to_value?: string; // Lookup value
    /** Status - Status of the Dependency */
    statecode: PumDependencyStatecodeValue; // Option set: pum_dependency_statecode
    /** Status Reason - Reason for the status of the Dependency */
    statuscode?: PumDependencyStatuscodeValue; // Option set: pum_dependency_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Dependency
 * Enables IntelliSense for $expand relationship names
 */
export type pum_DependencyExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_From"
    | "pum_To"

/**
 * Type-safe expand options for Dependency
 * Supports both array format and object format with nested options
 */
export type pum_DependencyExpand =
    | pum_DependencyExpandableProperties[]
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
        "pum_from"?: {
            $select?: (keyof pum_Idea)[]
            $top?: number
            $skip?: number
            $expand?: pum_IdeaExpand
        }
        "pum_to"?: {
            $select?: (keyof pum_Idea)[]
            $top?: number
            $skip?: number
            $expand?: pum_IdeaExpand
        }
    }

/**
 * Type-safe expand options for Dependency
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_Dependency @odata.bind operations
 */
export type pum_DependencyBindings = {
    'pum_From@odata.bind'?: string; // Bind to: pum_idea, pum_initiative, pum_program
    'pum_To@odata.bind'?: string; // Bind to: pum_idea, pum_initiative, pum_program
};

/**
 * Type-safe helper functions for creating pum_Dependency @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_DependencyBindings = {
    /** Create @odata.bind for pum_from -> pum_idea | pum_initiative | pum_program */
    pum_from: (id: string, entityType: 'pum_idea' | 'pum_initiative' | 'pum_program') => {
        const entitySets = {
            'pum_idea': 'pum_ideas',
            'pum_initiative': 'pum_initiatives',
            'pum_program': 'pum_programs',
        } as const;
        return { 'pum_From@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
    /** Create @odata.bind for pum_to -> pum_idea | pum_initiative | pum_program */
    pum_to: (id: string, entityType: 'pum_idea' | 'pum_initiative' | 'pum_program') => {
        const entitySets = {
            'pum_idea': 'pum_ideas',
            'pum_initiative': 'pum_initiatives',
            'pum_program': 'pum_programs',
        } as const;
        return { 'pum_To@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
} as const;

export type pum_DependencyCreate = Partial<pum_Dependency> & Partial<pum_DependencyBindings> & {
    pum_name: string; // Required for create
};

export type pum_DependencyUpdate = Partial<Omit<pum_Dependency, 'pum_dependencyid'>> & Partial<pum_DependencyBindings> & {
    pum_dependencyid: string; // Required for update
};

/**
 * Runtime metadata for Dependency
 * Provides entity schema information for API operations
 */
export const pum_DependencyMeta = {
    logicalName: "pum_dependency",
    schemaName: "pum_Dependency",
    displayName: "Dependency",
    entitySetName: "pum_dependencies",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_dependencyid",
        attributeType: "Uniqueidentifier",
        displayName: "Dependency"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Dependency Title",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_from", "pum_to"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_duedate", "pum_name", "statecode"],
    optionSets: ["pum_dependencystatus", "pum_dependency_statecode", "pum_dependency_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_From", // Relationship
        "pum_To", // Relationship
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
        "pum_from": {
            relationshipName: "pum_from",
            targetEntityLogicalName: "pum_idea",
            targetEntitySetName: "pum_ideas",
            relationshipType: "ManyToOne"
        },
        "pum_to": {
            relationshipName: "pum_to",
            targetEntityLogicalName: "pum_idea",
            targetEntitySetName: "pum_ideas",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.241Z"
} as const;
