// Required imports
import type { PumConstrainttypeValue } from '../global-choices/pum_constrainttype.js'
import type { PumCriticalTaskValue } from '../global-choices/pum_critical_task.js'
import type { PumTaskcategoryValue } from '../global-choices/pum_taskcategory.js'
import type { PumTasktypeValue } from '../global-choices/pum_tasktype.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserExpand } from './systemuser.js'
import type { BusinessUnit } from './businessunit.js'
import type { BusinessUnitExpand } from './businessunit.js'
import type { Team } from './team.js'
import type { TeamExpand } from './team.js'
import type { pum_GanttVersion } from './pum_ganttversion.js'
import type { pum_GanttVersionExpand } from './pum_ganttversion.js'
import type { pum_Initiative } from '../pum_initiative.js'
import type { pum_InitiativeExpand } from '../pum_initiative.js'
import type { pum_Portfolio } from './pum_portfolio.js'
import type { pum_PortfolioExpand } from './pum_portfolio.js'
import type { pum_PowerGanttTemplate } from './pum_powergantttemplate.js'
import type { pum_PowerGanttTemplateExpand } from './pum_powergantttemplate.js'
import type { pum_Program } from './pum_program.js'
import type { pum_ProgramExpand } from './pum_program.js'

/**
 * Status
 * Status of the GanttTask
 * LogicalName: pum_gantttask_statecode
 * Global: false
 * Custom: true
 */
export const PumGantttaskStatecode = {
    Active: { Value: 0, Label: "Active" },
    Inactive: { Value: 1, Label: "Inactive" }
} as const;

/** Status option values */
export type PumGantttaskStatecodeValue = (typeof PumGantttaskStatecode)[keyof typeof PumGantttaskStatecode]["Value"];

/**
 * Status Reason
 * Reason for the status of the GanttTask
 * LogicalName: pum_gantttask_statuscode
 * Global: false
 * Custom: true
 */
export const PumGantttaskStatuscode = {
    Active: { Value: 1, Label: "Active" },
    Inactive: { Value: 2, Label: "Inactive" }
} as const;

/** Status Reason option values */
export type PumGantttaskStatuscodeValue = (typeof PumGantttaskStatuscode)[keyof typeof PumGantttaskStatuscode]["Value"];


/**
 * Gantt Task
 * Entity: pum_gantttask
 * Schema: pum_GanttTask
 * Primary Key: pum_gantttaskid
 * Primary Name: pum_name
 */
export interface pum_GanttTask {
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
    /** Import Sequence Number - Sequence number of the import that created this record. */
    importsequencenumber?: number;
    /** Calc1 */
    kra_calc1?: number;
    /** Calc2 */
    kra_calc2?: number;
    /** Calc result */
    kra_calcresult?: number;
    /** DateTest */
    kra_datetest?: Date | string;
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
    /** Actual decimal */
    pum_actual_dec?: number;
    /** Actual Finish */
    pum_actualfinish?: Date | string;
    /** Actual Start */
    pum_actualstart?: Date | string;
    /** Act Work */
    pum_actworktask?: number;
    /** Baseline 1 Description */
    pum_baseline1description?: string;
    /** Baseline 1 Duration */
    pum_baseline1duration?: number;
    /** Baseline 1 Finish */
    pum_baseline1finish?: Date | string;
    /** Baseline 1 Name */
    pum_baseline1name?: string;
    /** Baseline 1 Start */
    pum_baseline1start?: Date | string;
    /** Baseline 2 Description */
    pum_baseline2description?: string;
    /** Baseline 2 Duration */
    pum_baseline2duration?: number;
    /** Baseline 2 Finish */
    pum_baseline2finish?: Date | string;
    /** Baseline 2 Name */
    pum_baseline2name?: string;
    /** Baseline 2 Start */
    pum_baseline2start?: Date | string;
    /** Baseline 3 Description */
    pum_baseline3description?: string;
    /** Baseline 3 Duration */
    pum_baseline3duration?: number;
    /** Baseline 3 Finish */
    pum_baseline3finish?: Date | string;
    /** Baseline 3 Name */
    pum_baseline3name?: string;
    /** Baseline 3 Start */
    pum_baseline3start?: Date | string;
    /** Baseline 4 Description */
    pum_baseline4description?: string;
    /** Baseline 4 Duration */
    pum_baseline4duration?: number;
    /** Baseline 4 Finish */
    pum_baseline4finish?: Date | string;
    /** Baseline 4 Name */
    pum_baseline4name?: string;
    /** Baseline 4 Start */
    pum_baseline4start?: Date | string;
    /** Baseline 5 Description */
    pum_baseline5description?: string;
    /** Baseline 5 Duration */
    pum_baseline5duration?: number;
    /** Baseline 5 Finish */
    pum_baseline5finish?: Date | string;
    /** Baseline 5 Name */
    pum_baseline5name?: string;
    /** Baseline 5 Start */
    pum_baseline5start?: Date | string;
    /** Constraint Date */
    pum_constraintdate?: Date | string;
    /** Constraint Type  */
    pum_constrainttype?: PumConstrainttypeValue; // Option set: pum_constrainttype
    /** Critical */
    pum_critical_manual?: PumCriticalTaskValue; // Option set: pum_critical_task
    /** Deadline */
    pum_deadline?: Date | string;
    /** DependsAfter */
    pum_dependsafter?: string;
    /** Duration */
    pum_duration?: number;
    /** elapsedDuration */
    pum_elapsedduration?: boolean;
    /** Enable Split */
    pum_enablesplit?: boolean;
    /** EndDate */
    pum_enddate?: Date | string;
    /** GanttTask - Unique identifier for entity instances */
    pum_gantttaskid: string;
    /** GanttTemplateFlow */
    pum_gantttemplateflow?: boolean;
    /** Gantt Version */
    pum_ganttversion?: string; // Lookup to: pum_ganttversion
    /** _pum_ganttversion_value - Resolved lookup GUID value */
    _pum_ganttversion_value?: string; // Lookup value
    /** Hidden Actual Work */
    pum_hiddenactualwork?: number;
    /** Ignore Task Sequence */
    pum_ignoretasksequence?: boolean;
    /** Initiative */
    pum_initiative?: string; // Lookup to: pum_initiative
    /** _pum_initiative_value - Resolved lookup GUID value */
    _pum_initiative_value?: string; // Lookup value
    /** Last Published Version */
    pum_lastpublishedversion?: string;
    /** Task - Required name field */
    pum_name?: string;
    /** ParentTaskId */
    pum_parenttaskid?: string;
    /** Percent Complete */
    pum_percentcomplete?: number;
    /** Portfolio */
    pum_portfolio?: string; // Lookup to: pum_portfolio
    /** _pum_portfolio_value - Resolved lookup GUID value */
    _pum_portfolio_value?: string; // Lookup value
    /** PowerGanttTemplate */
    pum_powergantttemplate_id?: string; // Lookup to: pum_powergantttemplate
    /** _pum_powergantttemplate_id_value - Resolved lookup GUID value */
    _pum_powergantttemplate_id_value?: string; // Lookup value
    /** Program */
    pum_program?: string; // Lookup to: pum_program
    /** _pum_program_value - Resolved lookup GUID value */
    _pum_program_value?: string; // Lookup value
    /** Remaining work decimal */
    pum_remaining_work_dec?: number;
    /** Remaining Work */
    pum_remainingwork?: number;
    /** Sort Order */
    pum_sortorder?: string;
    /** StartDate */
    pum_startdate?: Date | string;
    /** User */
    pum_systemuser?: string; // Lookup to: systemuser
    /** _pum_systemuser_value - Resolved lookup GUID value */
    _pum_systemuser_value?: string; // Lookup value
    /** Task Category */
    pum_taskcategory?: PumTaskcategoryValue; // Option set: pum_taskcategory
    /** TaskFormatting */
    pum_taskformatting?: string;
    /** TaskIndex */
    pum_taskindex?: string;
    /** Task Sequence */
    pum_tasksequence?: number;
    /** Task Sorting (Program) */
    pum_tasksortingprogram?: number;
    /** TaskType */
    pum_tasktype?: PumTasktypeValue; // Option set: pum_tasktype
    /** WBS */
    pum_wbs?: string;
    /** Work */
    pum_work?: number;
    /** Work decimal */
    pum_work_dec?: number;
    /** Status - Status of the GanttTask */
    statecode: PumGantttaskStatecodeValue; // Option set: pum_gantttask_statecode
    /** Status Reason - Reason for the status of the GanttTask */
    statuscode?: PumGantttaskStatuscodeValue; // Option set: pum_gantttask_statuscode
    /** Time Zone Rule Version Number - For internal use only. */
    timezoneruleversionnumber?: number;
    /** UTC Conversion Time Zone Code - Time zone code that was in use when the record was created. */
    utcconversiontimezonecode?: number;
    /** Version Number */
    versionnumber?: number;
}

/**
 * Type-safe expand properties for Gantt Task
 * Enables IntelliSense for $expand relationship names
 */
export type pum_GanttTaskExpandableProperties =
    "CreatedBy"
    | "CreatedOnBehalfBy"
    | "ModifiedBy"
    | "ModifiedOnBehalfBy"
    | "OwningBusinessUnit"
    | "OwningTeam"
    | "OwningUser"
    | "pum_GanttVersion"
    | "pum_initiative"
    | "pum_portfolio"
    | "pum_powergantttemplate_id"
    | "pum_program"
    | "pum_SystemUser"

/**
 * Type-safe expand options for Gantt Task
 * Supports both array format and object format with nested options
 */
export type pum_GanttTaskExpand =
    | pum_GanttTaskExpandableProperties[]
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
        "pum_ganttversion"?: {
            $select?: (keyof pum_GanttVersion)[]
            $top?: number
            $skip?: number
            $expand?: pum_GanttVersionExpand
        }
        "pum_initiative"?: {
            $select?: (keyof pum_Initiative)[]
            $top?: number
            $skip?: number
            $expand?: pum_InitiativeExpand
        }
        "pum_portfolio"?: {
            $select?: (keyof pum_Portfolio)[]
            $top?: number
            $skip?: number
            $expand?: pum_PortfolioExpand
        }
        "pum_powergantttemplate_id"?: {
            $select?: (keyof pum_PowerGanttTemplate)[]
            $top?: number
            $skip?: number
            $expand?: pum_PowerGanttTemplateExpand
        }
        "pum_program"?: {
            $select?: (keyof pum_Program)[]
            $top?: number
            $skip?: number
            $expand?: pum_ProgramExpand
        }
        "pum_systemuser"?: {
            $select?: (keyof SystemUser)[]
            $top?: number
            $skip?: number
            $expand?: SystemUserExpand
        }
    }

/**
 * Type-safe expand options for Gantt Task
 * Use string array format: ["relationship1", "relationship2"]
 * Or object format with type safety: { "relationship": { $select: [...] } }
 */

/**
 * Binding types for pum_GanttTask @odata.bind operations
 */
export type pum_GanttTaskBindings = {
    'pum_GanttVersion@odata.bind'?: string; // Bind to: pum_ganttversion
    'pum_initiative@odata.bind'?: string; // Bind to: pum_initiative
    'pum_portfolio@odata.bind'?: string; // Bind to: pum_portfolio
    'pum_powergantttemplate_id@odata.bind'?: string; // Bind to: pum_powergantttemplate
    'pum_program@odata.bind'?: string; // Bind to: pum_program
    'pum_SystemUser@odata.bind'?: string; // Bind to: systemuser
};

/**
 * Type-safe helper functions for creating pum_GanttTask @odata.bind relationships
 * Each function returns the correct entity set path for the target entity
 */
export const pum_GanttTaskBindings = {
    /** Create @odata.bind for pum_ganttversion -> pum_ganttversion */
    pum_ganttversion: (id: string): { 'pum_GanttVersion@odata.bind': string } => ({
        'pum_GanttVersion@odata.bind': `/pum_ganttversions(${id})`
    }),
    /** Create @odata.bind for pum_initiative -> pum_initiative */
    pum_initiative: (id: string): { 'pum_initiative@odata.bind': string } => ({
        'pum_initiative@odata.bind': `/pum_initiatives(${id})`
    }),
    /** Create @odata.bind for pum_portfolio -> pum_portfolio */
    pum_portfolio: (id: string): { 'pum_portfolio@odata.bind': string } => ({
        'pum_portfolio@odata.bind': `/pum_portfolios(${id})`
    }),
    /** Create @odata.bind for pum_powergantttemplate_id -> pum_powergantttemplate */
    pum_powergantttemplate_id: (id: string): { 'pum_powergantttemplate_id@odata.bind': string } => ({
        'pum_powergantttemplate_id@odata.bind': `/pum_powergantttemplates(${id})`
    }),
    /** Create @odata.bind for pum_program -> pum_program */
    pum_program: (id: string): { 'pum_program@odata.bind': string } => ({
        'pum_program@odata.bind': `/pum_programs(${id})`
    }),
    /** Create @odata.bind for pum_systemuser -> systemuser */
    pum_systemuser: (id: string): { 'pum_SystemUser@odata.bind': string } => ({
        'pum_SystemUser@odata.bind': `/systemusers(${id})`
    }),
} as const;

export type pum_GanttTaskCreate = Partial<pum_GanttTask> & Partial<pum_GanttTaskBindings> & {
    pum_name: string; // Required for create
};

export type pum_GanttTaskUpdate = Partial<Omit<pum_GanttTask, 'pum_gantttaskid'>> & Partial<pum_GanttTaskBindings> & {
    pum_gantttaskid: string; // Required for update
};

/**
 * Runtime metadata for Gantt Task
 * Provides entity schema information for API operations
 */
export const pum_GanttTaskMeta = {
    logicalName: "pum_gantttask",
    schemaName: "pum_GanttTask",
    displayName: "Gantt Task",
    entitySetName: "pum_gantttasks",
    isCustomEntity: true,
    primaryKey: {
        logicalName: "pum_gantttaskid",
        attributeType: "Uniqueidentifier",
        displayName: "GanttTask"
    },
    primaryName: {
        logicalName: "pum_name",
        attributeType: "String",
        displayName: "Task",
    },
    lookupAttributes: ["createdby", "createdonbehalfby", "modifiedby", "modifiedonbehalfby", "owningbusinessunit", "owningteam", "owninguser", "pum_ganttversion", "pum_initiative", "pum_portfolio", "pum_powergantttemplate_id", "pum_program", "pum_systemuser"],
    requiredAttributes: ["createdbyyominame", "createdonbehalfbyyominame", "modifiedbyyominame", "modifiedonbehalfbyyominame", "ownerid", "owneridname", "owneridtype", "owneridyominame", "owningbusinessunitname", "pum_name", "statecode"],
    optionSets: ["pum_constrainttype", "pum_critical_task", "pum_taskcategory", "pum_tasktype", "pum_gantttask_statecode", "pum_gantttask_statuscode"],
    expandableProperties: [
        "CreatedBy", // Relationship
        "CreatedOnBehalfBy", // Relationship
        "ModifiedBy", // Relationship
        "ModifiedOnBehalfBy", // Relationship
        "OwningBusinessUnit", // Relationship
        "OwningTeam", // Relationship
        "OwningUser", // Relationship
        "pum_GanttVersion", // Relationship
        "pum_initiative", // Lookup field
        "pum_portfolio", // Lookup field
        "pum_powergantttemplate_id", // Lookup field
        "pum_program", // Lookup field
        "pum_SystemUser", // Relationship
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
        "pum_ganttversion": {
            relationshipName: "pum_ganttversion",
            targetEntityLogicalName: "pum_ganttversion",
            targetEntitySetName: "pum_ganttversions",
            relationshipType: "ManyToOne"
        },
        "pum_initiative": {
            relationshipName: "pum_initiative",
            targetEntityLogicalName: "pum_initiative",
            targetEntitySetName: "pum_initiatives",
            relationshipType: "ManyToOne"
        },
        "pum_portfolio": {
            relationshipName: "pum_portfolio",
            targetEntityLogicalName: "pum_portfolio",
            targetEntitySetName: "pum_portfolios",
            relationshipType: "ManyToOne"
        },
        "pum_powergantttemplate_id": {
            relationshipName: "pum_powergantttemplate_id",
            targetEntityLogicalName: "pum_powergantttemplate",
            targetEntitySetName: "pum_powergantttemplates",
            relationshipType: "ManyToOne"
        },
        "pum_program": {
            relationshipName: "pum_program",
            targetEntityLogicalName: "pum_program",
            targetEntitySetName: "pum_programs",
            relationshipType: "ManyToOne"
        },
        "pum_systemuser": {
            relationshipName: "pum_systemuser",
            targetEntityLogicalName: "systemuser",
            targetEntitySetName: "systemusers",
            relationshipType: "ManyToOne"
        },
    },
    generated: "2025-08-10T19:04:22.108Z"
} as const;
