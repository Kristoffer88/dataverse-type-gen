// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'

/**
 * Status
 * Status of the script session.
 * LogicalName: processsession_statecode
 * Global: false
 * Custom: false
 */
export const ProcesssessionStatecode = {
    Incomplete: { Value: 0, Label: "Incomplete" },
    Complete: { Value: 1, Label: "Complete" }
} as const;

/** Status option values */
export type ProcesssessionStatecodeValue = (typeof ProcesssessionStatecode)[keyof typeof ProcesssessionStatecode]["Value"];

/**
 * Status Reason
 * Additional information about status of the script session.
 * LogicalName: processsession_statuscode
 * Global: false
 * Custom: false
 */
export const ProcesssessionStatuscode = {
    NotStarted: { Value: 1, Label: "Not Started" },
    InProgress: { Value: 2, Label: "In Progress" },
    Paused: { Value: 3, Label: "Paused" },
    Completed: { Value: 4, Label: "Completed" },
    Canceled: { Value: 5, Label: "Canceled" },
    Failed: { Value: 6, Label: "Failed" }
} as const;

/** Status Reason option values */
export type ProcesssessionStatuscodeValue = (typeof ProcesssessionStatuscode)[keyof typeof ProcesssessionStatuscode]["Value"];


/**
 * Process Session
 * Information that is generated when a dialog is run. Every time that you run a dialog, a dialog session is created.
 * Entity: processsession
 * Schema: ProcessSession
 * Primary Key: processsessionid
 * Primary Name: name
 */
export interface ProcessSession {
    /** Activity Name - Name of the activity that is being executed. */
    activityname?: string;
    /** Canceled By - Unique identifier of the user who canceled the dialog session. */
    canceledby?: string; // Lookup to: systemuser
    /** _canceledby_value - Resolved lookup GUID value */
    _canceledby_value?: string; // Lookup value
    /** Canceled On - Date and time when the dialog session was canceled. */
    canceledon?: Date | string;
    /** Comments - User comments. */
    comments?: string;
    /** Completed By - Unique identifier of the user who completed the dialog session. */
    completedby?: string; // Lookup to: systemuser
    /** _completedby_value - Resolved lookup GUID value */
    _completedby_value?: string; // Lookup value
    /** Completed On - Date and time when the dialog session was completed. */
    completedon?: Date | string;
    /** Created By - Unique identifier of the user who started the dialog session. */
    createdby?: string; // Lookup to: systemuser
    /** _createdby_value - Resolved lookup GUID value */
    _createdby_value?: string; // Lookup value
    /** Created On - Date and time when the dialog session was created. */
    createdon?: Date | string;
    /** Created By (Delegate) - Unique identifier of the delegate user who created the dialog session. */
    createdonbehalfby?: string; // Lookup to: systemuser
    /** _createdonbehalfby_value - Resolved lookup GUID value */
    _createdonbehalfby_value?: string; // Lookup value
    /** Error Code - Error code related to the dialog session. */
    errorcode?: number;
    /** Executed By - Unique identifier of the user who ran the dialog process. */
    executedby?: string; // Lookup to: systemuser
    /** _executedby_value - Resolved lookup GUID value */
    _executedby_value?: string; // Lookup value
    /** Executed On - Date and time when the dialog process was run. */
    executedon?: Date | string;
    /** Input Arguments - Input arguments for the child dialog process. */
    inputarguments?: string;
    /** Modified By - Unique identifier of the user who last modified the dialog session. */
    modifiedby?: string; // Lookup to: systemuser
    /** _modifiedby_value - Resolved lookup GUID value */
    _modifiedby_value?: string; // Lookup value
    /** Modified On - Date and time when the dialog session was last modified. */
    modifiedon?: Date | string;
    /** Modified By (Delegate) - Unique identifier of the delegate user who modified the dialog session. */
    modifiedonbehalfby?: string; // Lookup to: systemuser
    /** _modifiedonbehalfby_value - Resolved lookup GUID value */
    _modifiedonbehalfby_value?: string; // Lookup value
    /** Name - Name of the dialog session. */
    name?: string;
    /** Next Linked Session - Unique identifier of the succeeding linked dialog session. */
    nextlinkedsessionid?: string; // Lookup to: processsession
    /** _nextlinkedsessionid_value - Resolved lookup GUID value */
    _nextlinkedsessionid_value?: string; // Lookup value
    /** Originating Session - Unique identifier of the originating dialog session. */
    originatingsessionid?: string; // Lookup to: processsession
    /** _originatingsessionid_value - Resolved lookup GUID value */
    _originatingsessionid_value?: string; // Lookup value
    /** Owner - Unique identifier of the user or team who owns the dialog session. */
    ownerid: string; // Lookup to: systemuser, team
    /** Owning Business Unit - Unique identifier of the business unit that owns the dialog session. */
    owningbusinessunit?: string; // Lookup to: businessunit
    /** _owningbusinessunit_value - Resolved lookup GUID value */
    _owningbusinessunit_value?: string; // Lookup value
    /** Owning Team - Unique identifier of the team who owns the dialog session. */
    owningteam?: string; // Lookup to: team
    /** _owningteam_value - Resolved lookup GUID value */
    _owningteam_value?: string; // Lookup value
    /** Owning User - Unique identifier of the user who owns the dialog session. */
    owninguser?: string; // Lookup to: systemuser
    /** _owninguser_value - Resolved lookup GUID value */
    _owninguser_value?: string; // Lookup value
    /** Previous Linked Session - Unique identifier of the preceding linked dialog session. */
    previouslinkedsessionid?: string; // Lookup to: processsession
    /** _previouslinkedsessionid_value - Resolved lookup GUID value */
    _previouslinkedsessionid_value?: string; // Lookup value
    /** Process - Select the process activation record that is related to the dialog session. */
    processid?: string; // Lookup to: workflow
    /** _processid_value - Resolved lookup GUID value */
    _processid_value?: string; // Lookup value
    /** Dialog Session - Unique identifier of the dialog session. */
    processsessionid: string;
    /** Dialog Stage - Name of the dialog stage. */
    processstagename?: string;
    /** Process State - State of the dialog process. */
    processstate?: string;
    /** Protection Key - For internal use only. */
    protectionkey?: string;
    /** Regarding - Unique identifier of the object with which the dialog session is associated. */
    regardingobjectid?: string; // Lookup to: account, activityfileattachment, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, annotation, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, attributemaskingrule, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, businessprocess, businessunit, businessunitnewsarticle, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, channelaccessprofile, channelaccessprofilerule, chat, comment, connection, connectioninstance, connectionreference, connectionrole, connector, contact, conversationtranscript, convertrule, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, customeraddress, customerrelationship, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, desktopflowbinary, desktopflowmodule, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, email, enablearchivalrequest, entityclusterconfig, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, expiredprocess, exportedexcel, exportsolutionupload, externalparty, externalpartyitem, fabricaiskill, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, fxexpression, goal, goalrollupquery, governanceconfiguration, holidaywrapper, internalcatalogassignment, kbarticle, kbarticlecomment, kbarticletemplate, keyvaultreference, knowledgearticle, knowledgebaserecord, knowledgefaq, kra_request, letter, mailbox, mailmergetemplate, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, metric, mobileofflineprofileextension, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, newprocess, new_keyresultprocess, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, package, packagehistory, pdfsetting, phonecall, plannerbusinessscenario, plannersyncaction, plugin, position, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processstageparameter, provisionlanguageforuser, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, queue, queueitem, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recurringappointmentmaster, recyclebinconfig, relationshiprole, report, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, roleeditorlayout, rollupfield, routingrule, routingruleitem, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointdocumentlocation, sharepointmanagedidentity, sharepointsite, sideloadedaiplugin, signalregistration, sla, socialactivity, socialprofile, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, subject, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuser, systemuserauthorizationchangetracker, tag, taggedflowsession, taggedprocess, task, tdsmetadata, team, teammobileofflineprofilemembership, template, territory, theme, traitregistration, transactioncurrency, translationprocess, unstructuredfilesearchentity, unstructuredfilesearchrecord, usermapping, usermobileofflineprofilemembership, userrating, viewasexamplequestion, virtualentitymetadata, workflowbinary, workflowmetadata, workqueue, workqueueitem
    /** _regardingobjectid_value - Resolved lookup GUID value */
    _regardingobjectid_value?: string; // Lookup value
    /** Started By - Unique identifier of the user who started the dialog session. */
    startedby?: string; // Lookup to: systemuser
    /** _startedby_value - Resolved lookup GUID value */
    _startedby_value?: string; // Lookup value
    /** Started On - Date and time when the dialog session was started. */
    startedon?: Date | string;
    /** Status - Status of the dialog session. */
    statecode: ProcesssessionStatecodeValue; // Option set: processsession_statecode
    /** Status Reason - Reason for the status of the dialog session. */
    statuscode?: ProcesssessionStatuscodeValue; // Option set: processsession_statuscode
    /** Step Name - Name of the dialog step. */
    stepname?: string;
}

/**
 * Type-safe expand properties for Process Session
 * Enables IntelliSense for $expand relationship names
 */
export type ProcessSessionExpandableProperties =
    "CanceledBy"
    | "CompletedBy"
    | "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ExecutedBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "NextLinkedSessionId"
    | "OriginatingSessionId"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "PreviousLinkedSessionId"
    | "ProcessId"
    | "RegardingObjectId"
    | "StartedBy"

/**
 * Type-safe expand options for Process Session
 * Supports both array format and object format with nested options
 */
export type ProcessSessionExpand =
    | ProcessSessionExpandableProperties[]
    | {
        "canceledby"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
        "completedby"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
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
        "executedby"?: {
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
        "nextlinkedsessionid"?: {
            $select?: (keyof ProcessSession)[]
            $top?: number
            $skip?: number
            $expand?: ProcessSessionExpand
        }
        "originatingsessionid"?: {
            $select?: (keyof ProcessSession)[]
            $top?: number
            $skip?: number
            $expand?: ProcessSessionExpand
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
        "previouslinkedsessionid"?: {
            $select?: (keyof ProcessSession)[]
            $top?: number
            $skip?: number
            $expand?: ProcessSessionExpand
        }
        "startedby"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
    }

/**
 * Type-safe expand options for Process Session
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for ProcessSession @odata.bind operations
 */
export type ProcessSessionBindings = {
    'CanceledBy@odata.bind'?: string; // Bind to: systemuser
    'CompletedBy@odata.bind'?: string; // Bind to: systemuser
    'ExecutedBy@odata.bind'?: string; // Bind to: systemuser
    'NextLinkedSessionId@odata.bind'?: string; // Bind to: processsession
    'OriginatingSessionId@odata.bind'?: string; // Bind to: processsession
    'PreviousLinkedSessionId@odata.bind'?: string; // Bind to: processsession
    'ProcessId@odata.bind'?: string; // Bind to: workflow
    'RegardingObjectId@odata.bind'?: string; // Bind to: account, activityfileattachment, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, annotation, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, attributemaskingrule, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, businessprocess, businessunit, businessunitnewsarticle, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, channelaccessprofile, channelaccessprofilerule, chat, comment, connection, connectioninstance, connectionreference, connectionrole, connector, contact, conversationtranscript, convertrule, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, customeraddress, customerrelationship, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, desktopflowbinary, desktopflowmodule, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, email, enablearchivalrequest, entityclusterconfig, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, expiredprocess, exportedexcel, exportsolutionupload, externalparty, externalpartyitem, fabricaiskill, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, fxexpression, goal, goalrollupquery, governanceconfiguration, holidaywrapper, internalcatalogassignment, kbarticle, kbarticlecomment, kbarticletemplate, keyvaultreference, knowledgearticle, knowledgebaserecord, knowledgefaq, kra_request, letter, mailbox, mailmergetemplate, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, metric, mobileofflineprofileextension, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, newprocess, new_keyresultprocess, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, package, packagehistory, pdfsetting, phonecall, plannerbusinessscenario, plannersyncaction, plugin, position, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processstageparameter, provisionlanguageforuser, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, queue, queueitem, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recurringappointmentmaster, recyclebinconfig, relationshiprole, report, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, roleeditorlayout, rollupfield, routingrule, routingruleitem, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointdocumentlocation, sharepointmanagedidentity, sharepointsite, sideloadedaiplugin, signalregistration, sla, socialactivity, socialprofile, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, subject, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuser, systemuserauthorizationchangetracker, tag, taggedflowsession, taggedprocess, task, tdsmetadata, team, teammobileofflineprofilemembership, template, territory, theme, traitregistration, transactioncurrency, translationprocess, unstructuredfilesearchentity, unstructuredfilesearchrecord, usermapping, usermobileofflineprofilemembership, userrating, viewasexamplequestion, virtualentitymetadata, workflowbinary, workflowmetadata, workqueue, workqueueitem
    'StartedBy@odata.bind'?: string; // Bind to: systemuser
};

/**
 * Type-safe helper functions for creating ProcessSession @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const ProcessSessionBindings = {
    /** Create @odata.bind for canceledby -> systemuser */
    canceledby: (id: string): { 'CanceledBy@odata.bind': string } => ({
        'CanceledBy@odata.bind': `/systemusers(${id})`
    }),
    /** Create @odata.bind for completedby -> systemuser */
    completedby: (id: string): { 'CompletedBy@odata.bind': string } => ({
        'CompletedBy@odata.bind': `/systemusers(${id})`
    }),
    /** Create @odata.bind for executedby -> systemuser */
    executedby: (id: string): { 'ExecutedBy@odata.bind': string } => ({
        'ExecutedBy@odata.bind': `/systemusers(${id})`
    }),
    /** Create @odata.bind for nextlinkedsessionid -> processsession */
    nextlinkedsessionid: (id: string): { 'NextLinkedSessionId@odata.bind': string } => ({
        'NextLinkedSessionId@odata.bind': `/processsessions(${id})`
    }),
    /** Create @odata.bind for originatingsessionid -> processsession */
    originatingsessionid: (id: string): { 'OriginatingSessionId@odata.bind': string } => ({
        'OriginatingSessionId@odata.bind': `/processsessions(${id})`
    }),
    /** Create @odata.bind for previouslinkedsessionid -> processsession */
    previouslinkedsessionid: (id: string): { 'PreviousLinkedSessionId@odata.bind': string } => ({
        'PreviousLinkedSessionId@odata.bind': `/processsessions(${id})`
    }),
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
    /** Create @odata.bind for startedby -> systemuser */
    startedby: (id: string): { 'StartedBy@odata.bind': string } => ({
        'StartedBy@odata.bind': `/systemusers(${id})`
    }),
} as const;

export type ProcessSessionCreate = Partial<ProcessSession> & Partial<ProcessSessionBindings> & {
    name: string; // Required for create
};

export type ProcessSessionUpdate = Partial<Omit<ProcessSession, 'processsessionid'>> & Partial<ProcessSessionBindings> & {
    processsessionid: string; // Required for update
};

/**
 * Runtime metadata for Process Session
 * Provides entity schema information for API operations
 */
export const ProcessSessionMeta = {
    logicalName: "processsession",
    schemaName: "ProcessSession",
    displayName: "Process Session",
    entitySetName: "processsessions",
    isCustomEntity: false,
    description: "Information that is generated when a dialog is run. Every time that you run a dialog, a dialog session is created.",
    primaryKey: {
        logicalName: "processsessionid",
        attributeType: "Uniqueidentifier",
        displayName: "Dialog Session"
    },
    primaryName: {
        logicalName: "name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["canceledby", "completedby", "createdby", "createdonbehalfby", "executedby", "modifiedby", "modifiedonbehalfby", "nextlinkedsessionid", "originatingsessionid", "owningbusinessunit", "owningteam", "owninguser", "previouslinkedsessionid", "processid", "regardingobjectid", "startedby"],
    requiredAttributes: ["ownerid", "owneridname", "owneridtype", "owneridyominame", "statecode"],
    optionSets: ["processsession_statecode", "processsession_statuscode"],
    expandableProperties: [
        "CanceledBy", // Relationship
        "CompletedBy", // Relationship
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ExecutedBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "NextLinkedSessionId", // Relationship
        "OriginatingSessionId", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "PreviousLinkedSessionId", // Relationship
        "ProcessId", // Relationship
        "RegardingObjectId", // Relationship
        "StartedBy", // Relationship
    ],
    relatedEntities: {
        "canceledby": {
            relationshipName: "canceledby",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
        "completedby": {
            relationshipName: "completedby",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
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
        "executedby": {
            relationshipName: "executedby",
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
        "nextlinkedsessionid": {
            relationshipName: "nextlinkedsessionid",
            targetEntityLogicalName: "processsession",
            targetEntitySetName: "processsessions",
            relationshipType: "ManyToOne"
        },
        "originatingsessionid": {
            relationshipName: "originatingsessionid",
            targetEntityLogicalName: "processsession",
            targetEntitySetName: "processsessions",
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
        "previouslinkedsessionid": {
            relationshipName: "previouslinkedsessionid",
            targetEntityLogicalName: "processsession",
            targetEntitySetName: "processsessions",
            relationshipType: "ManyToOne"
        },
        "processid": {
            relationshipName: "processid",
            targetEntityLogicalName: "workflow",
            targetEntitySetName: "workflows",
            relationshipType: "ManyToOne"
        },
        "regardingobjectid": {
            relationshipName: "regardingobjectid",
            targetEntityLogicalName: "account",
            targetEntitySetName: "accounts",
            relationshipType: "ManyToOne"
        },
        "startedby": {
            relationshipName: "startedby",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.096Z"
} as const;
