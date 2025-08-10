// Generated TypeScript definitions for global option set: pum_rating
// Display Name: Rating
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.770Z

/**
 * Rating
 * LogicalName: pum_rating
 * Global: true
 * Custom: true
 */
export const PumRating = {
    Option1108865039: { Value: 493840000, Label: "⭐️" },
    Option11088650391108865039: { Value: 493840001, Label: "⭐️⭐️" },
    Option110886503911088650391108865039: { Value: 493840002, Label: "⭐️⭐️⭐️" },
    Option10068: { Value: 493840003, Label: "❔" }
} as const;

/** Rating option values */
export type PumRatingValue = (typeof PumRating)[keyof typeof PumRating]["Value"];
