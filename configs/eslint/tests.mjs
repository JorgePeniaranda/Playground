import { defineConfig } from 'eslint/config';

const testFiles = ['**/*.test.{ts,tsx,js,jsx}', '**/*.spec.{ts,tsx,js,jsx}', 'vitest.setup.ts'];

export default defineConfig({
  files: testFiles,
  languageOptions: {
    globals: {
      afterAll: 'readonly',
      afterEach: 'readonly',
      beforeAll: 'readonly',
      beforeEach: 'readonly',
      describe: 'readonly',
      expect: 'readonly',
      it: 'readonly',
      test: 'readonly',
      vi: 'readonly',
    },
  },
});
