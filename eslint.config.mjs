import eslint from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const tsconfigRootDir = fileURLToPath(new URL('.', import.meta.url));

const sourceFiles = ['**/*.{ts,tsx,js,jsx}'];

export default defineConfig(
  //#region 🔹 General ESLint rules
  ...[eslint.configs.recommended],
  //#endregion
  //#region 🔹 TypeScript-specific ESLint rules
  ...[
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
  ],
  //#endregion
  //#region 🔹 Prettier configuration (reads from .prettierrc.mjs automatically)
  [eslintPluginPrettier],
  //#endregion
  //#region 🔹 Import management rules
  [
    {
      files: ['**/*.{ts,tsx}'],
      plugins: {
        import: eslintPluginImport,
      },
      rules: {
        'import/order': [
          'warn',
          {
            'groups': [
              'unknown',
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
            'pathGroups': [
              {
                pattern: '~/**',
                group: 'external',
                position: 'after',
              },
            ],
            'pathGroupsExcludedImportTypes': ['type'],
            'alphabetize': {
              order: 'asc',
              caseInsensitive: true,
            },
            'newlines-between': 'always-and-inside-groups',
            'distinctGroup': true,
          },
        ],
      },
    },
  ],
  //#endregion
  //#region 🔹 React-specific ESLint rules
  ...[
    {
      files: sourceFiles,
      languageOptions: {
        parserOptions: { ecmaFeatures: { jsx: true } },
        globals: { ...globals.browser },
      },
      plugins: {
        'react': eslintPluginReact,
        'react-hooks': eslintPluginReactHooks,
        'react-refresh': eslintPluginReactRefresh,
        'jsx-a11y': eslintPluginJsxA11y,
      },
      settings: { react: { version: 'detect' } },
      rules: {
        ...(eslintPluginReact.configs.recommended?.rules ?? {}),
        ...(eslintPluginReact.configs['jsx-runtime']?.rules ?? {}),
        ...(eslintPluginJsxA11y.configs.recommended?.rules ?? {}),
        ...(eslintPluginReactHooks.configs.recommended?.rules ?? {}),
        ...(eslintPluginReactRefresh.configs.recommended?.rules ?? {}),
        'react/prop-types': 'off',
      },
    },
  ],
  //#endregion
  //#region 🔹 Ignore paths that should not be linted
  globalIgnores([
    'node_modules/',
    'coverage/',
    'out/',
    'dist/',
    'saves/',
    'apps/*/out/',
    'apps/*/dist/',
    'apps/*/coverage/',
  ]),
  //#endregion
);
