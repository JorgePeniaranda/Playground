import jsdoc from 'eslint-plugin-jsdoc';
import { defineConfig } from 'eslint/config';

const javascriptFiles = ['**/*.{js,mjs,cjs}'];
const jsdocRecommended = jsdoc.configs['flat/recommended-error'];

export default defineConfig({
  ...jsdocRecommended,
  files: javascriptFiles,
  rules: {
    ...jsdocRecommended.rules,
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-description': 'off',
  },
});
