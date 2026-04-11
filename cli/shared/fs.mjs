// @ts-check

import { access, rm } from 'node:fs/promises';

/**
 * Removes a file or directory only when it already exists.
 * @param {string} targetPath The file system path to remove.
 * @returns {Promise<boolean>} Returns `true` when a path was removed.
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
