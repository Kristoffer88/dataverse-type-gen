// Required imports
import type { PumStakeholderChoicesValue } from '../global-choices/pum_stakeholder_choices.js'
import type { PumStakeholderTypeValue } from '../global-choices/pum_stakeholder_type.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { pum_Program } from './pum_program.js'
import type { pum_ProgramExpand } from './pum_program.js'

/**
 * Status
 * Status of the Stakeholder
 * LogicalName: pum_stakeholder_statecode
 * Global: false
 * Custom: true
 */
export const PumStakeholderStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumStakeholderStatecodeValue = (typeof PumStakeholderStatecode)[keyof typeof PumStakeholderStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Stakeholder
 * LogicalName: pum_stakeholder_statuscode
 * Global: false
 * Custom: true
 */
export const PumStakeholderStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumStakeholderStatuscodeValue = (typeof PumStakeholderStatuscode)[keyof typeof PumStakeholderStatuscode]["Value"];


/**
 * Stakeholder
 * Entity: pum_stakeholder
 * Schema: pum_Stakeholder
 * Primary Key: pum_stakeholderid
 * Primary Name: pum_name
 */
export interface pum_Stakeholder {
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
    /** Email (External) */
    pum_emailexternal?: string;
    /** Influence */
    pum_influence?: PumStakeholderChoicesValue; // Option set: pum_stakeholder_choices
    /** Initiative */
    pum_initiative?: string; // Lookup to: pum_initiative
    /** _pum_initiative_value - Resolved lookup GUID value */
    _pum_initiative_value?: string; // Lookup value
    /** Interest */
    pum_interest?: PumStakeholderChoicesValue; // Option set: pum_stakeholder_choices
    /** Name - Required name field */
    pum_name?: string;
    /** Program */
    pum_program?: string; // Lookup to: pum_program
    /** _pum_program_value - Resolved lookup GUID value */
    _pum_program_value?: string; // Lookup value
    /** ID */
    pum_stakeholder_id?: string;
    /** Stakeholder - Unique identifier for entity instances */
    pum_stakeholderid: string;
    /** Initials */
    pum_stakeholderinitials?: string;
    /** Stakeholder Type */
    pum_stakeholdertype?: PumStakeholderTypeValue; // Option set: pum_stakeholder_type
    /** User (Internal) */
    pum_userinternal?: string; // Lookup to: systemuser
    /** _pum_userinternal_value - Resolved lookup GUID value */
    _pum_userinternal_value?: string; // Lookup value
    /** Status - Status of the Stakeholder */
    statecode: PumStakeholderStatecodeValue; // Option set: pum_stakeholder_statecode
    /** Status Reason - Reason for the status of the Stakeholder */
    statuscode?: PumStakeholderStatuscodeValue; // Option set: pum_stakeholder_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Stakeholder
 * Enables IntelliSense for $expand relationship names
 */
export type pum_StakeholderExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_Initiative"
    | "pum_Program"
    | "pum_UserInternal"

/**
 * Type-safe expand options for Stakeholder
 * Supports both array format and object format with nested options
 */
export type pum_StakeholderExpand =
    | pum_StakeholderExpandableProperties[]
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
        "pum_program"?: {
            $select?: (keyof pum_Program)[]
            $top?: number
            $skip?: number
            $expand?: pum_ProgramExpand
        }
        "pum_userinternal"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
    }

/**
 * Type-safe expand options for Stakeholder
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_Stakeholder @odata.bind operations
 */
export type pum_StakeholderBindings = {
    'pum_Initiative@odata.bind'?: string; // Bind to: pum_initiative
    'pum_Program@odata.bind'?: string; // Bind to: pum_program
    'pum_UserInternal@odata.bind'?: string; // Bind to: systemuser
};

/**
 * Type-safe helper functions for creating pum_Stakeholder @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_StakeholderBindings = {
    /** Create @odata.bind for pum_initiative -> pum_initiative */
    pum_initiative: (id: string): { 'pum_Initiative@odata.bind': string } => ({
        'pum_Initiative@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_program -> pum_program */
    pum_program: (id: string): { 'pum_Program@odata.bind': string } => ({
        'pum_Program@odata.bind': `/pum_programs(${id})`
    }),
    /** Create @odata.bind for pum_userinternal -> systemuser */
    pum_userinternal: (id: string): { 'pum_UserInternal@odata.bind': string } => ({
        'pum_UserInternal@odata.bind': `/systemusers(${id})`
    }),
} as const;

export type pum_StakeholderCreate = Partial<pum_Stakeholder> & Partial<pum_StakeholderBindings> & {
    pum_name: string; // Required for create
};

export type pum_StakeholderUpdate = Partial<Omit<pum_Stakeholder, 'pum_stakeholderid'>> & Partial<pum_StakeholderBindings> & {
    pum_stakeholderid: string; // Required for update
};

/**
 * Runtime metadata for Stakeholder
 * Provides entity schema information for API operations
 */
export const pum_StakeholderMeta = {
    logicalName: "pum_stakeholder",
    schemaName: "pum_Stakeholder",
    displayName: "Stakeholder",
    entitySetName: "pum_stakeholders",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_stakeholderid",
        attributeType: "Uniqueidentifier",
        displayName: "Stakeholder"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_initiative", "pum_program", "pum_userinternal"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_name", "pum_stakeholdertype", "statecode"],
    optionSets: ["pum_stakeholder_choices", "pum_stakeholder_choices", "pum_stakeholder_type", "pum_stakeholder_statecode", "pum_stakeholder_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_Initiative", // Relationship
        "pum_Program", // Relationship
        "pum_UserInternal", // Relationship
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
        "pum_program": {
            relationshipName: "pum_program",
            targetEntityLogicalName: "pum_program",
            targetEntitySetName: "pum_programs",
            relationshipType: "ManyToOne"
        },
        "pum_userinternal": {
            relationshipName: "pum_userinternal",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.236Z"
} as const;
