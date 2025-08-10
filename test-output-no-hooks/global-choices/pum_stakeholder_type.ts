// Generated TypeScript definitions for global option set: pum_stakeholder_type
// Display Name: Stakeholder Type
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.790Z

/**
 * Stakeholder Type
 * LogicalName: pum_stakeholder_type
 * Global: true
 * Custom: true
 */
export const PumStakeholderType = {
    Internal: { Value: 493840000, Label: "Internal" },
    External: { Value: 493840001, Label: "External" }
} as const;

/** Stakeholder Type option values */
export type PumStakeholderTypeValue = (typeof PumStakeholderType)[keyof typeof PumStakeholderType]["Value"];
