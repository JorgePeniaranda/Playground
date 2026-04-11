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
 * Indicates whether a command can safely target every workspace at once.
 * @param {string} command The command being evaluated.
 * @returns {boolean} Returns `true` when the command supports the `--all` flag.
 */
export function supportsAllWorkspaces(command) {
  return !commandsDisallowingAll.has(command);
}
