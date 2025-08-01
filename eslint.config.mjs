import eslint from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default [
  //#region 🔹 Ignore paths that should not be linted
  {
    ignores: ['**/node_modules', 'node_modules/**/*', 'out/**/*', 'coverage/**/*'],
  },
  //#endregion

  //#region 🔹 General ESLint rules
  ...[
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
  ...[
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
  ...[
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
  ...[
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

  //#region 🔹 JSDoc configuration
  jsdoc.configs['flat/recommended-typescript'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { jsdoc },
    rules: {
      'jsdoc/no-types': 'error',
      'jsdoc/require-description': 'warn',
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-line-alignment': 'warn',
      'jsdoc/require-throws': 'error',
      'jsdoc/require-jsdoc': [
        'off',
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ClassProperty: true,
          },
        },
      ],
    },
  },
  //#endregion
];
