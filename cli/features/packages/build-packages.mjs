// @ts-check

import { failWithError } from '../../shared/errors.mjs';
import { runNpmCommand } from '../../shared/process.mjs';
import { isExecutedAsScript } from '../../shared/runtime.mjs';
import { readWorkspaceManifests } from '../../shared/workspaces.mjs';

/**
 * Creates the npm arguments required to build a single package workspace.
 * @param {string} workspaceName The package workspace name defined in its manifest.
 * @returns {string[]} The argument list passed to the npm CLI.
 */
export function createBuildPackageArgs(workspaceName) {
  return ['run', 'build', '-w', workspaceName];
}

/**
 * Creates the console message shown before building a package workspace.
 * @param {string} workspaceName The package workspace name currently being built.
 * @returns {string} The formatted progress message for the build step.
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
