// Required imports
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'

/**
 * User Entity Instance Data
 * Per User item instance data
 * Entity: userentityinstancedata
 * Schema: UserEntityInstanceData
 * Primary Key: userentityinstancedataid
 */
export interface UserEntityInstanceData {
    /** Common end date */
    commonend?: Date | string;
    /** Common start date */
    commonstart?: Date | string;
    /** Due Date */
    duedate?: Date | string;
    /** Flag due by */
    flagdueby?: Date | string;
    /** Flag Request - Flag request */
    flagrequest?: string;
    /** FlagStatus - Flag status. */
    flagstatus?: number;
    /** Object Id - Unique identifier of the source record. */
    objectid: string; // Lookup to: account, activityfileattachment, activitymimeattachment, activityparty, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, annotation, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, asyncoperation, attachment, attributeimageconfig, attributemap, attributemaskingrule, attributepicklistvalue, audit, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, bulkdeletefailure, bulkdeleteoperation, businessprocess, businessunitmap, businessunitnewsarticle, calendar, calendarrule, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, channelaccessprofile, channelaccessprofilerule, chat, clientupdate, columnmapping, comment, connection, connectioninstance, connectionreference, connectionrole, connectionroleassociation, connectionroleobjecttypecode, connector, contact, conversationtranscript, convertrule, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, customeraddress, customerrelationship, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, dependency, dependencynode, desktopflowbinary, desktopflowmodule, displaystring, displaystringmap, documentindex, duplicaterecord, duplicaterule, duplicaterulecondition, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, email, emailaddressconfiguration, emailhash, emailsearch, enablearchivalrequest, entityanalyticsconfig, entityclusterconfig, entityimageconfig, entityindex, entitymap, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, externalparty, fabricaiskill, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, fieldpermission, fieldsecurityprofile, fileattachment, filtertemplate, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, flowsession, fxexpression, goal, goalrollupquery, governanceconfiguration, holidaywrapper, import, importdata, importentitymapping, importfile, importjob, importlog, importmap, indexattributes, internaladdress, internalcatalogassignment, invaliddependency, isvconfig, kbarticle, kbarticlecomment, kbarticletemplate, keyvaultreference, knowledgearticle, knowledgebaserecord, knowledgefaq, kra_request, letter, license, lookupmapping, mailbox, mailmergetemplate, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, metric, mobileofflineprofileextension, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, new_keyresultprocess, notification, organization, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, organizationstatistic, ownermapping, package, packagehistory, pdfsetting, phonecall, picklistmapping, plannerbusinessscenario, plannersyncaction, plugin, pluginassembly, pluginpackage, plugintype, plugintypestatistic, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, principalattributeaccessmap, principalentitymap, principalobjectaccess, principalobjectattributeaccess, privilege, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processsession, processstageparameter, provisionlanguageforuser, publisher, publisheraddress, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, queue, queueitem, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recurringappointmentmaster, recyclebinconfig, relationshipattribute, relationshiprole, relationshiprolemap, report, reportcategory, reportentity, reportlink, reportparameter, reportvisibility, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, ribboncommand, ribboncontextgroup, ribboncustomization, ribbondiff, ribbonrule, ribbontabtocommandmap, role, roleeditorlayout, roletemplate, rollupfield, routingrule, routingruleitem, savedquery, savedqueryvisualization, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, sdkmessage, sdkmessagefilter, sdkmessagepair, sdkmessageprocessingstep, sdkmessageprocessingstepimage, sdkmessageprocessingstepsecureconfig, sdkmessagerequest, sdkmessagerequestfield, sdkmessageresponse, sdkmessageresponsefield, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceendpoint, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointdocumentlocation, sharepointmanagedidentity, sharepointsite, sideloadedaiplugin, signalregistration, sitemap, sla, socialactivity, solution, solutioncomponent, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, statusmap, stringmap, subject, subscription, subscriptionmanuallytrackedobject, subscriptionsyncinfo, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuser, systemuserauthorizationchangetracker, systemuserbusinessunitentitymap, tag, taggedflowsession, taggedprocess, task, tdsmetadata, team, teammembership, teammobileofflineprofilemembership, template, territory, theme, timezonedefinition, timezonelocalizedname, timezonerule, traitregistration, transactioncurrency, transformationmapping, transformationparametermapping, unresolvedaddress, unstructuredfilesearchentity, unstructuredfilesearchrecord, userentityuisettings, userfiscalcalendar, userform, usermapping, usermobileofflineprofilemembership, userquery, userqueryvisualization, userrating, viewasexamplequestion, virtualentitymetadata, webresource, webwizard, wizardaccessprivilege, wizardpage, workflow, workflowbinary, workflowdependency, workflowlog, workflowmetadata, workflowwaitsubscription, workqueue, workqueueitem
    /** _objectid_value - Resolved lookup GUID value */
    _objectid_value?: string; // Lookup value
    /** ObjectTypeCode - Object Type Code */
    objecttypecode: number;
    /** Owner - Unique identifier of the user or team who owns the user entity instance data. */
    ownerid: string; // Lookup to: systemuser, team
    /** Owning Business Unit - Unique identifier of the business unit that owns this. */
    owningbusinessunit?: string; // Lookup to: businessunit
    /** _owningbusinessunit_value - Resolved lookup GUID value */
    _owningbusinessunit_value?: string; // Lookup value
    /** Owning Team - Unique identifier of the team who owns this object. */
    owningteam: string; // Lookup to: team
    /** _owningteam_value - Resolved lookup GUID value */
    _owningteam_value?: string; // Lookup value
    /** Owning User - Unique identifier of the user who owns this object. */
    owninguser: string; // Lookup to: systemuser
    /** _owninguser_value - Resolved lookup GUID value */
    _owninguser_value?: string; // Lookup value
    /** personal categories - Personal categories */
    personalcategories?: string;
    /** Is Reminder set - Indicates whether a reminder is set on this object. */
    reminderset?: boolean;
    /** Reminder time */
    remindertime?: Date | string;
    /** Start Time */
    starttime?: Date | string;
    /** ToDoItemFlags - To Do item flags. */
    todoitemflags?: number;
    /** To Do Primary Sort Date - For internal use only. */
    todoordinaldate?: Date | string;
    /** To Do Sort Tie Breaker - For internal use only. */
    todosubordinal?: string;
    /** To Do Title - For internal use only. */
    todotitle?: string;
    /** UserEntityInstanceDataId - Unique identifier user entity */
    userentityinstancedataid: string;
    /** VersionNumber */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for User Entity Instance Data
 * Enables IntelliSense for $expand relationship names
 */
export type UserEntityInstanceDataExpandableProperties =
    "ObjectId"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"

/**
 * Type-safe expand options for User Entity Instance Data
 * Supports both array format and object format with nested options
 */
export type UserEntityInstanceDataExpand =
    | UserEntityInstanceDataExpandableProperties[]
    | {
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
 * Type-safe expand options for User Entity Instance Data
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for UserEntityInstanceData @odata.bind operations
 */
export type UserEntityInstanceDataBindings = {
    'ObjectId@odata.bind'?: string; // Bind to: account, activityfileattachment, activitymimeattachment, activityparty, adx_externalidentity, adx_invitation, adx_inviteredemption, adx_portalcomment, adx_setting, adx_webformsession, aicopilot, aiinsightcard, aiplugin, aipluginauth, aipluginconversationstarter, aipluginconversationstartermapping, aipluginexternalschema, aipluginexternalschemaproperty, aiplugingovernance, aiplugingovernanceext, aiplugininstance, aipluginoperation, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, aiskillconfig, annotation, appaction, appactionmigration, appactionrule, appelement, appentitysearchview, application, applicationuser, appmodulecomponentedge, appmodulecomponentnode, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, appsetting, appusersetting, archivecleanupinfo, archivecleanupoperation, asyncoperation, attachment, attributeimageconfig, attributemap, attributemaskingrule, attributepicklistvalue, audit, bot, botcomponent, botcomponentcollection, botcontentpack, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, bulkarchiveoperationdetail, bulkdeletefailure, bulkdeleteoperation, businessprocess, businessunitmap, businessunitnewsarticle, calendar, calendarrule, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalog, catalogassignment, certificatecredential, channelaccessprofile, channelaccessprofilerule, chat, clientupdate, columnmapping, comment, connection, connectioninstance, connectionreference, connectionrole, connectionroleassociation, connectionroleobjecttypecode, connector, contact, conversationtranscript, convertrule, copilotexamplequestion, copilotglossaryterm, copilotsynonyms, credential, customapi, customapirequestparameter, customapiresponseproperty, customeraddress, customerrelationship, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, delegatedauthorization, deleteditemreference, dependency, dependencynode, desktopflowbinary, desktopflowmodule, displaystring, displaystringmap, documentindex, duplicaterecord, duplicaterule, duplicaterulecondition, dvfilesearch, dvfilesearchattribute, dvfilesearchentity, dvtablesearch, dvtablesearchattribute, dvtablesearchentity, email, emailaddressconfiguration, emailhash, emailsearch, enablearchivalrequest, entityanalyticsconfig, entityclusterconfig, entityimageconfig, entityindex, entitymap, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, externalparty, fabricaiskill, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgeconfiguration, federatedknowledgeentityconfiguration, federatedknowledgemetadatarefresh, fieldpermission, fieldsecurityprofile, fileattachment, filtertemplate, flowcapacityassignment, flowcredentialapplication, flowevent, flowmachine, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, flowsession, fxexpression, goal, goalrollupquery, governanceconfiguration, holidaywrapper, import, importdata, importentitymapping, importfile, importjob, importlog, importmap, indexattributes, internaladdress, internalcatalogassignment, invaliddependency, isvconfig, kbarticle, kbarticlecomment, kbarticletemplate, keyvaultreference, knowledgearticle, knowledgebaserecord, knowledgefaq, kra_request, letter, license, lookupmapping, mailbox, mailmergetemplate, mainfewshot, makerfewshot, managedidentity, maskingrule, mbs_pluginprofile, metadataforarchival, metric, mobileofflineprofileextension, msdynce_botcontent, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aiconfiguration, msdyn_aidataprocessingevent, msdyn_aidocumenttemplate, msdyn_aievaluationconfiguration, msdyn_aievaluationrun, msdyn_aievent, msdyn_aifptrainingdocument, msdyn_aimodel, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitemplate, msdyn_aitestcase, msdyn_aitestcasedocument, msdyn_aitestcaseinput, msdyn_aitestrun, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflowtemplate, msdyn_dataflow_datalakefolder, msdyn_dataworkspace, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_dmssyncrequest, msdyn_dmssyncstatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_helppage, msdyn_historicalcaseharvestbatch, msdyn_historicalcaseharvestrun, msdyn_insightsstorevirtualentity, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_kmpersonalizationsetting, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeassetconfiguration, msdyn_knowledgeconfiguration, msdyn_knowledgeharvestjobrecord, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_plan, msdyn_planartifact, msdyn_planattachment, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_richtextfile, msdyn_salesforcestructuredobject, msdyn_salesforcestructuredqnaconfig, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_tour, msdyn_virtualtablecolumncandidate, msdyn_workflowactionstatus, msfp_alert, msfp_alertrule, msfp_emailtemplate, msfp_fileresponse, msfp_localizedemailtemplate, msfp_project, msfp_question, msfp_questionresponse, msfp_satisfactionmetric, msfp_survey, msfp_surveyinvite, msfp_surveyreminder, msfp_surveyresponse, msfp_unsubscribedrecipient, msgraphresourcetosubscription, mspcat_catalogsubmissionfiles, mspcat_packagestore, new_keyresultprocess, notification, organization, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, organizationsetting, organizationstatistic, ownermapping, package, packagehistory, pdfsetting, phonecall, picklistmapping, plannerbusinessscenario, plannersyncaction, plugin, pluginassembly, pluginpackage, plugintype, plugintypestatistic, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagecomponent, powerpagesddosalert, powerpagesite, powerpagesitelanguage, powerpagesitepublished, powerpagesmanagedidentity, powerpagesscanreport, powerpagessourcefile, principalattributeaccessmap, principalentitymap, principalobjectaccess, principalobjectattributeaccess, privilege, privilegecheckerlog, privilegecheckerrun, privilegesremovalsetting, processorregistration, processsession, processstageparameter, provisionlanguageforuser, publisher, publisheraddress, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_dependency, pum_financialstructure, pum_ganttmarker, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_ganttversion, pum_idea, pum_initiative, pum_initiativebusinessprocess, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_portfolioalignment, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_programstagegate, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_statusreporting, pum_strategicobjectives, pum_tasklink, pum_timeincrement, queue, queueitem, reconciliationentityinfo, reconciliationentitystepinfo, reconciliationinfo, recordfilter, recurringappointmentmaster, recyclebinconfig, relationshipattribute, relationshiprole, relationshiprolemap, report, reportcategory, reportentity, reportlink, reportparameter, reportvisibility, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionoperationdetail, retentionsuccessdetail, revokeinheritedaccessrecordstracker, ribboncommand, ribboncontextgroup, ribboncustomization, ribbondiff, ribbonrule, ribbontabtocommandmap, role, roleeditorlayout, roletemplate, rollupfield, routingrule, routingruleitem, savedquery, savedqueryvisualization, savingrule, sa_suggestedaction, sa_suggestedactioncriteria, sdkmessage, sdkmessagefilter, sdkmessagepair, sdkmessageprocessingstep, sdkmessageprocessingstepimage, sdkmessageprocessingstepsecureconfig, sdkmessagerequest, sdkmessagerequestfield, sdkmessageresponse, sdkmessageresponsefield, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceendpoint, serviceplan, serviceplancustomcontrol, serviceplanmapping, settingdefinition, sharedlinksetting, sharedobject, sharedworkspace, sharedworkspacepool, sharepointdocumentlocation, sharepointmanagedidentity, sharepointsite, sideloadedaiplugin, signalregistration, sitemap, sla, socialactivity, solution, solutioncomponent, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagedentity, stagedentityattribute, stagedmetadataasyncoperation, stagesolutionupload, statusmap, stringmap, subject, subscription, subscriptionmanuallytrackedobject, subscriptionsyncinfo, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuser, systemuserauthorizationchangetracker, systemuserbusinessunitentitymap, tag, taggedflowsession, taggedprocess, task, tdsmetadata, team, teammembership, teammobileofflineprofilemembership, template, territory, theme, timezonedefinition, timezonelocalizedname, timezonerule, traitregistration, transactioncurrency, transformationmapping, transformationparametermapping, unresolvedaddress, unstructuredfilesearchentity, unstructuredfilesearchrecord, userentityuisettings, userfiscalcalendar, userform, usermapping, usermobileofflineprofilemembership, userquery, userqueryvisualization, userrating, viewasexamplequestion, virtualentitymetadata, webresource, webwizard, wizardaccessprivilege, wizardpage, workflow, workflowbinary, workflowdependency, workflowlog, workflowmetadata, workflowwaitsubscription, workqueue, workqueueitem
};

/**
 * Type-safe helper functions for creating UserEntityInstanceData @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const UserEntityInstanceDataBindings = {
    /** Create @odata.bind for objectid -> asyncoperation | bulkdeletefailure | duplicaterecord | kra_request | principalobjectattributeaccess | processsession | pum_assignment | pum_dependency | pum_ganttmarker | pum_ganttsession | pum_gantttask | pum_ganttversion | pum_idea | pum_initiative | pum_initiativebusinessprocess | pum_investmentcategory | pum_keyresults | pum_pf_costplan_version | pum_pf_costspecification | pum_pf_customcolumndata | pum_pf_customrowdata | pum_pf_powerfinancialscomment | pum_pf_powerfinancialsdata | pum_portfolio | pum_powergantttemplate | pum_program | pum_risk | pum_roadmapswimlane | pum_stakeholder | pum_statusreporting | systemuser | team | transactioncurrency */
    objectid: (id: string, entityType: 'asyncoperation' | 'bulkdeletefailure' | 'duplicaterecord' | 'kra_request' | 'principalobjectattributeaccess' | 'processsession' | 'pum_assignment' | 'pum_dependency' | 'pum_ganttmarker' | 'pum_ganttsession' | 'pum_gantttask' | 'pum_ganttversion' | 'pum_idea' | 'pum_initiative' | 'pum_initiativebusinessprocess' | 'pum_investmentcategory' | 'pum_keyresults' | 'pum_pf_costplan_version' | 'pum_pf_costspecification' | 'pum_pf_customcolumndata' | 'pum_pf_customrowdata' | 'pum_pf_powerfinancialscomment' | 'pum_pf_powerfinancialsdata' | 'pum_portfolio' | 'pum_powergantttemplate' | 'pum_program' | 'pum_risk' | 'pum_roadmapswimlane' | 'pum_stakeholder' | 'pum_statusreporting' | 'systemuser' | 'team' | 'transactioncurrency') => {
        const entitySets = {
            'asyncoperation': 'asyncoperations',
            'bulkdeletefailure': 'bulkdeletefailures',
            'duplicaterecord': 'duplicaterecords',
            'kra_request': 'kra_requests',
            'principalobjectattributeaccess': 'principalobjectattributeaccessset',
            'processsession': 'processsessions',
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
        return { 'ObjectId@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
} as const;

export type UserEntityInstanceDataCreate = Partial<UserEntityInstanceData> & Partial<UserEntityInstanceDataBindings> & {
};

export type UserEntityInstanceDataUpdate = Partial<Omit<UserEntityInstanceData, 'userentityinstancedataid'>> & Partial<UserEntityInstanceDataBindings> & {
    userentityinstancedataid: string; // Required for update
};

/**
 * Runtime metadata for User Entity Instance Data
 * Provides entity schema information for API operations
 */
export const UserEntityInstanceDataMeta = {
    logicalName: "userentityinstancedata",
    schemaName: "UserEntityInstanceData",
    displayName: "User Entity Instance Data",
    entitySetName: "userentityinstancedataset",
    isCustomEntity: false,
    description: "Per User item instance data",
    primaryKey: {
        logicalName: "userentityinstancedataid",
        attributeType: "Uniqueidentifier",
        displayName: "UserEntityInstanceDataId"
    },
    lookupAttributes: ["objectid", "owningbusinessunit", "owningteam", "owninguser"],
    requiredAttributes: ["objectid", "objecttypecode", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningteam", "owninguser"],
    expandableProperties: [
        "ObjectId", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
    ],
    relatedEntities: {
        "objectid": {
            relationshipName: "objectid",
            targetEntityLogicalName: "account",
            targetEntitySetName: "accounts",
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
    },
    generated: "2025-08-10T19:04:22.239Z"
} as const;
