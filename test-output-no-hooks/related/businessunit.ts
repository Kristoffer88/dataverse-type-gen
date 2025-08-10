// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Address 1: Address Type
 * Type of address for address 1, such as billing, shipping, or primary address.
 * LogicalName: businessunit_address1_addresstypecode
 * Global: false
 * Custom: false
 */
export const BusinessunitAddress1Addresstypecode = {
    DefaultValue: { Value: 1, Label: "Default Value" }
} as const;

/** Address 1: Address Type option values */
export type BusinessunitAddress1AddresstypecodeValue = (typeof BusinessunitAddress1Addresstypecode)[keyof typeof BusinessunitAddress1Addresstypecode]["Value"];

/**
 * Address 1: Shipping Method 
 * Method of shipment for address 1.
 * LogicalName: businessunit_address1_shippingmethodcode
 * Global: false
 * Custom: false
 */
export const BusinessunitAddress1Shippingmethodcode = {
    DefaultValue: { Value: 1, Label: "Default Value" }
} as const;

/** Address 1: Shipping Method  option values */
export type BusinessunitAddress1ShippingmethodcodeValue = (typeof BusinessunitAddress1Shippingmethodcode)[keyof typeof BusinessunitAddress1Shippingmethodcode]["Value"];

/**
 * Address 2: Address Type
 * Type of address for address 2, such as billing, shipping, or primary address.
 * LogicalName: businessunit_address2_addresstypecode
 * Global: false
 * Custom: false
 */
export const BusinessunitAddress2Addresstypecode = {
    DefaultValue: { Value: 1, Label: "Default Value" }
} as const;

/** Address 2: Address Type option values */
export type BusinessunitAddress2AddresstypecodeValue = (typeof BusinessunitAddress2Addresstypecode)[keyof typeof BusinessunitAddress2Addresstypecode]["Value"];

/**
 * Address 2: Shipping Method 
 * Method of shipment for address 2.
 * LogicalName: businessunit_address2_shippingmethodcode
 * Global: false
 * Custom: false
 */
export const BusinessunitAddress2Shippingmethodcode = {
    DefaultValue: { Value: 1, Label: "Default Value" }
} as const;

/** Address 2: Shipping Method  option values */
export type BusinessunitAddress2ShippingmethodcodeValue = (typeof BusinessunitAddress2Shippingmethodcode)[keyof typeof BusinessunitAddress2Shippingmethodcode]["Value"];


/**
 * Business Unit
 * Business, division, or department in the Microsoft Dynamics 365 database.
 * Entity: businessunit
 * Schema: BusinessUnit
 * Primary Key: businessunitid
 * Primary Name: name
 */
export interface BusinessUnit {
    /** Address 1: ID - Unique identifier for address 1. */
    address1_addressid: string;
    /** Address 1: Address Type - Type of address for address 1, such as billing, shipping, or primary address. */
    address1_addresstypecode?: BusinessunitAddress1AddresstypecodeValue; // Option set: businessunit_address1_addresstypecode
    /** Bill To City - City name for address 1. */
    address1_city?: string;
    /** Bill To Country/Region - Country/region name for address 1. */
    address1_country?: string;
    /** Address 1: County - County name for address 1. */
    address1_county?: string;
    /** Address 1: Fax - Fax number for address 1. */
    address1_fax?: string;
    /** Address 1: Latitude - Latitude for address 1. */
    address1_latitude?: number;
    /** Bill To Street 1 - First line for entering address 1 information. */
    address1_line1?: string;
    /** Bill To Street 2 - Second line for entering address 1 information. */
    address1_line2?: string;
    /** Bill To Street 3 - Third line for entering address 1 information. */
    address1_line3?: string;
    /** Address 1: Longitude - Longitude for address 1. */
    address1_longitude?: number;
    /** Address 1: Name - Name to enter for address 1. */
    address1_name?: string;
    /** Bill To ZIP/Postal Code - ZIP Code or postal code for address 1. */
    address1_postalcode?: string;
    /** Address 1: Post Office Box - Post office box number for address 1. */
    address1_postofficebox?: string;
    /** Address 1: Shipping Method - Method of shipment for address 1. */
    address1_shippingmethodcode?: BusinessunitAddress1ShippingmethodcodeValue; // Option set: businessunit_address1_shippingmethodcode
    /** Bill To State/Province - State or province for address 1. */
    address1_stateorprovince?: string;
    /** Main Phone - First telephone number associated with address 1. */
    address1_telephone1?: string;
    /** Other Phone - Second telephone number associated with address 1. */
    address1_telephone2?: string;
    /** Address 1: Telephone 3 - Third telephone number associated with address 1. */
    address1_telephone3?: string;
    /** Address 1: UPS Zone - United Parcel Service (UPS) zone for address 1. */
    address1_upszone?: string;
    /** Address 1: UTC Offset - UTC offset for address 1. This is the difference between local time and standard Coordinated Universal Time. */
    address1_utcoffset?: number;
    /** Address 2: ID - Unique identifier for address 2. */
    address2_addressid: string;
    /** Address 2: Address Type - Type of address for address 2, such as billing, shipping, or primary address. */
    address2_addresstypecode?: BusinessunitAddress2AddresstypecodeValue; // Option set: businessunit_address2_addresstypecode
    /** Ship To City - City name for address 2. */
    address2_city?: string;
    /** Ship To Country/Region - Country/region name for address 2. */
    address2_country?: string;
    /** Address 2: County - County name for address 2. */
    address2_county?: string;
    /** Address 2: Fax - Fax number for address 2. */
    address2_fax?: string;
    /** Address 2: Latitude - Latitude for address 2. */
    address2_latitude?: number;
    /** Ship To Street 1 - First line for entering address 2 information. */
    address2_line1?: string;
    /** Ship To Street 2 - Second line for entering address 2 information. */
    address2_line2?: string;
    /** Ship To Street 3 - Third line for entering address 2 information. */
    address2_line3?: string;
    /** Address 2: Longitude - Longitude for address 2. */
    address2_longitude?: number;
    /** Address 2: Name - Name to enter for address 2. */
    address2_name?: string;
    /** Ship To ZIP/Postal Code - ZIP Code or postal code for address 2. */
    address2_postalcode?: string;
    /** Address 2: Post Office Box - Post office box number for address 2. */
    address2_postofficebox?: string;
    /** Address 2: Shipping Method - Method of shipment for address 2. */
    address2_shippingmethodcode?: BusinessunitAddress2ShippingmethodcodeValue; // Option set: businessunit_address2_shippingmethodcode
    /** Ship To State/Province - State or province for address 2. */
    address2_stateorprovince?: string;
    /** Address 2: Telephone 1 - First telephone number associated with address 2. */
    address2_telephone1?: string;
    /** Address 2: Telephone 2 - Second telephone number associated with address 2. */
    address2_telephone2?: string;
    /** Address 2: Telephone 3 - Third telephone number associated with address 2. */
    address2_telephone3?: string;
    /** Address 2: UPS Zone - United Parcel Service (UPS) zone for address 2. */
    address2_upszone?: string;
    /** Address 2: UTC Offset - UTC offset for address 2. This is the difference between local time and standard Coordinated Universal Time. */
    address2_utcoffset?: number;
    /** Business Unit - Unique identifier of the business unit. */
    businessunitid: string;
    /** Calendar - Fiscal calendar associated with the business unit. */
    calendarid?: string; // Lookup to: calendar
    /** _calendarid_value - Resolved lookup GUID value */
    _calendarid_value?: string; // Lookup value
    /** Cost Center - Name of the business unit cost center. */
    costcenter?: string;
    /** Created By - Unique identifier of the user who created the business unit. */
    createdby?: string; // Lookup to: systemuser
    /** _createdby_value - Resolved lookup GUID value */
    _createdby_value?: string; // Lookup value
    /** Created On - Date and time when the business unit was created. */
    createdon?: Date | string;
    /** Created By (Delegate) - Unique identifier of the delegate user who created the businessunit. */
    createdonbehalfby?: string; // Lookup to: systemuser
    /** _createdonbehalfby_value - Resolved lookup GUID value */
    _createdonbehalfby_value?: string; // Lookup value
    /** Credit Limit - Credit limit for the business unit. */
    creditlimit?: number;
    /** Description - Description of the business unit. */
    description?: string;
    /** Disable Reason - Reason for disabling the business unit. */
    disabledreason?: string;
    /** Division - Name of the division to which the business unit belongs. */
    divisionname?: string;
    /** Email - Email address for the business unit. */
    emailaddress?: string;
    /** Exchange Rate - Exchange rate for the currency associated with the businessunit with respect to the base currency. */
    exchangerate?: number;
    /** File as Name - Alternative name under which the business unit can be filed. */
    fileasname?: string;
    /** FTP Site - FTP site URL for the business unit. */
    ftpsiteurl?: string;
    /** Import Sequence Number - Unique identifier of the data import or data migration that created this record. */
    importsequencenumber?: number;
    /** Inheritance Mask - Inheritance mask for the business unit. */
    inheritancemask?: number;
    /** Is Disabled - Information about whether the business unit is enabled or disabled. */
    isdisabled: boolean;
    /** Modified By - Unique identifier of the user who last modified the business unit. */
    modifiedby?: string; // Lookup to: systemuser
    /** _modifiedby_value - Resolved lookup GUID value */
    _modifiedby_value?: string; // Lookup value
    /** Modified On - Date and time when the business unit was last modified. */
    modifiedon?: Date | string;
    /** Modified By (Delegate) - Unique identifier of the delegate user who last modified the businessunit. */
    modifiedonbehalfby?: string; // Lookup to: systemuser
    /** _modifiedonbehalfby_value - Resolved lookup GUID value */
    _modifiedonbehalfby_value?: string; // Lookup value
    /** Name - Name of the business unit. */
    name: string;
    /** Organization - Unique identifier of the organization associated with the business unit. */
    organizationid: string; // Lookup to: organization
    /** _organizationid_value - Resolved lookup GUID value */
    _organizationid_value?: string; // Lookup value
    /** Record Created On - Date and time that the record was migrated. */
    overriddencreatedon?: Date | string;
    /** Parent Business - Unique identifier for the parent business unit. */
    parentbusinessunitid?: string; // Lookup to: businessunit
    /** _parentbusinessunitid_value - Resolved lookup GUID value */
    _parentbusinessunitid_value?: string; // Lookup value
    /** Picture - Picture or diagram of the business unit. */
    picture?: string;
    /** Stock Exchange - Stock exchange on which the business is listed. */
    stockexchange?: string;
    /** Ticker Symbol - Stock exchange ticker symbol for the business unit. */
    tickersymbol?: string;
    /** Currency - Unique identifier of the currency associated with the businessunit. */
    transactioncurrencyid?: string; // Lookup to: transactioncurrency
    /** _transactioncurrencyid_value - Resolved lookup GUID value */
    _transactioncurrencyid_value?: string; // Lookup value
    /** UserGroupId */
    usergroupid?: string;
    /** UTC Offset - UTC offset for the business unit. This is the difference between local time and standard Coordinated Universal Time. */
    utcoffset?: number;
    /** Version number - Version number of the business unit. */
    versionnumber?: number;
    /** Website - Website URL for the business unit. */
    websiteurl?: string;
    /** Workflow Suspended - Information about whether workflow or sales process rules have been suspended. */
    workflowsuspended?: boolean;
}

/**
 * Type-safe expand properties for Business Unit
 * Enables IntelliSense for $expand relationship names
 */
export type BusinessUnitExpandableProperties =
    "CalendarId"
    | "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OrganizationId"
    | "ParentBusinessUnitId"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for Business Unit
 * Supports both array format and object format with nested options
 */
export type BusinessUnitExpand =
    | BusinessUnitExpandableProperties[]
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
        "parentbusinessunitid"?: {
            $select?: (keyof BusinessUnit)[]
            $top?: number
            $skip?: number
            $expand?: BusinessUnitExpand
        }
        "transactioncurrencyid"?: {
            $select?: (keyof TransactionCurrency)[]
            $top?: number
            $skip?: number
            $expand?: TransactionCurrencyExpand
        }
    }

/**
 * Type-safe expand options for Business Unit
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for BusinessUnit @odata.bind operations
 */
export type BusinessUnitBindings = {
    'CalendarId@odata.bind'?: string; // Bind to: calendar
    'OrganizationId@odata.bind'?: string; // Bind to: organization
    'ParentBusinessUnitId@odata.bind'?: string; // Bind to: businessunit
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating BusinessUnit @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const BusinessUnitBindings = {
    /** Create @odata.bind for parentbusinessunitid -> businessunit */
    parentbusinessunitid: (id: string): { 'ParentBusinessUnitId@odata.bind': string } => ({
        'ParentBusinessUnitId@odata.bind': `/businessunits(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type BusinessUnitCreate = Partial<BusinessUnit> & Partial<BusinessUnitBindings> & {
    name: string; // Required for create
};

export type BusinessUnitUpdate = Partial<Omit<BusinessUnit, 'businessunitid'>> & Partial<BusinessUnitBindings> & {
    businessunitid: string; // Required for update
};

/**
 * Runtime metadata for Business Unit
 * Provides entity schema information for API operations
 */
export const BusinessUnitMeta = {
    logicalName: "businessunit",
    schemaName: "BusinessUnit",
    displayName: "Business Unit",
    entitySetName: "businessunits",
    isCustomEntity: false,
    description: "Business, division, or department in the Microsoft Dynamics 365 database.",
    primaryKey: {
        logicalName: "businessunitid",
        attributeType: "Uniqueidentifier",
        displayName: "Address 1: ID"
    },
    primaryName: {
        logicalName: "name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["calendarid", "createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "organizationid", "parentbusinessunitid", "transactioncurrencyid"],
    requiredAttributes: ["isdisabled", "name", "organizationid", "organizationidname", "parentbusinessunitid", "parentbusinessunitidname"],
    optionSets: ["businessunit_address1_addresstypecode", "businessunit_address1_shippingmethodcode", "businessunit_address2_addresstypecode", "businessunit_address2_shippingmethodcode"],
    expandableProperties: [
        "CalendarId", // Relationship
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OrganizationId", // Relationship
        "ParentBusinessUnitId", // Relationship
        "TransactionCurrencyId", // Relationship
    ],
    relatedEntities: {
        "calendarid": {
            relationshipName: "calendarid",
            targetEntityLogicalName: "calendar",
            targetEntitySetName: "calendars",
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
        "parentbusinessunitid": {
            relationshipName: "parentbusinessunitid",
            targetEntityLogicalName: "businessunit",
            targetEntitySetName: "businessunits",
            relationshipType: "ManyToOne"
        },
        "transactioncurrencyid": {
            relationshipName: "transactioncurrencyid",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.833Z"
} as const;
