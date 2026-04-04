import { defineConfig } from 'eslint/config';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const tsconfigRootDir = fileURLToPath(new URL('../../', import.meta.url));

export default defineConfig(...tseslint.configs.strict, ...tseslint.configs.stylistic, {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parserOptions: {
      project: [
        './apps/*/tsconfig.json',
        './apps/*/tsconfig.test.json',
        './packages/*/tsconfig.json',
      ],
      tsconfigRootDir,
    },
  },
});
