// @ts-check

import { readFile } from 'node:fs/promises';

/**
 * Reads and parses a JSON file from disk.
 * @param {string} manifestPath The absolute path to the JSON file.
 * @returns {Promise<Record<string, unknown>>} The parsed JSON object.
 */
export async function readJsonFile(manifestPath) {
  const manifestContent = await readFile(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestContent);

  if (!manifest || typeof manifest !== 'object') {
    throw new Error(`Invalid JSON file: ${manifestPath}`);
  }

  return /** @type {Record<string, unknown>} */ (manifest);
}
