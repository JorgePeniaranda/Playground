import { defineConfig, mergeConfig } from 'vitest/config';

const baseTestConfig = defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});

/**
 * @param {import('vitest/config').UserConfig} [overrides]
 * @returns {import('vitest/config').UserConfig}
 */
export function createVitestConfig(overrides = {}) {
  return mergeConfig(baseTestConfig, defineConfig(overrides));
}
