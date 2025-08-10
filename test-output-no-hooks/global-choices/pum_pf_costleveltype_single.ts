// Generated TypeScript definitions for global option set: pum_pf_costleveltype_single
// Display Name: Cost Level Type
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.786Z

/**
 * Cost Level Type
 * LogicalName: pum_pf_costleveltype_single
 * Global: true
 * Custom: true
 */
export const PumPfCostleveltypeSingle = {
    _1: { Value: 493840000, Label: "1" },
    _2: { Value: 493840001, Label: "2" },
    _3: { Value: 493840002, Label: "3" },
    _4: { Value: 493840003, Label: "4" },
    _5: { Value: 493840004, Label: "5" },
    _6: { Value: 493840005, Label: "6" }
} as const;

/** Cost Level Type option values */
export type PumPfCostleveltypeSingleValue = (typeof PumPfCostleveltypeSingle)[keyof typeof PumPfCostleveltypeSingle]["Value"];
