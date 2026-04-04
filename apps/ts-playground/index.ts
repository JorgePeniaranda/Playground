import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { greet } from '@playground/utils';

export function createGreetingMessage(name = 'World'): string {
  return `${greet(name)} from TS Playground`;
}

export function resolveExecutedFilePath(executedPath: string | undefined): string {
  return executedPath ? path.resolve(executedPath) : '';
}

export function shouldRunAsScript(currentPath: string, executedPath: string): boolean {
  return currentPath === executedPath;
}

export function runCliModule(currentPath: string, executedPath: string): void {
  if (shouldRunAsScript(currentPath, executedPath)) {
    main();
  }
}

/**
 * Main function
 */
export function main(): void {
  console.log(createGreetingMessage());
}

const currentFilePath = fileURLToPath(import.meta.url);
const executedFilePath = resolveExecutedFilePath(process.argv[1]);

runCliModule(currentFilePath, executedFilePath);
