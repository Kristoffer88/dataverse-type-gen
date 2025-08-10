// Generated TypeScript definitions for global option set: pum_status
// Display Name: Status
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.765Z

/**
 * Status
 * LogicalName: pum_status
 * Global: true
 * Custom: true
 */
export const PumStatus = {
    _1Active: { Value: 493840000, Label: "1. Active" },
    _2OnHold: { Value: 493840001, Label: "2. On Hold" },
    _3Cancelled: { Value: 493840002, Label: "3. Cancelled" },
    _4Closed: { Value: 493840003, Label: "4. Closed" }
} as const;

/** Status option values */
export type PumStatusValue = (typeof PumStatus)[keyof typeof PumStatus]["Value"];
