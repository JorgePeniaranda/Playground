// @ts-check

export const supportedCommands = new Set([
  'dev',
  'build',
  'clean',
  'lint',
  'lint:fix',
  'format',
  'format:check',
  'typecheck',
  'test',
  'test:watch',
  'test:coverage',
  'check',
]);

export const commandsDisallowingAll = new Set(['dev', 'test:watch']);

/**
 * @param {string} command
 * @returns {boolean}
 */
export function supportsAllWorkspaces(command) {
  return !commandsDisallowingAll.has(command);
}
