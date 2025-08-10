// Generated TypeScript definitions for global option set: pum_tasktool
// Display Name: Task Tool
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.767Z

/**
 * Task Tool
 * LogicalName: pum_tasktool
 * Global: true
 * Custom: true
 */
export const PumTasktool = {
    Gantt: { Value: 493840000, Label: "Gantt" },
    MsProject: { Value: 493840001, Label: "Ms Project" },
    ProjectForTheWeb: { Value: 493840002, Label: "Project For The Web" },
    Jira: { Value: 493840003, Label: "Jira" },
    AzureDevops: { Value: 493840004, Label: "Azure DevOps" }
} as const;

/** Task Tool option values */
export type PumTasktoolValue = (typeof PumTasktool)[keyof typeof PumTasktool]["Value"];
