// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'

/**
 * Mailbox Auto Tracking Folder
 * Stores data about what folders for a mailbox are auto tracked
 * Entity: mailboxtrackingfolder
 * Schema: MailboxTrackingFolder
 * Primary Key: mailboxtrackingfolderid
 */
export interface MailboxTrackingFolder {
    /** Created By - Unique identifier of the user who created the record. */
    createdby?: string; // Lookup to: systemuser
    /** _createdby_value - Resolved lookup GUID value */
    _createdby_value?: string; // Lookup value
    /** Created On - Date and time when the entry was created. */
    createdon?: Date | string;
    /** Created By (Delegate) - Shows who created the record on behalf of another user. */
    createdonbehalfby?: string; // Lookup to: systemuser
    /** _createdonbehalfby_value - Resolved lookup GUID value */
    _createdonbehalfby_value?: string; // Lookup value
    /** Exchange Folder Id - Folder Id for a folder in Exchange */
    exchangefolderid?: string;
    /** Exchange Folder Name */
    exchangefoldername?: string;
    /** Folder on boarding Status - Information to indicate whether the folder has been on boarded for auto tracking */
    folderonboardingstatus: number;
    /** MailboxId - Mailbox id associated with this record. */
    mailboxid: string; // Lookup to: mailbox
    /** _mailboxid_value - Resolved lookup GUID value */
    _mailboxid_value?: string; // Lookup value
    /** MailboxTrackingFolderId */
    mailboxtrackingfolderid: string;
    /** Modified By - Unique identifier of the user who modified the record. */
    modifiedby?: string; // Lookup to: systemuser
    /** _modifiedby_value - Resolved lookup GUID value */
    _modifiedby_value?: string; // Lookup value
    /** Modified On - Date and time when the entry was last modified. */
    modifiedon?: Date | string;
    /** Modified By (Delegate) - Unique identifier of the delegate user who modified the record. */
    modifiedonbehalfby?: string; // Lookup to: systemuser
    /** _modifiedonbehalfby_value - Resolved lookup GUID value */
    _modifiedonbehalfby_value?: string; // Lookup value
    /** Organization - Unique identifier of the organization associated with the record. */
    organizationid: string; // Lookup to: organization
    /** _organizationid_value - Resolved lookup GUID value */
    _organizationid_value?: string; // Lookup value
    /** Owner - Enter the user or team who is assigned to manage the record. This field is updated every time the record is assigned to a different user. */
    ownerid: string; // Lookup to: systemuser, team
    /** Owning Business Unit - Unique identifier of the business unit that owns the folder mapping. */
    owningbusinessunit?: string; // Lookup to: businessunit
    /** _owningbusinessunit_value - Resolved lookup GUID value */
    _owningbusinessunit_value?: string; // Lookup value
    /** Owning Team - Unique identifier of the team who owns the folder mapping. */
    owningteam?: string; // Lookup to: team
    /** _owningteam_value - Resolved lookup GUID value */
    _owningteam_value?: string; // Lookup value
    /** Owning User - Unique identifier for the user that owns the record. */
    owninguser?: string;
    /** _owninguser_value - Resolved lookup GUID value */
    _owninguser_value?: string; // Lookup value
    /** Regarding Object Id - The regarding object such as Account, Contact, Lead etc. that the folder relates to. */
    regardingobjectid?: string; // Lookup to: account, activityfileattachment, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, asyncoperation, attributeimageconfig, attributemaskingrule, attributepicklistvalue, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, businessprocess, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, chat, comment, connectioninstance, connectionreference, connector, contact, conversationtranscript, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, desktopflowbinary, desktopflowmodule, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, emailaddressconfiguration, enablearchivalrequest, entityanalyticsconfig, entityclusterconfig, entityimageconfig, entityindex, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, fabricaiskill, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, flowsession, fxexpression, governanceconfiguration, holidaywrapper, indexattributes, internalcatalogassignment, keyvaultreference, knowledgefaq, kra_request, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, mobileofflineprofileextension, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, new_keyresultprocess, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, package, packagehistory, pdfsetting, plannerbusinessscenario, plannersyncaction, plugin, pluginpackage, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processstageparameter, provisionlanguageforuser, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recyclebinconfig, relationshipattribute, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, roleeditorlayout, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointmanagedidentity, sideloadedaiplugin, signalregistration, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuserauthorizationchangetracker, tag, taggedflowsession, taggedprocess, tdsmetadata, teammobileofflineprofilemembership, territory, traitregistration, unstructuredfilesearchentity, unstructuredfilesearchrecord, usermobileofflineprofilemembership, userrating, viewasexamplequestion, virtualentitymetadata, workflowbinary, workflowmetadata, workqueue, workqueueitem
    /** _regardingobjectid_value - Resolved lookup GUID value */
    _regardingobjectid_value?: string; // Lookup value
    /** Version number - Version number of the mailbox tracking folder. */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Mailbox Auto Tracking Folder
 * Enables IntelliSense for $expand relationship names
 */
export type MailboxTrackingFolderExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "MailboxId"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OrganizationId"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "RegardingObjectId"

/**
 * Type-safe expand options for Mailbox Auto Tracking Folder
 * Supports both array format and object format with nested options
 */
export type MailboxTrackingFolderExpand =
    | MailboxTrackingFolderExpandableProperties[]
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
    }

/**
 * Type-safe expand options for Mailbox Auto Tracking Folder
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for MailboxTrackingFolder @odata.bind operations
 */
export type MailboxTrackingFolderBindings = {
    'MailboxId@odata.bind'?: string; // Bind to: mailbox
    'OrganizationId@odata.bind'?: string; // Bind to: organization
    'RegardingObjectId@odata.bind'?: string; // Bind to: account, activityfileattachment, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, asyncoperation, attributeimageconfig, attributemaskingrule, attributepicklistvalue, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, businessprocess, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, chat, comment, connectioninstance, connectionreference, connector, contact, conversationtranscript, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, desktopflowbinary, desktopflowmodule, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, emailaddressconfiguration, enablearchivalrequest, entityanalyticsconfig, entityclusterconfig, entityimageconfig, entityindex, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, fabricaiskill, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, flowsession, fxexpression, governanceconfiguration, holidaywrapper, indexattributes, internalcatalogassignment, keyvaultreference, knowledgefaq, kra_request, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, mobileofflineprofileextension, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, new_keyresultprocess, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, package, packagehistory, pdfsetting, plannerbusinessscenario, plannersyncaction, plugin, pluginpackage, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processstageparameter, provisionlanguageforuser, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recyclebinconfig, relationshipattribute, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, roleeditorlayout, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointmanagedidentity, sideloadedaiplugin, signalregistration, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuserauthorizationchangetracker, tag, taggedflowsession, taggedprocess, tdsmetadata, teammobileofflineprofilemembership, territory, traitregistration, unstructuredfilesearchentity, unstructuredfilesearchrecord, usermobileofflineprofilemembership, userrating, viewasexamplequestion, virtualentitymetadata, workflowbinary, workflowmetadata, workqueue, workqueueitem
};

/**
 * Type-safe helper functions for creating MailboxTrackingFolder @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const MailboxTrackingFolderBindings = {
    /** Create @odata.bind for regardingobjectid -> asyncoperation | kra_request | pum_assignment | pum_dependency | pum_ganttmarker | pum_ganttsession | pum_gantttask | pum_ganttversion | pum_idea | pum_initiative | pum_initiativebusinessprocess | pum_investmentcategory | pum_keyresults | pum_pf_costplan_version | pum_pf_costspecification | pum_pf_customcolumndata | pum_pf_customrowdata | pum_pf_powerfinancialscomment | pum_pf_powerfinancialsdata | pum_portfolio | pum_powergantttemplate | pum_program | pum_risk | pum_roadmapswimlane | pum_stakeholder | pum_statusreporting */
    regardingobjectid: (id: string, entityType: 'asyncoperation' | 'kra_request' | 'pum_assignment' | 'pum_dependency' | 'pum_ganttmarker' | 'pum_ganttsession' | 'pum_gantttask' | 'pum_ganttversion' | 'pum_idea' | 'pum_initiative' | 'pum_initiativebusinessprocess' | 'pum_investmentcategory' | 'pum_keyresults' | 'pum_pf_costplan_version' | 'pum_pf_costspecification' | 'pum_pf_customcolumndata' | 'pum_pf_customrowdata' | 'pum_pf_powerfinancialscomment' | 'pum_pf_powerfinancialsdata' | 'pum_portfolio' | 'pum_powergantttemplate' | 'pum_program' | 'pum_risk' | 'pum_roadmapswimlane' | 'pum_stakeholder' | 'pum_statusreporting') => {
        const entitySets = {
            'asyncoperation': 'asyncoperations',
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
        } as const;
        return { 'RegardingObjectId@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
} as const;

export type MailboxTrackingFolderCreate = Partial<MailboxTrackingFolder> & Partial<MailboxTrackingFolderBindings> & {
};

export type MailboxTrackingFolderUpdate = Partial<Omit<MailboxTrackingFolder, 'mailboxtrackingfolderid'>> & Partial<MailboxTrackingFolderBindings> & {
    mailboxtrackingfolderid: string; // Required for update
};

/**
 * Runtime metadata for Mailbox Auto Tracking Folder
 * Provides entity schema information for API operations
 */
export const MailboxTrackingFolderMeta = {
    logicalName: "mailboxtrackingfolder",
    schemaName: "MailboxTrackingFolder",
    displayName: "Mailbox Auto Tracking Folder",
    entitySetName: "mailboxtrackingfolders",
    isCustomEntity: false,
    description: "Stores data about what folders for a mailbox are auto tracked",
    primaryKey: {
        logicalName: "mailboxtrackingfolderid",
        attributeType: "Uniqueidentifier",
        displayName: "MailboxTrackingFolderId"
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "mailboxid", "modifiedby", "modifiedonbehalfby", "organizationid", "owningbusinessunit", "owningteam", "owninguser", "regardingobjectid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "folderonboardingstatus", "mailboxid", "modifiedbyyominame", "modifiedonbehalfbyyominame", "organizationid", "ownerid", "owneridtype"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "MailboxId", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OrganizationId", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "RegardingObjectId", // Relationship
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
        "mailboxid": {
            relationshipName: "mailboxid",
            targetEntityLogicalName: "mailbox",
            targetEntitySetName: "mailboxs",
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
        "regardingobjectid": {
            relationshipName: "regardingobjectid",
            targetEntityLogicalName: "account",
            targetEntitySetName: "accounts",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.845Z"
} as const;
