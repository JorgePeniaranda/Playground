// @ts-check

import { stdin as input, stdout as output, stderr } from 'node:process';
import { clearScreenDown, moveCursor } from 'node:readline';
import { readJsonFile, readWorkspaceCatalog, runNpmCommand } from './workspace-utils.mjs';

/**
 * @typedef {Object} WorkspaceEntry
 * @property {string} id
 * @property {string} label
 * @property {string} workspace
 * @property {string} directory
 * @property {string} manifestPath
 */

/**
 * @typedef {{ label: string, selection: WorkspaceSelection }} PromptOption
 */

/**
 * @typedef {Object} ParsedArgs
 * @property {string | undefined} workspace
 * @property {boolean} all
 * @property {boolean} help
 * @property {string[]} forwardedArgs
 */

/**
 * @typedef {{ type: 'all' } | { type: 'workspace', workspace: WorkspaceEntry }} WorkspaceSelection
 */

const supportedCommands = new Set([
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

const commandsDisallowingAll = new Set(['dev', 'test:watch']);

/**
 * @param {WorkspaceEntry[]} workspaceCatalog
 */
function printHelp(workspaceCatalog) {
  const workspaceNames = workspaceCatalog.map((entry) => entry.id).join('|');

  output.write(`Usage:
  npm run <command> [-- --workspace <${workspaceNames}>]
  npm run <command> [-- <${workspaceNames}>]
  npm run <command> -- --all
  npm run <command> -- --help
  npm run <command> -- <${workspaceNames}> -- [script arguments...]

Commands supported by the workspace runner:
  ${Array.from(supportedCommands).join(', ')}

Options:
  -w, --workspace <name>  Select a workspace without showing the prompt
      --all               Run the command in every workspace
  -h, --help              Show this help message
      --                  Forward remaining arguments to the child npm script

Examples:
  npm run dev
  npm run dev -- ${workspaceCatalog[0]?.id ?? 'workspace-id'}
  npm run test -- --workspace ${workspaceCatalog[0]?.id ?? 'workspace-id'}
  npm run check -- --all
  npm run lint -- ${workspaceCatalog[0]?.id ?? 'workspace-id'} -- --max-warnings 0
`);
}

/**
 * @param {string} command
 * @returns {boolean}
 */
function supportsAllWorkspaces(command) {
  return !commandsDisallowingAll.has(command);
}

/**
 * @param {WorkspaceEntry[]} workspaceCatalog
 * @returns {Map<string, WorkspaceEntry>}
 */
function createWorkspaceLookup(workspaceCatalog) {
  return new Map(
    workspaceCatalog.flatMap((entry) => [
      [entry.id.toLowerCase(), entry],
      [entry.workspace.toLowerCase(), entry],
    ]),
  );
}

/**
 * @param {WorkspaceEntry} workspace
 * @returns {Promise<Record<string, string>>}
 */
async function readWorkspaceScripts(workspace) {
  const manifest = await readJsonFile(workspace.manifestPath);

  const { scripts } = manifest;

  if (!scripts || typeof scripts !== 'object') {
    return {};
  }

  return /** @type {Record<string, string>} */ (scripts);
}

/**
 * @param {string} command
 * @param {WorkspaceEntry[]} workspaces
 * @returns {Promise<void>}
 */
async function ensureCommandExists(command, workspaces) {
  const missing = [];

  for (const workspace of workspaces) {
    const scripts = await readWorkspaceScripts(workspace);

    if (!(command in scripts)) {
      missing.push(`${workspace.label} (${workspace.id})`);
    }
  }

  if (missing.length === 0) {
    return;
  }

  const workspaceLabel = missing.length === 1 ? 'workspace' : 'workspaces';
  throw new Error(
    `Command "${command}" is not defined in: ${missing.join(', ')} (${workspaceLabel}).`,
  );
}

/**
 * @param {string[]} argv
 * @returns {ParsedArgs}
 */
function parseArgs(argv) {
  /** @type {ParsedArgs} */
  const parsed = {
    workspace: undefined,
    all: false,
    help: false,
    forwardedArgs: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (current === '--') {
      parsed.forwardedArgs = argv.slice(index + 1);
      break;
    }

    if (current === '--help' || current === '-h') {
      parsed.help = true;
      continue;
    }

    if (current === '--all') {
      parsed.all = true;
      continue;
    }

    if (current === '--workspace' || current === '-w') {
      const next = argv[index + 1];

      if (!next || next.startsWith('-')) {
        throw new Error('Missing value for --workspace');
      }

      if (parsed.workspace) {
        throw new Error('Workspace already specified.');
      }

      parsed.workspace = next;
      index += 1;
      continue;
    }

    if (!current.startsWith('-')) {
      if (parsed.workspace) {
        throw new Error(`Unexpected positional argument: ${current}`);
      }

      parsed.workspace = current;
      continue;
    }

    throw new Error(`Unknown argument: ${current}`);
  }

  return parsed;
}

/**
 * @param {Map<string, WorkspaceEntry>} workspaceById
 * @param {string | undefined} value
 * @returns {WorkspaceEntry | undefined}
 */
function resolveWorkspace(workspaceById, value) {
  if (!value) {
    return undefined;
  }

  return workspaceById.get(value.toLowerCase());
}

/**
 * @param {string} command
 * @param {WorkspaceEntry[]} workspaceCatalog
 * @returns {Promise<WorkspaceSelection>}
 */
async function promptForWorkspace(command, workspaceCatalog) {
  if (!input.isTTY || !output.isTTY || typeof input.setRawMode !== 'function') {
    throw new Error('Interactive workspace selection requires a TTY. Use --workspace or --all.');
  }

  /** @type {PromptOption[]} */
  const workspaceOptions = workspaceCatalog.map((entry) => {
    /** @type {PromptOption} */
    const option = {
      label: `${entry.label} (${entry.id})`,
      selection: { type: 'workspace', workspace: entry },
    };

    return option;
  });

  /** @type {PromptOption} */
  const allOption = {
    label: 'All workspaces',
    selection: { type: 'all' },
  };

  const options = supportsAllWorkspaces(command)
    ? [...workspaceOptions, allOption]
    : workspaceOptions;

  let selectedIndex = 0;
  let hasRendered = false;

  const linesUsed = options.length + 3;

  const render = () => {
    if (hasRendered) {
      moveCursor(output, 0, -linesUsed);
      clearScreenDown(output);
    } else {
      hasRendered = true;
    }

    output.write(`Select a workspace for "${command}":\n`);
    output.write('Use Up/Down arrows and press Enter.\n\n');

    options.forEach((option, index) => {
      const marker = index === selectedIndex ? '>' : ' ';
      output.write(`${marker} ${option.label}\n`);
    });
  };

  render();

  return new Promise((resolve, reject) => {
    let settled = false;

    const cleanup = () => {
      if (settled) {
        return;
      }

      settled = true;
      input.removeListener('data', onData);
      input.pause();
      input.setRawMode(false);
      output.write('\u001b[?25h');
      output.write('\n');
    };

    /**
     * @param {Buffer} chunk
     */
    const onData = (chunk) => {
      const key = chunk.toString('utf8');

      if (key === '\u0003') {
        cleanup();
        reject(new Error('Prompt cancelled.'));
        return;
      }

      if (key === '\r' || key === '\n') {
        const option = options[selectedIndex];
        cleanup();
        resolve(option.selection);
        return;
      }

      if (key === '\u001b[A') {
        selectedIndex = selectedIndex === 0 ? options.length - 1 : selectedIndex - 1;
        render();
        return;
      }

      if (key === '\u001b[B') {
        selectedIndex = selectedIndex === options.length - 1 ? 0 : selectedIndex + 1;
        render();
      }
    };

    input.setRawMode(true);
    input.resume();
    output.write('\u001b[?25l');
    input.on('data', onData);
  });
}

/**
 * @param {string} command
 * @param {string[]} forwardedArgs
 * @returns {string[]}
 */
function createAllWorkspacesArgs(command, forwardedArgs) {
  const args = ['run', command, '--workspaces'];

  if (forwardedArgs.length > 0) {
    args.push('--', ...forwardedArgs);
  }

  return args;
}

/**
 * @param {string} command
 * @param {WorkspaceEntry} workspace
 * @param {string[]} forwardedArgs
 * @returns {string[]}
 */
function createSingleWorkspaceArgs(command, workspace, forwardedArgs) {
  const args = ['run', command, '-w', workspace.workspace];

  if (forwardedArgs.length > 0) {
    args.push('--', ...forwardedArgs);
  }

  return args;
}

async function main() {
  const command = process.argv[2];
  const workspaceCatalog = [
    ...(await readWorkspaceCatalog({ relativeDirectory: 'apps', requirePlaygroundConfig: true })),
    ...(await readWorkspaceCatalog({ relativeDirectory: 'packages' })),
  ].sort((left, right) => left.label.localeCompare(right.label));
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
    const message = error instanceof Error ? error.message : String(error);
    stderr.write(`${message}\n\n`);
    printHelp(workspaceCatalog);
    process.exitCode = 1;
    return;
  }

  if (parsedArgs.help) {
    printHelp(workspaceCatalog);
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
      printHelp(workspaceCatalog);
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
    if (!supportsAllWorkspaces(command)) {
      stderr.write(
        `Command "${command}" does not support "All workspaces". Select a single workspace.\n`,
      );
      process.exitCode = 1;
      return;
    }

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

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  stderr.write(`${message}\n`);
  process.exitCode = 1;
});
