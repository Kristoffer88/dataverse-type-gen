// Generated TypeScript definitions for global option set: pum_costunitdefinition
// Display Name: Cost Unit definition
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.785Z

/**
 * Cost Unit definition
 * LogicalName: pum_costunitdefinition
 * Global: true
 * Custom: true
 */
export const PumCostunitdefinition = {
    PositiveNumbers: { Value: 493840000, Label: "Positive numbers" },
    NegativeNumbers: { Value: 493840001, Label: "Negative numbers" }
} as const;

/** Cost Unit definition option values */
export type PumCostunitdefinitionValue = (typeof PumCostunitdefinition)[keyof typeof PumCostunitdefinition]["Value"];
