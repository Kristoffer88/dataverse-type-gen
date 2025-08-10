// Generated TypeScript definitions for global option set: pum_backloglevel
// Display Name: Backlog level
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.720Z

/**
 * Backlog level
 * LogicalName: pum_backloglevel
 * Global: true
 * Custom: true
 */
export const PumBackloglevel = {
    Epic: { Value: 493840000, Label: "Epic" },
    Feature: { Value: 493840001, Label: "Feature" },
    Story: { Value: 493840002, Label: "Story" }
} as const;

/** Backlog level option values */
export type PumBackloglevelValue = (typeof PumBackloglevel)[keyof typeof PumBackloglevel]["Value"];
