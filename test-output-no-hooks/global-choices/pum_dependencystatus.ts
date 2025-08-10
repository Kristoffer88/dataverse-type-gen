// Generated TypeScript definitions for global option set: pum_dependencystatus
// Display Name: Dependency Status
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.791Z

/**
 * Dependency Status
 * LogicalName: pum_dependencystatus
 * Global: true
 * Custom: true
 */
export const PumDependencystatus = {
    OnTrack: { Value: 100000001, Label: "🟢 On Track" },
    NeedsAttention: { Value: 100000002, Label: "🟡 Needs Attention" },
    DelayedWithMajorIssues: { Value: 100000003, Label: "🔴 Delayed with major issues" },
    Removed: { Value: 100000004, Label: "⚪ Removed" },
    Completed: { Value: 100000005, Label: "✅ Completed" }
} as const;

/** Dependency Status option values */
export type PumDependencystatusValue = (typeof PumDependencystatus)[keyof typeof PumDependencystatus]["Value"];
