// Required imports
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'

/**
 * Status
 * Status of the Initiative Business Process
 * LogicalName: pum_initiativebusinessprocess_statecode
 * Global: false
 * Custom: true
 */
export const PumInitiativebusinessprocessStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumInitiativebusinessprocessStatecodeValue = (typeof PumInitiativebusinessprocessStatecode)[keyof typeof PumInitiativebusinessprocessStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Initiative Business Process
 * LogicalName: pum_initiativebusinessprocess_statuscode
 * Global: false
 * Custom: true
 */
export const PumInitiativebusinessprocessStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Finished: { Value: 2, Label: "Finished" },
    Aborted: { Value: 3, Label: "Aborted" }
} as const;

/** Status Reason option values */
export type PumInitiativebusinessprocessStatuscodeValue = (typeof PumInitiativebusinessprocessStatuscode)[keyof typeof PumInitiativebusinessprocessStatuscode]["Value"];


/**
 * Initiative Business Process
 * Base entity for process Initiative Business Process
 * Entity: pum_initiativebusinessprocess
 * Schema: pum_initiativebusinessprocess
 * Primary Key: businessprocessflowinstanceid
 * Primary Name: bpf_name
 */
export interface pum_initiativebusinessprocess {
    /** Active Stage - Unique identifier of the active stage for the Business Process Flow instance. */
    activestageid?: string; // Lookup to: processstage
    /** _activestageid_value - Resolved lookup GUID value */
    _activestageid_value?: string; // Lookup value
    /** Active Stage Started On - Date and time when current active stage is started */
    activestagestartedon?: Date | string;
    /** Duration - Duration of Business Process Flow */
    bpf_duration?: number;
    /** Name - Description */
    bpf_name?: string;
    /** Pum_Initiative */
    bpf_pum_initiativeid?: string; // Lookup to: pum_initiative
    /** _bpf_pum_initiativeid_value - Resolved lookup GUID value */
    _bpf_pum_initiativeid_value?: string; // Lookup value
    /** Initiative Business Process - Unique identifier for entity instances */
    businessprocessflowinstanceid: string;
    /** Completed On - Date and time when Business Process Flow instance is completed. */
    completedon?: Date | string;
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
    /** Organization Id - Unique identifier for the organization */
    organizationid?: string; // Lookup to: organization
    /** _organizationid_value - Resolved lookup GUID value */
    _organizationid_value?: string; // Lookup value
    /** Record Created On - Date and time that the record was migrated. */
    overriddencreatedon?: Date | string;
    /** Process - Unique identifier of the Arbejdeflow associated to the Business Process Flow instance. */
    processid?: string; // Lookup to: workflow
    /** _processid_value - Resolved lookup GUID value */
    _processid_value?: string; // Lookup value
    /** Status - Status of the Initiative Business Process */
    statecode: PumInitiativebusinessprocessStatecodeValue; // Option set: pum_initiativebusinessprocess_statecode
    /** Status Reason - Reason for the status of the Initiative Business Process */
    statuscode?: PumInitiativebusinessprocessStatuscodeValue; // Option set: pum_initiativebusinessprocess_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** Traversed Path - Comma delimited string of process stage ids that represent visited stages of the Business Process Flow instance. */
    traversedpath?: string;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Initiative Business Process
 * Enables IntelliSense for $expand relationship names
 */
export type pum_initiativebusinessprocessExpandableProperties =
    "ActiveStageId"
    | "bpf_pum_initiativeid"
    | "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OrganizationId"
    | "ProcessId"

/**
 * Type-safe expand options for Initiative Business Process
 * Supports both array format and object format with nested options
 */
export type pum_initiativebusinessprocessExpand =
    | pum_initiativebusinessprocessExpandableProperties[]
    | {
        "bpf_pum_initiativeid"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
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
    }

/**
 * Type-safe expand options for Initiative Business Process
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_initiativebusinessprocess @odata.bind operations
 */
export type pum_initiativebusinessprocessBindings = {
    'ActiveStageId@odata.bind'?: string; // Bind to: processstage
    'bpf_pum_initiativeid@odata.bind'?: string; // Bind to: pum_initiative
    'OrganizationId@odata.bind'?: string; // Bind to: organization
    'ProcessId@odata.bind'?: string; // Bind to: workflow
};

/**
 * Type-safe helper functions for creating pum_initiativebusinessprocess @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_initiativebusinessprocessBindings = {
    /** Create @odata.bind for bpf_pum_initiativeid -> pum_initiative */
    bpf_pum_initiativeid: (id: string): { 'bpf_pum_initiativeid@odata.bind': string } => ({
        'bpf_pum_initiativeid@odata.bind': `/pum_initiatives(${id})`
    }),
} as const;

export type pum_initiativebusinessprocessCreate = Partial<pum_initiativebusinessprocess> & Partial<pum_initiativebusinessprocessBindings> & {
    bpf_name: string; // Required for create
};

export type pum_initiativebusinessprocessUpdate = Partial<Omit<pum_initiativebusinessprocess, 'businessprocessflowinstanceid'>> & Partial<pum_initiativebusinessprocessBindings> & {
    businessprocessflowinstanceid: string; // Required for update
};

/**
 * Runtime metadata for Initiative Business Process
 * Provides entity schema information for API operations
 */
export const pum_initiativebusinessprocessMeta = {
    logicalName: "pum_initiativebusinessprocess",
    schemaName: "pum_initiativebusinessprocess",
    displayName: "Initiative Business Process",
    entitySetName: "pum_initiativebusinessprocesses",
    isCustomEntity: true,
    description: "Base entity for process Initiative Business Process",
    primaryKey: {
        logicalName: "businessprocessflowinstanceid",
        attributeType: "Uniqueidentifier",
        displayName: "Initiative Business Process"
    },
    primaryName: {
        logicalName: "bpf_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["activestageid", "bpf_pum_initiativeid", "createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "organizationid", "processid"],
    requiredAttributes: ["bpf_name", "createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "organizationidname", "statecode"],
    optionSets: ["pum_initiativebusinessprocess_statecode", "pum_initiativebusinessprocess_statuscode"],
    expandableProperties: [
        "ActiveStageId", // Relationship
        "bpf_pum_initiativeid", // Lookup field
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OrganizationId", // Relationship
        "ProcessId", // Relationship
    ],
    relatedEntities: {
        "activestageid": {
            relationshipName: "activestageid",
            targetEntityLogicalName: "processstage",
            targetEntitySetName: "processstages",
            relationshipType: "ManyToOne"
        },
        "bpf_pum_initiativeid": {
            relationshipName: "bpf_pum_initiativeid",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
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
        "organizationid": {
            relationshipName: "organizationid",
            targetEntityLogicalName: "organization",
            targetEntitySetName: "organizations",
            relationshipType: "ManyToOne"
        },
        "processid": {
            relationshipName: "processid",
            targetEntityLogicalName: "workflow",
            targetEntitySetName: "workflows",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.115Z"
} as const;
