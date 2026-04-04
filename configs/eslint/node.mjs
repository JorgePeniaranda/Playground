import { defineConfig } from 'eslint/config';
import globals from 'globals';

const nodeFiles = [
  '**/*.{js,mjs,cjs}',
  '**/*.{ts,mts,cts}',
  'eslint.config.{js,mjs,cjs,ts,mts,cts}',
  '**/*.config.{js,mjs,cjs,ts,mts,cts}',
];

export default defineConfig({
  files: nodeFiles,
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
});
