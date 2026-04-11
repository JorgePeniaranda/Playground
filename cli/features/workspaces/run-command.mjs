// @ts-check

import { stdout as output, stderr } from 'node:process';
import { failWithError, getErrorMessage } from '../../shared/errors.mjs';
import { runNpmCommand } from '../../shared/process.mjs';
import { isExecutedAsScript } from '../../shared/runtime.mjs';
import { readWorkspaceCatalog } from '../../shared/workspaces.mjs';
import {
  createAllWorkspacesArgs,
  createSingleWorkspaceArgs,
  createWorkspaceLookup,
  parseArgs,
  resolveWorkspace,
} from './args.mjs';
import { ensureCommandExists } from './catalog.mjs';
import { supportedCommands, supportsAllWorkspaces } from './command-registry.mjs';
import { createHelpText } from './help.mjs';
import { promptForWorkspace } from './prompt.mjs';

/**
 * Reads and combines app and package workspace metadata for the command runner.
 * @returns {Promise<import('../../shared/workspaces.mjs').WorkspaceEntry[]>} The merged workspace catalog sorted by label.
 */
async function readCombinedWorkspaceCatalog() {
  const apps = await readWorkspaceCatalog({
    relativeDirectory: 'apps',
    requirePlaygroundConfig: true,
  });
  const packages = await readWorkspaceCatalog({ relativeDirectory: 'packages' });

  return [...apps, ...packages].sort((left, right) => left.label.localeCompare(right.label));
}

/**
 * @returns {Promise<void>}
 */
export async function main() {
  const command = process.argv[2];
  const workspaceCatalog = await readCombinedWorkspaceCatalog();
  const workspaceById = createWorkspaceLookup(workspaceCatalog);

  if (!command || !supportedCommands.has(command)) {
    stderr.write(
      `Unsupported or missing command: ${command ?? '<none>'}\nUse --help to see available options.\n`,
    );
    process.exitCode = 1;
    return;
  }

  let parsedArgs;

  try {
    parsedArgs = parseArgs(process.argv.slice(3));
  } catch (error) {
    stderr.write(`${getErrorMessage(error)}\n\n`);
    output.write(createHelpText(workspaceCatalog));
    process.exitCode = 1;
    return;
  }

  if (parsedArgs.help) {
    output.write(createHelpText(workspaceCatalog));
    return;
  }

  if (parsedArgs.all && parsedArgs.workspace) {
    stderr.write('Use either --all or --workspace, not both.\n');
    process.exitCode = 1;
    return;
  }

  if (parsedArgs.all && !supportsAllWorkspaces(command)) {
    stderr.write(`Command "${command}" does not support --all. Select a single workspace.\n`);
    process.exitCode = 1;
    return;
  }

  if (parsedArgs.all) {
    await ensureCommandExists(command, workspaceCatalog);
    await runNpmCommand(createAllWorkspacesArgs(command, parsedArgs.forwardedArgs), {
      stdout: output,
    });
    return;
  }

  if (parsedArgs.workspace) {
    const selectedWorkspace = resolveWorkspace(workspaceById, parsedArgs.workspace);

    if (!selectedWorkspace) {
      stderr.write(`Unknown workspace: ${parsedArgs.workspace}\n\n`);
      output.write(createHelpText(workspaceCatalog));
      process.exitCode = 1;
      return;
    }

    await ensureCommandExists(command, [selectedWorkspace]);
    await runNpmCommand(
      createSingleWorkspaceArgs(command, selectedWorkspace, parsedArgs.forwardedArgs),
      {
        stdout: output,
      },
    );
    return;
  }

  const selection = await promptForWorkspace(command, workspaceCatalog);

  if (selection.type === 'all') {
    await ensureCommandExists(command, workspaceCatalog);
    await runNpmCommand(createAllWorkspacesArgs(command, parsedArgs.forwardedArgs), {
      stdout: output,
    });
    return;
  }

  await ensureCommandExists(command, [selection.workspace]);
  await runNpmCommand(
    createSingleWorkspaceArgs(command, selection.workspace, parsedArgs.forwardedArgs),
    {
      stdout: output,
    },
  );
}

if (isExecutedAsScript(import.meta.url, process.argv[1])) {
  main().catch((error) => {
    failWithError(error, { stderr });
  });
}
