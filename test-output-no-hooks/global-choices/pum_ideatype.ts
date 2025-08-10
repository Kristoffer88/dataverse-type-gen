// Generated TypeScript definitions for global option set: pum_ideatype
// Display Name: Type
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.769Z

/**
 * Type
 * LogicalName: pum_ideatype
 * Global: true
 * Custom: true
 */
export const PumIdeatype = {
    Tbd: { Value: 493840000, Label: "TBD" },
    Run: { Value: 493840001, Label: "Run" },
    Grow: { Value: 493840002, Label: "Grow" },
    Transform: { Value: 493840003, Label: "Transform" }
} as const;

/** Type option values */
export type PumIdeatypeValue = (typeof PumIdeatype)[keyof typeof PumIdeatype]["Value"];
