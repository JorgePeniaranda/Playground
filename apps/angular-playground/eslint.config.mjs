import { defineConfig, globalIgnores } from 'eslint/config';
import ignores from '../../configs/eslint/ignores.mjs';
import { angular, base, jsdoc, node, tests, typescript } from '../../configs/eslint/index.mjs';

export default defineConfig(base, jsdoc, node, angular, tests, typescript, globalIgnores(ignores));
