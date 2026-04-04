import { defineConfig } from 'eslint/config';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const tsconfigRootDir = fileURLToPath(new URL('../../', import.meta.url));
const typescriptFiles = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];
const scopedTypescriptConfigs = [...tseslint.configs.strict, ...tseslint.configs.stylistic].map(
  (config) => ({
    ...config,
    files: config.files ?? typescriptFiles,
  }),
);

export default defineConfig(...scopedTypescriptConfigs, {
  files: typescriptFiles,
  languageOptions: {
    parserOptions: {
      project: [
        './apps/*/tsconfig.json',
        './apps/*/tsconfig.app.json',
        './apps/*/tsconfig.spec.json',
        './apps/*/tsconfig.test.json',
        './packages/*/tsconfig.json',
        './packages/*/tsconfig.test.json',
      ],
      tsconfigRootDir,
    },
  },
});
