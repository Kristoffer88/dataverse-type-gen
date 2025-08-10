// Generated TypeScript definitions for global option set: pum_taskcategory
// Display Name: Tasks Category
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.782Z

/**
 * Tasks Category
 * LogicalName: pum_taskcategory
 * Global: true
 * Custom: true
 */
export const PumTaskcategory = {
    Tasks: { Value: 493840000, Label: "Tasks" },
    Legal: { Value: 493840001, Label: "Legal" },
    Gate: { Value: 493840002, Label: "Gate" },
    KeyMilestone: { Value: 493840003, Label: "Key Milestone" },
    KeyDeliverable: { Value: 493840004, Label: "Key Deliverable" }
} as const;

/** Tasks Category option values */
export type PumTaskcategoryValue = (typeof PumTaskcategory)[keyof typeof PumTaskcategory]["Value"];
