import { describe, expect, test } from 'vitest';

import { createGreetingMessage, normalizeName } from './App.controller';

describe('App controller', () => {
  test('uses World as the default fallback name', () => {
    expect(normalizeName('')).toBe('World');
  });

  test('trims whitespace-only values before applying the fallback', () => {
    expect(normalizeName('   ')).toBe('World');
  });

  test('preserves a provided name', () => {
    expect(normalizeName('Playground')).toBe('Playground');
  });

  test('trims surrounding whitespace from a provided name', () => {
    expect(normalizeName('  Playground  ')).toBe('Playground');
  });

  test('builds the greeting message with the shared utility', () => {
    expect(createGreetingMessage('Playground')).toBe('Hello, Playground!');
  });
});
