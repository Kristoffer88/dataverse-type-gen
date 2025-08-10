// Generated TypeScript definitions for global option set: pum_riskstatus
// Display Name: Risk Status
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.788Z

/**
 * Risk Status
 * LogicalName: pum_riskstatus
 * Global: true
 * Custom: true
 */
export const PumRiskstatus = {
    Identified: { Value: 493840000, Label: "🔍 Identified" },
    Active: { Value: 493840001, Label: "🅰️ Active" },
    Mitigated: { Value: 493840002, Label: "🟩 Mitigated" },
    Resolved: { Value: 493840003, Label: "✔️ Resolved" },
    Issue: { Value: 436130000, Label: "⚠️ Issue" }
} as const;

/** Risk Status option values */
export type PumRiskstatusValue = (typeof PumRiskstatus)[keyof typeof PumRiskstatus]["Value"];
