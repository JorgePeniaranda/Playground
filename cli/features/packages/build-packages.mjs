// @ts-check

import { failWithError } from '../../shared/errors.mjs';
import { runNpmCommand } from '../../shared/process.mjs';
import { isExecutedAsScript } from '../../shared/runtime.mjs';
import { readWorkspaceManifests } from '../../shared/workspaces.mjs';

/**
 * @param {string} workspaceName
 * @returns {string[]}
 */
export function createBuildPackageArgs(workspaceName) {
  return ['run', 'build', '-w', workspaceName];
}

/**
 * @param {string} workspaceName
 * @returns {string}
 */
export function createBuildPackageMessage(workspaceName) {
  return `\nBuilding package: ${workspaceName}\n`;
}

/**
 * @returns {Promise<void>}
 */
export async function main() {
  const packages = await readWorkspaceManifests('packages');

  if (packages.length === 0) {
    process.stdout.write('No packages found under packages/.\n');
    return;
  }

  for (const workspace of packages) {
    process.stdout.write(createBuildPackageMessage(workspace.name));
    await runNpmCommand(createBuildPackageArgs(workspace.name));
  }
}

if (isExecutedAsScript(import.meta.url, process.argv[1])) {
  main().catch((error) => {
    failWithError(error);
  });
}
