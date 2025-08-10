// Generated TypeScript definitions for global option set: pum_tasktype
// Display Name: TaskType
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.783Z

/**
 * TaskType
 * LogicalName: pum_tasktype
 * Global: true
 * Custom: true
 */
export const PumTasktype = {
    Task: { Value: 493840000, Label: "task" },
    Project: { Value: 493840001, Label: "project" },
    Milestone: { Value: 493840002, Label: "milestone" },
    Projectsummary: { Value: 493840003, Label: "projectSummary" }
} as const;

/** TaskType option values */
export type PumTasktypeValue = (typeof PumTasktype)[keyof typeof PumTasktype]["Value"];
