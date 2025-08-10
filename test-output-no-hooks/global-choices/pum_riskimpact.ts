// Generated TypeScript definitions for global option set: pum_riskimpact
// Display Name: Impact
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.788Z

/**
 * Impact
 * LogicalName: pum_riskimpact
 * Global: true
 * Custom: true
 */
export const PumRiskimpact = {
    _1VeryLow: { Value: 976880000, Label: "1 - Very low" },
    _2Low: { Value: 976880001, Label: "2 - Low" },
    _3Medium: { Value: 976880002, Label: "3 - Medium" },
    _4High: { Value: 976880003, Label: "4 - High" },
    _5Extreme: { Value: 976880004, Label: "5 - Extreme" }
} as const;

/** Impact option values */
export type PumRiskimpactValue = (typeof PumRiskimpact)[keyof typeof PumRiskimpact]["Value"];
