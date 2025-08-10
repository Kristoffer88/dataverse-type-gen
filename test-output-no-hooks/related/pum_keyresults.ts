// Required imports
import type { PumMeasureasaValue } from '../global-choices/pum_measureasa.js'
import type { PumNewstatusValue } from '../global-choices/pum_newstatus.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'

/**
 * Status
 * Status of the Key Result
 * LogicalName: pum_keyresults_statecode
 * Global: false
 * Custom: true
 */
export const PumKeyresultsStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumKeyresultsStatecodeValue = (typeof PumKeyresultsStatecode)[keyof typeof PumKeyresultsStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Key Result
 * LogicalName: pum_keyresults_statuscode
 * Global: false
 * Custom: true
 */
export const PumKeyresultsStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumKeyresultsStatuscodeValue = (typeof PumKeyresultsStatuscode)[keyof typeof PumKeyresultsStatuscode]["Value"];


/**
 * Key Result
 * Entity: pum_keyresults
 * Schema: pum_KeyResults
 * Primary Key: pum_keyresultsid
 * Primary Name: pum_name
 */
export interface pum_KeyResults {
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
    /** Process Id - Contains the id of the process associated with the entity. */
    processid?: string;
    /** Current Value */
    pum_currentvalue?: number;
    /** Description */
    pum_description?: string;
    /** Due Date */
    pum_duedate?: Date | string;
    /** Improvement Delta */
    pum_improvementdelta?: number;
    /** Key Results - Unique identifier for entity instances */
    pum_keyresultsid: string;
    /** Measure as a */
    pum_measureasa?: PumMeasureasaValue; // Option set: pum_measureasa
    /** Name - Required name field */
    pum_name?: string;
    /** Performance */
    pum_performance?: PumNewstatusValue; // Option set: pum_newstatus
    /** Realization */
    pum_realization?: string;
    /** Realization Whole Number */
    pum_realizationwholenumber?: number;
    /** Start Date */
    pum_startdate?: Date | string;
    /** Start Value */
    pum_startvalue?: number;
    /** Strategic Objectives */
    pum_strategicobjectives?: string; // Lookup to: pum_strategicobjectives
    /** _pum_strategicobjectives_value - Resolved lookup GUID value */
    _pum_strategicobjectives_value?: string; // Lookup value
    /** Target Value */
    pum_targetvalue?: number;
    /** (Deprecated) Stage Id - Contains the id of the stage where the entity is located. */
    stageid?: string;
    /** Status - Status of the Key Results */
    statecode: PumKeyresultsStatecodeValue; // Option set: pum_keyresults_statecode
    /** Status Reason - Reason for the status of the Key Results */
    statuscode?: PumKeyresultsStatuscodeValue; // Option set: pum_keyresults_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** (Deprecated) Traversed Path - A comma separated list of string values representing the unique identifiers of stages in a Business Process Flow Instance in the order that they occur. */
    traversedpath?: string;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Key Result
 * Enables IntelliSense for $expand relationship names
 */
export type pum_KeyResultsExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_StrategicObjectives"

/**
 * Type-safe expand options for Key Result
 * Supports both array format and object format with nested options
 */
export type pum_KeyResultsExpand =
    | pum_KeyResultsExpandableProperties[]
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
 * Type-safe expand options for Key Result
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_KeyResults @odata.bind operations
 */
export type pum_KeyResultsBindings = {
    'pum_StrategicObjectives@odata.bind'?: string; // Bind to: pum_strategicobjectives
};

/**
 * Type-safe helper functions for creating pum_KeyResults @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_KeyResultsBindings = {
} as const;

export type pum_KeyResultsCreate = Partial<pum_KeyResults> & Partial<pum_KeyResultsBindings> & {
    pum_name: string; // Required for create
};

export type pum_KeyResultsUpdate = Partial<Omit<pum_KeyResults, 'pum_keyresultsid'>> & Partial<pum_KeyResultsBindings> & {
    pum_keyresultsid: string; // Required for update
};

/**
 * Runtime metadata for Key Result
 * Provides entity schema information for API operations
 */
export const pum_KeyResultsMeta = {
    logicalName: "pum_keyresults",
    schemaName: "pum_KeyResults",
    displayName: "Key Result",
    entitySetName: "pum_keyresultses",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_keyresultsid",
        attributeType: "Uniqueidentifier",
        displayName: "Key Results"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_strategicobjectives"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_name", "statecode"],
    optionSets: ["pum_measureasa", "pum_newstatus", "pum_keyresults_statecode", "pum_keyresults_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_StrategicObjectives", // Relationship
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
        "pum_strategicobjectives": {
            relationshipName: "pum_strategicobjectives",
            targetEntityLogicalName: "pum_strategicobjectives",
            targetEntitySetName: "pum_strategicobjectivess",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.959Z"
} as const;
