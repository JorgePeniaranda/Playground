// @ts-check

import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { repositoryRoot } from './constants.mjs';
import { readJsonFile } from './json.mjs';

/**
 * @typedef {{ name: string, directory: string, manifestPath: string }} WorkspaceManifest
 */

/**
 * @typedef {{
 *   id: string,
 *   label: string,
 *   workspace: string,
 *   directory: string,
 *   manifestPath: string,
 * }} WorkspaceEntry
 */

/**
 * @param {string} relativeDirectory
 * @returns {Promise<WorkspaceManifest[]>}
 */
export async function readWorkspaceManifests(relativeDirectory) {
  const directoryPath = path.join(repositoryRoot, relativeDirectory);
  const entries = await readdir(directoryPath, { withFileTypes: true });

  const manifests = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const workspaceDirectory = path.join(directoryPath, entry.name);
        const manifestPath = path.join(workspaceDirectory, 'package.json');
        const manifest = await readJsonFile(manifestPath);

        if (!manifest?.name || typeof manifest.name !== 'string') {
          throw new Error(`Missing package name in ${manifestPath}`);
        }

        return {
          name: manifest.name,
          directory: workspaceDirectory,
          manifestPath,
        };
      }),
  );

  return manifests.sort((left, right) => left.name.localeCompare(right.name));
}

/**
 * @param {WorkspaceManifest} workspaceManifest
 * @param {boolean} requirePlaygroundConfig
 * @returns {Promise<WorkspaceEntry>}
 */
async function readWorkspaceEntry(workspaceManifest, requirePlaygroundConfig) {
  const manifest = await readJsonFile(workspaceManifest.manifestPath);
  const playgroundConfig = /** @type {{ id?: unknown, label?: unknown } | undefined} */ (
    manifest.playgroundConfig
  );

  if (playgroundConfig && typeof playgroundConfig === 'object') {
    const { id, label } = playgroundConfig;

    if (!id || typeof id !== 'string') {
      throw new Error(`Missing "playgroundConfig.id" in ${workspaceManifest.manifestPath}.`);
    }

    if (!label || typeof label !== 'string') {
      throw new Error(`Missing "playgroundConfig.label" in ${workspaceManifest.manifestPath}.`);
    }

    return {
      id,
      label,
      workspace: workspaceManifest.name,
      directory: workspaceManifest.directory,
      manifestPath: workspaceManifest.manifestPath,
    };
  }

  if (requirePlaygroundConfig) {
    throw new Error(`Missing "playgroundConfig" metadata in ${workspaceManifest.manifestPath}.`);
  }

  return {
    id: workspaceManifest.name,
    label: workspaceManifest.name,
    workspace: workspaceManifest.name,
    directory: workspaceManifest.directory,
    manifestPath: workspaceManifest.manifestPath,
  };
}

/**
 * @param {{ relativeDirectory: string, requirePlaygroundConfig?: boolean }} options
 * @returns {Promise<WorkspaceEntry[]>}
 */
export async function readWorkspaceCatalog(options) {
  const { relativeDirectory, requirePlaygroundConfig = false } = options;
  const manifests = await readWorkspaceManifests(relativeDirectory);
  const entries = await Promise.all(
    manifests.map((workspaceManifest) =>
      readWorkspaceEntry(workspaceManifest, requirePlaygroundConfig),
    ),
  );

  return entries.sort((left, right) => left.label.localeCompare(right.label));
}
