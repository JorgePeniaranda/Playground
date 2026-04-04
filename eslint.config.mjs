import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigs from './configs/eslint/index.mjs';

export default defineConfig(
  ...Object.values(eslintConfigs),
  //#region 🔹 Ignore paths that should not be linted
  globalIgnores([
    '**/coverage/',
    '**/out/',
    '**/dist/',
    '**/.tsbuild/',
    '**/*.tsbuildinfo',
    '**/.eslintcache',
    '**/.cache/',
    '**/.vite/',
    '**/vite.config.js.timestamp-*',
    '**/vite.config.ts.timestamp-*',
    'saves/',
  ]),
  //#endregion
);
