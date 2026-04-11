// @ts-check

/**
 * @typedef {import('./types.mjs').ParsedArgs} ParsedArgs
 * @typedef {import('../../shared/workspaces.mjs').WorkspaceEntry} WorkspaceEntry
 */

/**
 * @param {string[]} argv
 * @returns {ParsedArgs}
 */
export function parseArgs(argv) {
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
 * @param {WorkspaceEntry[]} workspaceCatalog
 * @returns {Map<string, WorkspaceEntry>}
 */
export function createWorkspaceLookup(workspaceCatalog) {
  return new Map(
    workspaceCatalog.flatMap((entry) => [
      [entry.id.toLowerCase(), entry],
      [entry.workspace.toLowerCase(), entry],
    ]),
  );
}

/**
 * @param {Map<string, WorkspaceEntry>} workspaceById
 * @param {string | undefined} value
 * @returns {WorkspaceEntry | undefined}
 */
export function resolveWorkspace(workspaceById, value) {
  if (!value) {
    return undefined;
  }

  return workspaceById.get(value.toLowerCase());
}

/**
 * @param {string} command
 * @param {string[]} forwardedArgs
 * @returns {string[]}
 */
export function createAllWorkspacesArgs(command, forwardedArgs) {
  return forwardedArgs.length > 0
    ? ['run', command, '--workspaces', '--', ...forwardedArgs]
    : ['run', command, '--workspaces'];
}

/**
 * @param {string} command
 * @param {WorkspaceEntry} workspace
 * @param {string[]} forwardedArgs
 * @returns {string[]}
 */
export function createSingleWorkspaceArgs(command, workspace, forwardedArgs) {
  return forwardedArgs.length > 0
    ? ['run', command, '-w', workspace.workspace, '--', ...forwardedArgs]
    : ['run', command, '-w', workspace.workspace];
}
