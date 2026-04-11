// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @param {string} moduleUrl
 * @param {string | undefined} executedPath
 * @returns {boolean}
 */
export function isExecutedAsScript(moduleUrl, executedPath) {
  if (!executedPath) {
    return false;
  }

  return fileURLToPath(moduleUrl) === path.resolve(executedPath);
}
