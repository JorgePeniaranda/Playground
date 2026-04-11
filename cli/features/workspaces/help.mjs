// @ts-check

import { supportedCommands } from './command-registry.mjs';

/**
 * @typedef {import('../../shared/workspaces.mjs').WorkspaceEntry} WorkspaceEntry
 */

/**
 * Builds the help output for the workspace command runner.
 * @param {WorkspaceEntry[]} workspaceCatalog The available workspaces shown in usage examples.
 * @returns {string} The complete help text displayed to the user.
 */
export function createHelpText(workspaceCatalog) {
  const workspaceNames = workspaceCatalog.map((entry) => entry.id).join('|');

  return `Usage:
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
`;
}
