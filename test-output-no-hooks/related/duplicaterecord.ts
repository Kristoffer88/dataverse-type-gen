// Required imports
import type { AsyncOperation } from './asyncoperation.js'
import type { AsyncOperationExpand } from './asyncoperation.js'

/**
 * Duplicate Record
 * Potential duplicate record.
 * Entity: duplicaterecord
 * Schema: DuplicateRecord
 * Primary Key: duplicateid
 */
export interface DuplicateRecord {
    /** System Job - Unique identifier of the system job that created this record. */
    asyncoperationid?: string; // Lookup to: asyncoperation
    /** _asyncoperationid_value - Resolved lookup GUID value */
    _asyncoperationid_value?: string; // Lookup value
    /** Base Record ID - Unique identifier of the base record. */
    baserecordid?: string; // Lookup to: account, activityfileattachment, adx_invitation, adx_inviteredemption, aicopilot, aipluginauth, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, applicationuser, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, archivecleanupinfo, archivecleanupoperation, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, businessprocess, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalogassignment, certificatecredential, channelaccessprofile, connectioninstance, connector, contact, conversationtranscript, credential, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, deleteditemreference, desktopflowmodule, email, emailserverprofile, enablearchivalrequest, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgemetadatarefresh, feedback, flowcredentialapplication, flowevent, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, fxexpression, goal, goalrollupquery, governanceconfiguration, kbarticle, keyvaultreference, knowledgearticle, knowledgebaserecord, kra_request, letter, managedidentity, maskingrule, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aievent, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflow_datalakefolder, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeconfiguration, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_virtualtablecolumncandidate, msfp_alert, msfp_alertrule, msfp_fileresponse, msfp_surveyreminder, mspcat_catalogsubmissionfiles, mspcat_packagestore, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, package, packagehistory, phonecall, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagesddosalert, powerpagesmanagedidentity, powerpagesscanreport, privilegesremovalsetting, publisher, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_financialstructure, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_idea, pum_initiative, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_strategicobjectives, pum_tasklink, pum_timeincrement, queue, reconciliationinfo, recordfilter, recurringappointmentmaster, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionsuccessdetail, revokeinheritedaccessrecordstracker, roleeditorlayout, savingrule, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceplan, serviceplancustomcontrol, serviceplanmapping, sharedlinksetting, sharepointdocumentlocation, sharepointsite, socialactivity, socialprofile, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagesolutionupload, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuser, task, tdsmetadata, team, transactioncurrency, unstructuredfilesearchentity, unstructuredfilesearchrecord, userrating, workflowmetadata, workqueue, workqueueitem
    /** _baserecordid_value - Resolved lookup GUID value */
    _baserecordid_value?: string; // Lookup value
    /** CreatedOn - Date and time when the duplicate record was created. */
    createdon: Date | string;
    /** DuplicateId - Unique identifier of the duplicate record. */
    duplicateid: string;
    /** Duplicate Record ID - Unique identifier of the potential duplicate record. */
    duplicaterecordid?: string; // Lookup to: account, activityfileattachment, adx_invitation, adx_inviteredemption, aicopilot, aipluginauth, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, applicationuser, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, archivecleanupinfo, archivecleanupoperation, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, businessprocess, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalogassignment, certificatecredential, channelaccessprofile, connectioninstance, connector, contact, conversationtranscript, credential, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, deleteditemreference, desktopflowmodule, email, emailserverprofile, enablearchivalrequest, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgemetadatarefresh, feedback, flowcredentialapplication, flowevent, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, fxexpression, goal, goalrollupquery, governanceconfiguration, kbarticle, keyvaultreference, knowledgearticle, knowledgebaserecord, kra_request, letter, managedidentity, maskingrule, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aievent, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflow_datalakefolder, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeconfiguration, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_virtualtablecolumncandidate, msfp_alert, msfp_alertrule, msfp_fileresponse, msfp_surveyreminder, mspcat_catalogsubmissionfiles, mspcat_packagestore, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, package, packagehistory, phonecall, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagesddosalert, powerpagesmanagedidentity, powerpagesscanreport, privilegesremovalsetting, publisher, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_financialstructure, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_idea, pum_initiative, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_strategicobjectives, pum_tasklink, pum_timeincrement, queue, reconciliationinfo, recordfilter, recurringappointmentmaster, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionsuccessdetail, revokeinheritedaccessrecordstracker, roleeditorlayout, savingrule, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceplan, serviceplancustomcontrol, serviceplanmapping, sharedlinksetting, sharepointdocumentlocation, sharepointsite, socialactivity, socialprofile, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagesolutionupload, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuser, task, tdsmetadata, team, transactioncurrency, unstructuredfilesearchentity, unstructuredfilesearchrecord, userrating, workflowmetadata, workqueue, workqueueitem
    /** _duplicaterecordid_value - Resolved lookup GUID value */
    _duplicaterecordid_value?: string; // Lookup value
    /** DuplicateRuleId - Unique identifier of the duplicate rule against which this duplicate was found. */
    duplicateruleid?: string; // Lookup to: duplicaterule
    /** _duplicateruleid_value - Resolved lookup GUID value */
    _duplicateruleid_value?: string; // Lookup value
    /** Owner - Unique identifier of the user or team who owns the duplicate record. */
    ownerid?: string; // Lookup to: systemuser, team
    /** Owning Business Unit - Unique identifier of the business unit that owns the duplicate record. */
    owningbusinessunit?: string;
    /** Owning User - Unique identifier of the user who owns the duplicate record. */
    owninguser?: string;
}

/**
 * Type-safe expand properties for Duplicate Record
 * Enables IntelliSense for $expand relationship names
 */
export type DuplicateRecordExpandableProperties =
    "AsyncOperationId"
    | "BaseRecordId"
    | "DuplicateRecordId"
    | "DuplicateRuleId"

/**
 * Type-safe expand options for Duplicate Record
 * Supports both array format and object format with nested options
 */
export type DuplicateRecordExpand =
    | DuplicateRecordExpandableProperties[]
    | {
        "asyncoperationid"?: {
            $select?: (keyof AsyncOperation)[]
            $top?: number
            $skip?: number
            $expand?: AsyncOperationExpand
        }
    }

/**
 * Type-safe expand options for Duplicate Record
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for DuplicateRecord @odata.bind operations
 */
export type DuplicateRecordBindings = {
    'AsyncOperationId@odata.bind'?: string; // Bind to: asyncoperation
    'BaseRecordId@odata.bind'?: string; // Bind to: account, activityfileattachment, adx_invitation, adx_inviteredemption, aicopilot, aipluginauth, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, applicationuser, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, archivecleanupinfo, archivecleanupoperation, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, businessprocess, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalogassignment, certificatecredential, channelaccessprofile, connectioninstance, connector, contact, conversationtranscript, credential, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, deleteditemreference, desktopflowmodule, email, emailserverprofile, enablearchivalrequest, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgemetadatarefresh, feedback, flowcredentialapplication, flowevent, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, fxexpression, goal, goalrollupquery, governanceconfiguration, kbarticle, keyvaultreference, knowledgearticle, knowledgebaserecord, kra_request, letter, managedidentity, maskingrule, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aievent, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflow_datalakefolder, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeconfiguration, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_virtualtablecolumncandidate, msfp_alert, msfp_alertrule, msfp_fileresponse, msfp_surveyreminder, mspcat_catalogsubmissionfiles, mspcat_packagestore, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, package, packagehistory, phonecall, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagesddosalert, powerpagesmanagedidentity, powerpagesscanreport, privilegesremovalsetting, publisher, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_financialstructure, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_idea, pum_initiative, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_strategicobjectives, pum_tasklink, pum_timeincrement, queue, reconciliationinfo, recordfilter, recurringappointmentmaster, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionsuccessdetail, revokeinheritedaccessrecordstracker, roleeditorlayout, savingrule, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceplan, serviceplancustomcontrol, serviceplanmapping, sharedlinksetting, sharepointdocumentlocation, sharepointsite, socialactivity, socialprofile, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagesolutionupload, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuser, task, tdsmetadata, team, transactioncurrency, unstructuredfilesearchentity, unstructuredfilesearchrecord, userrating, workflowmetadata, workqueue, workqueueitem
    'DuplicateRecordId@odata.bind'?: string; // Bind to: account, activityfileattachment, adx_invitation, adx_inviteredemption, aicopilot, aipluginauth, aipluginoperationparameter, aipluginoperationresponsetemplate, aiplugintitle, aipluginusersetting, applicationuser, appointment, approvalprocess, approvalstageapproval, approvalstagecondition, approvalstageintelligent, approvalstageorder, archivecleanupinfo, archivecleanupoperation, bulkarchiveconfig, bulkarchivefailuredetail, bulkarchiveoperation, businessprocess, canvasappextendedmetadata, card, cascadegrantrevokeaccessrecordstracker, cascadegrantrevokeaccessversiontracker, catalogassignment, certificatecredential, channelaccessprofile, connectioninstance, connector, contact, conversationtranscript, credential, datalakefolder, datalakefolderpermission, datalakeworkspace, datalakeworkspacepermission, dataprocessingconfiguration, deleteditemreference, desktopflowmodule, email, emailserverprofile, enablearchivalrequest, entityrecordfilter, environmentvariabledefinition, environmentvariablevalue, exportedexcel, exportsolutionupload, fax, featurecontrolsetting, federatedknowledgecitation, federatedknowledgemetadatarefresh, feedback, flowcredentialapplication, flowevent, flowmachinegroup, flowmachineimage, flowmachineimageversion, flowmachinenetwork, fxexpression, goal, goalrollupquery, governanceconfiguration, kbarticle, keyvaultreference, knowledgearticle, knowledgebaserecord, kra_request, letter, managedidentity, maskingrule, msdyn_aibdataset, msdyn_aibdatasetfile, msdyn_aibdatasetrecord, msdyn_aibdatasetscontainer, msdyn_aibfeedbackloop, msdyn_aibfile, msdyn_aibfileattacheddata, msdyn_aievent, msdyn_aimodelcatalog, msdyn_aiodimage, msdyn_aiodlabel, msdyn_aiodtrainingboundingbox, msdyn_aiodtrainingimage, msdyn_aitestrunbatch, msdyn_analysiscomponent, msdyn_analysisjob, msdyn_analysisoverride, msdyn_analysisresult, msdyn_analysisresultdetail, msdyn_appinsightsmetadata, msdyn_copilotinteractions, msdyn_customcontrolextendedsettings, msdyn_dataflow, msdyn_dataflowconnectionreference, msdyn_dataflowrefreshhistory, msdyn_dataflow_datalakefolder, msdyn_dmsrequest, msdyn_dmsrequeststatus, msdyn_entitylinkchatconfiguration, msdyn_entityrefreshhistory, msdyn_favoriteknowledgearticle, msdyn_federatedarticle, msdyn_federatedarticleincident, msdyn_fileupload, msdyn_flow_actionapprovalmodel, msdyn_flow_approval, msdyn_flow_approvalrequest, msdyn_flow_approvalresponse, msdyn_flow_approvalstep, msdyn_flow_awaitallactionapprovalmodel, msdyn_flow_awaitallapprovalmodel, msdyn_flow_basicapprovalmodel, msdyn_flow_flowapproval, msdyn_formmapping, msdyn_function, msdyn_integratedsearchprovider, msdyn_kalanguagesetting, msdyn_kbattachment, msdyn_kmfederatedsearchconfig, msdyn_knowledgearticleimage, msdyn_knowledgearticletemplate, msdyn_knowledgeconfiguration, msdyn_knowledgeinteractioninsight, msdyn_knowledgemanagementsetting, msdyn_knowledgepersonalfilter, msdyn_knowledgesearchfilter, msdyn_knowledgesearchinsight, msdyn_mobileapp, msdyn_modulerundetail, msdyn_pmanalysishistory, msdyn_pmbusinessruleautomationconfig, msdyn_pmcalendar, msdyn_pmcalendarversion, msdyn_pminferredtask, msdyn_pmprocessextendedmetadataversion, msdyn_pmprocesstemplate, msdyn_pmprocessusersettings, msdyn_pmprocessversion, msdyn_pmrecording, msdyn_pmsimulation, msdyn_pmtemplate, msdyn_pmview, msdyn_qna, msdyn_schedule, msdyn_serviceconfiguration, msdyn_slakpi, msdyn_solutionhealthrule, msdyn_solutionhealthruleargument, msdyn_solutionhealthruleset, msdyn_virtualtablecolumncandidate, msfp_alert, msfp_alertrule, msfp_fileresponse, msfp_surveyreminder, mspcat_catalogsubmissionfiles, mspcat_packagestore, organizationdatasyncfnostate, organizationdatasyncstate, organizationdatasyncsubscription, organizationdatasyncsubscriptionentity, organizationdatasyncsubscriptionfnotable, package, packagehistory, phonecall, powerbidataset, powerbidatasetapdx, powerbimashupparameter, powerbireport, powerbireportapdx, powerfxrule, powerpagesddosalert, powerpagesmanagedidentity, powerpagesscanreport, privilegesremovalsetting, publisher, pum_apikey, pum_assignment, pum_costresource, pum_customcosthierarchy, pum_financialstructure, pum_ganttsession, pum_gantttask, pum_ganttteam, pum_ganttuser, pum_idea, pum_initiative, pum_investmentcategory, pum_keyresults, pum_keyresultstatus, pum_pf_costarea, pum_pf_costcategory, pum_pf_costplan_version, pum_pf_costspecification, pum_pf_costtype, pum_pf_customcolumndata, pum_pf_customrowdata, pum_pf_fiscalperiod, pum_pf_powerfinancialscomment, pum_pf_powerfinancialsdata, pum_pf_unit, pum_portfolio, pum_powerboardconfig, pum_powerfinancialsconfig, pum_powerganttconfig, pum_powergantttemplate, pum_powerheatmapconfig, pum_powermatrixconfig, pum_powermatrixdata, pum_powerroadmapconfig, pum_poweruxconfig, pum_program, pum_rbs, pum_resource, pum_risk, pum_roadmap, pum_roadmapincrements, pum_roadmappresentation, pum_roadmapswimlane, pum_role, pum_stakeholder, pum_strategicobjectives, pum_tasklink, pum_timeincrement, queue, reconciliationinfo, recordfilter, recurringappointmentmaster, reportparameter, retaineddataexcel, retentioncleanupinfo, retentioncleanupoperation, retentionconfig, retentionfailuredetail, retentionoperation, retentionsuccessdetail, revokeinheritedaccessrecordstracker, roleeditorlayout, savingrule, searchattributesettings, searchcustomanalyzer, searchrelationshipsettings, serviceplan, serviceplancustomcontrol, serviceplanmapping, sharedlinksetting, sharepointdocumentlocation, sharepointsite, socialactivity, socialprofile, solutioncomponentattributeconfiguration, solutioncomponentbatchconfiguration, solutioncomponentconfiguration, solutioncomponentrelationshipconfiguration, stagesolutionupload, supportusertable, synapsedatabase, synapselinkexternaltablestate, synapselinkprofile, synapselinkprofileentity, synapselinkprofileentitystate, synapselinkschedule, systemuser, task, tdsmetadata, team, transactioncurrency, unstructuredfilesearchentity, unstructuredfilesearchrecord, userrating, workflowmetadata, workqueue, workqueueitem
    'DuplicateRuleId@odata.bind'?: string; // Bind to: duplicaterule
};

/**
 * Type-safe helper functions for creating DuplicateRecord @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const DuplicateRecordBindings = {
    /** Create @odata.bind for asyncoperationid -> asyncoperation */
    asyncoperationid: (id: string): { 'AsyncOperationId@odata.bind': string } => ({
        'AsyncOperationId@odata.bind': `/asyncoperations(${id})`
    }),
    /** Create @odata.bind for baserecordid -> kra_request | pum_assignment | pum_ganttsession | pum_gantttask | pum_idea | pum_initiative | pum_investmentcategory | pum_keyresults | pum_pf_costplan_version | pum_pf_costspecification | pum_pf_customcolumndata | pum_pf_customrowdata | pum_pf_powerfinancialscomment | pum_pf_powerfinancialsdata | pum_portfolio | pum_powergantttemplate | pum_program | pum_risk | pum_roadmapswimlane | pum_stakeholder | systemuser | team | transactioncurrency */
    baserecordid: (id: string, entityType: 'kra_request' | 'pum_assignment' | 'pum_ganttsession' | 'pum_gantttask' | 'pum_idea' | 'pum_initiative' | 'pum_investmentcategory' | 'pum_keyresults' | 'pum_pf_costplan_version' | 'pum_pf_costspecification' | 'pum_pf_customcolumndata' | 'pum_pf_customrowdata' | 'pum_pf_powerfinancialscomment' | 'pum_pf_powerfinancialsdata' | 'pum_portfolio' | 'pum_powergantttemplate' | 'pum_program' | 'pum_risk' | 'pum_roadmapswimlane' | 'pum_stakeholder' | 'systemuser' | 'team' | 'transactioncurrency') => {
        const entitySets = {
            'kra_request': 'kra_requests',
            'pum_assignment': 'pum_assignments',
            'pum_ganttsession': 'pum_ganttsessions',
            'pum_gantttask': 'pum_gantttasks',
            'pum_idea': 'pum_ideas',
            'pum_initiative': 'pum_initiatives',
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
            'systemuser': 'systemusers',
            'team': 'teams',
            'transactioncurrency': 'transactioncurrencies',
        } as const;
        return { 'BaseRecordId@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
    /** Create @odata.bind for duplicaterecordid -> kra_request | pum_assignment | pum_ganttsession | pum_gantttask | pum_idea | pum_initiative | pum_investmentcategory | pum_keyresults | pum_pf_costplan_version | pum_pf_costspecification | pum_pf_customcolumndata | pum_pf_customrowdata | pum_pf_powerfinancialscomment | pum_pf_powerfinancialsdata | pum_portfolio | pum_powergantttemplate | pum_program | pum_risk | pum_roadmapswimlane | pum_stakeholder | systemuser | team | transactioncurrency */
    duplicaterecordid: (id: string, entityType: 'kra_request' | 'pum_assignment' | 'pum_ganttsession' | 'pum_gantttask' | 'pum_idea' | 'pum_initiative' | 'pum_investmentcategory' | 'pum_keyresults' | 'pum_pf_costplan_version' | 'pum_pf_costspecification' | 'pum_pf_customcolumndata' | 'pum_pf_customrowdata' | 'pum_pf_powerfinancialscomment' | 'pum_pf_powerfinancialsdata' | 'pum_portfolio' | 'pum_powergantttemplate' | 'pum_program' | 'pum_risk' | 'pum_roadmapswimlane' | 'pum_stakeholder' | 'systemuser' | 'team' | 'transactioncurrency') => {
        const entitySets = {
            'kra_request': 'kra_requests',
            'pum_assignment': 'pum_assignments',
            'pum_ganttsession': 'pum_ganttsessions',
            'pum_gantttask': 'pum_gantttasks',
            'pum_idea': 'pum_ideas',
            'pum_initiative': 'pum_initiatives',
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
            'systemuser': 'systemusers',
            'team': 'teams',
            'transactioncurrency': 'transactioncurrencies',
        } as const;
        return { 'DuplicateRecordId@odata.bind': `/${entitySets[entityType]}(${id})` };
    },
} as const;

export type DuplicateRecordCreate = Partial<DuplicateRecord> & Partial<DuplicateRecordBindings> & {
};

export type DuplicateRecordUpdate = Partial<Omit<DuplicateRecord, 'duplicateid'>> & Partial<DuplicateRecordBindings> & {
    duplicateid: string; // Required for update
};

/**
 * Runtime metadata for Duplicate Record
 * Provides entity schema information for API operations
 */
export const DuplicateRecordMeta = {
    logicalName: "duplicaterecord",
    schemaName: "DuplicateRecord",
    displayName: "Duplicate Record",
    entitySetName: "duplicaterecords",
    isCustomEntity: false,
    description: "Potential duplicate record.",
    primaryKey: {
        logicalName: "duplicateid",
        attributeType: "Uniqueidentifier",
        displayName: "DuplicateId"
    },
    lookupAttributes: ["asyncoperationid", "baserecordid", "duplicaterecordid", "duplicateruleid"],
    requiredAttributes: ["createdon", "ownerid", "owneridtype", "owningbusinessunit", "owninguser"],
    expandableProperties: [
        "AsyncOperationId", // Relationship
        "BaseRecordId", // Relationship
        "DuplicateRecordId", // Relationship
        "DuplicateRuleId", // Relationship
    ],
    relatedEntities: {
        "asyncoperationid": {
            relationshipName: "asyncoperationid",
            targetEntityLogicalName: "asyncoperation",
            targetEntitySetName: "asyncoperations",
            relationshipType: "ManyToOne"
        },
        "baserecordid": {
            relationshipName: "baserecordid",
            targetEntityLogicalName: "account",
            targetEntitySetName: "accounts",
            relationshipType: "ManyToOne"
        },
        "duplicaterecordid": {
            relationshipName: "duplicaterecordid",
            targetEntityLogicalName: "account",
            targetEntitySetName: "accounts",
            relationshipType: "ManyToOne"
        },
        "duplicateruleid": {
            relationshipName: "duplicateruleid",
            targetEntityLogicalName: "duplicaterule",
            targetEntitySetName: "duplicaterules",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:21.838Z"
} as const;
