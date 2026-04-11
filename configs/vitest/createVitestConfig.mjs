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
 * Creates a Vitest configuration by merging the shared defaults with local overrides.
 * @param {import('vitest/config').UserConfig} [overrides] Workspace-specific Vitest configuration overrides.
 * @returns {import('vitest/config').UserConfig} The merged Vitest configuration.
 */
export function createVitestConfig(overrides = {}) {
  return mergeConfig(baseTestConfig, defineConfig(overrides));
}
