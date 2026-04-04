// @ts-check

import { readWorkspaceManifests, runNpmCommand } from './workspace-utils.mjs';

async function main() {
  const packages = await readWorkspaceManifests('packages');

  if (packages.length === 0) {
    process.stdout.write('No packages found under packages/.\n');
    return;
  }

  for (const workspace of packages) {
    process.stdout.write(`\nBuilding package: ${workspace.name}\n`);
    await runNpmCommand(['run', 'build', '-w', workspace.name]);
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
