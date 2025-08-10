// Generated TypeScript definitions for global option set: pum_risklevel
// Display Name: Level
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.789Z

/**
 * Level
 * LogicalName: pum_risklevel
 * Global: true
 * Custom: true
 */
export const PumRisklevel = {
    Initiative: { Value: 493840000, Label: "Initiative" },
    Program: { Value: 493840001, Label: "Program" },
    Portfolio: { Value: 493840002, Label: "Portfolio" }
} as const;

/** Level option values */
export type PumRisklevelValue = (typeof PumRisklevel)[keyof typeof PumRisklevel]["Value"];
