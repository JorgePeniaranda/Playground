// @ts-check

import { readJsonFile } from '../../shared/json.mjs';

/**
 * @typedef {import('../../shared/workspaces.mjs').WorkspaceEntry} WorkspaceEntry
 */

/**
 * Reads the script block from a workspace manifest.
 * @param {WorkspaceEntry} workspace The workspace whose manifest should be inspected.
 * @returns {Promise<Record<string, string>>} The manifest scripts keyed by script name.
 */
export async function readWorkspaceScripts(workspace) {
  const manifest = await readJsonFile(workspace.manifestPath);
  const { scripts } = manifest;

  if (!scripts || typeof scripts !== 'object') {
    return {};
  }

  return /** @type {Record<string, string>} */ (scripts);
}

/**
 * Ensures that every selected workspace defines the requested npm script.
 * @param {string} command The npm script name that must exist.
 * @param {WorkspaceEntry[]} workspaces The workspaces that will receive the command.
 * @returns {Promise<void>}
 */
export async function ensureCommandExists(command, workspaces) {
  const missing = [];

  for (const workspace of workspaces) {
    const scripts = await readWorkspaceScripts(workspace);

    if (!(command in scripts)) {
      missing.push(`${workspace.label} (${workspace.id})`);
    }
  }

  if (missing.length === 0) {
    return;
  }

  const workspaceLabel = missing.length === 1 ? 'workspace' : 'workspaces';
  throw new Error(
    `Command "${command}" is not defined in: ${missing.join(', ')} (${workspaceLabel}).`,
  );
}
