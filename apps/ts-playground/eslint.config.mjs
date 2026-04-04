import { defineConfig, globalIgnores } from 'eslint/config';
import ignores from '../../configs/eslint/ignores.mjs';
import { base, node, tests, typescript } from '../../configs/eslint/index.mjs';

export default defineConfig(base, node, tests, typescript, globalIgnores(ignores));
