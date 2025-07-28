/**
 * Access Mode
 * Type of user.
 * Global: false
 * Custom: false
 */
export const SystemuserAccessmode = {
    Readwrite: { Value: 0, Label: "Read-Write" },
    Administrative: { Value: 1, Label: "Administrative" },
    Read: { Value: 2, Label: "Read" },
    SupportUser: { Value: 3, Label: "Support User" },
    Noninteractive: { Value: 4, Label: "Non-interactive" },
    DelegatedAdmin: { Value: 5, Label: "Delegated Admin" },
} as const;

export type SystemuserAccessmodeValue = typeof SystemuserAccessmode[keyof typeof SystemuserAccessmode]['Value'];

/**
 * Address 1: Address Type
 * Type of address for address 1, such as billing, shipping, or primary address.
 * Global: false
 * Custom: false
 */
export const SystemuserAddress1Addresstypecode = {
    DefaultValue: { Value: 1, Label: "Default Value" },
} as const;

export type SystemuserAddress1AddresstypecodeValue = typeof SystemuserAddress1Addresstypecode[keyof typeof SystemuserAddress1Addresstypecode]['Value'];

/**
 * Address 1: Shipping Method 
 * Method of shipment for address 1.
 * Global: false
 * Custom: false
 */
export const SystemuserAddress1Shippingmethodcode = {
    DefaultValue: { Value: 1, Label: "Default Value" },
} as const;

export type SystemuserAddress1ShippingmethodcodeValue = typeof SystemuserAddress1Shippingmethodcode[keyof typeof SystemuserAddress1Shippingmethodcode]['Value'];

/**
 * Address 2: Address Type
 * Type of address for address 2, such as billing, shipping, or primary address.
 * Global: false
 * Custom: false
 */
export const SystemuserAddress2Addresstypecode = {
    DefaultValue: { Value: 1, Label: "Default Value" },
} as const;

export type SystemuserAddress2AddresstypecodeValue = typeof SystemuserAddress2Addresstypecode[keyof typeof SystemuserAddress2Addresstypecode]['Value'];

/**
 * Address 2: Shipping Method 
 * Method of shipment for address 2.
 * Global: false
 * Custom: false
 */
export const SystemuserAddress2Shippingmethodcode = {
    DefaultValue: { Value: 1, Label: "Default Value" },
} as const;

export type SystemuserAddress2ShippingmethodcodeValue = typeof SystemuserAddress2Shippingmethodcode[keyof typeof SystemuserAddress2Shippingmethodcode]['Value'];

/**
 * Azure State
 * Azure state of user.
 * Global: false
 * Custom: false
 */
export const SystemuserAzurestate = {
    Exists: { Value: 0, Label: "Exists" },
    SoftDeleted: { Value: 1, Label: "Soft deleted" },
    NotFoundOrHardDeleted: { Value: 2, Label: "Not found or hard deleted" },
} as const;

export type SystemuserAzurestateValue = typeof SystemuserAzurestate[keyof typeof SystemuserAzurestate]['Value'];

/**
 * CAL Type
 * License type of user. This is used only in the on-premises version of the product. Online licenses are managed through Microsoft 365 Office Portal.
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
    ProjectService: { Value: 12, Label: "Project Service" },
} as const;

export type SystemuserCaltypeValue = typeof SystemuserCaltype[keyof typeof SystemuserCaltype]['Value'];

/**
 * Delete State
 * User delete state.
 * Global: false
 * Custom: false
 */
export const SystemuserDeletestate = {
    NotDeleted: { Value: 0, Label: "Not deleted" },
    SoftDeleted: { Value: 1, Label: "Soft deleted" },
} as const;

export type SystemuserDeletestateValue = typeof SystemuserDeletestate[keyof typeof SystemuserDeletestate]['Value'];

/**
 * Shows whether the email address is approved for each mailbox for processing email through server-side synchronization or the Email Router.
 * Indicates the approval options for server-side synchronization or Email Router access.
 * Global: false
 * Custom: false
 */
export const SystemuserEmailrouteraccessapproval = {
    Empty: { Value: 0, Label: "Empty" },
    Approved: { Value: 1, Label: "Approved" },
    PendingApproval: { Value: 2, Label: "Pending Approval" },
    Rejected: { Value: 3, Label: "Rejected" },
} as const;

export type SystemuserEmailrouteraccessapprovalValue = typeof SystemuserEmailrouteraccessapproval[keyof typeof SystemuserEmailrouteraccessapproval]['Value'];

/**
 * Incoming Email Delivery Method
 * Incoming email delivery method for the user.
 * Global: false
 * Custom: false
 */
export const SystemuserIncomingemaildeliverymethod = {
    None: { Value: 0, Label: "None" },
    MicrosoftDynamics365ForOutlook: { Value: 1, Label: "Microsoft Dynamics 365 for Outlook" },
    ServersideSynchronizationOrEmailRouter: { Value: 2, Label: "Server-Side Synchronization or Email Router" },
    ForwardMailbox: { Value: 3, Label: "Forward Mailbox" },
} as const;

export type SystemuserIncomingemaildeliverymethodValue = typeof SystemuserIncomingemaildeliverymethod[keyof typeof SystemuserIncomingemaildeliverymethod]['Value'];

/**
 * Invitation Status
 * User invitation status.
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
    InvitationRevoked: { Value: 6, Label: "Invitation Revoked" },
} as const;

export type SystemuserInvitestatuscodeValue = typeof SystemuserInvitestatuscode[keyof typeof SystemuserInvitestatuscode]['Value'];

/**
 * Outgoing Email Delivery Method
 * Outgoing email delivery method for the user.
 * Global: false
 * Custom: false
 */
export const SystemuserOutgoingemaildeliverymethod = {
    None: { Value: 0, Label: "None" },
    MicrosoftDynamics365ForOutlook: { Value: 1, Label: "Microsoft Dynamics 365 for Outlook" },
    ServersideSynchronizationOrEmailRouter: { Value: 2, Label: "Server-Side Synchronization or Email Router" },
} as const;

export type SystemuserOutgoingemaildeliverymethodValue = typeof SystemuserOutgoingemaildeliverymethod[keyof typeof SystemuserOutgoingemaildeliverymethod]['Value'];

/**
 * Preferred Address
 * Preferred address for the user.
 * Global: false
 * Custom: false
 */
export const SystemuserPreferredaddresscode = {
    MailingAddress: { Value: 1, Label: "Mailing Address" },
    OtherAddress: { Value: 2, Label: "Other Address" },
} as const;

export type SystemuserPreferredaddresscodeValue = typeof SystemuserPreferredaddresscode[keyof typeof SystemuserPreferredaddresscode]['Value'];

/**
 * Preferred Email
 * Preferred email address for the user.
 * Global: false
 * Custom: false
 */
export const SystemuserPreferredemailcode = {
    DefaultValue: { Value: 1, Label: "Default Value" },
} as const;

export type SystemuserPreferredemailcodeValue = typeof SystemuserPreferredemailcode[keyof typeof SystemuserPreferredemailcode]['Value'];

/**
 * Preferred Phone
 * Preferred phone number for the user.
 * Global: false
 * Custom: false
 */
export const SystemuserPreferredphonecode = {
    MainPhone: { Value: 1, Label: "Main Phone" },
    OtherPhone: { Value: 2, Label: "Other Phone" },
    HomePhone: { Value: 3, Label: "Home Phone" },
    MobilePhone: { Value: 4, Label: "Mobile Phone" },
} as const;

export type SystemuserPreferredphonecodeValue = typeof SystemuserPreferredphonecode[keyof typeof SystemuserPreferredphonecode]['Value'];

/**
 * System Managed User Type
 * The type of user
 * Global: false
 * Custom: false
 */
export const SystemuserSystemmanagedusertype = {
    EntraUser: { Value: 0, Label: "Entra User" },
    C2User: { Value: 1, Label: "C2 User" },
    ImpersonableStubUser: { Value: 2, Label: "Impersonable Stub User" },
} as const;

export type SystemuserSystemmanagedusertypeValue = typeof SystemuserSystemmanagedusertype[keyof typeof SystemuserSystemmanagedusertype]['Value'];


/**
 * User
 * En person, der har adgang til Microsoft CRM, og som ejer objekter i Microsoft CRM-databasen.
 * Entity: systemuser
 * Schema: SystemUser
 * Custom: false
 */
export interface SystemUser {
    /** accessmode - Access Mode */
    accessmode: SystemuserAccessmodeValue; // Option set: systemuser_accessmode
    /** accessmodename - AccessModeName */
    accessmodename?: string;
    /** activedirectoryguid - Active Directory Guid */
    activedirectoryguid?: string;
    /** address1_addressid - Address 1: ID */
    address1_addressid: string;
    /** address1_addresstypecode - Address 1: Address Type */
    address1_addresstypecode?: SystemuserAddress1AddresstypecodeValue; // Option set: systemuser_address1_addresstypecode
    /** address1_addresstypecodename - Address1_AddressTypeCodeName */
    address1_addresstypecodename?: string;
    /** address1_city - City */
    address1_city?: string;
    /** address1_composite - Address */
    address1_composite?: string;
    /** address1_country - Country/Region */
    address1_country?: string;
    /** address1_county - Address 1: County */
    address1_county?: string;
    /** address1_fax - Address 1: Fax */
    address1_fax?: string;
    /** address1_latitude - Address 1: Latitude */
    address1_latitude?: number;
    /** address1_line1 - Street 1 */
    address1_line1?: string;
    /** address1_line2 - Street 2 */
    address1_line2?: string;
    /** address1_line3 - Street 3 */
    address1_line3?: string;
    /** address1_longitude - Address 1: Longitude */
    address1_longitude?: number;
    /** address1_name - Address 1: Name */
    address1_name?: string;
    /** address1_postalcode - ZIP/Postal Code */
    address1_postalcode?: string;
    /** address1_postofficebox - Address 1: Post Office Box */
    address1_postofficebox?: string;
    /** address1_shippingmethodcode - Address 1: Shipping Method */
    address1_shippingmethodcode?: SystemuserAddress1ShippingmethodcodeValue; // Option set: systemuser_address1_shippingmethodcode
    /** address1_shippingmethodcodename - Address1_ShippingMethodCodeName */
    address1_shippingmethodcodename?: string;
    /** address1_stateorprovince - State/Province */
    address1_stateorprovince?: string;
    /** address1_telephone1 - Main Phone */
    address1_telephone1?: string;
    /** address1_telephone2 - Other Phone */
    address1_telephone2?: string;
    /** address1_telephone3 - Pager */
    address1_telephone3?: string;
    /** address1_upszone - Address 1: UPS Zone */
    address1_upszone?: string;
    /** address1_utcoffset - Address 1: UTC Offset */
    address1_utcoffset?: number;
    /** address2_addressid - Address 2: ID */
    address2_addressid: string;
    /** address2_addresstypecode - Address 2: Address Type */
    address2_addresstypecode?: SystemuserAddress2AddresstypecodeValue; // Option set: systemuser_address2_addresstypecode
    /** address2_addresstypecodename - Address2_AddressTypeCodeName */
    address2_addresstypecodename?: string;
    /** address2_city - Other City */
    address2_city?: string;
    /** address2_composite - Other Address */
    address2_composite?: string;
    /** address2_country - Other Country/Region */
    address2_country?: string;
    /** address2_county - Address 2: County */
    address2_county?: string;
    /** address2_fax - Address 2: Fax */
    address2_fax?: string;
    /** address2_latitude - Address 2: Latitude */
    address2_latitude?: number;
    /** address2_line1 - Other Street 1 */
    address2_line1?: string;
    /** address2_line2 - Other Street 2 */
    address2_line2?: string;
    /** address2_line3 - Other Street 3 */
    address2_line3?: string;
    /** address2_longitude - Address 2: Longitude */
    address2_longitude?: number;
    /** address2_name - Address 2: Name */
    address2_name?: string;
    /** address2_postalcode - Other ZIP/Postal Code */
    address2_postalcode?: string;
    /** address2_postofficebox - Address 2: Post Office Box */
    address2_postofficebox?: string;
    /** address2_shippingmethodcode - Address 2: Shipping Method */
    address2_shippingmethodcode?: SystemuserAddress2ShippingmethodcodeValue; // Option set: systemuser_address2_shippingmethodcode
    /** address2_shippingmethodcodename - Address2_ShippingMethodCodeName */
    address2_shippingmethodcodename?: string;
    /** address2_stateorprovince - Other State/Province */
    address2_stateorprovince?: string;
    /** address2_telephone1 - Address 2: Telephone 1 */
    address2_telephone1?: string;
    /** address2_telephone2 - Address 2: Telephone 2 */
    address2_telephone2?: string;
    /** address2_telephone3 - Address 2: Telephone 3 */
    address2_telephone3?: string;
    /** address2_upszone - Address 2: UPS Zone */
    address2_upszone?: string;
    /** address2_utcoffset - Address 2: UTC Offset */
    address2_utcoffset?: number;
    /** applicationid - Application ID */
    applicationid?: string;
    /** applicationiduri - Application ID URI */
    applicationiduri?: string;
    /** azureactivedirectoryobjectid - Azure AD Object ID */
    azureactivedirectoryobjectid?: string;
    /** azuredeletedon - Azure Deleted On */
    azuredeletedon?: Date | string;
    /** azurestate - Azure State */
    azurestate: SystemuserAzurestateValue; // Option set: systemuser_azurestate
    /** azurestatename - azurestateName */
    azurestatename?: string;
    /** businessunitid - Business Unit */
    businessunitid: string; // Lookup to: businessunit
    /** businessunitidname - BusinessUnitIdName */
    businessunitidname: string;
    /** calendarid - Calendar */
    calendarid?: string; // Lookup to: calendar
    /** caltype - License Type */
    caltype: SystemuserCaltypeValue; // Option set: systemuser_caltype
    /** caltypename - CALTypeName */
    caltypename?: string;
    /** createdby - Created By */
    createdby?: string; // Lookup to: systemuser
    /** createdbyname - CreatedByName */
    createdbyname?: string;
    /** createdbyyominame - CreatedByYomiName */
    createdbyyominame?: string;
    /** createdon - Created On */
    createdon?: Date | string;
    /** createdonbehalfby - Created By (Delegate) */
    createdonbehalfby?: string; // Lookup to: systemuser
    /** createdonbehalfbyname - CreatedOnBehalfByName */
    createdonbehalfbyname?: string;
    /** createdonbehalfbyyominame - CreatedOnBehalfByYomiName */
    createdonbehalfbyyominame?: string;
    /** defaultfilterspopulated - Default Filters Populated */
    defaultfilterspopulated: boolean;
    /** defaultmailbox - Mailbox */
    defaultmailbox?: string; // Lookup to: mailbox
    /** defaultmailboxname - DefaultMailboxName */
    defaultmailboxname?: string;
    /** defaultodbfoldername - Default OneDrive for Business Folder Name */
    defaultodbfoldername: string;
    /** deletedstate - Deleted State */
    deletedstate: SystemuserDeletestateValue; // Option set: systemuser_deletestate
    /** deletedstatename - deletedstateName */
    deletedstatename?: string;
    /** disabledreason - Disabled Reason */
    disabledreason?: string;
    /** displayinserviceviews - Display in Service Views */
    displayinserviceviews?: boolean;
    /** displayinserviceviewsname - DisplayInServiceViewsName */
    displayinserviceviewsname?: string;
    /** domainname - User Name */
    domainname: string;
    /** emailrouteraccessapproval - Primary Email Status */
    emailrouteraccessapproval: SystemuserEmailrouteraccessapprovalValue; // Option set: systemuser_emailrouteraccessapproval
    /** emailrouteraccessapprovalname - EmailRouterAccessApprovalName */
    emailrouteraccessapprovalname?: string;
    /** employeeid - Employee */
    employeeid?: string;
    /** entityimage - Entity Image */
    entityimage?: string;
    /** entityimage_timestamp - EntityImage_Timestamp */
    entityimage_timestamp?: number;
    /** entityimage_url - EntityImage_URL */
    entityimage_url?: string;
    /** entityimageid - Entity Image Id */
    entityimageid?: string;
    /** exchangerate - Exchange Rate */
    exchangerate?: number;
    /** firstname - First Name */
    firstname?: string;
    /** fullname - Full Name */
    fullname?: string;
    /** governmentid - Government */
    governmentid?: string;
    /** homephone - Home Phone */
    homephone?: string;
    /** identityid - Unique user identity id */
    identityid: number;
    /** importsequencenumber - Import Sequence Number */
    importsequencenumber?: number;
    /** incomingemaildeliverymethod - Incoming Email Delivery Method */
    incomingemaildeliverymethod: SystemuserIncomingemaildeliverymethodValue; // Option set: systemuser_incomingemaildeliverymethod
    /** incomingemaildeliverymethodname - IncomingEmailDeliveryMethodName */
    incomingemaildeliverymethodname?: string;
    /** internalemailaddress - Primary Email */
    internalemailaddress: string;
    /** invitestatuscode - Invitation Status */
    invitestatuscode?: SystemuserInvitestatuscodeValue; // Option set: systemuser_invitestatuscode
    /** invitestatuscodename - InviteStatusCodeName */
    invitestatuscodename?: string;
    /** isactivedirectoryuser - Is Active Directory User */
    isactivedirectoryuser: boolean;
    /** isallowedbyipfirewall - To bypass IP firewall restriction on the user */
    isallowedbyipfirewall?: boolean;
    /** isallowedbyipfirewallname - isallowedbyipfirewallName */
    isallowedbyipfirewallname?: string;
    /** isdisabled - Status */
    isdisabled?: boolean;
    /** isdisabledname - IsDisabledName */
    isdisabledname?: string;
    /** isemailaddressapprovedbyo365admin - Email Address O365 Admin Approval Status */
    isemailaddressapprovedbyo365admin: boolean;
    /** isintegrationuser - Integration user mode */
    isintegrationuser: boolean;
    /** isintegrationusername - IsIntegrationUserName */
    isintegrationusername?: string;
    /** islicensed - User Licensed */
    islicensed: boolean;
    /** islicensedname - IsLicensedName */
    islicensedname?: string;
    /** issyncwithdirectory - User Synced */
    issyncwithdirectory: boolean;
    /** jobtitle - Job Title */
    jobtitle?: string;
    /** lastname - Last Name */
    lastname?: string;
    /** latestupdatetime - Latest User Update Time */
    latestupdatetime?: Date | string;
    /** middlename - Middle Name */
    middlename?: string;
    /** mobilealertemail - Mobile Alert Email */
    mobilealertemail?: string;
    /** mobileofflineprofileid - Mobile Offline Profile */
    mobileofflineprofileid?: string; // Lookup to: mobileofflineprofile
    /** mobileofflineprofileidname - MobileOfflineProfileIdName */
    mobileofflineprofileidname?: string;
    /** mobilephone - Mobile Phone */
    mobilephone?: string;
    /** modifiedby - Modified By */
    modifiedby?: string; // Lookup to: systemuser
    /** modifiedbyname - ModifiedByName */
    modifiedbyname?: string;
    /** modifiedbyyominame - ModifiedByYomiName */
    modifiedbyyominame?: string;
    /** modifiedon - Modified On */
    modifiedon?: Date | string;
    /** modifiedonbehalfby - Modified By (Delegate) */
    modifiedonbehalfby?: string; // Lookup to: systemuser
    /** modifiedonbehalfbyname - ModifiedOnBehalfByName */
    modifiedonbehalfbyname?: string;
    /** modifiedonbehalfbyyominame - ModifiedOnBehalfByYomiName */
    modifiedonbehalfbyyominame?: string;
    /** nickname - Nickname */
    nickname?: string;
    /** organizationid - Organization  */
    organizationid: string;
    /** organizationidname - OrganizationIdName */
    organizationidname: string;
    /** outgoingemaildeliverymethod - Outgoing Email Delivery Method */
    outgoingemaildeliverymethod: SystemuserOutgoingemaildeliverymethodValue; // Option set: systemuser_outgoingemaildeliverymethod
    /** outgoingemaildeliverymethodname - OutgoingEmailDeliveryMethodName */
    outgoingemaildeliverymethodname?: string;
    /** overriddencreatedon - Record Created On */
    overriddencreatedon?: Date | string;
    /** parentsystemuserid - Manager */
    parentsystemuserid?: string; // Lookup to: systemuser
    /** parentsystemuseridname - ParentSystemUserIdName */
    parentsystemuseridname?: string;
    /** parentsystemuseridyominame - ParentSystemUserIdYomiName */
    parentsystemuseridyominame?: string;
    /** passporthi - Passport Hi */
    passporthi?: number;
    /** passportlo - Passport Lo */
    passportlo?: number;
    /** personalemailaddress - Email 2 */
    personalemailaddress?: string;
    /** photourl - Photo URL */
    photourl?: string;
    /** positionid - Position */
    positionid?: string; // Lookup to: position
    /** positionidname - PositionIdName */
    positionidname?: string;
    /** preferredaddresscode - Preferred Address */
    preferredaddresscode?: SystemuserPreferredaddresscodeValue; // Option set: systemuser_preferredaddresscode
    /** preferredaddresscodename - PreferredAddressCodeName */
    preferredaddresscodename?: string;
    /** preferredemailcode - Preferred Email */
    preferredemailcode?: SystemuserPreferredemailcodeValue; // Option set: systemuser_preferredemailcode
    /** preferredemailcodename - PreferredEmailCodeName */
    preferredemailcodename?: string;
    /** preferredphonecode - Preferred Phone */
    preferredphonecode?: SystemuserPreferredphonecodeValue; // Option set: systemuser_preferredphonecode
    /** preferredphonecodename - PreferredPhoneCodeName */
    preferredphonecodename?: string;
    /** processid - Process */
    processid?: string;
    /** queueid - Default Queue */
    queueid?: string; // Lookup to: queue
    /** queueidname - QueueIdName */
    queueidname?: string;
    /** salutation - Salutation */
    salutation?: string;
    /** setupuser - Restricted Access Mode */
    setupuser: boolean;
    /** setupusername - SetupUserName */
    setupusername?: string;
    /** sharepointemailaddress - SharePoint Email Address */
    sharepointemailaddress?: string;
    /** skills - Skills */
    skills?: string;
    /** stageid - (Deprecated) Process Stage */
    stageid?: string;
    /** systemmanagedusertype - System Managed User Type */
    systemmanagedusertype?: SystemuserSystemmanagedusertypeValue; // Option set: systemuser_systemmanagedusertype
    /** systemmanagedusertypename - systemmanagedusertypeName */
    systemmanagedusertypename?: string;
    /** systemuserid - User */
    systemuserid: string;
    /** territoryid - Territory */
    territoryid?: string; // Lookup to: territory
    /** territoryidname - TerritoryIdName */
    territoryidname: string;
    /** timezoneruleversionnumber - Time Zone Rule Version Number */
    timezoneruleversionnumber?: number;
    /** title - Title */
    title?: string;
    /** transactioncurrencyid - Currency */
    transactioncurrencyid?: string; // Lookup to: transactioncurrency
    /** transactioncurrencyidname - TransactionCurrencyIdName */
    transactioncurrencyidname?: string;
    /** traversedpath - (Deprecated) Traversed Path */
    traversedpath?: string;
    /** userlicensetype - User License Type */
    userlicensetype: number;
    /** userpuid - User PUID */
    userpuid?: string;
    /** utcconversiontimezonecode - UTC Conversion Time Zone Code */
    utcconversiontimezonecode?: number;
    /** versionnumber - Version number */
    versionnumber?: number;
    /** windowsliveid - Windows Live ID */
    windowsliveid?: string;
    /** yammeremailaddress - Yammer Email */
    yammeremailaddress?: string;
    /** yammeruserid - Yammer User ID */
    yammeruserid?: string;
    /** yomifirstname - Yomi First Name */
    yomifirstname?: string;
    /** yomifullname - Yomi Full Name */
    yomifullname?: string;
    /** yomilastname - Yomi Last Name */
    yomilastname?: string;
    /** yomimiddlename - Yomi Middle Name */
    yomimiddlename?: string;
}

/**
 * Comprehensive metadata for User
 * Contains runtime entity information and Dataverse properties
 */
export const SystemUserMetadata = {
    logicalName: "systemuser",
    schemaName: "SystemUser",
    entitySetName: "systemusers",
    collectionName: "systemusers",
    displayName: "User",
    description: "En person, der har adgang til Microsoft CRM, og som ejer objekter i Microsoft CRM-databasen.",
    primaryIdAttribute: "systemuserid",
    primaryNameAttribute: "fullname",
    isCustomEntity: false,
    entityType: "system",
    attributeCount: 175,
    optionSetCount: 16,
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
    generated: "2025-07-28T10:21:15.078Z"
} as const;
