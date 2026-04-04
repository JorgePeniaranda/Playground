import { describe, expect, test } from 'vitest';

import { greet } from './greet.js';

describe('greet', () => {
  test('returns a friendly greeting', () => {
    expect(greet('World')).toBe('Hello, World!');
  });
});
