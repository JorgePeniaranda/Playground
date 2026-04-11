import { defineConfig } from 'eslint/config';
import jsdoc from 'eslint-plugin-jsdoc';

const javascriptFiles = ['**/*.{js,mjs,cjs}'];
const jsdocRecommended = jsdoc.configs['flat/recommended-error'];

export default defineConfig({
  ...jsdocRecommended,
  files: javascriptFiles,
  rules: {
    ...jsdocRecommended.rules,
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-jsdoc': [
      'error',
      {
        require: {
          ArrowFunctionExpression: false,
          ClassDeclaration: true,
          ClassExpression: false,
          FunctionDeclaration: true,
          FunctionExpression: false,
          MethodDefinition: false,
        },
      },
    ],
    'jsdoc/require-returns-description': 'off',
  },
});
