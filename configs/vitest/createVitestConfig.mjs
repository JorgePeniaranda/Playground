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

export function createVitestConfig(overrides = {}) {
  return mergeConfig(baseTestConfig, defineConfig(overrides));
}
