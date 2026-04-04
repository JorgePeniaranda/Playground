import BaseEslintConfig from './base.mjs';
import NodeEslintConfig from './node.mjs';
import ReactEslintConfig from './react.mjs';
import TestsEslintConfig from './tests.mjs';
import TypescriptEslintConfig from './typescript.mjs';

export default {
  base: BaseEslintConfig,
  node: NodeEslintConfig,
  react: ReactEslintConfig,
  tests: TestsEslintConfig,
  typescript: TypescriptEslintConfig,
};
