// @ts-check

import path from 'node:path';
import { removeIfExists } from './workspace-utils.mjs';

async function main() {
  const artifactPaths = process.argv.slice(2);

  if (artifactPaths.length === 0) {
    process.stderr.write('Provide at least one artifact path to remove.\n');
    process.exitCode = 1;
    return;
  }

  const removedArtifacts = [];

  for (const artifactPath of artifactPaths) {
    const resolvedPath = path.resolve(process.cwd(), artifactPath);
    const removed = await removeIfExists(resolvedPath);

    if (removed) {
      removedArtifacts.push(artifactPath);
    }
  }

  const summary =
    removedArtifacts.length > 0
      ? `Removed: ${removedArtifacts.join(', ')}\n`
      : 'Nothing to clean.\n';

  process.stdout.write(summary);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
