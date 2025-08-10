// Generated TypeScript definitions for global option set: pum_stakeholder_choices
// Display Name: Stakeholder Choices
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.790Z

/**
 * Stakeholder Choices
 * LogicalName: pum_stakeholder_choices
 * Global: true
 * Custom: true
 */
export const PumStakeholderChoices = {
    _0NotSet: { Value: 493840000, Label: "0 - Not Set" },
    _1Low: { Value: 493840001, Label: "1 - Low" },
    _2Medium: { Value: 493840002, Label: "2 - Medium" },
    _3High: { Value: 493840003, Label: "3 - High" }
} as const;

/** Stakeholder Choices option values */
export type PumStakeholderChoicesValue = (typeof PumStakeholderChoices)[keyof typeof PumStakeholderChoices]["Value"];
