// Generated TypeScript definitions for global option set: pum_newstatus
// Display Name: New Status
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.773Z

/**
 * New Status
 * LogicalName: pum_newstatus
 * Global: true
 * Custom: true
 */
export const PumNewstatus = {
    OnTrack: { Value: 493840000, Label: "🟢 On Track" },
    NeedsAttention: { Value: 493840001, Label: "🟡 Needs Attention" },
    OffTrack: { Value: 493840002, Label: "🔴 Off Track" }
} as const;

/** New Status option values */
export type PumNewstatusValue = (typeof PumNewstatus)[keyof typeof PumNewstatus]["Value"];
