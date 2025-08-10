// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_pf_costplan_version } from './pum_pf_costplan_version.js'
import type { pum_pf_costplan_versionExpand } from './pum_pf_costplan_version.js'
import type { pum_pf_costspecification } from './pum_pf_costspecification.js'
import type { pum_pf_costspecificationExpand } from './pum_pf_costspecification.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { pum_Program } from './pum_program.js'
import type { pum_ProgramExpand } from './pum_program.js'

/**
 * Status
 * Status of the Power Financials Comment
 * LogicalName: pum_pf_powerfinancialscomment_statecode
 * Global: false
 * Custom: true
 */
export const PumPfPowerfinancialscommentStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumPfPowerfinancialscommentStatecodeValue = (typeof PumPfPowerfinancialscommentStatecode)[keyof typeof PumPfPowerfinancialscommentStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Power Financials Comment
 * LogicalName: pum_pf_powerfinancialscomment_statuscode
 * Global: false
 * Custom: true
 */
export const PumPfPowerfinancialscommentStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumPfPowerfinancialscommentStatuscodeValue = (typeof PumPfPowerfinancialscommentStatuscode)[keyof typeof PumPfPowerfinancialscommentStatuscode]["Value"];


/**
 * Power Financials Comment
 * Entity: pum_pf_powerfinancialscomment
 * Schema: pum_pf_powerfinancialscomment
 * Primary Key: pum_pf_powerfinancialscommentid
 * Primary Name: pum_pf_powerfinancialscomment
 */
export interface pum_pf_powerfinancialscomment {
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
    /** Custom Cost Hierarchy */
    pum_customcosthierarchy?: string; // Lookup to: pum_customcosthierarchy
    /** _pum_customcosthierarchy_value - Resolved lookup GUID value */
    _pum_customcosthierarchy_value?: string; // Lookup value
    /** Financial Structure */
    pum_financialstructure?: string; // Lookup to: pum_financialstructure
    /** _pum_financialstructure_value - Resolved lookup GUID value */
    _pum_financialstructure_value?: string; // Lookup value
    /** Comment Level */
    pum_pf_commentlevel?: number;
    /** Cost Category */
    pum_pf_costcategoryid?: string; // Lookup to: pum_pf_costcategory
    /** _pum_pf_costcategoryid_value - Resolved lookup GUID value */
    _pum_pf_costcategoryid_value?: string; // Lookup value
    /** Cost Plan Version Comments */
    pum_pf_costplan_version_comments?: string; // Lookup to: pum_pf_costplan_version
    /** _pum_pf_costplan_version_comments_value - Resolved lookup GUID value */
    _pum_pf_costplan_version_comments_value?: string; // Lookup value
    /** Cost Specification */
    pum_pf_costspecificationid?: string; // Lookup to: pum_pf_costspecification
    /** _pum_pf_costspecificationid_value - Resolved lookup GUID value */
    _pum_pf_costspecificationid_value?: string; // Lookup value
    /** Initiative */
    pum_pf_initiative_comment?: string; // Lookup to: pum_initiative
    /** _pum_pf_initiative_comment_value - Resolved lookup GUID value */
    _pum_pf_initiative_comment_value?: string; // Lookup value
    /** Power Financials Comment - Required name field */
    pum_pf_powerfinancialscomment?: string;
    /** Power Financials Comment - Unique identifier for entity instances */
    pum_pf_powerfinancialscommentid: string;
    /** Program */
    pum_pf_program_comment?: string; // Lookup to: pum_program
    /** _pum_pf_program_comment_value - Resolved lookup GUID value */
    _pum_pf_program_comment_value?: string; // Lookup value
    /** Status - Status of the Power Financials Comment */
    statecode: PumPfPowerfinancialscommentStatecodeValue; // Option set: pum_pf_powerfinancialscomment_statecode
    /** Status Reason - Reason for the status of the Power Financials Comment */
    statuscode?: PumPfPowerfinancialscommentStatuscodeValue; // Option set: pum_pf_powerfinancialscomment_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Power Financials Comment
 * Enables IntelliSense for $expand relationship names
 */
export type pum_pf_powerfinancialscommentExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_CustomCostHierarchy"
    | "pum_FinancialStructure"
    | "pum_pf_costcategoryid"
    | "pum_pf_costplan_version_comments"
    | "pum_pf_costspecificationid"
    | "pum_pf_initiative_comment"
    | "pum_pf_program_comment"

/**
 * Type-safe expand options for Power Financials Comment
 * Supports both array format and object format with nested options
 */
export type pum_pf_powerfinancialscommentExpand =
    | pum_pf_powerfinancialscommentExpandableProperties[]
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
        "pum_pf_costplan_version_comments"?: {
            $select?: (keyof pum_pf_costplan_version)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_costplan_versionExpand
        }
        "pum_pf_costspecificationid"?: {
            $select?: (keyof pum_pf_costspecification)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_costspecificationExpand
        }
        "pum_pf_initiative_comment"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
        "pum_pf_program_comment"?: {
            $select?: (keyof pum_Program)[]
            $top?: number
            $skip?: number
            $expand?: pum_ProgramExpand
        }
    }

/**
 * Type-safe expand options for Power Financials Comment
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_pf_powerfinancialscomment @odata.bind operations
 */
export type pum_pf_powerfinancialscommentBindings = {
    'pum_CustomCostHierarchy@odata.bind'?: string; // Bind to: pum_customcosthierarchy
    'pum_FinancialStructure@odata.bind'?: string; // Bind to: pum_financialstructure
    'pum_pf_costcategoryid@odata.bind'?: string; // Bind to: pum_pf_costcategory
    'pum_pf_costplan_version_comments@odata.bind'?: string; // Bind to: pum_pf_costplan_version
    'pum_pf_costspecificationid@odata.bind'?: string; // Bind to: pum_pf_costspecification
    'pum_pf_initiative_comment@odata.bind'?: string; // Bind to: pum_initiative
    'pum_pf_program_comment@odata.bind'?: string; // Bind to: pum_program
};

/**
 * Type-safe helper functions for creating pum_pf_powerfinancialscomment @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_pf_powerfinancialscommentBindings = {
    /** Create @odata.bind for pum_pf_costplan_version_comments -> pum_pf_costplan_version */
    pum_pf_costplan_version_comments: (id: string): { 'pum_pf_costplan_version_comments@odata.bind': string } => ({
        'pum_pf_costplan_version_comments@odata.bind': `/pum_pf_costplan_versions(${id})`
    }),
    /** Create @odata.bind for pum_pf_costspecificationid -> pum_pf_costspecification */
    pum_pf_costspecificationid: (id: string): { 'pum_pf_costspecificationid@odata.bind': string } => ({
        'pum_pf_costspecificationid@odata.bind': `/pum_pf_costspecifications(${id})`
    }),
    /** Create @odata.bind for pum_pf_initiative_comment -> pum_initiative */
    pum_pf_initiative_comment: (id: string): { 'pum_pf_initiative_comment@odata.bind': string } => ({
        'pum_pf_initiative_comment@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_pf_program_comment -> pum_program */
    pum_pf_program_comment: (id: string): { 'pum_pf_program_comment@odata.bind': string } => ({
        'pum_pf_program_comment@odata.bind': `/pum_programs(${id})`
    }),
} as const;

export type pum_pf_powerfinancialscommentCreate = Partial<pum_pf_powerfinancialscomment> & Partial<pum_pf_powerfinancialscommentBindings> & {
    pum_pf_powerfinancialscomment: string; // Required for create
};

export type pum_pf_powerfinancialscommentUpdate = Partial<Omit<pum_pf_powerfinancialscomment, 'pum_pf_powerfinancialscommentid'>> & Partial<pum_pf_powerfinancialscommentBindings> & {
    pum_pf_powerfinancialscommentid: string; // Required for update
};

/**
 * Runtime metadata for Power Financials Comment
 * Provides entity schema information for API operations
 */
export const pum_pf_powerfinancialscommentMeta = {
    logicalName: "pum_pf_powerfinancialscomment",
    schemaName: "pum_pf_powerfinancialscomment",
    displayName: "Power Financials Comment",
    entitySetName: "pum_pf_powerfinancialscomments",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_pf_powerfinancialscommentid",
        attributeType: "Uniqueidentifier",
        displayName: "Power Financials Comment"
    },
    primaryName: {
        logicalName: "pum_pf_powerfinancialscomment",
        attributeType: "String",
        displayName: "Power Financials Comment",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_customcosthierarchy", "pum_financialstructure", "pum_pf_costcategoryid", "pum_pf_costplan_version_comments", "pum_pf_costspecificationid", "pum_pf_initiative_comment", "pum_pf_program_comment"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_pf_commentlevel", "pum_pf_powerfinancialscomment", "statecode"],
    optionSets: ["pum_pf_powerfinancialscomment_statecode", "pum_pf_powerfinancialscomment_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_CustomCostHierarchy", // Relationship
        "pum_FinancialStructure", // Relationship
        "pum_pf_costcategoryid", // Lookup field
        "pum_pf_costplan_version_comments", // Lookup field
        "pum_pf_costspecificationid", // Lookup field
        "pum_pf_initiative_comment", // Lookup field
        "pum_pf_program_comment", // Lookup field
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
        "pum_customcosthierarchy": {
            relationshipName: "pum_customcosthierarchy",
            targetEntityLogicalName: "pum_customcosthierarchy",
            targetEntitySetName: "pum_customcosthierarchys",
            relationshipType: "ManyToOne"
        },
        "pum_financialstructure": {
            relationshipName: "pum_financialstructure",
            targetEntityLogicalName: "pum_financialstructure",
            targetEntitySetName: "pum_financialstructures",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costcategoryid": {
            relationshipName: "pum_pf_costcategoryid",
            targetEntityLogicalName: "pum_pf_costcategory",
            targetEntitySetName: "pum_pf_costcategorys",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costplan_version_comments": {
            relationshipName: "pum_pf_costplan_version_comments",
            targetEntityLogicalName: "pum_pf_costplan_version",
            targetEntitySetName: "pum_pf_costplan_versions",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costspecificationid": {
            relationshipName: "pum_pf_costspecificationid",
            targetEntityLogicalName: "pum_pf_costspecification",
            targetEntitySetName: "pum_pf_costspecifications",
            relationshipType: "ManyToOne"
        },
        "pum_pf_initiative_comment": {
            relationshipName: "pum_pf_initiative_comment",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
        "pum_pf_program_comment": {
            relationshipName: "pum_pf_program_comment",
            targetEntityLogicalName: "pum_program",
            targetEntitySetName: "pum_programs",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.354Z"
} as const;
