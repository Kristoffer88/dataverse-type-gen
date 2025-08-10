// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'

/**
 * System Job Type
 * Type of the system job.
 * LogicalName: asyncoperation_operationtype
 * Global: false
 * Custom: false
 */
export const AsyncoperationOperationtype = {
    SystemEvent: { Value: 1, Label: "System Event" },
    BulkEmail: { Value: 2, Label: "Bulk Email" },
    ImportFileParse: { Value: 3, Label: "Import File Parse" },
    TransformParseData: { Value: 4, Label: "Transform Parse Data" },
    Import: { Value: 5, Label: "Import" },
    ActivityPropagation: { Value: 6, Label: "Activity Propagation" },
    DuplicateDetectionRulePublish: { Value: 7, Label: "Duplicate Detection Rule Publish" },
    BulkDuplicateDetection: { Value: 8, Label: "Bulk Duplicate Detection" },
    SqmDataCollection: { Value: 9, Label: "SQM Data Collection" },
    Workflow: { Value: 10, Label: "Workflow" },
    QuickCampaign: { Value: 11, Label: "Quick Campaign" },
    MatchcodeUpdate: { Value: 12, Label: "Matchcode Update" },
    BulkDelete: { Value: 13, Label: "Bulk Delete" },
    DeletionService: { Value: 14, Label: "Deletion Service" },
    IndexManagement: { Value: 15, Label: "Index Management" },
    CollectOrganizationStatistics: { Value: 16, Label: "Collect Organization Statistics" },
    ImportSubprocess: { Value: 17, Label: "Import Subprocess" },
    CalculateOrganizationStorageSize: { Value: 18, Label: "Calculate Organization Storage Size" },
    CollectOrganizationDatabaseStatistics: { Value: 19, Label: "Collect Organization Database Statistics" },
    CollectionOrganizationSizeStatistics: { Value: 20, Label: "Collection Organization Size Statistics" },
    DatabaseTuning: { Value: 21, Label: "Database Tuning" },
    CalculateOrganizationMaximumStorageSize: { Value: 22, Label: "Calculate Organization Maximum Storage Size" },
    BulkDeleteSubprocess: { Value: 23, Label: "Bulk Delete Subprocess" },
    UpdateStatisticIntervals: { Value: 24, Label: "Update Statistic Intervals" },
    OrganizationFullTextCatalogIndex: { Value: 25, Label: "Organization Full Text Catalog Index" },
    DatabaseLogBackup: { Value: 26, Label: "Database log backup" },
    UpdateContractStates: { Value: 27, Label: "Update Contract States" },
    DbccShrinkdatabaseMaintenanceJob: { Value: 28, Label: "DBCC SHRINKDATABASE maintenance job" },
    DbccShrinkfileMaintenanceJob: { Value: 29, Label: "DBCC SHRINKFILE maintenance job" },
    ReindexAllIndicesMaintenanceJob: { Value: 30, Label: "Reindex all indices maintenance job" },
    StorageLimitNotification: { Value: 31, Label: "Storage Limit Notification" },
    CleanupInactiveWorkflowAssemblies: { Value: 32, Label: "Cleanup inactive workflow assemblies" },
    RecurringSeriesExpansion: { Value: 35, Label: "Recurring Series Expansion" },
    ImportSampleData: { Value: 38, Label: "Import Sample Data" },
    GoalRollUp: { Value: 40, Label: "Goal Roll Up" },
    AuditPartitionCreation: { Value: 41, Label: "Audit Partition Creation" },
    CheckForLanguagePackUpdates: { Value: 42, Label: "Check For Language Pack Updates" },
    ProvisionLanguagePack: { Value: 43, Label: "Provision Language Pack" },
    UpdateOrganizationDatabase: { Value: 44, Label: "Update Organization Database" },
    UpdateSolution: { Value: 45, Label: "Update Solution" },
    RegenerateEntityRowCountSnapshotData: { Value: 46, Label: "Regenerate Entity Row Count Snapshot Data" },
    RegenerateReadShareSnapshotData: { Value: 47, Label: "Regenerate Read Share Snapshot Data" },
    OutgoingActivity: { Value: 50, Label: "Outgoing Activity" },
    IncomingEmailProcessing: { Value: 51, Label: "Incoming Email Processing" },
    MailboxTestAccess: { Value: 52, Label: "Mailbox Test Access" },
    EncryptionHealthCheck: { Value: 53, Label: "Encryption Health Check" },
    ExecuteAsyncRequest: { Value: 54, Label: "Execute Async Request" },
    PostToYammer: { Value: 49, Label: "Post to Yammer" },
    UpdateEntitlementStates: { Value: 56, Label: "Update Entitlement States" },
    CalculateRollupField: { Value: 57, Label: "Calculate Rollup Field" },
    MassCalculateRollupField: { Value: 58, Label: "Mass Calculate Rollup Field" },
    ImportTranslation: { Value: 59, Label: "Import Translation" },
    ConvertDateAndTimeBehavior: { Value: 62, Label: "Convert Date And Time Behavior" },
    EntitykeyIndexCreation: { Value: 63, Label: "EntityKey Index Creation" },
    UpdateKnowledgeArticleStates: { Value: 65, Label: "Update Knowledge Article States" },
    ResourceBookingSync: { Value: 68, Label: "Resource Booking Sync" },
    RelationshipAssistantCards: { Value: 69, Label: "Relationship Assistant Cards" },
    CleanupSolutionComponents: { Value: 71, Label: "Cleanup Solution Components" },
    AppModuleMetadataOperation: { Value: 72, Label: "App Module Metadata Operation" },
    AlmAnomalyDetectionOperation: { Value: 73, Label: "ALM Anomaly Detection Operation" },
    FlowNotification: { Value: 75, Label: "Flow Notification" },
    RibbonClientMetadataOperation: { Value: 76, Label: "Ribbon Client Metadata Operation" },
    CallbackregistrationExpanderOperation: { Value: 79, Label: "CallbackRegistration Expander Operation" },
    Cascadeassign: { Value: 90, Label: "CascadeAssign" },
    Cascadedelete: { Value: 91, Label: "CascadeDelete" },
    EventExpanderOperation: { Value: 92, Label: "Event Expander Operation" },
    ImportSolutionMetadata: { Value: 93, Label: "Import Solution Metadata" },
    BulkDeleteFileAttachment: { Value: 94, Label: "Bulk Delete File Attachment" },
    RefreshBusinessUnitForRecordsOwnedByPrincipal: { Value: 95, Label: "Refresh Business Unit for Records Owned By Principal" },
    RevokeInheritedAccess: { Value: 96, Label: "Revoke Inherited Access" },
    ProvisionLanguageForUser: { Value: 201, Label: "Provision language for user" },
    AiBuilderTrainingEvents: { Value: 190690091, Label: "AI Builder Training Events" },
    AiBuilderPredictionEvents: { Value: 190690092, Label: "AI Builder Prediction Events" },
    CascadeGrantOrRevokeAccessVersionTrackingAsyncOperation: { Value: 12801, Label: "Cascade Grant or Revoke Access Version Tracking Async Operation" },
    MigrateNotesToAttachmentsJob: { Value: 85, Label: "Migrate notes to attachments job" },
    MigrateArticleContentToFileStorage: { Value: 86, Label: "Migrate article content to file storage" },
    UpdatedDeactivedOnForResolvedCasesJob: { Value: 87, Label: "Updated Deactived On for Resolved Cases job" },
    CascadeReparentDbAsyncOperation: { Value: 88, Label: "Cascade Reparent DB Async Operation" },
    CascadeMergeAsyncOperation: { Value: 89, Label: "Cascade Merge Async Operation" },
    CreateOrRefreshVirtualEntity: { Value: 98, Label: "Create Or Refresh Virtual Entity" },
    ExportSolutionAsyncOperation: { Value: 202, Label: "Export Solution Async Operation" },
    ImportSolutionAsyncOperation: { Value: 203, Label: "Import Solution Async Operation" },
    PublishallAsyncOperation: { Value: 204, Label: "PublishAll Async Operation" },
    DeleteandpromoteAsyncOperation: { Value: 207, Label: "DeleteAndPromote Async Operation" },
    UninstallsolutionAsyncOperation: { Value: 208, Label: "UninstallSolution Async Operation" },
    ProvisionlanguageAsyncOperation: { Value: 209, Label: "ProvisionLanguage Async Operation" },
    ImporttranslationAsyncOperation: { Value: 210, Label: "ImportTranslation Async Operation" },
    StageandupgradeAsyncOperation: { Value: 211, Label: "StageAndUpgrade Async Operation" },
    DenormalizationAsyncOperation: { Value: 239, Label: "Denormalization Async Operation" },
    RefreshRuntimeIntegrationComponentsAsyncOperation: { Value: 250, Label: "Refresh Runtime Integration Components Async Operation" },
    CascadeFlowsessionPermissionsAsyncOperation: { Value: 100, Label: "Cascade FlowSession Permissions Async Operation" },
    UpdateModernFlowAsyncOperation: { Value: 101, Label: "Update Modern Flow Async Operation" },
    AsyncarchiveAsyncOperation: { Value: 102, Label: "AsyncArchive Async Operation" },
    CancelAsyncOperationsSystem: { Value: 103, Label: "Cancel Async Operations (System)" },
    BulkArchiveOperation: { Value: 300, Label: "Bulk Archive Operation" },
    ArchiveExecutionAsyncOperation: { Value: 301, Label: "Archive Execution Async Operation" },
    FinopsDeploymentAsyncOperation: { Value: 302, Label: "FinOps Deployment Async Operation" },
    PurgeArchivedContentOperation: { Value: 304, Label: "Purge Archived Content Operation" },
    RegisterOfferingAsyncOperation: { Value: 305, Label: "Register Offering Async Operation" },
    ExecuteDataprocessingConfiguration: { Value: 306, Label: "Execute DataProcessing Configuration" },
    SyncSynapseTablesSchema: { Value: 307, Label: "Sync Synapse Tables Schema" },
    FinopsDbSyncAsyncOperation: { Value: 308, Label: "FinOps DB Sync Async Operation" },
    FinopsUnitTestAsyncOperation: { Value: 309, Label: "FinOps Unit Test Async Operation" },
    CatalogServiceGeneratePackageAsyncOperation: { Value: 320, Label: "Catalog Service Generate Package Async Operation" },
    CatalogServiceSubmitApprovalRequestAsyncOperation: { Value: 321, Label: "Catalog Service Submit Approval Request Async Operation" },
    CatalogServiceInstallRequestAsyncOperation: { Value: 322, Label: "Catalog Service Install Request Async Operation" },
    TdsEndpointProvisioningNewTvfFunctionsAndGrantPermissionAsyncOperation: { Value: 330, Label: "TDS endpoint provisioning new TVF functions and grant permission Async Operation" },
    FinopsDeployCustomPackageAsyncOperation: { Value: 332, Label: "FinOps Deploy Custom Package Async Operation" },
    DeletesRelatedElasticTableRecordsWhenASqlRecordIsDeleted: { Value: 333, Label: "Deletes related Elastic Table records when a SQL record is deleted" },
    DeletesRelatedElasticOrSqlTableRecordsWhenAnElasticTableRecordIsDeleted: { Value: 334, Label: "Deletes related Elastic or SQL Table records when an Elastic Table record is deleted" },
    CatalogServiceAsycOperationToPollForASolutionCheckerRequest: { Value: 335, Label: "Catalog service asyc operation to poll for a solution checker request" },
    CatalogServiceAsycOperationToSubmitASolutionCheckerRequest: { Value: 336, Label: "Catalog service asyc operation to submit a solution checker request" },
    SolutionServiceAsyncOperationToInstallSolutionAfterAppUpdates: { Value: 337, Label: "Solution service async operation to install solution after app updates" },
    CascadeAssignAllAsyncOperation: { Value: 105, Label: "Cascade Assign All Async Operation" },
    BackgroundTeamServiceAsyncOperation: { Value: 106, Label: "Background Team Service Async Operation" },
    ProcessTableForRecyclebin: { Value: 104, Label: "Process Table For RecycleBin" },
    AsyncRestoreJob: { Value: 187, Label: "Async Restore Job" }
} as const;

/** System Job Type option values */
export type AsyncoperationOperationtypeValue = (typeof AsyncoperationOperationtype)[keyof typeof AsyncoperationOperationtype]["Value"];

/**
 * Status
 * Status of the system job.
 * LogicalName: asyncoperation_statecode
 * Global: false
 * Custom: false
 */
export const AsyncoperationStatecode = {
    Ready: { Value: 0, Label: "Ready" },
    Suspended: { Value: 1, Label: "Suspended" },
    Locked: { Value: 2, Label: "Locked" },
    Completed: { Value: 3, Label: "Completed" }
} as const;

/** Status option values */
export type AsyncoperationStatecodeValue = (typeof AsyncoperationStatecode)[keyof typeof AsyncoperationStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the system job.
 * LogicalName: asyncoperation_statuscode
 * Global: false
 * Custom: false
 */
export const AsyncoperationStatuscode = {
    WaitingForResources: { Value: 0, Label: "Waiting For Resources" },
    Waiting: { Value: 10, Label: "Waiting" },
    InProgress: { Value: 20, Label: "In Progress" },
    Pausing: { Value: 21, Label: "Pausing" },
    Canceling: { Value: 22, Label: "Canceling" },
    Succeeded: { Value: 30, Label: "Succeeded" },
    Failed: { Value: 31, Label: "Failed" },
    Canceled: { Value: 32, Label: "Canceled" }
} as const;

/** Status Reason option values */
export type AsyncoperationStatuscodeValue = (typeof AsyncoperationStatuscode)[keyof typeof AsyncoperationStatuscode]["Value"];


/**
 * System Job
 * Process whose execution can proceed independently or in the background.
 * Entity: asyncoperation
 * Schema: AsyncOperation
 * Primary Key: asyncoperationid
 * Primary Name: name
 */
export interface AsyncOperation {
    /** System Job - Unique identifier of the system job. */
    asyncoperationid: string;
    /** Breadcrumb ID - The breadcrumb record ID. */
    breadcrumbid?: string;
    /** Caller Origin - The origin of the caller. */
    callerorigin?: string;
    /** Completed On - Date and time when the system job was completed. */
    completedon?: Date | string;
    /** Correlation Id - Unique identifier used to correlate between multiple SDK requests and system jobs. */
    correlationid: string;
    /** Correlation Updated Time - Last time the correlation depth was updated. */
    correlationupdatedtime: Date | string;
    /** Created By - Unique identifier of the user who created the system job. */
    createdby: string; // Lookup to: systemuser
    /** _createdby_value - Resolved lookup GUID value */
    _createdby_value?: string; // Lookup value
    /** Created On - Date and time when the system job was created. */
    createdon?: Date | string;
    /** Created By (Delegate) - Unique identifier of the delegate user who created the asyncoperation. */
    createdonbehalfby?: string; // Lookup to: systemuser
    /** _createdonbehalfby_value - Resolved lookup GUID value */
    _createdonbehalfby_value?: string; // Lookup value
    /** Data - Unstructured data associated with the system job. */
    data?: string;
    /** Data File Id - File Id for the blob url used for file storage. */
    datablobid?: string;
    /** Dependency Token - Execution of all operations with the same dependency token is serialized. */
    dependencytoken?: string;
    /** Depth - Number of SDK calls made since the first call. */
    depth: number;
    /** Error Code - Error code returned from a canceled system job. */
    errorcode?: number;
    /** ExecutionTimeSpan - Time that the system job has taken to execute. */
    executiontimespan: number;
    /** Expander Start Time - The datetime when the Expander pipeline started. */
    expanderstarttime?: Date | string;
    /** Friendly message - Message provided by the system job. */
    friendlymessage?: string;
    /** Host - Unique identifier of the host that owns this system job. */
    hostid?: string;
    /** Waiting for Event - Indicates that the system job is waiting for an event. */
    iswaitingforevent?: boolean;
    /** Message - Message related to the system job. */
    message?: string;
    /** Message Name - Name of the message that started this system job. */
    messagename?: string;
    /** Modified By - Unique identifier of the user who last modified the system job. */
    modifiedby: string; // Lookup to: systemuser
    /** _modifiedby_value - Resolved lookup GUID value */
    _modifiedby_value?: string; // Lookup value
    /** Modified On - Date and time when the system job was last modified. */
    modifiedon?: Date | string;
    /** Modified By (Delegate) - Unique identifier of the delegate user who last modified the asyncoperation. */
    modifiedonbehalfby?: string; // Lookup to: systemuser
    /** _modifiedonbehalfby_value - Resolved lookup GUID value */
    _modifiedonbehalfby_value?: string; // Lookup value
    /** System Job Name - Name of the system job. */
    name?: string;
    /** System Job Type - Type of the system job. */
    operationtype?: AsyncoperationOperationtypeValue; // Option set: asyncoperation_operationtype
    /** Owner - Unique identifier of the user or team who owns the system job. */
    ownerid: string; // Lookup to: systemuser, team
    /** Owning Business Unit - Unique identifier of the business unit that owns the system job. */
    owningbusinessunit?: string; // Lookup to: businessunit
    /** _owningbusinessunit_value - Resolved lookup GUID value */
    _owningbusinessunit_value?: string; // Lookup value
    /** Owning Extension - Unique identifier of the owning extension with which the system job is associated. */
    owningextensionid?: string; // Lookup to: sdkmessageprocessingstep
    /** _owningextensionid_value - Resolved lookup GUID value */
    _owningextensionid_value?: string; // Lookup value
    /** Owning Team - Unique identifier of the team who owns the record. */
    owningteam?: string; // Lookup to: team
    /** _owningteam_value - Resolved lookup GUID value */
    _owningteam_value?: string; // Lookup value
    /** Owning User - Unique identifier of the user who owns the record. */
    owninguser?: string; // Lookup to: systemuser
    /** _owninguser_value - Resolved lookup GUID value */
    _owninguser_value?: string; // Lookup value
    /** ParentPluginExecutionId */
    parentpluginexecutionid?: string;
    /** Postpone Until - Indicates whether the system job should run only after the specified date and time. */
    postponeuntil?: Date | string;
    /** Primary Entity Type - Type of entity with which the system job is primarily associated. */
    primaryentitytype?: string;
    /** Recurrence Pattern - Pattern of the system job's recurrence. */
    recurrencepattern?: string;
    /** Recurrence Start - Starting time in UTC for the recurrence pattern. */
    recurrencestarttime?: Date | string;
    /** Regarding - Unique identifier of the object with which the system job is associated. */
    regardingobjectid?: string; // Lookup to: account, activityfileattachment, activitymimeattachment, activitypointer, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, annotation, annualfiscalcalendar, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, attributeimageconfig, attributemap, attributemaskingrule, attributepicklistvalue, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, businessprocess, businessunit, businessunitnewsarticle, calendar, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, channelaccessprofile, channelaccessprofilerule, chat, comment, connection, connectioninstance, connectionreference, connectionrole, connector, contact, conversationtranscript, convertrule, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, customeraddress, customerrelationship, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, desktopflowbinary, desktopflowmodule, displaystring, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, email, emailaddressconfiguration, emailserverprofile, enablearchivalrequest, entityanalyticsconfig, entityclusterconfig, entityimageconfig, entityindex, entitymap, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, externalparty, externalpartyitem, fabricaiskill, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, fixedmonthlyfiscalcalendar, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, flowsession, fxexpression, goal, goalrollupquery, governanceconfiguration, holidaywrapper, import, importdata, importfile, importlog, importmap, indexattributes, interactionforemail, internalcatalogassignment, isvconfig, kbarticle, kbarticlecomment, kbarticletemplate, keyvaultreference, knowledgearticle, knowledgebaserecord, knowledgefaq, kra_request, letter, mailbox, mailmergetemplate, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, metric, mobileofflineprofileextension, monthlyfiscalcalendar, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, new_keyresultprocess, organization, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, package, packagehistory, pdfsetting, phonecall, plannerbusinessscenario, plannersyncaction, plugin, pluginpackage, position, post, postfollow, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, privilege, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processstageparameter, provisionlanguageforuser, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, quarterlyfiscalcalendar, queue, queueitem, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recurringappointmentmaster, recyclebinconfig, relationshipattribute, relationshiprole, relationshiprolemap, report, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, role, roleeditorlayout, rollupfield, routingrule, routingruleitem, savedquery, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, semiannualfiscalcalendar, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointdocumentlocation, sharepointmanagedidentity, sharepointsite, sideloadedaiplugin, signalregistration, similarityrule, sla, socialactivity, socialprofile, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, subject, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemform, systemuser, systemuserauthorizationchangetracker, tag, taggedflowsession, taggedprocess, task, tdsmetadata, team, teammobileofflineprofilemembership, template, territory, theme, traitregistration, transactioncurrency, unstructuredfilesearchentity, unstructuredfilesearchrecord, userform, usermapping, usermobileofflineprofilemembership, userquery, userrating, viewasexamplequestion, virtualentitymetadata, workflowbinary, workflowmetadata, workqueue, workqueueitem
    /** _regardingobjectid_value - Resolved lookup GUID value */
    _regardingobjectid_value?: string; // Lookup value
    /** Request - Unique identifier of the request that generated the system job. */
    requestid?: string;
    /** Retain Job History - Retain job history. */
    retainjobhistory?: boolean;
    /** Retry Count - Number of times to retry the system job. */
    retrycount?: number;
    /** RootExecutionContext - Root execution context of the job that trigerred async job. */
    rootexecutioncontext?: string;
    /** Sequence - Order in which operations were submitted. */
    sequence: number;
    /** Started On - Date and time when the system job was started. */
    startedon?: Date | string;
    /** Status - Status of the system job. */
    statecode: AsyncoperationStatecodeValue; // Option set: asyncoperation_statecode
    /** Status Reason - Reason for the status of the system job. */
    statuscode?: AsyncoperationStatuscodeValue; // Option set: asyncoperation_statuscode
    /** Subtype - The Subtype of the Async Job */
    subtype?: number;
    /** TimeZoneRuleVersionNumber - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTCConversionTimeZoneCode - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Workflow Activation Id - Unique identifier of the workflow activation related to the system job. */
    workflowactivationid?: string; // Lookup to: workflow
    /** _workflowactivationid_value - Resolved lookup GUID value */
    _workflowactivationid_value?: string; // Lookup value
    /** Workflow Is Blocked - Indicates whether the workflow instance was blocked when it was persisted. */
    workflowisblocked?: boolean;
    /** Workflow Stage - Name of a workflow stage. */
    workflowstagename?: string;
    /** Workflow State - State of the workflow job. */
    workflowstate?: string;
    /** Workload - The workload name. */
    workload?: string;
}

/**
 * Type-safe expand properties for System Job
 * Enables IntelliSense for $expand relationship names
 */
export type AsyncOperationExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningExtensionId"
    | "OwningTeam"
    | "OwningUser"
    | "RegardingObjectId"
    | "WorkflowActivationId"

/**
 * Type-safe expand options for System Job
 * Supports both array format and object format with nested options
 */
export type AsyncOperationExpand =
    | AsyncOperationExpandableProperties[]
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
 * Type-safe expand options for System Job
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for AsyncOperation @odata.bind operations
 */
export type AsyncOperationBindings = {
    'OwningExtensionId@odata.bind'?: string; // Bind to: sdkmessageprocessingstep
    'RegardingObjectId@odata.bind'?: string; // Bind to: account, activityfileattachment, activitymimeattachment, activitypointer, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, annotation, annualfiscalcalendar, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, attributeimageconfig, attributemap, attributemaskingrule, attributepicklistvalue, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, businessprocess, businessunit, businessunitnewsarticle, calendar, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, channelaccessprofile, channelaccessprofilerule, chat, comment, connection, connectioninstance, connectionreference, connectionrole, connector, contact, conversationtranscript, convertrule, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, customeraddress, customerrelationship, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, desktopflowbinary, desktopflowmodule, displaystring, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, email, emailaddressconfiguration, emailserverprofile, enablearchivalrequest, entityanalyticsconfig, entityclusterconfig, entityimageconfig, entityindex, entitymap, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, externalparty, externalpartyitem, fabricaiskill, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, fixedmonthlyfiscalcalendar, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, flowsession, fxexpression, goal, goalrollupquery, governanceconfiguration, holidaywrapper, import, importdata, importfile, importlog, importmap, indexattributes, interactionforemail, internalcatalogassignment, isvconfig, kbarticle, kbarticlecomment, kbarticletemplate, keyvaultreference, knowledgearticle, knowledgebaserecord, knowledgefaq, kra_request, letter, mailbox, mailmergetemplate, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, metric, mobileofflineprofileextension, monthlyfiscalcalendar, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, new_keyresultprocess, organization, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, package, packagehistory, pdfsetting, phonecall, plannerbusinessscenario, plannersyncaction, plugin, pluginpackage, position, post, postfollow, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, privilege, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processstageparameter, provisionlanguageforuser, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, quarterlyfiscalcalendar, queue, queueitem, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recurringappointmentmaster, recyclebinconfig, relationshipattribute, relationshiprole, relationshiprolemap, report, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, role, roleeditorlayout, rollupfield, routingrule, routingruleitem, savedquery, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, semiannualfiscalcalendar, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointdocumentlocation, sharepointmanagedidentity, sharepointsite, sideloadedaiplugin, signalregistration, similarityrule, sla, socialactivity, socialprofile, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, subject, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemform, systemuser, systemuserauthorizationchangetracker, tag, taggedflowsession, taggedprocess, task, tdsmetadata, team, teammobileofflineprofilemembership, template, territory, theme, traitregistration, transactioncurrency, unstructuredfilesearchentity, unstructuredfilesearchrecord, userform, usermapping, usermobileofflineprofilemembership, userquery, userrating, viewasexamplequestion, virtualentitymetadata, workflowbinary, workflowmetadata, workqueue, workqueueitem
    'WorkflowActivationId@odata.bind'?: string; // Bind to: workflow
};

/**
 * Type-safe helper functions for creating AsyncOperation @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const AsyncOperationBindings = {
    /** Create @odata.bind for regardingobjectid -> businessunit | kra_request | pum_assignment | pum_dependency | pum_ganttmarker | pum_ganttsession | pum_gantttask | pum_ganttversion | pum_idea | pum_initiative | pum_initiativebusinessprocess | pum_investmentcategory | pum_keyresults | pum_pf_costplan_version | pum_pf_costspecification | pum_pf_customcolumndata | pum_pf_customrowdata | pum_pf_powerfinancialscomment | pum_pf_powerfinancialsdata | pum_portfolio | pum_powergantttemplate | pum_program | pum_risk | pum_roadmapswimlane | pum_stakeholder | pum_statusreporting | systemuser | team | transactioncurrency */
    regardingobjectid: (id: string, entityType: 'businessunit' | 'kra_request' | 'pum_assignment' | 'pum_dependency' | 'pum_ganttmarker' | 'pum_ganttsession' | 'pum_gantttask' | 'pum_ganttversion' | 'pum_idea' | 'pum_initiative' | 'pum_initiativebusinessprocess' | 'pum_investmentcategory' | 'pum_keyresults' | 'pum_pf_costplan_version' | 'pum_pf_costspecification' | 'pum_pf_customcolumndata' | 'pum_pf_customrowdata' | 'pum_pf_powerfinancialscomment' | 'pum_pf_powerfinancialsdata' | 'pum_portfolio' | 'pum_powergantttemplate' | 'pum_program' | 'pum_risk' | 'pum_roadmapswimlane' | 'pum_stakeholder' | 'pum_statusreporting' | 'systemuser' | 'team' | 'transactioncurrency') => {
        const entitySets = {
            'businessunit': 'businessunits',
            'kra_request': 'kra_requests',
            'pum_assignment': 'pum_assignments',
            'pum_dependency': 'pum_dependencies',
            'pum_ganttmarker': 'pum_ganttmarkers',
            'pum_ganttsession': 'pum_ganttsessions',
            'pum_gantttask': 'pum_gantttasks',
            'pum_ganttversion': 'pum_ganttversions',
            'pum_idea': 'pum_ideas',
            'pum_initiative': 'pum_initiatives',
            'pum_initiativebusinessprocess': 'pum_initiativebusinessprocesses',
            'pum_investmentcategory': 'pum_investmentcategories',
            'pum_keyresults': 'pum_keyresultses',
            'pum_pf_costplan_version': 'pum_pf_costplan_versions',
            'pum_pf_costspecification': 'pum_pf_costspecifications',
            'pum_pf_customcolumndata': 'pum_pf_customcolumndatas',
            'pum_pf_customrowdata': 'pum_pf_customrowdatas',
            'pum_pf_powerfinancialscomment': 'pum_pf_powerfinancialscomments',
            'pum_pf_powerfinancialsdata': 'pum_pf_powerfinancialsdatas',
            'pum_portfolio': 'pum_portfolios',
            'pum_powergantttemplate': 'pum_powergantttemplates',
            'pum_program': 'pum_programs',
            'pum_risk': 'pum_risks',
            'pum_roadmapswimlane': 'pum_roadmapswimlanes',
            'pum_stakeholder': 'pum_stakeholders',
            'pum_statusreporting': 'pum_statusreportings',
            'systemuser': 'systemusers',
            'team': 'teams',
            'transactioncurrency': 'transactioncurrencies',
        } as const;
        return { 'RegardingObjectId@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
} as const;

export type AsyncOperationCreate = Partial<AsyncOperation> & Partial<AsyncOperationBindings> & {
    name: string; // Required for create
};

export type AsyncOperationUpdate = Partial<Omit<AsyncOperation, 'asyncoperationid'>> & Partial<AsyncOperationBindings> & {
    asyncoperationid: string; // Required for update
};

/**
 * Runtime metadata for System Job
 * Provides entity schema information for API operations
 */
export const AsyncOperationMeta = {
    logicalName: "asyncoperation",
    schemaName: "AsyncOperation",
    displayName: "System Job",
    entitySetName: "asyncoperations",
    isCustomEntity: false,
    description: "Process whose execution can proceed independently or in the background.",
    primaryKey: {
        logicalName: "asyncoperationid",
        attributeType: "Uniqueidentifier",
        displayName: "System Job"
    },
    primaryName: {
        logicalName: "name",
        attributeType: "String",
        displayName: "System Job Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningextensionid", "owningteam", "owninguser", "regardingobjectid", "workflowactivationid"],
    requiredAttributes: ["correlationid", "correlationupdatedtime", "createdby", "depth", "executiontimespan", "modifiedby", "ownerid", "owneridname", "owneridtype", "owneridyominame", "sequence", "statecode"],
    optionSets: ["asyncoperation_operationtype", "asyncoperation_statecode", "asyncoperation_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningExtensionId", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "RegardingObjectId", // Relationship
        "WorkflowActivationId", // Relationship
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
        "owningextensionid": {
            relationshipName: "owningextensionid",
            targetEntityLogicalName: "sdkmessageprocessingstep",
            targetEntitySetName: "sdkmessageprocessingsteps",
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
        "regardingobjectid": {
            relationshipName: "regardingobjectid",
            targetEntityLogicalName: "account",
            targetEntitySetName: "accounts",
            relationshipType: "ManyToOne"
        },
        "workflowactivationid": {
            relationshipName: "workflowactivationid",
            targetEntityLogicalName: "workflow",
            targetEntitySetName: "workflows",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.822Z"
} as const;
