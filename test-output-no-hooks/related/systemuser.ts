// Required imports
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { TransactionCurrency } from './transactioncurrency.js'
import type { TransactionCurrencyExpand } from './transactioncurrency.js'

/**
 * Access Mode
 * Type of user.
 * LogicalName: systemuser_accessmode
 * Global: false
 * Custom: false
 */
export const SystemuserAccessmode = {
    Readwrite: { Value: 0, Label: "Read-Write" },
    Administrative: { Value: 1, Label: "Administrative" },
    Read: { Value: 2, Label: "Read" },
    SupportUser: { Value: 3, Label: "Support User" },
    Noninteractive: { Value: 4, Label: "Non-interactive" },
    DelegatedAdmin: { Value: 5, Label: "Delegated Admin" }
} as const;

/** Access Mode option values */
export type SystemuserAccessmodeValue = (typeof SystemuserAccessmode)[keyof typeof SystemuserAccessmode]["Value"];

/**
 * Address 1: Address Type
 * Type of address for address 1, such as billing, shipping, or primary address.
 * LogicalName: systemuser_address1_addresstypecode
 * Global: false
 * Custom: false
 */
export const SystemuserAddress1Addresstypecode = {
    DefaultValue: { Value: 1, Label: "Default Value" }
} as const;

/** Address 1: Address Type option values */
export type SystemuserAddress1AddresstypecodeValue = (typeof SystemuserAddress1Addresstypecode)[keyof typeof SystemuserAddress1Addresstypecode]["Value"];

/**
 * Address 1: Shipping Method 
 * Method of shipment for address 1.
 * LogicalName: systemuser_address1_shippingmethodcode
 * Global: false
 * Custom: false
 */
export const SystemuserAddress1Shippingmethodcode = {
    DefaultValue: { Value: 1, Label: "Default Value" }
} as const;

/** Address 1: Shipping Method  option values */
export type SystemuserAddress1ShippingmethodcodeValue = (typeof SystemuserAddress1Shippingmethodcode)[keyof typeof SystemuserAddress1Shippingmethodcode]["Value"];

/**
 * Address 2: Address Type
 * Type of address for address 2, such as billing, shipping, or primary address.
 * LogicalName: systemuser_address2_addresstypecode
 * Global: false
 * Custom: false
 */
export const SystemuserAddress2Addresstypecode = {
    DefaultValue: { Value: 1, Label: "Default Value" }
} as const;

/** Address 2: Address Type option values */
export type SystemuserAddress2AddresstypecodeValue = (typeof SystemuserAddress2Addresstypecode)[keyof typeof SystemuserAddress2Addresstypecode]["Value"];

/**
 * Address 2: Shipping Method 
 * Method of shipment for address 2.
 * LogicalName: systemuser_address2_shippingmethodcode
 * Global: false
 * Custom: false
 */
export const SystemuserAddress2Shippingmethodcode = {
    DefaultValue: { Value: 1, Label: "Default Value" }
} as const;

/** Address 2: Shipping Method  option values */
export type SystemuserAddress2ShippingmethodcodeValue = (typeof SystemuserAddress2Shippingmethodcode)[keyof typeof SystemuserAddress2Shippingmethodcode]["Value"];

/**
 * Azure State
 * Azure state of user.
 * LogicalName: systemuser_azurestate
 * Global: false
 * Custom: false
 */
export const SystemuserAzurestate = {
    Exists: { Value: 0, Label: "Exists" },
    SoftDeleted: { Value: 1, Label: "Soft deleted" },
    NotFoundOrHardDeleted: { Value: 2, Label: "Not found or hard deleted" }
} as const;

/** Azure State option values */
export type SystemuserAzurestateValue = (typeof SystemuserAzurestate)[keyof typeof SystemuserAzurestate]["Value"];

/**
 * CAL Type
 * License type of user. This is used only in the on-premises version of the product. Online licenses are managed through Microsoft 365 Office Portal.
 * LogicalName: systemuser_caltype
 * Global: false
 * Custom: false
 */
export const SystemuserCaltype = {
    Professional: { Value: 0, Label: "Professional" },
    Administrative: { Value: 1, Label: "Administrative" },
    Basic: { Value: 2, Label: "Basic" },
    DeviceProfessional: { Value: 3, Label: "Device Professional" },
    DeviceBasic: { Value: 4, Label: "Device Basic" },
    Essential: { Value: 5, Label: "Essential" },
    DeviceEssential: { Value: 6, Label: "Device Essential" },
    Enterprise: { Value: 7, Label: "Enterprise" },
    DeviceEnterprise: { Value: 8, Label: "Device Enterprise" },
    Sales: { Value: 9, Label: "Sales" },
    Service: { Value: 10, Label: "Service" },
    FieldService: { Value: 11, Label: "Field Service" },
    ProjectService: { Value: 12, Label: "Project Service" }
} as const;

/** CAL Type option values */
export type SystemuserCaltypeValue = (typeof SystemuserCaltype)[keyof typeof SystemuserCaltype]["Value"];

/**
 * Delete State
 * User delete state.
 * LogicalName: systemuser_deletestate
 * Global: false
 * Custom: false
 */
export const SystemuserDeletestate = {
    NotDeleted: { Value: 0, Label: "Not deleted" },
    SoftDeleted: { Value: 1, Label: "Soft deleted" }
} as const;

/** Delete State option values */
export type SystemuserDeletestateValue = (typeof SystemuserDeletestate)[keyof typeof SystemuserDeletestate]["Value"];

/**
 * Shows whether the email address is approved for each mailbox for processing email through server-side synchronization or the Email Router.
 * Indicates the approval options for server-side synchronization or Email Router access.
 * LogicalName: systemuser_emailrouteraccessapproval
 * Global: false
 * Custom: false
 */
export const SystemuserEmailrouteraccessapproval = {
    Empty: { Value: 0, Label: "Empty" },
    Approved: { Value: 1, Label: "Approved" },
    PendingApproval: { Value: 2, Label: "Pending Approval" },
    Rejected: { Value: 3, Label: "Rejected" }
} as const;

/** Shows whether the email address is approved for each mailbox for processing email through server-side synchronization or the Email Router. option values */
export type SystemuserEmailrouteraccessapprovalValue = (typeof SystemuserEmailrouteraccessapproval)[keyof typeof SystemuserEmailrouteraccessapproval]["Value"];

/**
 * Incoming Email Delivery Method
 * Incoming email delivery method for the user.
 * LogicalName: systemuser_incomingemaildeliverymethod
 * Global: false
 * Custom: false
 */
export const SystemuserIncomingemaildeliverymethod = {
    None: { Value: 0, Label: "None" },
    MicrosoftDynamics365ForOutlook: { Value: 1, Label: "Microsoft Dynamics 365 for Outlook" },
    ServersideSynchronizationOrEmailRouter: { Value: 2, Label: "Server-Side Synchronization or Email Router" },
    ForwardMailbox: { Value: 3, Label: "Forward Mailbox" }
} as const;

/** Incoming Email Delivery Method option values */
export type SystemuserIncomingemaildeliverymethodValue = (typeof SystemuserIncomingemaildeliverymethod)[keyof typeof SystemuserIncomingemaildeliverymethod]["Value"];

/**
 * Invitation Status
 * User invitation status.
 * LogicalName: systemuser_invitestatuscode
 * Global: false
 * Custom: false
 */
export const SystemuserInvitestatuscode = {
    InvitationNotSent: { Value: 0, Label: "Invitation Not Sent" },
    Invited: { Value: 1, Label: "Invited" },
    InvitationNearExpired: { Value: 2, Label: "Invitation Near Expired" },
    InvitationExpired: { Value: 3, Label: "Invitation Expired" },
    InvitationAccepted: { Value: 4, Label: "Invitation Accepted" },
    InvitationRejected: { Value: 5, Label: "Invitation Rejected" },
    InvitationRevoked: { Value: 6, Label: "Invitation Revoked" }
} as const;

/** Invitation Status option values */
export type SystemuserInvitestatuscodeValue = (typeof SystemuserInvitestatuscode)[keyof typeof SystemuserInvitestatuscode]["Value"];

/**
 * Outgoing Email Delivery Method
 * Outgoing email delivery method for the user.
 * LogicalName: systemuser_outgoingemaildeliverymethod
 * Global: false
 * Custom: false
 */
export const SystemuserOutgoingemaildeliverymethod = {
    None: { Value: 0, Label: "None" },
    MicrosoftDynamics365ForOutlook: { Value: 1, Label: "Microsoft Dynamics 365 for Outlook" },
    ServersideSynchronizationOrEmailRouter: { Value: 2, Label: "Server-Side Synchronization or Email Router" }
} as const;

/** Outgoing Email Delivery Method option values */
export type SystemuserOutgoingemaildeliverymethodValue = (typeof SystemuserOutgoingemaildeliverymethod)[keyof typeof SystemuserOutgoingemaildeliverymethod]["Value"];

/**
 * Preferred Address
 * Preferred address for the user.
 * LogicalName: systemuser_preferredaddresscode
 * Global: false
 * Custom: false
 */
export const SystemuserPreferredaddresscode = {
    MailingAddress: { Value: 1, Label: "Mailing Address" },
    OtherAddress: { Value: 2, Label: "Other Address" }
} as const;

/** Preferred Address option values */
export type SystemuserPreferredaddresscodeValue = (typeof SystemuserPreferredaddresscode)[keyof typeof SystemuserPreferredaddresscode]["Value"];

/**
 * Preferred Email
 * Preferred email address for the user.
 * LogicalName: systemuser_preferredemailcode
 * Global: false
 * Custom: false
 */
export const SystemuserPreferredemailcode = {
    DefaultValue: { Value: 1, Label: "Default Value" }
} as const;

/** Preferred Email option values */
export type SystemuserPreferredemailcodeValue = (typeof SystemuserPreferredemailcode)[keyof typeof SystemuserPreferredemailcode]["Value"];

/**
 * Preferred Phone
 * Preferred phone number for the user.
 * LogicalName: systemuser_preferredphonecode
 * Global: false
 * Custom: false
 */
export const SystemuserPreferredphonecode = {
    MainPhone: { Value: 1, Label: "Main Phone" },
    OtherPhone: { Value: 2, Label: "Other Phone" },
    HomePhone: { Value: 3, Label: "Home Phone" },
    MobilePhone: { Value: 4, Label: "Mobile Phone" }
} as const;

/** Preferred Phone option values */
export type SystemuserPreferredphonecodeValue = (typeof SystemuserPreferredphonecode)[keyof typeof SystemuserPreferredphonecode]["Value"];

/**
 * System Managed User Type
 * The type of user
 * LogicalName: systemuser_systemmanagedusertype
 * Global: false
 * Custom: false
 */
export const SystemuserSystemmanagedusertype = {
    EntraUser: { Value: 0, Label: "Entra User" },
    C2User: { Value: 1, Label: "C2 User" },
    ImpersonableStubUser: { Value: 2, Label: "Impersonable Stub User" }
} as const;

/** System Managed User Type option values */
export type SystemuserSystemmanagedusertypeValue = (typeof SystemuserSystemmanagedusertype)[keyof typeof SystemuserSystemmanagedusertype]["Value"];


/**
 * User
 * En person, der har adgang til Microsoft CRM, og som ejer objekter i Microsoft CRM-databasen.
 * Entity: systemuser
 * Schema: SystemUser
 * Primary Key: systemuserid
 * Primary Name: fullname
 */
export interface SystemUser {
    /** Access Mode - Type of user. */
    accessmode: SystemuserAccessmodeValue; // Option set: systemuser_accessmode
    /** Active Directory Guid - Active Directory object GUID for the system user. */
    activedirectoryguid?: string;
    /** Address 1: ID - Unique identifier for address 1. */
    address1_addressid: string;
    /** Address 1: Address Type - Type of address for address 1, such as billing, shipping, or primary address. */
    address1_addresstypecode?: SystemuserAddress1AddresstypecodeValue; // Option set: systemuser_address1_addresstypecode
    /** City - City name for address 1. */
    address1_city?: string;
    /** Address - Shows the complete primary address. */
    address1_composite?: string;
    /** Country/Region - Country/region name in address 1. */
    address1_country?: string;
    /** Address 1: County - County name for address 1. */
    address1_county?: string;
    /** Address 1: Fax - Fax number for address 1. */
    address1_fax?: string;
    /** Address 1: Latitude - Latitude for address 1. */
    address1_latitude?: number;
    /** Street 1 - First line for entering address 1 information. */
    address1_line1?: string;
    /** Street 2 - Second line for entering address 1 information. */
    address1_line2?: string;
    /** Street 3 - Third line for entering address 1 information. */
    address1_line3?: string;
    /** Address 1: Longitude - Longitude for address 1. */
    address1_longitude?: number;
    /** Address 1: Name - Name to enter for address 1. */
    address1_name?: string;
    /** ZIP/Postal Code - ZIP Code or postal code for address 1. */
    address1_postalcode?: string;
    /** Address 1: Post Office Box - Post office box number for address 1. */
    address1_postofficebox?: string;
    /** Address 1: Shipping Method - Method of shipment for address 1. */
    address1_shippingmethodcode?: SystemuserAddress1ShippingmethodcodeValue; // Option set: systemuser_address1_shippingmethodcode
    /** State/Province - State or province for address 1. */
    address1_stateorprovince?: string;
    /** Main Phone - First telephone number associated with address 1. */
    address1_telephone1?: string;
    /** Other Phone - Second telephone number associated with address 1. */
    address1_telephone2?: string;
    /** Pager - Third telephone number associated with address 1. */
    address1_telephone3?: string;
    /** Address 1: UPS Zone - United Parcel Service (UPS) zone for address 1. */
    address1_upszone?: string;
    /** Address 1: UTC Offset - UTC offset for address 1. This is the difference between local time and standard Coordinated Universal Time. */
    address1_utcoffset?: number;
    /** Address 2: ID - Unique identifier for address 2. */
    address2_addressid: string;
    /** Address 2: Address Type - Type of address for address 2, such as billing, shipping, or primary address. */
    address2_addresstypecode?: SystemuserAddress2AddresstypecodeValue; // Option set: systemuser_address2_addresstypecode
    /** Other City - City name for address 2. */
    address2_city?: string;
    /** Other Address - Shows the complete secondary address. */
    address2_composite?: string;
    /** Other Country/Region - Country/region name in address 2. */
    address2_country?: string;
    /** Address 2: County - County name for address 2. */
    address2_county?: string;
    /** Address 2: Fax - Fax number for address 2. */
    address2_fax?: string;
    /** Address 2: Latitude - Latitude for address 2. */
    address2_latitude?: number;
    /** Other Street 1 - First line for entering address 2 information. */
    address2_line1?: string;
    /** Other Street 2 - Second line for entering address 2 information. */
    address2_line2?: string;
    /** Other Street 3 - Third line for entering address 2 information. */
    address2_line3?: string;
    /** Address 2: Longitude - Longitude for address 2. */
    address2_longitude?: number;
    /** Address 2: Name - Name to enter for address 2. */
    address2_name?: string;
    /** Other ZIP/Postal Code - ZIP Code or postal code for address 2. */
    address2_postalcode?: string;
    /** Address 2: Post Office Box - Post office box number for address 2. */
    address2_postofficebox?: string;
    /** Address 2: Shipping Method - Method of shipment for address 2. */
    address2_shippingmethodcode?: SystemuserAddress2ShippingmethodcodeValue; // Option set: systemuser_address2_shippingmethodcode
    /** Other State/Province - State or province for address 2. */
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
    /** Application ID - The identifier for the application. This is used to access data in another application. */
    applicationid?: string;
    /** Application ID URI - The URI used as a unique logical identifier for the external app. This can be used to validate the application. */
    applicationiduri?: string;
    /** Azure AD Object ID - This is the application directory object Id. */
    azureactivedirectoryobjectid?: string;
    /** Azure Deleted On - Date and time when the user was set as soft deleted in Azure. */
    azuredeletedon?: Date | string;
    /** Azure State - Azure state of user */
    azurestate: SystemuserAzurestateValue; // Option set: systemuser_azurestate
    /** Business Unit - Unique identifier of the business unit with which the user is associated. */
    businessunitid: string; // Lookup to: businessunit
    /** _businessunitid_value - Resolved lookup GUID value */
    _businessunitid_value?: string; // Lookup value
    /** Calendar - Fiscal calendar associated with the user. */
    calendarid?: string; // Lookup to: calendar
    /** _calendarid_value - Resolved lookup GUID value */
    _calendarid_value?: string; // Lookup value
    /** License Type - License type of user. This is used only in the on-premises version of the product. Online licenses are managed through Microsoft 365 Office Portal */
    caltype: SystemuserCaltypeValue; // Option set: systemuser_caltype
    /** Created By - Unique identifier of the user who created the user. */
    createdby?: string; // Lookup to: systemuser
    /** _createdby_value - Resolved lookup GUID value */
    _createdby_value?: string; // Lookup value
    /** Created On - Date and time when the user was created. */
    createdon?: Date | string;
    /** Created By (Delegate) - Unique identifier of the delegate user who created the systemuser. */
    createdonbehalfby?: string; // Lookup to: systemuser
    /** _createdonbehalfby_value - Resolved lookup GUID value */
    _createdonbehalfby_value?: string; // Lookup value
    /** Default Filters Populated - Indicates if default outlook filters have been populated. */
    defaultfilterspopulated: boolean;
    /** Mailbox - Select the mailbox associated with this user. */
    defaultmailbox?: string; // Lookup to: mailbox
    /** _defaultmailbox_value - Resolved lookup GUID value */
    _defaultmailbox_value?: string; // Lookup value
    /** Default OneDrive for Business Folder Name - Type a default folder name for the user's OneDrive For Business location. */
    defaultodbfoldername: string;
    /** Deleted State - User delete state */
    deletedstate: SystemuserDeletestateValue; // Option set: systemuser_deletestate
    /** Disabled Reason - Reason for disabling the user. */
    disabledreason?: string;
    /** Display in Service Views - Whether to display the user in service views. */
    displayinserviceviews?: boolean;
    /** User Name - Active Directory domain of which the user is a member. */
    domainname: string;
    /** Primary Email Status - Shows the status of the primary email address. */
    emailrouteraccessapproval: SystemuserEmailrouteraccessapprovalValue; // Option set: systemuser_emailrouteraccessapproval
    /** Employee - Employee identifier for the user. */
    employeeid?: string;
    /** Entity Image Id - For internal use only. */
    entityimageid?: string;
    /** Exchange Rate - Exchange rate for the currency associated with the systemuser with respect to the base currency. */
    exchangerate?: number;
    /** First Name - First name of the user. */
    firstname?: string;
    /** Full Name - Full name of the user. */
    fullname?: string;
    /** Government - Government identifier for the user. */
    governmentid?: string;
    /** Home Phone - Home phone number for the user. */
    homephone?: string;
    /** Unique user identity id - For internal use only. */
    identityid: number;
    /** Import Sequence Number - Unique identifier of the data import or data migration that created this record. */
    importsequencenumber?: number;
    /** Incoming Email Delivery Method - Incoming email delivery method for the user. */
    incomingemaildeliverymethod: SystemuserIncomingemaildeliverymethodValue; // Option set: systemuser_incomingemaildeliverymethod
    /** Primary Email - Internal email address for the user. */
    internalemailaddress: string;
    /** Invitation Status - User invitation status. */
    invitestatuscode?: SystemuserInvitestatuscodeValue; // Option set: systemuser_invitestatuscode
    /** Is Active Directory User - Information about whether the user is an AD user. */
    isactivedirectoryuser: boolean;
    /** To bypass IP firewall restriction on the user - Bypasses the selected user from IP firewall restriction */
    isallowedbyipfirewall?: boolean;
    /** Status - Information about whether the user is enabled. */
    isdisabled?: boolean;
    /** Email Address O365 Admin Approval Status - Shows the status of approval of the email address by O365 Admin. */
    isemailaddressapprovedbyo365admin: boolean;
    /** Integration user mode - Check if user is an integration user. */
    isintegrationuser: boolean;
    /** User Licensed - Information about whether the user is licensed. */
    islicensed: boolean;
    /** User Synced - Information about whether the user is synced with the directory. */
    issyncwithdirectory: boolean;
    /** Job Title - Job title of the user. */
    jobtitle?: string;
    /** Last Name - Last name of the user. */
    lastname?: string;
    /** Latest User Update Time - Time stamp of the latest update for the user */
    latestupdatetime?: Date | string;
    /** Middle Name - Middle name of the user. */
    middlename?: string;
    /** Mobile Alert Email - Mobile alert email address for the user. */
    mobilealertemail?: string;
    /** Mobile Offline Profile - Items contained with a particular SystemUser. */
    mobileofflineprofileid?: string; // Lookup to: mobileofflineprofile
    /** _mobileofflineprofileid_value - Resolved lookup GUID value */
    _mobileofflineprofileid_value?: string; // Lookup value
    /** Mobile Phone - Mobile phone number for the user. */
    mobilephone?: string;
    /** Modified By - Unique identifier of the user who last modified the user. */
    modifiedby?: string; // Lookup to: systemuser
    /** _modifiedby_value - Resolved lookup GUID value */
    _modifiedby_value?: string; // Lookup value
    /** Modified On - Date and time when the user was last modified. */
    modifiedon?: Date | string;
    /** Modified By (Delegate) - Unique identifier of the delegate user who last modified the systemuser. */
    modifiedonbehalfby?: string; // Lookup to: systemuser
    /** _modifiedonbehalfby_value - Resolved lookup GUID value */
    _modifiedonbehalfby_value?: string; // Lookup value
    /** Nickname - Nickname of the user. */
    nickname?: string;
    /** Organization  - Unique identifier of the organization associated with the user. */
    organizationid: string;
    /** Outgoing Email Delivery Method - Outgoing email delivery method for the user. */
    outgoingemaildeliverymethod: SystemuserOutgoingemaildeliverymethodValue; // Option set: systemuser_outgoingemaildeliverymethod
    /** Record Created On - Date and time that the record was migrated. */
    overriddencreatedon?: Date | string;
    /** Manager - Unique identifier of the manager of the user. */
    parentsystemuserid?: string; // Lookup to: systemuser
    /** _parentsystemuserid_value - Resolved lookup GUID value */
    _parentsystemuserid_value?: string; // Lookup value
    /** Passport Hi - For internal use only. */
    passporthi?: number;
    /** Passport Lo - For internal use only. */
    passportlo?: number;
    /** Email 2 - Personal email address of the user. */
    personalemailaddress?: string;
    /** Photo URL - URL for the Website on which a photo of the user is located. */
    photourl?: string;
    /** Position - User's position in hierarchical security model. */
    positionid?: string; // Lookup to: position
    /** _positionid_value - Resolved lookup GUID value */
    _positionid_value?: string; // Lookup value
    /** Preferred Address - Preferred address for the user. */
    preferredaddresscode?: SystemuserPreferredaddresscodeValue; // Option set: systemuser_preferredaddresscode
    /** Preferred Email - Preferred email address for the user. */
    preferredemailcode?: SystemuserPreferredemailcodeValue; // Option set: systemuser_preferredemailcode
    /** Preferred Phone - Preferred phone number for the user. */
    preferredphonecode?: SystemuserPreferredphonecodeValue; // Option set: systemuser_preferredphonecode
    /** Process - Shows the ID of the process. */
    processid?: string;
    /** Default Queue - Unique identifier of the default queue for the user. */
    queueid?: string; // Lookup to: queue
    /** _queueid_value - Resolved lookup GUID value */
    _queueid_value?: string; // Lookup value
    /** Salutation - Salutation for correspondence with the user. */
    salutation?: string;
    /** Restricted Access Mode - Check if user is a setup user. */
    setupuser: boolean;
    /** SharePoint Email Address - SharePoint Work Email Address */
    sharepointemailaddress?: string;
    /** Skills - Skill set of the user. */
    skills?: string;
    /** (Deprecated) Process Stage - Shows the ID of the stage. */
    stageid?: string;
    /** System Managed User Type - The type of user */
    systemmanagedusertype?: SystemuserSystemmanagedusertypeValue; // Option set: systemuser_systemmanagedusertype
    /** User - Unique identifier for the user. */
    systemuserid: string;
    /** Territory - Unique identifier of the territory to which the user is assigned. */
    territoryid?: string; // Lookup to: territory
    /** _territoryid_value - Resolved lookup GUID value */
    _territoryid_value?: string; // Lookup value
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** Title - Title of the user. */
    title?: string;
    /** Currency - Unique identifier of the currency associated with the systemuser. */
    transactioncurrencyid?: string; // Lookup to: transactioncurrency
    /** _transactioncurrencyid_value - Resolved lookup GUID value */
    _transactioncurrencyid_value?: string; // Lookup value
    /** (Deprecated) Traversed Path - For internal use only. */
    traversedpath?: string;
    /** User License Type - Shows the type of user license. */
    userlicensetype: number;
    /** User PUID -  User PUID User Identifiable Information */
    userpuid?: string;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version number - Version number of the user. */
    versionnumber?: number;
    /** Windows Live ID */
    windowsliveid?: string;
    /** Yammer Email - User's Yammer login email address */
    yammeremailaddress?: string;
    /** Yammer User ID - User's Yammer ID */
    yammeruserid?: string;
    /** Yomi First Name - Pronunciation of the first name of the user, written in phonetic hiragana or katakana characters. */
    yomifirstname?: string;
    /** Yomi Full Name - Pronunciation of the full name of the user, written in phonetic hiragana or katakana characters. */
    yomifullname?: string;
    /** Yomi Last Name - Pronunciation of the last name of the user, written in phonetic hiragana or katakana characters. */
    yomilastname?: string;
    /** Yomi Middle Name - Pronunciation of the middle name of the user, written in phonetic hiragana or katakana characters. */
    yomimiddlename?: string;
}

/**
 * Type-safe expand properties for User
 * Enables IntelliSense for $expand relationship names
 */
export type SystemUserExpandableProperties =
    "BusinessUnitId"
    | "CalendarId"
    | "CreatedBy"
    | "CreatedOnBehalfBy"
    | "DefaultMailbox"
    | "MobileOfflineProfileId"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "ParentSystemUserId"
    | "PositionId"
    | "QueueId"
    | "TerritoryId"
    | "TransactionCurrencyId"

/**
 * Type-safe expand options for User
 * Supports both array format and object format with nested options
 */
export type SystemUserExpand =
    | SystemUserExpandableProperties[]
    | {
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
        "parentsystemuserid"?: {
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
 * Type-safe expand options for User
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for SystemUser @odata.bind operations
 */
export type SystemUserBindings = {
    'BusinessUnitId@odata.bind'?: string; // Bind to: businessunit
    'CalendarId@odata.bind'?: string; // Bind to: calendar
    'DefaultMailbox@odata.bind'?: string; // Bind to: mailbox
    'MobileOfflineProfileId@odata.bind'?: string; // Bind to: mobileofflineprofile
    'ParentSystemUserId@odata.bind'?: string; // Bind to: systemuser
    'PositionId@odata.bind'?: string; // Bind to: position
    'QueueId@odata.bind'?: string; // Bind to: queue
    'TerritoryId@odata.bind'?: string; // Bind to: territory
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating SystemUser @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const SystemUserBindings = {
    /** Create @odata.bind for businessunitid -> businessunit */
    businessunitid: (id: string): { 'BusinessUnitId@odata.bind': string } => ({
        'BusinessUnitId@odata.bind': `/businessunits(${id})`
    }),
    /** Create @odata.bind for parentsystemuserid -> systemuser */
    parentsystemuserid: (id: string): { 'ParentSystemUserId@odata.bind': string } => ({
        'ParentSystemUserId@odata.bind': `/systemusers(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type SystemUserCreate = Partial<SystemUser> & Partial<SystemUserBindings> & {
    fullname: string; // Required for create
};

export type SystemUserUpdate = Partial<Omit<SystemUser, 'systemuserid'>> & Partial<SystemUserBindings> & {
    systemuserid: string; // Required for update
};

/**
 * Runtime metadata for User
 * Provides entity schema information for API operations
 */
export const SystemUserMeta = {
    logicalName: "systemuser",
    schemaName: "SystemUser",
    displayName: "User",
    entitySetName: "systemusers",
    isCustomEntity: false,
    description: "En person, der har adgang til Microsoft CRM, og som ejer objekter i Microsoft CRM-databasen.",
    primaryKey: {
        logicalName: "systemuserid",
        attributeType: "Uniqueidentifier",
        displayName: "Address 1: ID"
    },
    primaryName: {
        logicalName: "fullname",
        attributeType: "String",
        displayName: "Full Name",
    },
    lookupAttributes: ["businessunitid", "calendarid", "createdby", "createdonbehalfby", "defaultmailbox", "mobileofflineprofileid", "modifiedby", "modifiedonbehalfby", "parentsystemuserid", "positionid", "queueid", "territoryid", "transactioncurrencyid"],
    requiredAttributes: ["accessmode", "azurestate", "businessunitid", "businessunitidname", "caltype", "defaultfilterspopulated", "defaultodbfoldername", "deletedstate", "domainname", "emailrouteraccessapproval", "firstname", "identityid", "incomingemaildeliverymethod", "internalemailaddress", "invitestatuscode", "isactivedirectoryuser", "isemailaddressapprovedbyo365admin", "isintegrationuser", "islicensed", "issyncwithdirectory", "lastname", "organizationid", "organizationidname", "outgoingemaildeliverymethod", "setupuser", "systemmanagedusertype", "territoryidname", "userlicensetype"],
    optionSets: ["systemuser_accessmode", "systemuser_address1_addresstypecode", "systemuser_address1_shippingmethodcode", "systemuser_address2_addresstypecode", "systemuser_address2_shippingmethodcode", "systemuser_azurestate", "systemuser_caltype", "systemuser_deletestate", "systemuser_emailrouteraccessapproval", "systemuser_incomingemaildeliverymethod", "systemuser_invitestatuscode", "systemuser_outgoingemaildeliverymethod", "systemuser_preferredaddresscode", "systemuser_preferredemailcode", "systemuser_preferredphonecode", "systemuser_systemmanagedusertype"],
    expandableProperties: [
        "BusinessUnitId", // Relationship
        "CalendarId", // Relationship
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "DefaultMailbox", // Relationship
        "MobileOfflineProfileId", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "ParentSystemUserId", // Relationship
        "PositionId", // Relationship
        "QueueId", // Relationship
        "TerritoryId", // Relationship
        "TransactionCurrencyId", // Relationship
    ],
    relatedEntities: {
        "businessunitid": {
            relationshipName: "businessunitid",
            targetEntityLogicalName: "businessunit",
            targetEntitySetName: "businessunits",
            relationshipType: "ManyToOne"
        },
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
        "defaultmailbox": {
            relationshipName: "defaultmailbox",
            targetEntityLogicalName: "mailbox",
            targetEntitySetName: "mailboxs",
            relationshipType: "ManyToOne"
        },
        "mobileofflineprofileid": {
            relationshipName: "mobileofflineprofileid",
            targetEntityLogicalName: "mobileofflineprofile",
            targetEntitySetName: "mobileofflineprofiles",
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
        "parentsystemuserid": {
            relationshipName: "parentsystemuserid",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
        "positionid": {
            relationshipName: "positionid",
            targetEntityLogicalName: "position",
            targetEntitySetName: "positions",
            relationshipType: "ManyToOne"
        },
        "queueid": {
            relationshipName: "queueid",
            targetEntityLogicalName: "queue",
            targetEntitySetName: "queues",
            relationshipType: "ManyToOne"
        },
        "territoryid": {
            relationshipName: "territoryid",
            targetEntityLogicalName: "territory",
            targetEntitySetName: "territorys",
            relationshipType: "ManyToOne"
        },
        "transactioncurrencyid": {
            relationshipName: "transactioncurrencyid",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.976Z"
} as const;
