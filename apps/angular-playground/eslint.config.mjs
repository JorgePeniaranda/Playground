import { defineConfig, globalIgnores } from 'eslint/config';
import ignores from '../../configs/eslint/ignores.mjs';
import { angular, base, node, tests, typescript } from '../../configs/eslint/index.mjs';

export default defineConfig(base, node, angular, tests, typescript, globalIgnores(ignores));
