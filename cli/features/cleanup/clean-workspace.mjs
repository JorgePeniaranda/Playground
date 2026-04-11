// @ts-check

import path from 'node:path';
import { failWithError } from '../../shared/errors.mjs';
import { removeIfExists } from '../../shared/fs.mjs';
import { isExecutedAsScript } from '../../shared/runtime.mjs';

const currentWorkingDirectory = process.cwd();

/**
 * @param {string} baseDirectory
 * @param {string} targetPath
 * @returns {boolean}
 */
export function isPathInsideDirectory(baseDirectory, targetPath) {
  const relativePath = path.relative(baseDirectory, targetPath);

  return relativePath !== '' && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
}

/**
 * @param {string} workingDirectory
 * @param {string} artifactPath
 * @returns {string}
 */
export function resolveArtifactPath(workingDirectory, artifactPath) {
  return path.resolve(workingDirectory, artifactPath);
}

/**
 * @param {string[]} removedArtifacts
 * @returns {string}
 */
export function createCleanupSummary(removedArtifacts) {
  return removedArtifacts.length > 0
    ? `Removed: ${removedArtifacts.join(', ')}\n`
    : 'Nothing to clean.\n';
}

/**
 * @param {string[]} artifactPaths
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
