// Required imports
import type { AsyncOperation } from './asyncoperation.js'
import type { AsyncOperationExpand } from './asyncoperation.js'

/**
 * Bulk Delete Failure
 * Record that was not deleted during a bulk deletion job.
 * Entity: bulkdeletefailure
 * Schema: BulkDeleteFailure
 * Primary Key: bulkdeletefailureid
 */
export interface BulkDeleteFailure {
    /** System Job - Unique identifier of the system job that created this record. */
    asyncoperationid?: string; // Lookup to: asyncoperation
    /** _asyncoperationid_value - Resolved lookup GUID value */
    _asyncoperationid_value?: string; // Lookup value
    /** Bulk Deletion Failure - Unique identifier of the bulk deletion failure record. */
    bulkdeletefailureid: string;
    /** BulkDeleteOperationId - Unique identifier of the bulk operation job which created this record */
    bulkdeleteoperationid?: string; // Lookup to: bulkdeleteoperation
    /** _bulkdeleteoperationid_value - Resolved lookup GUID value */
    _bulkdeleteoperationid_value?: string; // Lookup value
    /** Error Description - Description of the error. */
    errordescription?: string;
    /** Error Code - Error code for the failed bulk deletion. */
    errornumber?: number;
    /** Index - Index of the ordered query expression that retrieved this record. */
    orderedqueryindex?: number;
    /** Owner - Unique identifier of the user or team who owns the bulk operation log. */
    ownerid?: string; // Lookup to: systemuser, team
    /** Owning Business Unit - Unique identifier of the business unit that owns the bulk deletion failure. */
    owningbusinessunit?: string;
    /** Owning User - Unique identifier of the user who owns the bulk deletion failure record.
   */
    owninguser?: string;
    /** Name - Unique identifier of the record that can not be deleted. */
    regardingobjectid?: string; // Lookup to: account, activityfileattachment, activitymimeattachment, activitypointer, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, annotation, annualfiscalcalendar, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, attributeimageconfig, attributemap, attributemaskingrule, attributepicklistvalue, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, businessprocess, businessunit, businessunitnewsarticle, calendar, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, channelaccessprofile, channelaccessprofilerule, chat, comment, connectioninstance, connectionreference, connector, contact, conversationtranscript, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, customeraddress, customerrelationship, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, desktopflowbinary, desktopflowmodule, displaystring, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, email, emailaddressconfiguration, emailserverprofile, enablearchivalrequest, entityanalyticsconfig, entityclusterconfig, entityimageconfig, entityindex, entitymap, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, externalparty, externalpartyitem, fabricaiskill, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, fixedmonthlyfiscalcalendar, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, flowsession, fxexpression, governanceconfiguration, holidaywrapper, import, importdata, importfile, importlog, importmap, indexattributes, internalcatalogassignment, isvconfig, kbarticle, kbarticlecomment, kbarticletemplate, keyvaultreference, knowledgearticle, knowledgebaserecord, knowledgefaq, kra_request, letter, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, mobileofflineprofileextension, monthlyfiscalcalendar, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, new_keyresultprocess, organization, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, package, packagehistory, pdfsetting, phonecall, plannerbusinessscenario, plannersyncaction, plugin, pluginpackage, post, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, privilege, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processstageparameter, provisionlanguageforuser, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, quarterlyfiscalcalendar, queue, queueitem, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recurringappointmentmaster, recyclebinconfig, relationshipattribute, relationshiprole, relationshiprolemap, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, role, roleeditorlayout, routingrule, routingruleitem, savedquery, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, semiannualfiscalcalendar, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointmanagedidentity, sideloadedaiplugin, signalregistration, sla, socialactivity, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, subject, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemform, systemuser, systemuserauthorizationchangetracker, tag, taggedflowsession, taggedprocess, task, tdsmetadata, team, teammobileofflineprofilemembership, template, territory, theme, traitregistration, unstructuredfilesearchentity, unstructuredfilesearchrecord, userform, usermapping, usermobileofflineprofilemembership, userquery, userrating, viewasexamplequestion, virtualentitymetadata, workflowbinary, workflowmetadata, workqueue, workqueueitem
    /** _regardingobjectid_value - Resolved lookup GUID value */
    _regardingobjectid_value?: string; // Lookup value
}

/**
 * Type-safe expand properties for Bulk Delete Failure
 * Enables IntelliSense for $expand relationship names
 */
export type BulkDeleteFailureExpandableProperties =
    "AsyncOperationId"
    | "BulkDeleteOperationId"
    | "RegardingObjectId"

/**
 * Type-safe expand options for Bulk Delete Failure
 * Supports both array format and object format with nested options
 */
export type BulkDeleteFailureExpand =
    | BulkDeleteFailureExpandableProperties[]
    | {
        "asyncoperationid"?: {
            $select?: (keyof AsyncOperation)[]
            $top?: number
            $skip?: number
            $expand?: AsyncOperationExpand
        }
    }

/**
 * Type-safe expand options for Bulk Delete Failure
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for BulkDeleteFailure @odata.bind operations
 */
export type BulkDeleteFailureBindings = {
    'AsyncOperationId@odata.bind'?: string; // Bind to: asyncoperation
    'BulkDeleteOperationId@odata.bind'?: string; // Bind to: bulkdeleteoperation
    'RegardingObjectId@odata.bind'?: string; // Bind to: account, activityfileattachment, activitymimeattachment, activitypointer, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, annotation, annualfiscalcalendar, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, attributeimageconfig, attributemap, attributemaskingrule, attributepicklistvalue, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, businessprocess, businessunit, businessunitnewsarticle, calendar, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, channelaccessprofile, channelaccessprofilerule, chat, comment, connectioninstance, connectionreference, connector, contact, conversationtranscript, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, customeraddress, customerrelationship, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, desktopflowbinary, desktopflowmodule, displaystring, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, email, emailaddressconfiguration, emailserverprofile, enablearchivalrequest, entityanalyticsconfig, entityclusterconfig, entityimageconfig, entityindex, entitymap, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, externalparty, externalpartyitem, fabricaiskill, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, fixedmonthlyfiscalcalendar, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, flowsession, fxexpression, governanceconfiguration, holidaywrapper, import, importdata, importfile, importlog, importmap, indexattributes, internalcatalogassignment, isvconfig, kbarticle, kbarticlecomment, kbarticletemplate, keyvaultreference, knowledgearticle, knowledgebaserecord, knowledgefaq, kra_request, letter, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, mobileofflineprofileextension, monthlyfiscalcalendar, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, new_keyresultprocess, organization, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, package, packagehistory, pdfsetting, phonecall, plannerbusinessscenario, plannersyncaction, plugin, pluginpackage, post, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, privilege, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processstageparameter, provisionlanguageforuser, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, quarterlyfiscalcalendar, queue, queueitem, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recurringappointmentmaster, recyclebinconfig, relationshipattribute, relationshiprole, relationshiprolemap, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, role, roleeditorlayout, routingrule, routingruleitem, savedquery, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, semiannualfiscalcalendar, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointmanagedidentity, sideloadedaiplugin, signalregistration, sla, socialactivity, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, subject, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemform, systemuser, systemuserauthorizationchangetracker, tag, taggedflowsession, taggedprocess, task, tdsmetadata, team, teammobileofflineprofilemembership, template, territory, theme, traitregistration, unstructuredfilesearchentity, unstructuredfilesearchrecord, userform, usermapping, usermobileofflineprofilemembership, userquery, userrating, viewasexamplequestion, virtualentitymetadata, workflowbinary, workflowmetadata, workqueue, workqueueitem
};

/**
 * Type-safe helper functions for creating BulkDeleteFailure @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const BulkDeleteFailureBindings = {
    /** Create @odata.bind for asyncoperationid -> asyncoperation */
    asyncoperationid: (id: string): { 'AsyncOperationId@odata.bind': string } => ({
        'AsyncOperationId@odata.bind': `/asyncoperations(${id})`
    }),
    /** Create @odata.bind for regardingobjectid -> businessunit | kra_request | pum_assignment | pum_dependency | pum_ganttmarker | pum_ganttsession | pum_gantttask | pum_ganttversion | pum_idea | pum_initiative | pum_initiativebusinessprocess | pum_investmentcategory | pum_keyresults | pum_pf_costplan_version | pum_pf_costspecification | pum_pf_customcolumndata | pum_pf_customrowdata | pum_pf_powerfinancialscomment | pum_pf_powerfinancialsdata | pum_portfolio | pum_powergantttemplate | pum_program | pum_risk | pum_roadmapswimlane | pum_stakeholder | pum_statusreporting | systemuser | team */
    regardingobjectid: (id: string, entityType: 'businessunit' | 'kra_request' | 'pum_assignment' | 'pum_dependency' | 'pum_ganttmarker' | 'pum_ganttsession' | 'pum_gantttask' | 'pum_ganttversion' | 'pum_idea' | 'pum_initiative' | 'pum_initiativebusinessprocess' | 'pum_investmentcategory' | 'pum_keyresults' | 'pum_pf_costplan_version' | 'pum_pf_costspecification' | 'pum_pf_customcolumndata' | 'pum_pf_customrowdata' | 'pum_pf_powerfinancialscomment' | 'pum_pf_powerfinancialsdata' | 'pum_portfolio' | 'pum_powergantttemplate' | 'pum_program' | 'pum_risk' | 'pum_roadmapswimlane' | 'pum_stakeholder' | 'pum_statusreporting' | 'systemuser' | 'team') => {
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
        return { 'RegardingObjectId@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
} as const;

export type BulkDeleteFailureCreate = Partial<BulkDeleteFailure> & Partial<BulkDeleteFailureBindings> & {
};

export type BulkDeleteFailureUpdate = Partial<Omit<BulkDeleteFailure, 'bulkdeletefailureid'>> & Partial<BulkDeleteFailureBindings> & {
    bulkdeletefailureid: string; // Required for update
};

/**
 * Runtime metadata for Bulk Delete Failure
 * Provides entity schema information for API operations
 */
export const BulkDeleteFailureMeta = {
    logicalName: "bulkdeletefailure",
    schemaName: "BulkDeleteFailure",
    displayName: "Bulk Delete Failure",
    entitySetName: "bulkdeletefailures",
    isCustomEntity: false,
    description: "Record that was not deleted during a bulk deletion job.",
    primaryKey: {
        logicalName: "bulkdeletefailureid",
        attributeType: "Uniqueidentifier",
        displayName: "Bulk Deletion Failure"
    },
    lookupAttributes: ["asyncoperationid", "bulkdeleteoperationid", "regardingobjectid"],
    requiredAttributes: ["asyncoperationid", "ownerid", "owneridtype", "owningbusinessunit", "owninguser"],
    expandableProperties: [
        "AsyncOperationId", // Relationship
        "BulkDeleteOperationId", // Relationship
        "RegardingObjectId", // Relationship
    ],
    relatedEntities: {
        "asyncoperationid": {
            relationshipName: "asyncoperationid",
            targetEntityLogicalName: "asyncoperation",
            targetEntitySetName: "asyncoperations",
            relationshipType: "ManyToOne"
        },
        "bulkdeleteoperationid": {
            relationshipName: "bulkdeleteoperationid",
            targetEntityLogicalName: "bulkdeleteoperation",
            targetEntitySetName: "bulkdeleteoperations",
            relationshipType: "ManyToOne"
        },
        "regardingobjectid": {
            relationshipName: "regardingobjectid",
            targetEntityLogicalName: "account",
            targetEntitySetName: "accounts",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.090Z"
} as const;
