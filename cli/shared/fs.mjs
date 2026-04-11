// @ts-check

import { access, rm } from 'node:fs/promises';

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
