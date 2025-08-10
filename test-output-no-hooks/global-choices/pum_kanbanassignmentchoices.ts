// Generated TypeScript definitions for global option set: pum_kanbanassignmentchoices
// Display Name: Kanban Assignment Choices
// Global: true
// Custom: true
// Generated: 2025-08-10T19:04:21.778Z

/**
 * Kanban Assignment Choices
 * LogicalName: pum_kanbanassignmentchoices
 * Global: true
 * Custom: true
 */
export const PumKanbanassignmentchoices = {
    _1ToDo: { Value: 493840000, Label: "1. To Do" },
    _2InProgress: { Value: 493840001, Label: "2. In Progress" },
    _3Done: { Value: 493840002, Label: "3. Done" }
} as const;

/** Kanban Assignment Choices option values */
export type PumKanbanassignmentchoicesValue = (typeof PumKanbanassignmentchoices)[keyof typeof PumKanbanassignmentchoices]["Value"];
