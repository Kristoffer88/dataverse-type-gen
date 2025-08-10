// Generated TypeScript definitions for global option set: pum_statuscategory
// Display Name: Status Category
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.792Z

/**
 * Status Category
 * LogicalName: pum_statuscategory
 * Global: true
 * Custom: true
 */
export const PumStatuscategory = {
    BiweeklyStatus: { Value: 493840000, Label: "Bi-Weekly Status" },
    GateDecision: { Value: 493840001, Label: "Gate Decision" }
} as const;

/** Status Category option values */
export type PumStatuscategoryValue = (typeof PumStatuscategory)[keyof typeof PumStatuscategory]["Value"];
