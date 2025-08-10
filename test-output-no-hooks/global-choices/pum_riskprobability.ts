// Generated TypeScript definitions for global option set: pum_riskprobability
// Display Name: Probability
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.787Z

/**
 * Probability
 * LogicalName: pum_riskprobability
 * Global: true
 * Custom: true
 */
export const PumRiskprobability = {
    _0: { Value: 976880000, Label: "0%" },
    _20: { Value: 976880001, Label: "20%" },
    _40: { Value: 976880002, Label: "40%" },
    _60: { Value: 976880003, Label: "60%" },
    _80: { Value: 976880004, Label: "80%" },
    _100: { Value: 976880005, Label: "100%" }
} as const;

/** Probability option values */
export type PumRiskprobabilityValue = (typeof PumRiskprobability)[keyof typeof PumRiskprobability]["Value"];
