// @ts-check

import { spawn } from 'node:child_process';
import { npmExecutable, repositoryRoot } from './constants.mjs';

/**
 * Formats a command preview for logging.
 * @param {string} command The executable that will be spawned.
 * @param {string[]} args The argument list passed to the executable.
 * @returns {string} A shell-like preview string for the command.
 */
export function formatCommandPreview(command, args) {
  return [command, ...args].map((arg) => (/\s/.test(arg) ? JSON.stringify(arg) : arg)).join(' ');
}

/**
 * Spawns a child process and waits for it to finish.
 * @param {string} command The executable that will be spawned.
 * @param {string[]} args The argument list passed to the executable.
 * @param {{ cwd?: string, stdout?: import('node:stream').Writable }} [options] Optional working-directory and logging settings.
 * @returns {Promise<void>}
 */
export function runCommand(command, args, options = {}) {
  const { cwd = repositoryRoot, stdout = process.stdout } = options;

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    if (stdout) {
      stdout.write(`Running: ${formatCommandPreview(command, args)}\n\n`);
    }

    child.on('error', reject);
    child.on(
      'close',
      /**
       * Handles the child-process exit event.
       * @param {number | null} code The exit code reported by the child process.
       * @returns {void}
       */
      (code) => {
        if (code === 0) {
          resolve();
          return;
        }

        reject(new Error(`Command failed with exit code ${code ?? 1}`));
      },
    );
  });
}

/**
 * Runs the npm executable with the provided argument list.
 * @param {string[]} args The arguments passed to npm.
 * @param {{ cwd?: string, stdout?: import('node:stream').Writable }} [options] Optional working-directory and logging settings.
 * @returns {Promise<void>}
 */
export function runNpmCommand(args, options = {}) {
  return runCommand(npmExecutable, args, options);
}
