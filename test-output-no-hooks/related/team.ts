// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Membership Type
 * Information about team membership type.
 * LogicalName: team_membershiptype
 * Global: false
 * Custom: false
 */
export const TeamMembershiptype = {
    MembersAndGuests: { Value: 0, Label: "Members and guests" },
    Members: { Value: 1, Label: "Members" },
    Owners: { Value: 2, Label: "Owners" },
    Guests: { Value: 3, Label: "Guests" }
} as const;

/** Membership Type option values */
export type TeamMembershiptypeValue = (typeof TeamMembershiptype)[keyof typeof TeamMembershiptype]["Value"];

/**
 * Team Type
 * Information about team type.
 * LogicalName: team_type
 * Global: false
 * Custom: false
 */
export const TeamType = {
    Owner: { Value: 0, Label: "Owner" },
    Access: { Value: 1, Label: "Access" },
    SecurityGroup: { Value: 2, Label: "Security Group" },
    OfficeGroup: { Value: 3, Label: "Office Group" }
} as const;

/** Team Type option values */
export type TeamTypeValue = (typeof TeamType)[keyof typeof TeamType]["Value"];


/**
 * Team
 * Collection of system users that routinely collaborate. Teams can be used to simplify record sharing and provide team members with common access to organization data when team members belong to different Business Units.
 * Entity: team
 * Schema: Team
 * Primary Key: teamid
 * Primary Name: name
 */
export interface Team {
    /** Administrator - Unique identifier of the user primary responsible for the team. */
    administratorid: string; // Lookup to: systemuser
    /** _administratorid_value - Resolved lookup GUID value */
    _administratorid_value?: string; // Lookup value
    /** Object Id for a group - The object Id for a group. */
    azureactivedirectoryobjectid?: string;
    /** Business Unit - Unique identifier of the business unit with which the team is associated. */
    businessunitid: string; // Lookup to: businessunit
    /** _businessunitid_value - Resolved lookup GUID value */
    _businessunitid_value?: string; // Lookup value
    /** Created By - Unique identifier of the user who created the team. */
    createdby?: string; // Lookup to: systemuser
    /** _createdby_value - Resolved lookup GUID value */
    _createdby_value?: string; // Lookup value
    /** Created On - Date and time when the team was created. */
    createdon?: Date | string;
    /** Created By (Delegate) - Unique identifier of the delegate user who created the team. */
    createdonbehalfby?: string; // Lookup to: systemuser
    /** _createdonbehalfby_value - Resolved lookup GUID value */
    _createdonbehalfby_value?: string; // Lookup value
    /** Delegated authorization - The delegated authorization context for the team. */
    delegatedauthorizationid?: string; // Lookup to: delegatedauthorization
    /** _delegatedauthorizationid_value - Resolved lookup GUID value */
    _delegatedauthorizationid_value?: string; // Lookup value
    /** Description - Description of the team. */
    description?: string;
    /** Email - Email address for the team. */
    emailaddress?: string;
    /** Exchange Rate - Exchange rate for the currency associated with the team with respect to the base currency. */
    exchangerate?: number;
    /** Import Sequence Number - Unique identifier of the data import or data migration that created this record. */
    importsequencenumber?: number;
    /** Is Default - Information about whether the team is a default business unit team. */
    isdefault: boolean;
    /** IsSasTokenSet */
    issastokenset?: boolean;
    /** Membership Type */
    membershiptype: TeamMembershiptypeValue; // Option set: team_membershiptype
    /** Modified By - Unique identifier of the user who last modified the team. */
    modifiedby?: string; // Lookup to: systemuser
    /** _modifiedby_value - Resolved lookup GUID value */
    _modifiedby_value?: string; // Lookup value
    /** Modified On - Date and time when the team was last modified. */
    modifiedon?: Date | string;
    /** Modified By (Delegate) - Unique identifier of the delegate user who last modified the team. */
    modifiedonbehalfby?: string; // Lookup to: systemuser
    /** _modifiedonbehalfby_value - Resolved lookup GUID value */
    _modifiedonbehalfby_value?: string; // Lookup value
    /** Team Name - Name of the team. */
    name: string;
    /** Organization  - Unique identifier of the organization associated with the team. */
    organizationid: string;
    /** Record Created On - Date and time that the record was migrated. */
    overriddencreatedon?: Date | string;
    /** Process - Shows the ID of the process. */
    processid?: string;
    /** Default Queue - Unique identifier of the default queue for the team. */
    queueid?: string; // Lookup to: queue
    /** _queueid_value - Resolved lookup GUID value */
    _queueid_value?: string; // Lookup value
    /** Regarding Object Id - Choose the record that the team relates to. */
    regardingobjectid?: string; // Lookup to: knowledgearticle
    /** _regardingobjectid_value - Resolved lookup GUID value */
    _regardingobjectid_value?: string; // Lookup value
    /** Sas Token - Sas Token for Team. */
    sastoken?: string;
    /** Share Link Qualifier - For internal use only. */
    sharelinkqualifier?: string;
    /** (Deprecated) Process Stage - Shows the ID of the stage. */
    stageid?: string;
    /** Is System Managed - Select whether the team will be managed by the system. */
    systemmanaged: boolean;
    /** Team - Unique identifier for the team. */
    teamid: string;
    /** Team Template Identifier - Shows the team template that is associated with the team. */
    teamtemplateid?: string; // Lookup to: teamtemplate
    /** _teamtemplateid_value - Resolved lookup GUID value */
    _teamtemplateid_value?: string; // Lookup value
    /** Team Type - Select the team type. */
    teamtype: TeamTypeValue; // Option set: team_type
    /** Currency - Unique identifier of the currency associated with the team. */
    transactioncurrencyid?: string; // Lookup to: transactioncurrency
    /** _transactioncurrencyid_value - Resolved lookup GUID value */
    _transactioncurrencyid_value?: string; // Lookup value
    /** (Deprecated) Traversed Path - For internal use only. */
    traversedpath?: string;
    /** Version number - Version number of the team. */
    versionnumber?: number;
    /** Yomi Name - Pronunciation of the full name of the team, written in phonetic hiragana or katakana characters. */
    yominame?: string;
}

/**
 * Type-safe expand properties for Team
 * Enables IntelliSense for $expand relationship names
 */
export type TeamExpandableProperties =
    "AdministratorId"
    | "BusinessUnitId"
    | "CreatedBy"
    | "CreatedOnBehalfBy"
    | "DelegatedAuthorizationId"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "QueueId"
    | "RegardingObjectId"
    | "TeamTemplateId"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Team
 * Supports both array format and object format with nested options
 */
export type TeamExpand =
    | TeamExpandableProperties[]
    | {
        "administratorid"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
        "businessunitid"?: {
            $select?: (keyof BusinessUnit)[]
            $top?: number
            $skip?: number
            $expand?: BusinessUnitExpand
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
        "transactioncurrencyid"?: {
            $select?: (keyof TransactionCurrency)[]
            $top?: number
            $skip?: number
            $expand?: TransactionCurrencyExpand
        }
    }

/**
 * Type-safe expand options for Team
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for Team @odata.bind operations
 */
export type TeamBindings = {
    'AdministratorId@odata.bind'?: string; // Bind to: systemuser
    'BusinessUnitId@odata.bind'?: string; // Bind to: businessunit
    'DelegatedAuthorizationId@odata.bind'?: string; // Bind to: delegatedauthorization
    'QueueId@odata.bind'?: string; // Bind to: queue
    'RegardingObjectId@odata.bind'?: string; // Bind to: knowledgearticle
    'TeamTemplateId@odata.bind'?: string; // Bind to: teamtemplate
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating Team @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const TeamBindings = {
    /** Create @odata.bind for administratorid -> systemuser */
    administratorid: (id: string): { 'AdministratorId@odata.bind': string } => ({
        'AdministratorId@odata.bind': `/systemusers(${id})`
    }),
    /** Create @odata.bind for businessunitid -> businessunit */
    businessunitid: (id: string): { 'BusinessUnitId@odata.bind': string } => ({
        'BusinessUnitId@odata.bind': `/businessunits(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type TeamCreate = Partial<Team> & Partial<TeamBindings> & {
    name: string; // Required for create
};

export type TeamUpdate = Partial<Omit<Team, 'teamid'>> & Partial<TeamBindings> & {
    teamid: string; // Required for update
};

/**
 * Runtime metadata for Team
 * Provides entity schema information for API operations
 */
export const TeamMeta = {
    logicalName: "team",
    schemaName: "Team",
    displayName: "Team",
    entitySetName: "teams",
    isCustomEntity: false,
    description: "Collection of system users that routinely collaborate. Teams can be used to simplify record sharing and provide team members with common access to organization data when team members belong to different Business Units.",
    primaryKey: {
        logicalName: "teamid",
        attributeType: "Uniqueidentifier",
        displayName: "Team"
    },
    primaryName: {
        logicalName: "name",
        attributeType: "String",
        displayName: "Team Name",
    },
    lookupAttributes: ["administratorid", "businessunitid", "createdby", "createdonbehalfby", "delegatedauthorizationid", "modifiedby", "modifiedonbehalfby", "queueid", "regardingobjectid", "teamtemplateid", "transactioncurrencyid"],
    requiredAttributes: ["administratorid", "businessunitid", "businessunitidname", "isdefault", "membershiptype", "name", "organizationid", "organizationidname", "systemmanaged", "teamtype"],
    optionSets: ["team_membershiptype", "team_type"],
    expandableProperties: [
        "AdministratorId", // Relationship
        "BusinessUnitId", // Relationship
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "DelegatedAuthorizationId", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "QueueId", // Relationship
        "RegardingObjectId", // Relationship
        "TeamTemplateId", // Relationship
        "TransactionCurrencyId", // Relationship
    ],
    relatedEntities: {
        "administratorid": {
            relationshipName: "administratorid",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
        "businessunitid": {
            relationshipName: "businessunitid",
            targetEntityLogicalName: "businessunit",
            targetEntitySetName: "businessunits",
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
        "delegatedauthorizationid": {
            relationshipName: "delegatedauthorizationid",
            targetEntityLogicalName: "delegatedauthorization",
            targetEntitySetName: "delegatedauthorizations",
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
        "queueid": {
            relationshipName: "queueid",
            targetEntityLogicalName: "queue",
            targetEntitySetName: "queues",
            relationshipType: "ManyToOne"
        },
        "regardingobjectid": {
            relationshipName: "regardingobjectid",
            targetEntityLogicalName: "knowledgearticle",
            targetEntitySetName: "knowledgearticles",
            relationshipType: "ManyToOne"
        },
        "teamtemplateid": {
            relationshipName: "teamtemplateid",
            targetEntityLogicalName: "teamtemplate",
            targetEntitySetName: "teamtemplates",
            relationshipType: "ManyToOne"
        },
        "transactioncurrencyid": {
            relationshipName: "transactioncurrencyid",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.983Z"
} as const;
