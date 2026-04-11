// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Checks whether the current module is being executed as the entry script.
 * @param {string} moduleUrl The current module `import.meta.url` value.
 * @param {string | undefined} executedPath The script path reported by `process.argv[1]`.
 * @returns {boolean} Returns `true` when the module is the executed script.
 */
export function isExecutedAsScript(moduleUrl, executedPath) {
  if (!executedPath) {
    return false;
  }

  return fileURLToPath(moduleUrl) === path.resolve(executedPath);
}
