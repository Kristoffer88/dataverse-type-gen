// Generated TypeScript definitions for global option set: pum_measureasa
// Display Name: Result Metric
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.772Z

/**
 * Result Metric
 * LogicalName: pum_measureasa
 * Global: true
 * Custom: true
 */
export const PumMeasureasa = {
    Percentage: { Value: 493840000, Label: "% Percentage" },
    Numerical: { Value: 493840001, Label: "# Numerical" },
    Currency: { Value: 493840002, Label: "Currency" }
} as const;

/** Result Metric option values */
export type PumMeasureasaValue = (typeof PumMeasureasa)[keyof typeof PumMeasureasa]["Value"];
