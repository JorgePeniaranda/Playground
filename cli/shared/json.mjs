// @ts-check

import { readFile } from 'node:fs/promises';

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
