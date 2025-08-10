// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_pf_costplan_version } from './pum_pf_costplan_version.js'
import type { pum_pf_costplan_versionExpand } from './pum_pf_costplan_version.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { pum_Program } from './pum_program.js'
import type { pum_ProgramExpand } from './pum_program.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Status
 * Status of the Custom Row Data
 * LogicalName: pum_pf_customrowdata_statecode
 * Global: false
 * Custom: true
 */
export const PumPfCustomrowdataStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumPfCustomrowdataStatecodeValue = (typeof PumPfCustomrowdataStatecode)[keyof typeof PumPfCustomrowdataStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Custom Row Data
 * LogicalName: pum_pf_customrowdata_statuscode
 * Global: false
 * Custom: true
 */
export const PumPfCustomrowdataStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumPfCustomrowdataStatuscodeValue = (typeof PumPfCustomrowdataStatuscode)[keyof typeof PumPfCustomrowdataStatuscode]["Value"];


/**
 * Custom Row Data
 * Entity: pum_pf_customrowdata
 * Schema: pum_pf_CustomRowData
 * Primary Key: pum_pf_customrowdataid
 * Primary Name: pum_customrowname
 */
export interface pum_pf_CustomRowData {
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
    /** ColumnId */
    pum_columnid?: string;
    /** costplanversion */
    pum_costplanversion?: string; // Lookup to: pum_pf_costplan_version
    /** _pum_costplanversion_value - Resolved lookup GUID value */
    _pum_costplanversion_value?: string; // Lookup value
    /** Custom Row Name - Required name field */
    pum_customrowname?: string;
    /** Calculation Formula */
    pum_pf_calculationformula?: string;
    /** Cost Mapping */
    pum_pf_costmappingpolymorph?: string; // Lookup to: pum_pf_costarea, pum_pf_costcategory, pum_pf_costspecification
    /** _pum_pf_costmappingpolymorph_value - Resolved lookup GUID value */
    _pum_pf_costmappingpolymorph_value?: string; // Lookup value
    /** Cost Type PF */
    pum_pf_costtype?: string; // Lookup to: pum_pf_costtype
    /** _pum_pf_costtype_value - Resolved lookup GUID value */
    _pum_pf_costtype_value?: string; // Lookup value
    /** Custom Row Data - Unique identifier for entity instances */
    pum_pf_customrowdataid: string;
    /** Custom Row Id  */
    pum_pf_customrowid?: string;
    /** For Business Case */
    pum_pf_forbusinesscase?: boolean;
    /** Month */
    pum_pf_month?: number;
    /** ProjectId */
    pum_pf_project_customrow?: string; // Lookup to: pum_initiative
    /** _pum_pf_project_customrow_value - Resolved lookup GUID value */
    _pum_pf_project_customrow_value?: string; // Lookup value
    /** Value string */
    pum_pf_stringvalue?: string;
    /** Unit */
    pum_pf_unit?: string;
    /** Value */
    pum_pf_value?: number;
    /** Value Display Name */
    pum_pf_valuedisplayname?: string;
    /** Version */
    pum_pf_version?: string; // Lookup to: pum_pf_costplan_version
    /** _pum_pf_version_value - Resolved lookup GUID value */
    _pum_pf_version_value?: string; // Lookup value
    /** Year */
    pum_pf_year?: number;
    /** Program */
    pum_program?: string; // Lookup to: pum_program
    /** _pum_program_value - Resolved lookup GUID value */
    _pum_program_value?: string; // Lookup value
    /** Value */
    pum_valuecur?: number;
    /** Value (Base) - Value of the Value in base currency. */
    pum_valuecur_base?: number;
    /** Status - Status of the Custom Row Data */
    statecode: PumPfCustomrowdataStatecodeValue; // Option set: pum_pf_customrowdata_statecode
    /** Status Reason - Reason for the status of the Custom Row Data */
    statuscode?: PumPfCustomrowdataStatuscodeValue; // Option set: pum_pf_customrowdata_statuscode
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
 * Type-safe expand properties for Custom Row Data
 * Enables IntelliSense for $expand relationship names
 */
export type pum_pf_CustomRowDataExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_costplanversion"
    | "pum_pf_costmappingpolymorph"
    | "pum_pf_costtype"
    | "pum_pf_project_customrow"
    | "pum_pf_version"
    | "pum_Program"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Custom Row Data
 * Supports both array format and object format with nested options
 */
export type pum_pf_CustomRowDataExpand =
    | pum_pf_CustomRowDataExpandableProperties[]
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
        "pum_costplanversion"?: {
            $select?: (keyof pum_pf_costplan_version)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_costplan_versionExpand
        }
        "pum_pf_project_customrow"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
        "pum_pf_version"?: {
            $select?: (keyof pum_pf_costplan_version)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_costplan_versionExpand
        }
        "pum_program"?: {
            $select?: (keyof pum_Program)[]
            $top?: number
            $skip?: number
            $expand?: pum_ProgramExpand
        }
        "transactioncurrencyid"?: {
            $select?: (keyof TransactionCurrency)[]
            $top?: number
            $skip?: number
            $expand?: TransactionCurrencyExpand
        }
    }

/**
 * Type-safe expand options for Custom Row Data
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_pf_CustomRowData @odata.bind operations
 */
export type pum_pf_CustomRowDataBindings = {
    'pum_costplanversion@odata.bind'?: string; // Bind to: pum_pf_costplan_version
    'pum_pf_costmappingpolymorph@odata.bind'?: string; // Bind to: pum_pf_costarea, pum_pf_costcategory, pum_pf_costspecification
    'pum_pf_costtype@odata.bind'?: string; // Bind to: pum_pf_costtype
    'pum_pf_project_customrow@odata.bind'?: string; // Bind to: pum_initiative
    'pum_pf_version@odata.bind'?: string; // Bind to: pum_pf_costplan_version
    'pum_Program@odata.bind'?: string; // Bind to: pum_program
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating pum_pf_CustomRowData @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_pf_CustomRowDataBindings = {
    /** Create @odata.bind for pum_costplanversion -> pum_pf_costplan_version */
    pum_costplanversion: (id: string): { 'pum_costplanversion@odata.bind': string } => ({
        'pum_costplanversion@odata.bind': `/pum_pf_costplan_versions(${id})`
    }),
    /** Create @odata.bind for pum_pf_costmappingpolymorph -> pum_pf_costspecification */
    pum_pf_costmappingpolymorph: (id: string, entityType: 'pum_pf_costspecification') => {
        const entitySets = {
            'pum_pf_costspecification': 'pum_pf_costspecifications',
        } as const;
        return { 'pum_pf_costmappingpolymorph@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
    /** Create @odata.bind for pum_pf_project_customrow -> pum_initiative */
    pum_pf_project_customrow: (id: string): { 'pum_pf_project_customrow@odata.bind': string } => ({
        'pum_pf_project_customrow@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_pf_version -> pum_pf_costplan_version */
    pum_pf_version: (id: string): { 'pum_pf_version@odata.bind': string } => ({
        'pum_pf_version@odata.bind': `/pum_pf_costplan_versions(${id})`
    }),
    /** Create @odata.bind for pum_program -> pum_program */
    pum_program: (id: string): { 'pum_Program@odata.bind': string } => ({
        'pum_Program@odata.bind': `/pum_programs(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type pum_pf_CustomRowDataCreate = Partial<pum_pf_CustomRowData> & Partial<pum_pf_CustomRowDataBindings> & {
    pum_customrowname: string; // Required for create
};

export type pum_pf_CustomRowDataUpdate = Partial<Omit<pum_pf_CustomRowData, 'pum_pf_customrowdataid'>> & Partial<pum_pf_CustomRowDataBindings> & {
    pum_pf_customrowdataid: string; // Required for update
};

/**
 * Runtime metadata for Custom Row Data
 * Provides entity schema information for API operations
 */
export const pum_pf_CustomRowDataMeta = {
    logicalName: "pum_pf_customrowdata",
    schemaName: "pum_pf_CustomRowData",
    displayName: "Custom Row Data",
    entitySetName: "pum_pf_customrowdatas",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_pf_customrowdataid",
        attributeType: "Uniqueidentifier",
        displayName: "Custom Row Data"
    },
    primaryName: {
        logicalName: "pum_customrowname",
        attributeType: "String",
        displayName: "Custom Row Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_costplanversion", "pum_pf_costmappingpolymorph", "pum_pf_costtype", "pum_pf_project_customrow", "pum_pf_version", "pum_program", "transactioncurrencyid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_customrowname", "statecode"],
    optionSets: ["pum_pf_customrowdata_statecode", "pum_pf_customrowdata_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_costplanversion", // Lookup field
        "pum_pf_costmappingpolymorph", // Lookup field
        "pum_pf_costtype", // Lookup field
        "pum_pf_project_customrow", // Lookup field
        "pum_pf_version", // Lookup field
        "pum_Program", // Relationship
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
        "pum_costplanversion": {
            relationshipName: "pum_costplanversion",
            targetEntityLogicalName: "pum_pf_costplan_version",
            targetEntitySetName: "pum_pf_costplan_versions",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costmappingpolymorph": {
            relationshipName: "pum_pf_costmappingpolymorph",
            targetEntityLogicalName: "pum_pf_costarea",
            targetEntitySetName: "pum_pf_costareas",
            relationshipType: "ManyToOne"
        },
        "pum_pf_costtype": {
            relationshipName: "pum_pf_costtype",
            targetEntityLogicalName: "pum_pf_costtype",
            targetEntitySetName: "pum_pf_costtypes",
            relationshipType: "ManyToOne"
        },
        "pum_pf_project_customrow": {
            relationshipName: "pum_pf_project_customrow",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
        "pum_pf_version": {
            relationshipName: "pum_pf_version",
            targetEntityLogicalName: "pum_pf_costplan_version",
            targetEntitySetName: "pum_pf_costplan_versions",
            relationshipType: "ManyToOne"
        },
        "pum_program": {
            relationshipName: "pum_program",
            targetEntityLogicalName: "pum_program",
            targetEntitySetName: "pum_programs",
            relationshipType: "ManyToOne"
        },
        "transactioncurrencyid": {
            relationshipName: "transactioncurrencyid",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.230Z"
} as const;
