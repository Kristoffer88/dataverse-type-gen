// Generated TypeScript definitions for global option set: pum_publishingstate
// Display Name: Publishing State
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.784Z

/**
 * Publishing State
 * LogicalName: pum_publishingstate
 * Global: true
 * Custom: true
 */
export const PumPublishingstate = {
    Draft: { Value: 493840000, Label: "Draft" },
    Publishing: { Value: 493840001, Label: "Publishing" },
    Published: { Value: 493840002, Label: "Published" },
    Failed: { Value: 493840003, Label: "Failed" }
} as const;

/** Publishing State option values */
export type PumPublishingstateValue = (typeof PumPublishingstate)[keyof typeof PumPublishingstate]["Value"];
