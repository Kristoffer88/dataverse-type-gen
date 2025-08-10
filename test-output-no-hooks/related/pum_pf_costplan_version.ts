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
 * Status of the Cost Plan Version PF
 * LogicalName: pum_pf_costplan_version_statecode
 * Global: false
 * Custom: true
 */
export const PumPfCostplanVersionStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumPfCostplanVersionStatecodeValue = (typeof PumPfCostplanVersionStatecode)[keyof typeof PumPfCostplanVersionStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Cost Plan Version PF
 * LogicalName: pum_pf_costplan_version_statuscode
 * Global: false
 * Custom: true
 */
export const PumPfCostplanVersionStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumPfCostplanVersionStatuscodeValue = (typeof PumPfCostplanVersionStatuscode)[keyof typeof PumPfCostplanVersionStatuscode]["Value"];


/**
 * Cost Plan Version PF
 * Entity: pum_pf_costplan_version
 * Schema: pum_pf_costplan_version
 * Primary Key: pum_pf_costplan_versionid
 * Primary Name: pum_pf_costplan_version
 */
export interface pum_pf_costplan_version {
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
    /** Cost Plan Version Name - Required name field */
    pum_pf_costplan_version?: string;
    /** Cost Plan Version Approval Date */
    pum_pf_costplan_version_approvaldate?: Date | string;
    /** Cost Plan Version Approval Status */
    pum_pf_costplan_version_approvalstatus?: string;
    /** Cost Plan Version Date */
    pum_pf_costplan_version_date?: Date | string;
    /** Cost Plan Version Default */
    pum_pf_costplan_version_default?: boolean;
    /** Cost Plan Version Description */
    pum_pf_costplan_version_description?: string;
    /** Cost Plan Version PF - Unique identifier for entity instances */
    pum_pf_costplan_versionid: string;
    /** Initiative */
    pum_pf_initiative_cpv?: string; // Lookup to: pum_initiative
    /** _pum_pf_initiative_cpv_value - Resolved lookup GUID value */
    _pum_pf_initiative_cpv_value?: string; // Lookup value
    /** Plan of record */
    pum_planofrecord?: boolean;
    /** Status - Status of the Cost Plan Version PF */
    statecode: PumPfCostplanVersionStatecodeValue; // Option set: pum_pf_costplan_version_statecode
    /** Status Reason - Reason for the status of the Cost Plan Version PF */
    statuscode?: PumPfCostplanVersionStatuscodeValue; // Option set: pum_pf_costplan_version_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Cost Plan Version PF
 * Enables IntelliSense for $expand relationship names
 */
export type pum_pf_costplan_versionExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_pf_initiative_cpv"

/**
 * Type-safe expand options for Cost Plan Version PF
 * Supports both array format and object format with nested options
 */
export type pum_pf_costplan_versionExpand =
    | pum_pf_costplan_versionExpandableProperties[]
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
        "pum_pf_initiative_cpv"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
    }

/**
 * Type-safe expand options for Cost Plan Version PF
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_pf_costplan_version @odata.bind operations
 */
export type pum_pf_costplan_versionBindings = {
    'pum_pf_initiative_cpv@odata.bind'?: string; // Bind to: pum_initiative
};

/**
 * Type-safe helper functions for creating pum_pf_costplan_version @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_pf_costplan_versionBindings = {
    /** Create @odata.bind for pum_pf_initiative_cpv -> pum_initiative */
    pum_pf_initiative_cpv: (id: string): { 'pum_pf_initiative_cpv@odata.bind': string } => ({
        'pum_pf_initiative_cpv@odata.bind': `/pum_initiatives(${id})`
    }),
} as const;

export type pum_pf_costplan_versionCreate = Partial<pum_pf_costplan_version> & Partial<pum_pf_costplan_versionBindings> & {
    pum_pf_costplan_version: string; // Required for create
};

export type pum_pf_costplan_versionUpdate = Partial<Omit<pum_pf_costplan_version, 'pum_pf_costplan_versionid'>> & Partial<pum_pf_costplan_versionBindings> & {
    pum_pf_costplan_versionid: string; // Required for update
};

/**
 * Runtime metadata for Cost Plan Version PF
 * Provides entity schema information for API operations
 */
export const pum_pf_costplan_versionMeta = {
    logicalName: "pum_pf_costplan_version",
    schemaName: "pum_pf_costplan_version",
    displayName: "Cost Plan Version PF",
    entitySetName: "pum_pf_costplan_versions",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_pf_costplan_versionid",
        attributeType: "Uniqueidentifier",
        displayName: "Cost Plan Version PF"
    },
    primaryName: {
        logicalName: "pum_pf_costplan_version",
        attributeType: "String",
        displayName: "Cost Plan Version Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_pf_initiative_cpv"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_pf_costplan_version", "pum_pf_costplan_version_date", "pum_pf_costplan_version_description", "statecode"],
    optionSets: ["pum_pf_costplan_version_statecode", "pum_pf_costplan_version_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_pf_initiative_cpv", // Lookup field
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
        "pum_pf_initiative_cpv": {
            relationshipName: "pum_pf_initiative_cpv",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.220Z"
} as const;
