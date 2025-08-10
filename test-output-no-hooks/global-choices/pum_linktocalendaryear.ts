// Generated TypeScript definitions for global option set: pum_linktocalendaryear
// Display Name: Link to Calendar Year
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.774Z

/**
 * Link to Calendar Year
 * LogicalName: pum_linktocalendaryear
 * Global: true
 * Custom: true
 */
export const PumLinktocalendaryear = {
    _2021: { Value: 493840000, Label: "2021" },
    _2022: { Value: 493840001, Label: "2022" },
    _2023: { Value: 493840002, Label: "2023" },
    _2024: { Value: 493840003, Label: "2024" },
    _2025: { Value: 493840004, Label: "2025" }
} as const;

/** Link to Calendar Year option values */
export type PumLinktocalendaryearValue = (typeof PumLinktocalendaryear)[keyof typeof PumLinktocalendaryear]["Value"];
