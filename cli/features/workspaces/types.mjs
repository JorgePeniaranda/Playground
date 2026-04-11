// @ts-check

/**
 * @typedef {import('../../shared/workspaces.mjs').WorkspaceEntry} WorkspaceEntry
 */

/**
 * @typedef {{
 *   workspace: string | undefined,
 *   all: boolean,
 *   help: boolean,
 *   forwardedArgs: string[],
 * }} ParsedArgs
 */

/**
 * @typedef {{ type: 'all' } | { type: 'workspace', workspace: WorkspaceEntry }} WorkspaceSelection
 */

/**
 * @typedef {{ label: string, selection: WorkspaceSelection }} PromptOption
 */

export {};
