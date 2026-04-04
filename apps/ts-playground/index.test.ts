import { afterEach, describe, expect, test, vi } from 'vitest';

import {
  createGreetingMessage,
  main,
  resolveExecutedFilePath,
  runCliModule,
  shouldRunAsScript,
} from './index.js';

describe('createGreetingMessage', () => {
  test('builds a greeting with the shared utility', () => {
    expect(createGreetingMessage()).toBe('Hello, World! from TS Playground');
    expect(createGreetingMessage('Playground')).toBe('Hello, Playground! from TS Playground');
  });
});

describe('resolveExecutedFilePath', () => {
  test('returns an empty string when no executed path is provided', () => {
    expect(resolveExecutedFilePath(undefined)).toBe('');
  });
});

describe('shouldRunAsScript', () => {
  test('returns true when the current file is the executed file', () => {
    expect(shouldRunAsScript('C:/playground/index.ts', 'C:/playground/index.ts')).toBe(true);
  });

  test('returns false when the module is imported', () => {
    expect(shouldRunAsScript('C:/playground/index.ts', 'C:/playground/test.ts')).toBe(false);
  });
});

describe('main', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('prints the default greeting', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {
      return;
    });

    main();

    expect(logSpy).toHaveBeenCalledWith('Hello, World! from TS Playground');
  });
});

describe('runCliModule', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('runs the CLI entrypoint when executed directly', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {
      return;
    });

    runCliModule('C:/playground/index.ts', 'C:/playground/index.ts');

    expect(logSpy).toHaveBeenCalledWith('Hello, World! from TS Playground');
  });

  test('does nothing when the module is imported', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {
      return;
    });

    runCliModule('C:/playground/index.ts', 'C:/playground/test.ts');

    expect(logSpy).not.toHaveBeenCalled();
  });
});
