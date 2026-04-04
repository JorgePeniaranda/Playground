import { defineConfig, globalIgnores } from 'eslint/config';
import ignores from '../../configs/eslint/ignores.mjs';
import { base, node, react, tests, typescript } from '../../configs/eslint/index.mjs';

export default defineConfig(base, node, react, tests, typescript, globalIgnores(ignores));
