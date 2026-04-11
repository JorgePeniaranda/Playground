// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

export const repositoryRoot = path.resolve(currentDirectory, '../..');
export const npmExecutable = process.platform === 'win32' ? 'npm.cmd' : 'npm';
