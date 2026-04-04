// @ts-check

import { spawn } from 'node:child_process';
import { access, readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
export const repositoryRoot = path.resolve(scriptDirectory, '..');
const npmExecutable = process.platform === 'win32' ? 'npm.cmd' : 'npm';

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
 * }} AppWorkspaceEntry
 */

/**
 * @param {string} manifestPath
 * @returns {Promise<Record<string, unknown>>}
 */
export async function readJsonFile(manifestPath) {
  const manifestContent = await readFile(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestContent);

  if (!manifest || typeof manifest !== 'object') {
    throw new Error(`Invalid JSON file: ${manifestPath}`);
  }

  return /** @type {Record<string, unknown>} */ (manifest);
}

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
 * @param {string} relativeDirectory
 * @returns {Promise<AppWorkspaceEntry[]>}
 */
export async function readAppWorkspaceCatalog(relativeDirectory) {
  const manifests = await readWorkspaceManifests(relativeDirectory);

  const catalog = manifests.map(async (workspaceManifest) => {
    const manifest = await readJsonFile(workspaceManifest.manifestPath);
    const playgroundConfig = /** @type {{ id?: unknown, label?: unknown } | undefined} */ (
      manifest.playgroundConfig
    );

    if (!playgroundConfig || typeof playgroundConfig !== 'object') {
      throw new Error(`Missing "playgroundConfig" metadata in ${workspaceManifest.manifestPath}.`);
    }

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
  });

  const entries = await Promise.all(catalog);

  return entries.sort((left, right) => left.label.localeCompare(right.label));
}

/**
 * @param {{ relativeDirectory: string, requirePlaygroundConfig?: boolean }} options
 * @returns {Promise<AppWorkspaceEntry[]>}
 */
export async function readWorkspaceCatalog(options) {
  const { relativeDirectory, requirePlaygroundConfig = false } = options;
  const manifests = await readWorkspaceManifests(relativeDirectory);

  const catalog = manifests.map(async (workspaceManifest) => {
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
  });

  const entries = await Promise.all(catalog);

  return entries.sort((left, right) => left.label.localeCompare(right.label));
}

/**
 * @param {string} command
 * @param {string[]} args
 * @param {{ cwd?: string, stdout?: NodeJS.WritableStream }} [options]
 * @returns {Promise<void>}
 */
export function runCommand(command, args, options = {}) {
  const { cwd = repositoryRoot, stdout = process.stdout } = options;

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    if (stdout) {
      stdout.write(`Running: ${formatCommandPreview(command, args)}\n\n`);
    }

    child.on('error', reject);
    child.on(
      'close',
      /** @param {number | null} code */ (code) => {
        if (code === 0) {
          resolve();
          return;
        }

        reject(new Error(`Command failed with exit code ${code ?? 1}`));
      },
    );
  });
}

/**
 * @param {string[]} args
 * @param {{ cwd?: string, stdout?: NodeJS.WritableStream }} [options]
 * @returns {Promise<void>}
 */
export function runNpmCommand(args, options = {}) {
  return runCommand(npmExecutable, args, options);
}

/**
 * @param {string} command
 * @param {string[]} args
 * @returns {string}
 */
export function formatCommandPreview(command, args) {
  return [command, ...args].map((arg) => (/\s/.test(arg) ? JSON.stringify(arg) : arg)).join(' ');
}

/**
 * @param {string} targetPath
 * @returns {Promise<boolean>}
 */
export async function removeIfExists(targetPath) {
  try {
    await access(targetPath);
    await rm(targetPath, { recursive: true, force: true });
    return true;
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
}
