import { defineConfig, globalIgnores } from 'eslint/config';
import ignores from './configs/eslint/ignores.mjs';
import { base, jsdoc, node, typescript } from './configs/eslint/index.mjs';

export default defineConfig(base, jsdoc, node, typescript, globalIgnores(ignores));
