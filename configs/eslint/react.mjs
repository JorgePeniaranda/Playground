import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const sourceFiles = ['**/*.{jsx,tsx}'];

export default defineConfig(
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
);
