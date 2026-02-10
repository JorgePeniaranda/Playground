import eslint from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  //#region 🔹 General ESLint rules
  [
    eslint.configs.recommended,
    {
      rules: {
        'padding-line-between-statements': [
          'warn',
          { blankLine: 'always', prev: '*', next: ['return', 'export'] },
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var'],
          },
          { blankLine: 'always', prev: ['function'], next: '*' },
          { blankLine: 'always', prev: '*', next: ['function'] },
        ],
        'no-console': 'warn',
        'prefer-const': 'error',
        'no-var': 'error',
      },
    },
  ],
  //#endregion
  //#region 🔹 TypeScript-specific ESLint rules
  [
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
      rules: {
        '@typescript-eslint/no-extraneous-class': 'off',
      },
    },
  ],
  //#endregion
  //#region 🔹 Prettier configuration
  [
    eslintPluginPrettier,
    {
      rules: {
        'prettier/prettier': [
          'warn',
          // Same configuration as .prettierrc.mjs
          {
            printWidth: 100,
            trailingComma: 'all',
            tabWidth: 2,
            semi: true,
            singleQuote: true,
            jsxSingleQuote: true,
            bracketSpacing: true,
            bracketSameLine: false,
            arrowParens: 'always',
            endOfLine: 'auto',
            quoteProps: 'consistent',
            proseWrap: 'always',
            htmlWhitespaceSensitivity: 'css',
            embeddedLanguageFormatting: 'auto',
          },
        ],
      },
    },
  ],
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
  //#region 🔹 Ignore paths that should not be linted
  globalIgnores(['node_modules/', 'coverage/', 'out/', 'saves/']),
  //#endregion
);
