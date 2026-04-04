import { defineConfig, globalIgnores } from 'eslint/config';
import ignores from './configs/eslint/ignores.mjs';
import { base, node, typescript } from './configs/eslint/index.mjs';

export default defineConfig(
  base,
  node,
  typescript,
  globalIgnores(ignores),
);
