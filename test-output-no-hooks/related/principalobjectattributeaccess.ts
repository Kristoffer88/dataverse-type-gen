// Required imports
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'

/**
 * Field Sharing
 * Defines CRM security principals (users and teams) access rights to secured field for an entity instance.
 * Entity: principalobjectattributeaccess
 * Schema: PrincipalObjectAttributeAccess
 * Primary Key: principalobjectattributeaccessid
 */
export interface PrincipalObjectAttributeAccess {
    /** Secured field - Unique identifier of the shared secured field */
    attributeid: string;
    /** Entity instance - Unique identifier of the entity instance with shared secured field */
    objectid: string; // Lookup to: account, activityfileattachment, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, attributeimageconfig, attributemaskingrule, attributepicklistvalue, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, businessprocess, businessunit, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, channelaccessprofile, chat, comment, connection, connectioninstance, connectionreference, connector, contact, conversationtranscript, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, customeraddress, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, desktopflowbinary, desktopflowmodule, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, email, emailaddressconfiguration, enablearchivalrequest, entityanalyticsconfig, entityclusterconfig, entityimageconfig, entityindex, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, fabricaiskill, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, feedback, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, flowsession, fxexpression, goal, governanceconfiguration, holidaywrapper, indexattributes, internalcatalogassignment, kbarticle, keyvaultreference, knowledgearticle, knowledgearticleviews, knowledgebaserecord, knowledgefaq, kra_request, letter, mailmergetemplate, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, mobileofflineprofileextension, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, new_keyresultprocess, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, package, packagehistory, pdfsetting, phonecall, plannerbusinessscenario, plannersyncaction, plugin, pluginpackage, position, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processstageparameter, provisionlanguageforuser, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, queue, queueitem, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recurringappointmentmaster, recyclebinconfig, relationshipattribute, reportcategory, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, roleeditorlayout, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointdocumentlocation, sharepointmanagedidentity, sharepointsite, sideloadedaiplugin, signalregistration, socialactivity, socialprofile, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuser, systemuserauthorizationchangetracker, tag, taggedflowsession, taggedprocess, task, tdsmetadata, team, teammobileofflineprofilemembership, territory, traitregistration, unstructuredfilesearchentity, unstructuredfilesearchrecord, usermobileofflineprofilemembership, userrating, viewasexamplequestion, virtualentitymetadata, workflowbinary, workflowmetadata, workqueue, workqueueitem
    /** _objectid_value - Resolved lookup GUID value */
    _objectid_value?: string; // Lookup value
    /** Organization - Unique identifier of the associated organization. */
    organizationid: string; // Lookup to: organization
    /** _organizationid_value - Resolved lookup GUID value */
    _organizationid_value?: string; // Lookup value
    /** Principal - Unique identifier of the principal to which secured field is shared */
    principalid: string; // Lookup to: systemuser, team
    /** _principalid_value - Resolved lookup GUID value */
    _principalid_value?: string; // Lookup value
    /** Shared secured field - Unique identifier of the shared secured field instance */
    principalobjectattributeaccessid: string;
    /** Read permission - Read permission for secured field instance */
    readaccess: boolean;
    /** Update permission - Update permission for secured field instance */
    updateaccess: boolean;
    /** VersionNumber */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Field Sharing
 * Enables IntelliSense for $expand relationship names
 */
export type PrincipalObjectAttributeAccessExpandableProperties =
    "ObjectId"
    | "OrganizationId"
    | "PrincipalId"

/**
 * Type-safe expand options for Field Sharing
 * Supports both array format and object format with nested options
 */
export type PrincipalObjectAttributeAccessExpand =
    | PrincipalObjectAttributeAccessExpandableProperties[]
    | {
        "principalid"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
    }

/**
 * Type-safe expand options for Field Sharing
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for PrincipalObjectAttributeAccess @odata.bind operations
 */
export type PrincipalObjectAttributeAccessBindings = {
    'ObjectId@odata.bind'?: string; // Bind to: account, activityfileattachment, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, attributeimageconfig, attributemaskingrule, attributepicklistvalue, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, businessprocess, businessunit, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, channelaccessprofile, chat, comment, connection, connectioninstance, connectionreference, connector, contact, conversationtranscript, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, customeraddress, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, desktopflowbinary, desktopflowmodule, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, email, emailaddressconfiguration, enablearchivalrequest, entityanalyticsconfig, entityclusterconfig, entityimageconfig, entityindex, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, fabricaiskill, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, feedback, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, flowsession, fxexpression, goal, governanceconfiguration, holidaywrapper, indexattributes, internalcatalogassignment, kbarticle, keyvaultreference, knowledgearticle, knowledgearticleviews, knowledgebaserecord, knowledgefaq, kra_request, letter, mailmergetemplate, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, mobileofflineprofileextension, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, new_keyresultprocess, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, package, packagehistory, pdfsetting, phonecall, plannerbusinessscenario, plannersyncaction, plugin, pluginpackage, position, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processstageparameter, provisionlanguageforuser, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, queue, queueitem, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recurringappointmentmaster, recyclebinconfig, relationshipattribute, reportcategory, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, roleeditorlayout, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointdocumentlocation, sharepointmanagedidentity, sharepointsite, sideloadedaiplugin, signalregistration, socialactivity, socialprofile, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuser, systemuserauthorizationchangetracker, tag, taggedflowsession, taggedprocess, task, tdsmetadata, team, teammobileofflineprofilemembership, territory, traitregistration, unstructuredfilesearchentity, unstructuredfilesearchrecord, usermobileofflineprofilemembership, userrating, viewasexamplequestion, virtualentitymetadata, workflowbinary, workflowmetadata, workqueue, workqueueitem
    'OrganizationId@odata.bind'?: string; // Bind to: organization
    'PrincipalId@odata.bind'?: string; // Bind to: systemuser, team
};

/**
 * Type-safe helper functions for creating PrincipalObjectAttributeAccess @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const PrincipalObjectAttributeAccessBindings = {
    /** Create @odata.bind for objectid -> businessunit | kra_request | pum_assignment | pum_dependency | pum_ganttmarker | pum_ganttsession | pum_gantttask | pum_ganttversion | pum_idea | pum_initiative | pum_initiativebusinessprocess | pum_investmentcategory | pum_keyresults | pum_pf_costplan_version | pum_pf_costspecification | pum_pf_customcolumndata | pum_pf_customrowdata | pum_pf_powerfinancialscomment | pum_pf_powerfinancialsdata | pum_portfolio | pum_powergantttemplate | pum_program | pum_risk | pum_roadmapswimlane | pum_stakeholder | pum_statusreporting | systemuser | team */
    objectid: (id: string, entityType: 'businessunit' | 'kra_request' | 'pum_assignment' | 'pum_dependency' | 'pum_ganttmarker' | 'pum_ganttsession' | 'pum_gantttask' | 'pum_ganttversion' | 'pum_idea' | 'pum_initiative' | 'pum_initiativebusinessprocess' | 'pum_investmentcategory' | 'pum_keyresults' | 'pum_pf_costplan_version' | 'pum_pf_costspecification' | 'pum_pf_customcolumndata' | 'pum_pf_customrowdata' | 'pum_pf_powerfinancialscomment' | 'pum_pf_powerfinancialsdata' | 'pum_portfolio' | 'pum_powergantttemplate' | 'pum_program' | 'pum_risk' | 'pum_roadmapswimlane' | 'pum_stakeholder' | 'pum_statusreporting' | 'systemuser' | 'team') => {
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
        } as const;
        return { 'ObjectId@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
    /** Create @odata.bind for principalid -> systemuser | team */
    principalid: (id: string, entityType: 'systemuser' | 'team') => {
        const entitySets = {
            'systemuser': 'systemusers',
            'team': 'teams',
        } as const;
        return { 'PrincipalId@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
} as const;

export type PrincipalObjectAttributeAccessCreate = Partial<PrincipalObjectAttributeAccess> & Partial<PrincipalObjectAttributeAccessBindings> & {
};

export type PrincipalObjectAttributeAccessUpdate = Partial<Omit<PrincipalObjectAttributeAccess, 'principalobjectattributeaccessid'>> & Partial<PrincipalObjectAttributeAccessBindings> & {
    principalobjectattributeaccessid: string; // Required for update
};

/**
 * Runtime metadata for Field Sharing
 * Provides entity schema information for API operations
 */
export const PrincipalObjectAttributeAccessMeta = {
    logicalName: "principalobjectattributeaccess",
    schemaName: "PrincipalObjectAttributeAccess",
    displayName: "Field Sharing",
    entitySetName: "principalobjectattributeaccessset",
    isCustomEntity: false,
    description: "Defines CRM security principals (users and teams) access rights to secured field for an entity instance.",
    primaryKey: {
        logicalName: "principalobjectattributeaccessid",
        attributeType: "Uniqueidentifier",
        displayName: "Shared secured field"
    },
    lookupAttributes: ["objectid", "organizationid", "principalid"],
    requiredAttributes: ["attributeid", "objectid", "objecttypecode", "organizationid", "organizationidname", "principalid", "principalidname", "principalidtype", "readaccess", "updateaccess"],
    expandableProperties: [
        "ObjectId", // Relationship
        "OrganizationId", // Relationship
        "PrincipalId", // Relationship
    ],
    relatedEntities: {
        "objectid": {
            relationshipName: "objectid",
            targetEntityLogicalName: "account",
            targetEntitySetName: "accounts",
            relationshipType: "ManyToOne"
        },
        "organizationid": {
            relationshipName: "organizationid",
            targetEntityLogicalName: "organization",
            targetEntitySetName: "organizations",
            relationshipType: "ManyToOne"
        },
        "principalid": {
            relationshipName: "principalid",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.093Z"
} as const;
