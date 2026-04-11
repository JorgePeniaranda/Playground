import { defineConfig, globalIgnores } from 'eslint/config';
import ignores from '../../configs/eslint/ignores.mjs';
import { base, jsdoc, node, react, tests, typescript } from '../../configs/eslint/index.mjs';

export default defineConfig(base, jsdoc, node, react, tests, typescript, globalIgnores(ignores));
