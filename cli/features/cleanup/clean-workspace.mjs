// @ts-check

import path from 'node:path';
import { failWithError } from '../../shared/errors.mjs';
import { removeIfExists } from '../../shared/fs.mjs';
import { isExecutedAsScript } from '../../shared/runtime.mjs';

const currentWorkingDirectory = process.cwd();

/**
 * Checks whether a resolved path stays inside the expected base directory.
 * @param {string} baseDirectory The directory that defines the allowed removal boundary.
 * @param {string} targetPath The resolved artifact path to validate.
 * @returns {boolean} Returns `true` when the target path is inside the base directory.
 */
export function isPathInsideDirectory(baseDirectory, targetPath) {
  const relativePath = path.relative(baseDirectory, targetPath);

  return relativePath !== '' && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
}

/**
 * Resolves an artifact path relative to the current workspace directory.
 * @param {string} workingDirectory The workspace directory used as the resolution base.
 * @param {string} artifactPath The artifact path provided by the caller.
 * @returns {string} The absolute path for the artifact.
 */
export function resolveArtifactPath(workingDirectory, artifactPath) {
  return path.resolve(workingDirectory, artifactPath);
}

/**
 * Builds the user-facing cleanup summary written to standard output.
 * @param {string[]} removedArtifacts The artifact paths that were successfully removed.
 * @returns {string} A summary message describing the cleanup result.
 */
export function createCleanupSummary(removedArtifacts) {
  return removedArtifacts.length > 0
    ? `Removed: ${removedArtifacts.join(', ')}\n`
    : 'Nothing to clean.\n';
}

/**
 * Validates that at least one artifact path was provided to the cleanup command.
 * @param {string[]} artifactPaths The artifact paths requested for removal.
 * @returns {void}
 */
export function validateArtifactPaths(artifactPaths) {
  if (artifactPaths.length === 0) {
    throw new Error('Provide at least one artifact path to remove.');
  }
}

/**
 * @returns {Promise<void>}
 */
export async function main() {
  const artifactPaths = process.argv.slice(2);

  try {
    validateArtifactPaths(artifactPaths);
  } catch (error) {
    failWithError(error);
    return;
  }

  const removedArtifacts = [];

  for (const artifactPath of artifactPaths) {
    const resolvedPath = resolveArtifactPath(currentWorkingDirectory, artifactPath);

    if (!isPathInsideDirectory(currentWorkingDirectory, resolvedPath)) {
      throw new Error(
        `Refusing to remove "${artifactPath}" because it resolves outside the current workspace.`,
      );
    }

    const removed = await removeIfExists(resolvedPath);

    if (removed) {
      removedArtifacts.push(artifactPath);
    }
  }

  process.stdout.write(createCleanupSummary(removedArtifacts));
}

if (isExecutedAsScript(import.meta.url, process.argv[1])) {
  main().catch((error) => {
    failWithError(error);
  });
}
