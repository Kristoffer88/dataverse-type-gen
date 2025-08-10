// Generated TypeScript definitions for global option set: pum_constrainttype
// Display Name: Constraint Type 
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.779Z

/**
 * Constraint Type 
 * LogicalName: pum_constrainttype
 * Global: true
 * Custom: true
 */
export const PumConstrainttype = {
    Alap: { Value: 493840000, Label: "ALAP" },
    Asap: { Value: 493840001, Label: "ASAP" },
    Fnet: { Value: 493840002, Label: "FNET" },
    Fnlt: { Value: 493840003, Label: "FNLT" },
    Mfo: { Value: 493840004, Label: "MFO" },
    Mso: { Value: 493840005, Label: "MSO" },
    Snet: { Value: 493840006, Label: "SNET" },
    Snlt: { Value: 493840007, Label: "SNLT" }
} as const;

/** Constraint Type  option values */
export type PumConstrainttypeValue = (typeof PumConstrainttype)[keyof typeof PumConstrainttype]["Value"];
