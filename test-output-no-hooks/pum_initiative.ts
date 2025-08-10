// Required imports
import type { PumBackloglevelValue } from './global-choices/pum_backloglevel.js'
import type { PumKpiLookupValue } from './global-choices/pum_kpi_lookup.js'
import type { PumStatusValue } from './global-choices/pum_status.js'
import type { PumTasktoolValue } from './global-choices/pum_tasktool.js'
import type { SystemUser } from './related/systemuser.js'
import type { SystemUserExpand } from './related/systemuser.js'
import type { BusinessUnit } from './related/businessunit.js'
import type { BusinessUnitExpand } from './related/businessunit.js'
import type { Team } from './related/team.js'
import type { TeamExpand } from './related/team.js'
import type { pum_InvestmentCategory } from './related/pum_investmentcategory.js'
import type { pum_InvestmentCategoryExpand } from './related/pum_investmentcategory.js'
import type { pum_PowerGanttTemplate } from './related/pum_powergantttemplate.js'
import type { pum_PowerGanttTemplateExpand } from './related/pum_powergantttemplate.js'
import type { pum_KeyResults } from './related/pum_keyresults.js'
import type { pum_KeyResultsExpand } from './related/pum_keyresults.js'
import type { pum_Idea } from './related/pum_idea.js'
import type { pum_IdeaExpand } from './related/pum_idea.js'
import type { pum_Portfolio } from './related/pum_portfolio.js'
import type { pum_PortfolioExpand } from './related/pum_portfolio.js'
import type { pum_Program } from './related/pum_program.js'
import type { pum_ProgramExpand } from './related/pum_program.js'
import type { TransactionCurrency } from './related/transactioncurrency.js'
import type { TransactionCurrencyExpand } from './related/transactioncurrency.js'
import type { kra_Request } from './related/kra_request.js'
import type { kra_RequestExpand } from './related/kra_request.js'
import type { SyncError } from './related/syncerror.js'
import type { SyncErrorExpand } from './related/syncerror.js'
import type { DuplicateRecord } from './related/duplicaterecord.js'
import type { DuplicateRecordExpand } from './related/duplicaterecord.js'
import type { AsyncOperation } from './related/asyncoperation.js'
import type { AsyncOperationExpand } from './related/asyncoperation.js'
import type { MailboxTrackingFolder } from './related/mailboxtrackingfolder.js'
import type { MailboxTrackingFolderExpand } from './related/mailboxtrackingfolder.js'
import type { UserEntityInstanceData } from './related/userentityinstancedata.js'
import type { UserEntityInstanceDataExpand } from './related/userentityinstancedata.js'
import type { ProcessSession } from './related/processsession.js'
import type { ProcessSessionExpand } from './related/processsession.js'
import type { BulkDeleteFailure } from './related/bulkdeletefailure.js'
import type { BulkDeleteFailureExpand } from './related/bulkdeletefailure.js'
import type { PrincipalObjectAttributeAccess } from './related/principalobjectattributeaccess.js'
import type { PrincipalObjectAttributeAccessExpand } from './related/principalobjectattributeaccess.js'
import type { pum_GanttVersion } from './related/pum_ganttversion.js'
import type { pum_GanttVersionExpand } from './related/pum_ganttversion.js'
import type { pum_initiativebusinessprocess } from './related/pum_initiativebusinessprocess.js'
import type { pum_initiativebusinessprocessExpand } from './related/pum_initiativebusinessprocess.js'
import type { pum_Assignment } from './related/pum_assignment.js'
import type { pum_AssignmentExpand } from './related/pum_assignment.js'
import type { pum_GanttSession } from './related/pum_ganttsession.js'
import type { pum_GanttSessionExpand } from './related/pum_ganttsession.js'
import type { pum_GanttTask } from './related/pum_gantttask.js'
import type { pum_GanttTaskExpand } from './related/pum_gantttask.js'
import type { pum_Risk } from './related/pum_risk.js'
import type { pum_RiskExpand } from './related/pum_risk.js'
import type { pum_Stakeholder } from './related/pum_stakeholder.js'
import type { pum_StakeholderExpand } from './related/pum_stakeholder.js'
import type { pum_pf_costplan_version } from './related/pum_pf_costplan_version.js'
import type { pum_pf_costplan_versionExpand } from './related/pum_pf_costplan_version.js'
import type { pum_pf_costspecification } from './related/pum_pf_costspecification.js'
import type { pum_pf_costspecificationExpand } from './related/pum_pf_costspecification.js'
import type { pum_pf_customcolumndata } from './related/pum_pf_customcolumndata.js'
import type { pum_pf_customcolumndataExpand } from './related/pum_pf_customcolumndata.js'
import type { pum_pf_CustomRowData } from './related/pum_pf_customrowdata.js'
import type { pum_pf_CustomRowDataExpand } from './related/pum_pf_customrowdata.js'
import type { pum_pf_powerfinancialscomment } from './related/pum_pf_powerfinancialscomment.js'
import type { pum_pf_powerfinancialscommentExpand } from './related/pum_pf_powerfinancialscomment.js'
import type { pum_pf_powerfinancialsdata } from './related/pum_pf_powerfinancialsdata.js'
import type { pum_pf_powerfinancialsdataExpand } from './related/pum_pf_powerfinancialsdata.js'
import type { pum_Dependency } from './related/pum_dependency.js'
import type { pum_DependencyExpand } from './related/pum_dependency.js'
import type { pum_StatusReporting } from './related/pum_statusreporting.js'
import type { pum_StatusReportingExpand } from './related/pum_statusreporting.js'
import type { pum_GanttMarker } from './related/pum_ganttmarker.js'
import type { pum_GanttMarkerExpand } from './related/pum_ganttmarker.js'
import type { pum_RoadmapSwimlane } from './related/pum_roadmapswimlane.js'
import type { pum_RoadmapSwimlaneExpand } from './related/pum_roadmapswimlane.js'

/**
 * Status
 * Status of the Initiative
 * LogicalName: pum_initiative_statecode
 * Global: false
 * Custom: true
 */
export const PumInitiativeStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumInitiativeStatecodeValue = (typeof PumInitiativeStatecode)[keyof typeof PumInitiativeStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the Initiative
 * LogicalName: pum_initiative_statuscode
 * Global: false
 * Custom: true
 */
export const PumInitiativeStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumInitiativeStatuscodeValue = (typeof PumInitiativeStatuscode)[keyof typeof PumInitiativeStatuscode]["Value"];


/**
 * Initiative
 * Entity: pum_initiative
 * Schema: pum_Initiative
 * Primary Key: pum_initiativeid
 * Primary Name: pum_name
 */
export interface pum_Initiative {
    /** Kanban Rank2 */
    cr226_kanbanrank2?: number;
    /** Created By - Unique identifier of the user who created the record. */
    createdby?: string; // Lookup to: systemuser
    /** _createdby_value - Resolved lookup GUID value */
    _createdby_value?: string; // Lookup value
    /** Created On - Date and time when the record was created. */
    createdon?: Date | string;
    /** Created By (Delegate) - Unique identifier of the delegate user who created the record. */
    createdonbehalfby?: string; // Lookup to: systemuser
    /** _createdonbehalfby_value - Resolved lookup GUID value */
    _createdonbehalfby_value?: string; // Lookup value
    /** Exchange Rate - Exchange rate for the currency associated with the entity with respect to the base currency. */
    exchangerate?: number;
    /** Import Sequence Number - Sequence number of the import that created this record. */
    importsequencenumber?: number;
    /** Budget */
    kra_budget?: number;
    /** Budget (Base) - Value of the Budget in base currency. */
    kra_budget_base?: number;
    /** Included */
    kra_included?: boolean;
    /** Must run */
    kra_mustrun?: boolean;
    /** Rank */
    kra_rank?: number;
    /** Total Actual Cost V2 */
    kra_totalactualcostv2?: number;
    /** Total Actual Cost V2 (Base) - Value of the Total Actual Cost V2 in base currency. */
    kra_totalactualcostv2_base?: number;
    /** Total Budget V2 */
    kra_totalbudgetv2?: number;
    /** Total Budget V2 (Base) - Value of the Total Budget V2 in base currency. */
    kra_totalbudgetv2_base?: number;
    /** Modified By - Unique identifier of the user who modified the record. */
    modifiedby?: string; // Lookup to: systemuser
    /** _modifiedby_value - Resolved lookup GUID value */
    _modifiedby_value?: string; // Lookup value
    /** Modified On - Date and time when the record was modified. */
    modifiedon?: Date | string;
    /** Modified By (Delegate) - Unique identifier of the delegate user who modified the record. */
    modifiedonbehalfby?: string; // Lookup to: systemuser
    /** _modifiedonbehalfby_value - Resolved lookup GUID value */
    _modifiedonbehalfby_value?: string; // Lookup value
    /** Record Created On - Date and time that the record was migrated. */
    overriddencreatedon?: Date | string;
    /** Owner - Owner Id */
    ownerid: string; // Lookup to: systemuser, team
    /** Owning Business Unit - Unique identifier for the business unit that owns the record */
    owningbusinessunit?: string; // Lookup to: businessunit
    /** _owningbusinessunit_value - Resolved lookup GUID value */
    _owningbusinessunit_value?: string; // Lookup value
    /** Owning Team - Unique identifier for the team that owns the record. */
    owningteam?: string; // Lookup to: team
    /** _owningteam_value - Resolved lookup GUID value */
    _owningteam_value?: string; // Lookup value
    /** Owning User - Unique identifier for the user that owns the record. */
    owninguser?: string; // Lookup to: systemuser
    /** _owninguser_value - Resolved lookup GUID value */
    _owninguser_value?: string; // Lookup value
    /** Process Id - Contains the id of the process associated with the entity. */
    processid?: string;
    /** Agile Project */
    pum_agileproject?: string;
    /** Category */
    pum_category?: string; // Lookup to: pum_investmentcategory
    /** _pum_category_value - Resolved lookup GUID value */
    _pum_category_value?: string; // Lookup value
    /** Create as */
    pum_createasagile?: PumBackloglevelValue; // Option set: pum_backloglevel
    /** Create Team */
    pum_createteam?: boolean;
    /** Stage */
    pum_currentstagetextfield?: string;
    /** Description */
    pum_description?: string;
    /** Expected Benefits */
    pum_expectedbenefits?: number;
    /** Expected Benefits (Base) - Value of the Expected Benefits in base currency. */
    pum_expectedbenefits_base?: number;
    /** Generate Report */
    pum_generatereport?: boolean;
    /** Initiative finish */
    pum_initiativefinish?: Date | string;
    /** Initiative - Unique identifier for entity instances */
    pum_initiativeid: string;
    /** Initiative start */
    pum_initiativestart?: Date | string;
    /** Initiative template */
    pum_initiativetemplate?: string; // Lookup to: pum_powergantttemplate
    /** _pum_initiativetemplate_value - Resolved lookup GUID value */
    _pum_initiativetemplate_value?: string; // Lookup value
    /** Kanban Rank */
    pum_kanbanrank?: number;
    /** Key Results */
    pum_keyresults?: string; // Lookup to: pum_keyresults
    /** _pum_keyresults_value - Resolved lookup GUID value */
    _pum_keyresults_value?: string; // Lookup value
    /** KPI Cost */
    pum_kpicost?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** KPI Quality */
    pum_kpiquality?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** KPI Resources */
    pum_kpiresources?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** KPI Scope */
    pum_kpiscope?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** KPI Summary */
    pum_kpisummary?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** KPI Summary Comment - Latest status report comments from the "KPI Status" tab */
    pum_kpisummarycomment?: string;
    /** Status */
    pum_kpisummaryforviews?: string;
    /** KPI Timeline */
    pum_kpitimeline?: PumKpiLookupValue; // Option set: pum_kpi_lookup
    /** Linked Idea */
    pum_linkedidea?: string; // Lookup to: pum_idea
    /** _pum_linkedidea_value - Resolved lookup GUID value */
    _pum_linkedidea_value?: string; // Lookup value
    /** Name - Required name field */
    pum_name?: string;
    /** OKR? */
    pum_okr?: boolean;
    /** Portfolio */
    pum_portfolio?: string; // Lookup to: pum_portfolio
    /** _pum_portfolio_value - Resolved lookup GUID value */
    _pum_portfolio_value?: string; // Lookup value
    /** Program */
    pum_program?: string; // Lookup to: pum_program
    /** _pum_program_value - Resolved lookup GUID value */
    _pum_program_value?: string; // Lookup value
    /** Progress for roll-up */
    pum_progressforrollup?: number;
    /** Remote link */
    pum_remotelinkagile?: string;
    /** ROI */
    pum_roi?: number;
    /** Schedule Progress */
    pum_scheduleprogress?: number;
    /** Schedule Progress (Last Updated On) - Last Updated time of rollup field Schedule Progress. */
    pum_scheduleprogress_date?: Date | string;
    /** Schedule Progress (State) - State of rollup field Schedule Progress. */
    pum_scheduleprogress_state?: number;
    /** Schedule Progress in % */
    pum_scheduleprogressin?: string;
    /** Scope Qualified */
    pum_scopequalified?: boolean;
    /** SharePoint Site */
    pum_sharepointsite?: string;
    /** Sponsor */
    pum_sponsor?: string; // Lookup to: systemuser
    /** _pum_sponsor_value - Resolved lookup GUID value */
    _pum_sponsor_value?: string; // Lookup value
    /** Stakeholder Analysis */
    pum_stakeholderanalysis?: boolean;
    /** Status */
    pum_status?: PumStatusValue; // Option set: pum_status
    /** Strategic Impact */
    pum_strategicimpact?: number;
    /** Task Tool */
    pum_tasktool?: PumTasktoolValue; // Option set: pum_tasktool
    /** Teams Channel */
    pum_teamschannel?: string;
    /** Total Actual Cost */
    pum_totalactualcost?: number;
    /** Total Actual Cost (Base) - Value of the Total Actual Cost in base currency. */
    pum_totalactualcost_base?: number;
    /** Total Actual Cost (Last Updated On) - Last Updated time of rollup field Total Actual Cost. */
    pum_totalactualcost_date?: Date | string;
    /** Total Actual Cost (State) - State of rollup field Total Actual Cost. */
    pum_totalactualcost_state?: number;
    /** Total Budget */
    pum_totalbudget?: number;
    /** Total Budget (Base) - Value of the Total Budget in base currency. */
    pum_totalbudget_base?: number;
    /** Total Budget (Last Updated On) - Last Updated time of rollup field Total Budget. */
    pum_totalbudget_date?: Date | string;
    /** Total Budget (State) - State of rollup field Total Budget. */
    pum_totalbudget_state?: number;
    /** Total Forecast */
    pum_totalforecast?: number;
    /** Total Forecast (Base) - Value of the Total Forecast in base currency. */
    pum_totalforecast_base?: number;
    /** Total Forecast (Last Updated On) - Last Updated time of rollup field Total Forecast. */
    pum_totalforecast_date?: Date | string;
    /** Total Forecast (State) - State of rollup field Total Forecast. */
    pum_totalforecast_state?: number;
    /** Transfer for execution */
    pum_transferforexecutionagile?: boolean;
    /** (Deprecated) Stage Id - Contains the id of the stage where the entity is located. */
    stageid?: string;
    /** Status - Status of the Initiative */
    statecode: PumInitiativeStatecodeValue; // Option set: pum_initiative_statecode
    /** Status Reason - Reason for the status of the Initiative */
    statuscode?: PumInitiativeStatuscodeValue; // Option set: pum_initiative_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** Currency - Unique identifier of the currency associated with the entity. */
    transactioncurrencyid?: string; // Lookup to: transactioncurrency
    /** _transactioncurrencyid_value - Resolved lookup GUID value */
    _transactioncurrencyid_value?: string; // Lookup value
    /** (Deprecated) Traversed Path - A comma separated list of string values representing the unique identifiers of stages in a Business Process Flow Instance in the order that they occur. */
    traversedpath?: string;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Initiative
 * Enables IntelliSense for $expand relationship names
 */
export type pum_InitiativeExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_Category"
    | "pum_Initiativetemplate"
    | "pum_KeyResults"
    | "pum_LinkedIdea"
    | "pum_Portfolio"
    | "pum_program"
    | "pum_Sponsor"
    | "TransactionCurrencyId"
    | "kra_request_Initiative_pum_initiative"
    | "pum_initiative_SyncErrors"
    | "pum_initiative_DuplicateMatchingRecord"
    | "pum_initiative_DuplicateBaseRecord"
    | "pum_initiative_AsyncOperations"
    | "pum_initiative_MailboxTrackingFolders"
    | "pum_initiative_UserEntityInstanceDatas"
    | "pum_initiative_ProcessSession"
    | "pum_initiative_BulkDeleteFailures"
    | "pum_initiative_PrincipalObjectAttributeAccesses"
    | "kra_pum_ganttversion_Initiative_pum_initiative"
    | "bpf_pum_initiative_pum_initiativebusinessprocess"
    | "pum_Assignment_pum_Initiative_pum_Initiat"
    | "pum_GanttSession_Project_pum_Initiative"
    | "pum_Idea_LinkedInitiative_pum_Initiative"
    | "pum_initiative_pum_gantttasks"
    | "pum_Initiative_pum_Initiative_pum_Risk"
    | "pum_Initiative_pum_Initiative_pum_Stakeho"
    | "pum_pf_costplan_version_pum_pf_initiative"
    | "pum_pf_costspecification_pf_initiative_co"
    | "pum_pf_customcolumndata_pf_initiatve"
    | "pum_pf_CustomRowData_pum_pf_project_custo"
    | "pum_pf_powerfinancialscomment_initiative"
    | "pum_pf_powerfinancialsdata_pum_pf_initiat"
    | "pum_pum_dependency_pum_initiative_pum_From"
    | "pum_pum_dependency_pum_initiative_pum_ToId"
    | "pum_StatusReporting_Initiative_pum_Initia"
    | "kra_pum_ganttmarker_Initiative_pum_initiative"
    | "pum_RoadmapSwimlane_pum_Initiative_pum_In"

/**
 * Type-safe expand options for Initiative
 * Supports both array format and object format with nested options
 */
export type pum_InitiativeExpand =
    | pum_InitiativeExpandableProperties[]
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
        "pum_category"?: {
            $select?: (keyof pum_InvestmentCategory)[]
            $top?: number
            $skip?: number
            $expand?: pum_InvestmentCategoryExpand
        }
        "pum_initiativetemplate"?: {
            $select?: (keyof pum_PowerGanttTemplate)[]
            $top?: number
            $skip?: number
            $expand?: pum_PowerGanttTemplateExpand
        }
        "pum_keyresults"?: {
            $select?: (keyof pum_KeyResults)[]
            $top?: number
            $skip?: number
            $expand?: pum_KeyResultsExpand
        }
        "pum_linkedidea"?: {
            $select?: (keyof pum_Idea)[]
            $top?: number
            $skip?: number
            $expand?: pum_IdeaExpand
        }
        "pum_portfolio"?: {
            $select?: (keyof pum_Portfolio)[]
            $top?: number
            $skip?: number
            $expand?: pum_PortfolioExpand
        }
        "pum_program"?: {
            $select?: (keyof pum_Program)[]
            $top?: number
            $skip?: number
            $expand?: pum_ProgramExpand
        }
        "pum_sponsor"?: {
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
        "kra_request_Initiative_pum_initiative"?: {
            $select?: (keyof kra_Request)[]
            $top?: number
            $skip?: number
            $expand?: kra_RequestExpand
        }
        "pum_initiative_SyncErrors"?: {
            $select?: (keyof SyncError)[]
            $top?: number
            $skip?: number
            $expand?: SyncErrorExpand
        }
        "pum_initiative_DuplicateMatchingRecord"?: {
            $select?: (keyof DuplicateRecord)[]
            $top?: number
            $skip?: number
            $expand?: DuplicateRecordExpand
        }
        "pum_initiative_DuplicateBaseRecord"?: {
            $select?: (keyof DuplicateRecord)[]
            $top?: number
            $skip?: number
            $expand?: DuplicateRecordExpand
        }
        "pum_initiative_AsyncOperations"?: {
            $select?: (keyof AsyncOperation)[]
            $top?: number
            $skip?: number
            $expand?: AsyncOperationExpand
        }
        "pum_initiative_MailboxTrackingFolders"?: {
            $select?: (keyof MailboxTrackingFolder)[]
            $top?: number
            $skip?: number
            $expand?: MailboxTrackingFolderExpand
        }
        "pum_initiative_UserEntityInstanceDatas"?: {
            $select?: (keyof UserEntityInstanceData)[]
            $top?: number
            $skip?: number
            $expand?: UserEntityInstanceDataExpand
        }
        "pum_initiative_ProcessSession"?: {
            $select?: (keyof ProcessSession)[]
            $top?: number
            $skip?: number
            $expand?: ProcessSessionExpand
        }
        "pum_initiative_BulkDeleteFailures"?: {
            $select?: (keyof BulkDeleteFailure)[]
            $top?: number
            $skip?: number
            $expand?: BulkDeleteFailureExpand
        }
        "pum_initiative_PrincipalObjectAttributeAccesses"?: {
            $select?: (keyof PrincipalObjectAttributeAccess)[]
            $top?: number
            $skip?: number
            $expand?: PrincipalObjectAttributeAccessExpand
        }
        "kra_pum_ganttversion_Initiative_pum_initiative"?: {
            $select?: (keyof pum_GanttVersion)[]
            $top?: number
            $skip?: number
            $expand?: pum_GanttVersionExpand
        }
        "bpf_pum_initiative_pum_initiativebusinessprocess"?: {
            $select?: (keyof pum_initiativebusinessprocess)[]
            $top?: number
            $skip?: number
            $expand?: pum_initiativebusinessprocessExpand
        }
        "pum_Assignment_pum_Initiative_pum_Initiat"?: {
            $select?: (keyof pum_Assignment)[]
            $top?: number
            $skip?: number
            $expand?: pum_AssignmentExpand
        }
        "pum_GanttSession_Project_pum_Initiative"?: {
            $select?: (keyof pum_GanttSession)[]
            $top?: number
            $skip?: number
            $expand?: pum_GanttSessionExpand
        }
        "pum_Idea_LinkedInitiative_pum_Initiative"?: {
            $select?: (keyof pum_Idea)[]
            $top?: number
            $skip?: number
            $expand?: pum_IdeaExpand
        }
        "pum_initiative_pum_gantttasks"?: {
            $select?: (keyof pum_GanttTask)[]
            $top?: number
            $skip?: number
            $expand?: pum_GanttTaskExpand
        }
        "pum_Initiative_pum_Initiative_pum_Risk"?: {
            $select?: (keyof pum_Risk)[]
            $top?: number
            $skip?: number
            $expand?: pum_RiskExpand
        }
        "pum_Initiative_pum_Initiative_pum_Stakeho"?: {
            $select?: (keyof pum_Stakeholder)[]
            $top?: number
            $skip?: number
            $expand?: pum_StakeholderExpand
        }
        "pum_pf_costplan_version_pum_pf_initiative"?: {
            $select?: (keyof pum_pf_costplan_version)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_costplan_versionExpand
        }
        "pum_pf_costspecification_pf_initiative_co"?: {
            $select?: (keyof pum_pf_costspecification)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_costspecificationExpand
        }
        "pum_pf_customcolumndata_pf_initiatve"?: {
            $select?: (keyof pum_pf_customcolumndata)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_customcolumndataExpand
        }
        "pum_pf_CustomRowData_pum_pf_project_custo"?: {
            $select?: (keyof pum_pf_CustomRowData)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_CustomRowDataExpand
        }
        "pum_pf_powerfinancialscomment_initiative"?: {
            $select?: (keyof pum_pf_powerfinancialscomment)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_powerfinancialscommentExpand
        }
        "pum_pf_powerfinancialsdata_pum_pf_initiat"?: {
            $select?: (keyof pum_pf_powerfinancialsdata)[]
            $top?: number
            $skip?: number
            $expand?: pum_pf_powerfinancialsdataExpand
        }
        "pum_pum_dependency_pum_initiative_pum_From"?: {
            $select?: (keyof pum_Dependency)[]
            $top?: number
            $skip?: number
            $expand?: pum_DependencyExpand
        }
        "pum_pum_dependency_pum_initiative_pum_ToId"?: {
            $select?: (keyof pum_Dependency)[]
            $top?: number
            $skip?: number
            $expand?: pum_DependencyExpand
        }
        "pum_StatusReporting_Initiative_pum_Initia"?: {
            $select?: (keyof pum_StatusReporting)[]
            $top?: number
            $skip?: number
            $expand?: pum_StatusReportingExpand
        }
        "kra_pum_ganttmarker_Initiative_pum_initiative"?: {
            $select?: (keyof pum_GanttMarker)[]
            $top?: number
            $skip?: number
            $expand?: pum_GanttMarkerExpand
        }
        "pum_RoadmapSwimlane_pum_Initiative_pum_In"?: {
            $select?: (keyof pum_RoadmapSwimlane)[]
            $top?: number
            $skip?: number
            $expand?: pum_RoadmapSwimlaneExpand
        }
    }

/**
 * Type-safe expand options for Initiative
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_Initiative @odata.bind operations
 */
export type pum_InitiativeBindings = {
    'pum_Category@odata.bind'?: string; // Bind to: pum_investmentcategory
    'pum_Initiativetemplate@odata.bind'?: string; // Bind to: pum_powergantttemplate
    'pum_KeyResults@odata.bind'?: string; // Bind to: pum_keyresults
    'pum_LinkedIdea@odata.bind'?: string; // Bind to: pum_idea
    'pum_Portfolio@odata.bind'?: string; // Bind to: pum_portfolio
    'pum_program@odata.bind'?: string; // Bind to: pum_program
    'pum_Sponsor@odata.bind'?: string; // Bind to: systemuser
    'TransactionCurrencyId@odata.bind'?: string; // Bind to: transactioncurrency
};

/**
 * Type-safe helper functions for creating pum_Initiative @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_InitiativeBindings = {
    /** Create @odata.bind for pum_category -> pum_investmentcategory */
    pum_category: (id: string): { 'pum_Category@odata.bind': string } => ({
        'pum_Category@odata.bind': `/pum_investmentcategories(${id})`
    }),
    /** Create @odata.bind for pum_initiativetemplate -> pum_powergantttemplate */
    pum_initiativetemplate: (id: string): { 'pum_Initiativetemplate@odata.bind': string } => ({
        'pum_Initiativetemplate@odata.bind': `/pum_powergantttemplates(${id})`
    }),
    /** Create @odata.bind for pum_keyresults -> pum_keyresults */
    pum_keyresults: (id: string): { 'pum_KeyResults@odata.bind': string } => ({
        'pum_KeyResults@odata.bind': `/pum_keyresultses(${id})`
    }),
    /** Create @odata.bind for pum_linkedidea -> pum_idea */
    pum_linkedidea: (id: string): { 'pum_LinkedIdea@odata.bind': string } => ({
        'pum_LinkedIdea@odata.bind': `/pum_ideas(${id})`
    }),
    /** Create @odata.bind for pum_portfolio -> pum_portfolio */
    pum_portfolio: (id: string): { 'pum_Portfolio@odata.bind': string } => ({
        'pum_Portfolio@odata.bind': `/pum_portfolios(${id})`
    }),
    /** Create @odata.bind for pum_program -> pum_program */
    pum_program: (id: string): { 'pum_program@odata.bind': string } => ({
        'pum_program@odata.bind': `/pum_programs(${id})`
    }),
    /** Create @odata.bind for pum_sponsor -> systemuser */
    pum_sponsor: (id: string): { 'pum_Sponsor@odata.bind': string } => ({
        'pum_Sponsor@odata.bind': `/systemusers(${id})`
    }),
    /** Create @odata.bind for transactioncurrencyid -> transactioncurrency */
    transactioncurrencyid: (id: string): { 'TransactionCurrencyId@odata.bind': string } => ({
        'TransactionCurrencyId@odata.bind': `/transactioncurrencies(${id})`
    }),
} as const;

export type pum_InitiativeCreate = Partial<pum_Initiative> & Partial<pum_InitiativeBindings> & {
    pum_name: string; // Required for create
};

export type pum_InitiativeUpdate = Partial<Omit<pum_Initiative, 'pum_initiativeid'>> & Partial<pum_InitiativeBindings> & {
    pum_initiativeid: string; // Required for update
};

/**
 * Runtime metadata for Initiative
 * Provides entity schema information for API operations
 */
export const pum_InitiativeMeta = {
    logicalName: "pum_initiative",
    schemaName: "pum_Initiative",
    displayName: "Initiative",
    entitySetName: "pum_initiatives",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_initiativeid",
        attributeType: "Uniqueidentifier",
        displayName: "Initiative"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Name",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_category", "pum_initiativetemplate", "pum_keyresults", "pum_linkedidea", "pum_portfolio", "pum_program", "pum_sponsor", "transactioncurrencyid"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_name", "statecode"],
    optionSets: ["pum_backloglevel", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_kpi_lookup", "pum_status", "pum_tasktool", "pum_initiative_statecode", "pum_initiative_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_Category", // Relationship
        "pum_Initiativetemplate", // Relationship
        "pum_KeyResults", // Relationship
        "pum_LinkedIdea", // Relationship
        "pum_Portfolio", // Relationship
        "pum_program", // Lookup field
        "pum_Sponsor", // Relationship
        "TransactionCurrencyId", // Relationship
        "kra_request_Initiative_pum_initiative", // Relationship
        "pum_initiative_SyncErrors", // Relationship
        "pum_initiative_DuplicateMatchingRecord", // Relationship
        "pum_initiative_DuplicateBaseRecord", // Relationship
        "pum_initiative_AsyncOperations", // Relationship
        "pum_initiative_MailboxTrackingFolders", // Relationship
        "pum_initiative_UserEntityInstanceDatas", // Relationship
        "pum_initiative_ProcessSession", // Relationship
        "pum_initiative_BulkDeleteFailures", // Relationship
        "pum_initiative_PrincipalObjectAttributeAccesses", // Relationship
        "kra_pum_ganttversion_Initiative_pum_initiative", // Relationship
        "bpf_pum_initiative_pum_initiativebusinessprocess", // Relationship
        "pum_Assignment_pum_Initiative_pum_Initiat", // Relationship
        "pum_GanttSession_Project_pum_Initiative", // Relationship
        "pum_Idea_LinkedInitiative_pum_Initiative", // Relationship
        "pum_initiative_pum_gantttasks", // Relationship
        "pum_Initiative_pum_Initiative_pum_Risk", // Relationship
        "pum_Initiative_pum_Initiative_pum_Stakeho", // Relationship
        "pum_pf_costplan_version_pum_pf_initiative", // Relationship
        "pum_pf_costspecification_pf_initiative_co", // Relationship
        "pum_pf_customcolumndata_pf_initiatve", // Relationship
        "pum_pf_CustomRowData_pum_pf_project_custo", // Relationship
        "pum_pf_powerfinancialscomment_initiative", // Relationship
        "pum_pf_powerfinancialsdata_pum_pf_initiat", // Relationship
        "pum_pum_dependency_pum_initiative_pum_From", // Relationship
        "pum_pum_dependency_pum_initiative_pum_ToId", // Relationship
        "pum_StatusReporting_Initiative_pum_Initia", // Relationship
        "kra_pum_ganttmarker_Initiative_pum_initiative", // Relationship
        "pum_RoadmapSwimlane_pum_Initiative_pum_In", // Relationship
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
        "pum_category": {
            relationshipName: "pum_category",
            targetEntityLogicalName: "pum_investmentcategory",
            targetEntitySetName: "pum_investmentcategorys",
            relationshipType: "ManyToOne"
        },
        "pum_initiativetemplate": {
            relationshipName: "pum_initiativetemplate",
            targetEntityLogicalName: "pum_powergantttemplate",
            targetEntitySetName: "pum_powergantttemplates",
            relationshipType: "ManyToOne"
        },
        "pum_keyresults": {
            relationshipName: "pum_keyresults",
            targetEntityLogicalName: "pum_keyresults",
            targetEntitySetName: "pum_keyresultss",
            relationshipType: "ManyToOne"
        },
        "pum_linkedidea": {
            relationshipName: "pum_linkedidea",
            targetEntityLogicalName: "pum_idea",
            targetEntitySetName: "pum_ideas",
            relationshipType: "ManyToOne"
        },
        "pum_portfolio": {
            relationshipName: "pum_portfolio",
            targetEntityLogicalName: "pum_portfolio",
            targetEntitySetName: "pum_portfolios",
            relationshipType: "ManyToOne"
        },
        "pum_program": {
            relationshipName: "pum_program",
            targetEntityLogicalName: "pum_program",
            targetEntitySetName: "pum_programs",
            relationshipType: "ManyToOne"
        },
        "pum_sponsor": {
            relationshipName: "pum_sponsor",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
        "transactioncurrencyid": {
            relationshipName: "transactioncurrencyid",
            targetEntityLogicalName: "transactioncurrency",
            targetEntitySetName: "transactioncurrencys",
            relationshipType: "ManyToOne"
        },
        "kra_request_Initiative_pum_initiative": {
            relationshipName: "kra_request_Initiative_pum_initiative",
            targetEntityLogicalName: "kra_request",
            targetEntitySetName: "kra_requests",
            relationshipType: "OneToMany"
        },
        "pum_initiative_SyncErrors": {
            relationshipName: "pum_initiative_SyncErrors",
            targetEntityLogicalName: "syncerror",
            targetEntitySetName: "syncerrors",
            relationshipType: "OneToMany"
        },
        "pum_initiative_DuplicateMatchingRecord": {
            relationshipName: "pum_initiative_DuplicateMatchingRecord",
            targetEntityLogicalName: "duplicaterecord",
            targetEntitySetName: "duplicaterecords",
            relationshipType: "OneToMany"
        },
        "pum_initiative_DuplicateBaseRecord": {
            relationshipName: "pum_initiative_DuplicateBaseRecord",
            targetEntityLogicalName: "duplicaterecord",
            targetEntitySetName: "duplicaterecords",
            relationshipType: "OneToMany"
        },
        "pum_initiative_AsyncOperations": {
            relationshipName: "pum_initiative_AsyncOperations",
            targetEntityLogicalName: "asyncoperation",
            targetEntitySetName: "asyncoperations",
            relationshipType: "OneToMany"
        },
        "pum_initiative_MailboxTrackingFolders": {
            relationshipName: "pum_initiative_MailboxTrackingFolders",
            targetEntityLogicalName: "mailboxtrackingfolder",
            targetEntitySetName: "mailboxtrackingfolders",
            relationshipType: "OneToMany"
        },
        "pum_initiative_UserEntityInstanceDatas": {
            relationshipName: "pum_initiative_UserEntityInstanceDatas",
            targetEntityLogicalName: "userentityinstancedata",
            targetEntitySetName: "userentityinstancedatas",
            relationshipType: "OneToMany"
        },
        "pum_initiative_ProcessSession": {
            relationshipName: "pum_initiative_ProcessSession",
            targetEntityLogicalName: "processsession",
            targetEntitySetName: "processsessions",
            relationshipType: "OneToMany"
        },
        "pum_initiative_BulkDeleteFailures": {
            relationshipName: "pum_initiative_BulkDeleteFailures",
            targetEntityLogicalName: "bulkdeletefailure",
            targetEntitySetName: "bulkdeletefailures",
            relationshipType: "OneToMany"
        },
        "pum_initiative_PrincipalObjectAttributeAccesses": {
            relationshipName: "pum_initiative_PrincipalObjectAttributeAccesses",
            targetEntityLogicalName: "principalobjectattributeaccess",
            targetEntitySetName: "principalobjectattributeaccesss",
            relationshipType: "OneToMany"
        },
        "kra_pum_ganttversion_Initiative_pum_initiative": {
            relationshipName: "kra_pum_ganttversion_Initiative_pum_initiative",
            targetEntityLogicalName: "pum_ganttversion",
            targetEntitySetName: "pum_ganttversions",
            relationshipType: "OneToMany"
        },
        "bpf_pum_initiative_pum_initiativebusinessprocess": {
            relationshipName: "bpf_pum_initiative_pum_initiativebusinessprocess",
            targetEntityLogicalName: "pum_initiativebusinessprocess",
            targetEntitySetName: "pum_initiativebusinessprocesss",
            relationshipType: "OneToMany"
        },
        "pum_Assignment_pum_Initiative_pum_Initiat": {
            relationshipName: "pum_Assignment_pum_Initiative_pum_Initiat",
            targetEntityLogicalName: "pum_assignment",
            targetEntitySetName: "pum_assignments",
            relationshipType: "OneToMany"
        },
        "pum_GanttSession_Project_pum_Initiative": {
            relationshipName: "pum_GanttSession_Project_pum_Initiative",
            targetEntityLogicalName: "pum_ganttsession",
            targetEntitySetName: "pum_ganttsessions",
            relationshipType: "OneToMany"
        },
        "pum_Idea_LinkedInitiative_pum_Initiative": {
            relationshipName: "pum_Idea_LinkedInitiative_pum_Initiative",
            targetEntityLogicalName: "pum_idea",
            targetEntitySetName: "pum_ideas",
            relationshipType: "OneToMany"
        },
        "pum_initiative_pum_gantttasks": {
            relationshipName: "pum_initiative_pum_gantttasks",
            targetEntityLogicalName: "pum_gantttask",
            targetEntitySetName: "pum_gantttasks",
            relationshipType: "OneToMany"
        },
        "pum_Initiative_pum_Initiative_pum_Risk": {
            relationshipName: "pum_Initiative_pum_Initiative_pum_Risk",
            targetEntityLogicalName: "pum_risk",
            targetEntitySetName: "pum_risks",
            relationshipType: "OneToMany"
        },
        "pum_Initiative_pum_Initiative_pum_Stakeho": {
            relationshipName: "pum_Initiative_pum_Initiative_pum_Stakeho",
            targetEntityLogicalName: "pum_stakeholder",
            targetEntitySetName: "pum_stakeholders",
            relationshipType: "OneToMany"
        },
        "pum_pf_costplan_version_pum_pf_initiative": {
            relationshipName: "pum_pf_costplan_version_pum_pf_initiative",
            targetEntityLogicalName: "pum_pf_costplan_version",
            targetEntitySetName: "pum_pf_costplan_versions",
            relationshipType: "OneToMany"
        },
        "pum_pf_costspecification_pf_initiative_co": {
            relationshipName: "pum_pf_costspecification_pf_initiative_co",
            targetEntityLogicalName: "pum_pf_costspecification",
            targetEntitySetName: "pum_pf_costspecifications",
            relationshipType: "OneToMany"
        },
        "pum_pf_customcolumndata_pf_initiatve": {
            relationshipName: "pum_pf_customcolumndata_pf_initiatve",
            targetEntityLogicalName: "pum_pf_customcolumndata",
            targetEntitySetName: "pum_pf_customcolumndatas",
            relationshipType: "OneToMany"
        },
        "pum_pf_CustomRowData_pum_pf_project_custo": {
            relationshipName: "pum_pf_CustomRowData_pum_pf_project_custo",
            targetEntityLogicalName: "pum_pf_customrowdata",
            targetEntitySetName: "pum_pf_customrowdatas",
            relationshipType: "OneToMany"
        },
        "pum_pf_powerfinancialscomment_initiative": {
            relationshipName: "pum_pf_powerfinancialscomment_initiative",
            targetEntityLogicalName: "pum_pf_powerfinancialscomment",
            targetEntitySetName: "pum_pf_powerfinancialscomments",
            relationshipType: "OneToMany"
        },
        "pum_pf_powerfinancialsdata_pum_pf_initiat": {
            relationshipName: "pum_pf_powerfinancialsdata_pum_pf_initiat",
            targetEntityLogicalName: "pum_pf_powerfinancialsdata",
            targetEntitySetName: "pum_pf_powerfinancialsdatas",
            relationshipType: "OneToMany"
        },
        "pum_pum_dependency_pum_initiative_pum_From": {
            relationshipName: "pum_pum_dependency_pum_initiative_pum_From",
            targetEntityLogicalName: "pum_dependency",
            targetEntitySetName: "pum_dependencys",
            relationshipType: "OneToMany"
        },
        "pum_pum_dependency_pum_initiative_pum_ToId": {
            relationshipName: "pum_pum_dependency_pum_initiative_pum_ToId",
            targetEntityLogicalName: "pum_dependency",
            targetEntitySetName: "pum_dependencys",
            relationshipType: "OneToMany"
        },
        "pum_StatusReporting_Initiative_pum_Initia": {
            relationshipName: "pum_StatusReporting_Initiative_pum_Initia",
            targetEntityLogicalName: "pum_statusreporting",
            targetEntitySetName: "pum_statusreportings",
            relationshipType: "OneToMany"
        },
        "kra_pum_ganttmarker_Initiative_pum_initiative": {
            relationshipName: "kra_pum_ganttmarker_Initiative_pum_initiative",
            targetEntityLogicalName: "pum_ganttmarker",
            targetEntitySetName: "pum_ganttmarkers",
            relationshipType: "OneToMany"
        },
        "pum_RoadmapSwimlane_pum_Initiative_pum_In": {
            relationshipName: "pum_RoadmapSwimlane_pum_Initiative_pum_In",
            targetEntityLogicalName: "pum_roadmapswimlane",
            targetEntitySetName: "pum_roadmapswimlanes",
            relationshipType: "ManyToMany"
        },
    },
    generated: "2025-08-10T19:04:21.797Z"
} as const;
