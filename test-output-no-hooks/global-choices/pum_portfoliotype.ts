// Generated TypeScript definitions for global option set: pum_portfoliotype
// Display Name: Portfolio Type
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.777Z

/**
 * Portfolio Type
 * LogicalName: pum_portfoliotype
 * Global: true
 * Custom: true
 */
export const PumPortfoliotype = {
    Run: { Value: 493840000, Label: "Run" },
    Grow: { Value: 493840001, Label: "Grow" },
    Transform: { Value: 493840002, Label: "Transform" }
} as const;

/** Portfolio Type option values */
export type PumPortfoliotypeValue = (typeof PumPortfoliotype)[keyof typeof PumPortfoliotype]["Value"];
