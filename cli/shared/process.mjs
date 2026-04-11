// @ts-check

import { spawn } from 'node:child_process';
import { npmExecutable, repositoryRoot } from './constants.mjs';

/**
 * @param {string} command
 * @param {string[]} args
 * @returns {string}
 */
export function formatCommandPreview(command, args) {
  return [command, ...args].map((arg) => (/\s/.test(arg) ? JSON.stringify(arg) : arg)).join(' ');
}

/**
 * @param {string} command
 * @param {string[]} args
 * @param {{ cwd?: string, stdout?: NodeJS.WritableStream }} [options]
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
      /** @param {number | null} code */ (code) => {
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
 * @param {string[]} args
 * @param {{ cwd?: string, stdout?: NodeJS.WritableStream }} [options]
 * @returns {Promise<void>}
 */
export function runNpmCommand(args, options = {}) {
  return runCommand(npmExecutable, args, options);
}
