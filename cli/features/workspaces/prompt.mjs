// @ts-check

import { stdin as input, stdout as output } from 'node:process';
import { clearScreenDown, moveCursor } from 'node:readline';
import { supportsAllWorkspaces } from './command-registry.mjs';

/**
 * @typedef {import('./types.mjs').PromptOption} PromptOption
 * @typedef {import('./types.mjs').WorkspaceSelection} WorkspaceSelection
 * @typedef {import('../../shared/workspaces.mjs').WorkspaceEntry} WorkspaceEntry
 */

export const promptUpKey = '\u001b[A';
export const promptDownKey = '\u001b[B';
export const promptEnterKeys = new Set(['\r', '\n']);
export const promptCancelKey = '\u0003';

/**
 * Maps workspace entries into prompt options for the interactive selector.
 * @param {WorkspaceEntry[]} workspaceCatalog The available workspace entries.
 * @returns {PromptOption[]} The prompt options representing each workspace.
 */
export function createWorkspaceOptions(workspaceCatalog) {
  return workspaceCatalog.map((entry) => ({
    label: `${entry.label} (${entry.id})`,
    selection: { type: 'workspace', workspace: entry },
  }));
}

/**
 * Builds the full list of prompt options for a command.
 * @param {string} command The command the user wants to run.
 * @param {WorkspaceEntry[]} workspaceCatalog The available workspace entries.
 * @returns {PromptOption[]} The prompt options shown to the user.
 */
export function createPromptOptions(command, workspaceCatalog) {
  const workspaceOptions = createWorkspaceOptions(workspaceCatalog);

  if (!supportsAllWorkspaces(command)) {
    return workspaceOptions;
  }

  return [...workspaceOptions, { label: 'All workspaces', selection: { type: 'all' } }];
}

/**
 * Calculates the next selected option index for keyboard navigation.
 * @param {number} currentIndex The currently selected option index.
 * @param {number} optionsLength The total number of available options.
 * @param {'up' | 'down'} direction The navigation direction requested by the user.
 * @returns {number} The next selected option index, wrapping at the ends.
 */
export function getNextSelectedIndex(currentIndex, optionsLength, direction) {
  if (direction === 'up') {
    return currentIndex === 0 ? optionsLength - 1 : currentIndex - 1;
  }

  return currentIndex === optionsLength - 1 ? 0 : currentIndex + 1;
}

/**
 * Translates a raw keypress into a prompt action.
 * @param {string} key The raw key sequence read from standard input.
 * @returns {'cancel' | 'submit' | 'up' | 'down' | 'noop'} The action triggered by the keypress.
 */
export function parsePromptKey(key) {
  if (key === promptCancelKey) {
    return 'cancel';
  }

  if (promptEnterKeys.has(key)) {
    return 'submit';
  }

  if (key === promptUpKey) {
    return 'up';
  }

  if (key === promptDownKey) {
    return 'down';
  }

  return 'noop';
}

/**
 * Prompts the user to choose a workspace when no explicit selection was provided.
 * @param {string} command The command the user wants to run.
 * @param {WorkspaceEntry[]} workspaceCatalog The available workspace entries.
 * @returns {Promise<WorkspaceSelection>} The workspace selection chosen through the prompt.
 */
export async function promptForWorkspace(command, workspaceCatalog) {
  if (!input.isTTY || !output.isTTY || typeof input.setRawMode !== 'function') {
    throw new Error('Interactive workspace selection requires a TTY. Use --workspace or --all.');
  }

  const options = createPromptOptions(command, workspaceCatalog);
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
     * Handles a chunk of raw terminal input for the interactive prompt.
     * @param {Buffer} chunk The input bytes emitted by the terminal.
     * @returns {void}
     */
    const onData = (chunk) => {
      const key = chunk.toString('utf8');
      const action = parsePromptKey(key);

      if (action === 'cancel') {
        cleanup();
        reject(new Error('Prompt cancelled.'));
        return;
      }

      if (action === 'submit') {
        cleanup();
        resolve(options[selectedIndex].selection);
        return;
      }

      if (action === 'up') {
        selectedIndex = getNextSelectedIndex(selectedIndex, options.length, 'up');
        render();
        return;
      }

      if (action === 'down') {
        selectedIndex = getNextSelectedIndex(selectedIndex, options.length, 'down');
        render();
      }
    };

    input.setRawMode(true);
    input.resume();
    output.write('\u001b[?25l');
    input.on('data', onData);
  });
}
