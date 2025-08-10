// Generated TypeScript definitions for global option set: pum_kpi_lookup
// Display Name: KPI Lookup
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.762Z

/**
 * KPI Lookup
 * LogicalName: pum_kpi_lookup
 * Global: true
 * Custom: true
 */
export const PumKpiLookup = {
    NotSet: { Value: 493840000, Label: "⚪ Not Set" },
    NeedHelp: { Value: 493840001, Label: "🔴 Need help" },
    AtRisk: { Value: 493840002, Label: "🟡 At risk" },
    NoIssue: { Value: 493840003, Label: "🟢 No issue" }
} as const;

/** KPI Lookup option values */
export type PumKpiLookupValue = (typeof PumKpiLookup)[keyof typeof PumKpiLookup]["Value"];
