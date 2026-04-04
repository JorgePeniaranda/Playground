import { createVitestConfig } from '../../configs/vitest/createVitestConfig.mjs';

export default createVitestConfig({
  test: {
    environment: 'node',
    exclude: ['out/**', 'node_modules/**'],
  },
});
