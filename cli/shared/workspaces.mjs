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
 * Reads package manifests from a workspace directory such as `apps` or `packages`.
 * @param {string} relativeDirectory The workspace directory relative to the repository root.
 * @returns {Promise<WorkspaceManifest[]>} The discovered workspace manifests sorted by name.
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
 * Converts a raw workspace manifest into the normalized catalog shape.
 * @param {WorkspaceManifest} workspaceManifest The discovered workspace manifest metadata.
 * @param {boolean} requirePlaygroundConfig Whether playground metadata is required for the workspace.
 * @returns {Promise<WorkspaceEntry>} The normalized workspace entry.
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
 * Reads and normalizes the workspace catalog for a directory.
 * @param {{ relativeDirectory: string, requirePlaygroundConfig?: boolean }} options The catalog-loading options.
 * @returns {Promise<WorkspaceEntry[]>} The normalized workspace entries sorted by label.
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
