// @ts-check

/**
 * @typedef {import('./types.mjs').ParsedArgs} ParsedArgs
 * @typedef {import('../../shared/workspaces.mjs').WorkspaceEntry} WorkspaceEntry
 */

/**
 * Parses workspace-runner CLI arguments after the command name.
 * @param {string[]} argv The raw argument list received after the workspace command.
 * @returns {ParsedArgs} The normalized argument state used by the runner.
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
 * Creates a case-insensitive lookup map for workspace identifiers and package names.
 * @param {WorkspaceEntry[]} workspaceCatalog The available workspace entries.
 * @returns {Map<string, WorkspaceEntry>} A lookup map keyed by workspace id and manifest name.
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
 * Resolves a user-provided workspace token to a catalog entry.
 * @param {Map<string, WorkspaceEntry>} workspaceById The lookup map built from the workspace catalog.
 * @param {string | undefined} value The workspace id or package name provided by the user.
 * @returns {WorkspaceEntry | undefined} The matching workspace entry when one exists.
 */
export function resolveWorkspace(workspaceById, value) {
  if (!value) {
    return undefined;
  }

  return workspaceById.get(value.toLowerCase());
}

/**
 * Creates the npm arguments needed to run a command in every workspace.
 * @param {string} command The npm script name to execute.
 * @param {string[]} forwardedArgs Additional arguments forwarded to each workspace script.
 * @returns {string[]} The argument list passed to the npm CLI.
 */
export function createAllWorkspacesArgs(command, forwardedArgs) {
  return forwardedArgs.length > 0
    ? ['run', command, '--workspaces', '--', ...forwardedArgs]
    : ['run', command, '--workspaces'];
}

/**
 * Creates the npm arguments needed to run a command in a single workspace.
 * @param {string} command The npm script name to execute.
 * @param {WorkspaceEntry} workspace The selected workspace entry.
 * @param {string[]} forwardedArgs Additional arguments forwarded to the workspace script.
 * @returns {string[]} The argument list passed to the npm CLI.
 */
export function createSingleWorkspaceArgs(command, workspace, forwardedArgs) {
  return forwardedArgs.length > 0
    ? ['run', command, '-w', workspace.workspace, '--', ...forwardedArgs]
    : ['run', command, '-w', workspace.workspace];
}
