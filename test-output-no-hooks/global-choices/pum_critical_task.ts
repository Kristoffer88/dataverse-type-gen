// Generated TypeScript definitions for global option set: pum_critical_task
// Display Name: Critical
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.782Z

/**
 * Critical
 * LogicalName: pum_critical_task
 * Global: true
 * Custom: true
 */
export const PumCriticalTask = {
    Yes: { Value: 493840000, Label: "Yes" }
} as const;

/** Critical option values */
export type PumCriticalTaskValue = (typeof PumCriticalTask)[keyof typeof PumCriticalTask]["Value"];
