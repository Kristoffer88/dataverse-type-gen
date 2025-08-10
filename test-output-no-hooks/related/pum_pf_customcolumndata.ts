// Required imports
import type { PumPfCostleveltypeSingleValue } from '../global-choices/pum_pf_costleveltype_single.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_pf_costspecification } from './pum_pf_costspecification.js'
import type { pum_pf_costspecificationExpand } from './pum_pf_costspecification.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { pum_Program } from './pum_program.js'
import type { pum_ProgramExpand } from './pum_program.js'

/**
 * Status
 * Status of the Custom column data
 * LogicalName: pum_pf_customcolumndata_statecode
 * Global: false
 * Custom: true
 */
export const PumPfCustomcolumndataStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumPfCustomcolumndataStatecodeValue = (typeof PumPfCustomcolumndataStatecode)[keyof typeof PumPfCustomcolumndataStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Custom column data
 * LogicalName: pum_pf_customcolumndata_statuscode
 * Global: false
 * Custom: true
 */
export const PumPfCustomcolumndataStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumPfCustomcolumndataStatuscodeValue = (typeof PumPfCustomcolumndataStatuscode)[keyof typeof PumPfCustomcolumndataStatuscode]["Value"];


/**
 * Custom Column Data
 * Entity: pum_pf_customcolumndata
 * Schema: pum_pf_customcolumndata
 * Primary Key: pum_pf_customcolumndataid
 * Primary Name: pum_customcolumnname
 */
export interface pum_pf_customcolumndata {
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
    /** Custom Column Name - Required name field */
    pum_customcolumnname?: string;
    /** decimal_value */
    pum_decimal_value?: number;
    /** Financial Structure */
    pum_financialstructure?: string; // Lookup to: pum_financialstructure
    /** _pum_financialstructure_value - Resolved lookup GUID value */
    _pum_financialstructure_value?: string; // Lookup value
    /** Cost Category */
    pum_pf_costcategory?: string; // Lookup to: pum_pf_costcategory
    /** _pum_pf_costcategory_value - Resolved lookup GUID value */
    _pum_pf_costcategory_value?: string; // Lookup value
    /** Cost Level Type */
    pum_pf_costleveltype?: PumPfCostleveltypeSingleValue; // Option set: pum_pf_costleveltype_single
    /** Cost Mapping */
    pum_pf_costmappingpolymorph?: string; // Lookup to: pum_pf_costarea, pum_pf_costcategory, pum_pf_costspecification
    /** _pum_pf_costmappingpolymorph_value - Resolved lookup GUID value */
    _pum_pf_costmappingpolymorph_value?: string; // Lookup value
    /** Cost Specification */
    pum_pf_costspecification?: string; // Lookup to: pum_pf_costspecification
    /** _pum_pf_costspecification_value - Resolved lookup GUID value */
    _pum_pf_costspecification_value?: string; // Lookup value
    /** Value */
    pum_pf_customcolumndata_value?: string;
    /** Custom Column Data - Unique identifier for entity instances */
    pum_pf_customcolumndataid: string;
    /** Custom Column Row ID */
    pum_pf_customcolumnrowid?: string;
    /** Project */
    pum_pf_project_customcolumn?: string; // Lookup to: pum_initiative
    /** _pum_pf_project_customcolumn_value - Resolved lookup GUID value */
    _pum_pf_project_customcolumn_value?: string; // Lookup value
    /** Row Id */
    pum_pf_rowid?: string;
    /** Program */
    pum_program?: string; // Lookup to: pum_program
    /** _pum_program_value - Resolved lookup GUID value */
    _pum_program_value?: string; // Lookup value
    /** Value Display Name */
    pum_valuedisplayname?: string;
    /** Status - Status of the Custom column data */
    statecode: PumPfCustomcolumndataStatecodeValue; // Option set: pum_pf_customcolumndata_statecode
    /** Status Reason - Reason for the status of the Custom column data */
    statuscode?: PumPfCustomcolumndataStatuscodeValue; // Option set: pum_pf_customcolumndata_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Custom Column Data
 * Enables IntelliSense for $expand relationship names
 */
export type pum_pf_customcolumndataExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_FinancialStructure"
    | "pum_pf_CostCategory"
    | "pum_pf_costmappingpolymorph"
    | "pum_pf_CostSpecification"
    | "pum_pf_project_customcolumn"
    | "pum_Program"

/**
 * Type-safe expand options for Custom Column Data
 * Supports both array format and object format with nested options
 */
export type pum_pf_customcolumndataExpand =
    | pum_pf_customcolumndataExpandableProperties[]
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
        "pum_pf_costspecification"?: {
            $select?: (keyof pum_pf_costspecification)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_costspecificationExpand
        }
        "pum_pf_project_customcolumn"?: {
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
    }

/**
 * Type-safe expand options for Custom Column Data
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_pf_customcolumndata @odata.bind operations
 */
export type pum_pf_customcolumndataBindings = {
    'pum_FinancialStructure@odata.bind'?: string; // Bind to: pum_financialstructure
    'pum_pf_CostCategory@odata.bind'?: string; // Bind to: pum_pf_costcategory
    'pum_pf_costmappingpolymorph@odata.bind'?: string; // Bind to: pum_pf_costarea, pum_pf_costcategory, pum_pf_costspecification
    'pum_pf_CostSpecification@odata.bind'?: string; // Bind to: pum_pf_costspecification
    'pum_pf_project_customcolumn@odata.bind'?: string; // Bind to: pum_initiative
    'pum_Program@odata.bind'?: string; // Bind to: pum_program
};

/**
 * Type-safe helper functions for creating pum_pf_customcolumndata @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_pf_customcolumndataBindings = {
    /** Create @odata.bind for pum_pf_costmappingpolymorph -> pum_pf_costspecification */
    pum_pf_costmappingpolymorph: (id: string, entityType: 'pum_pf_costspecification') => {
        const entitySets = {
            'pum_pf_costspecification': 'pum_pf_costspecifications',
        } as const;
        return { 'pum_pf_costmappingpolymorph@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
    /** Create @odata.bind for pum_pf_costspecification -> pum_pf_costspecification */
    pum_pf_costspecification: (id: string): { 'pum_pf_CostSpecification@odata.bind': string } => ({
        'pum_pf_CostSpecification@odata.bind': `/pum_pf_costspecifications(${id})`
    }),
    /** Create @odata.bind for pum_pf_project_customcolumn -> pum_initiative */
    pum_pf_project_customcolumn: (id: string): { 'pum_pf_project_customcolumn@odata.bind': string } => ({
        'pum_pf_project_customcolumn@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_program -> pum_program */
    pum_program: (id: string): { 'pum_Program@odata.bind': string } => ({
        'pum_Program@odata.bind': `/pum_programs(${id})`
    }),
} as const;

export type pum_pf_customcolumndataCreate = Partial<pum_pf_customcolumndata> & Partial<pum_pf_customcolumndataBindings> & {
    pum_customcolumnname: string; // Required for create
};

export type pum_pf_customcolumndataUpdate = Partial<Omit<pum_pf_customcolumndata, 'pum_pf_customcolumndataid'>> & Partial<pum_pf_customcolumndataBindings> & {
    pum_pf_customcolumndataid: string; // Required for update
};

/**
 * Runtime metadata for Custom Column Data
 * Provides entity schema information for API operations
 */
export const pum_pf_customcolumndataMeta = {
    logicalName: "pum_pf_customcolumndata",
    schemaName: "pum_pf_customcolumndata",
    displayName: "Custom Column Data",
    entitySetName: "pum_pf_customcolumndatas",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_pf_customcolumndataid",
        attributeType: "Uniqueidentifier",
        displayName: "Custom Column Data"
    },
    primaryName: {
        logicalName: "pum_customcolumnname",
        attributeType: "String",
        displayName: "Custom Column Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_financialstructure", "pum_pf_costcategory", "pum_pf_costmappingpolymorph", "pum_pf_costspecification", "pum_pf_project_customcolumn", "pum_program"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_customcolumnname", "statecode"],
    optionSets: ["pum_pf_costleveltype_single", "pum_pf_customcolumndata_statecode", "pum_pf_customcolumndata_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_FinancialStructure", // Relationship
        "pum_pf_CostCategory", // Relationship
        "pum_pf_costmappingpolymorph", // Lookup field
        "pum_pf_CostSpecification", // Relationship
        "pum_pf_project_customcolumn", // Lookup field
        "pum_Program", // Relationship
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
        "pum_financialstructure": {
            relationshipName: "pum_financialstructure",
            targetEntityLogicalName: "pum_financialstructure",
            targetEntitySetName: "pum_financialstructures",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costcategory": {
            relationshipName: "pum_pf_costcategory",
            targetEntityLogicalName: "pum_pf_costcategory",
            targetEntitySetName: "pum_pf_costcategorys",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costmappingpolymorph": {
            relationshipName: "pum_pf_costmappingpolymorph",
            targetEntityLogicalName: "pum_pf_costarea",
            targetEntitySetName: "pum_pf_costareas",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costspecification": {
            relationshipName: "pum_pf_costspecification",
            targetEntityLogicalName: "pum_pf_costspecification",
            targetEntitySetName: "pum_pf_costspecifications",
            relationshipType: "ManyToOne"
        },
        "pum_pf_project_customcolumn": {
            relationshipName: "pum_pf_project_customcolumn",
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
    },
    generated: "2025-08-10T19:04:22.225Z"
} as const;
