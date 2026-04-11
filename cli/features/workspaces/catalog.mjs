// @ts-check

import { readJsonFile } from '../../shared/json.mjs';

/**
 * @typedef {import('../../shared/workspaces.mjs').WorkspaceEntry} WorkspaceEntry
 */

/**
 * @param {WorkspaceEntry} workspace
 * @returns {Promise<Record<string, string>>}
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
 * @param {string} command
 * @param {WorkspaceEntry[]} workspaces
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
