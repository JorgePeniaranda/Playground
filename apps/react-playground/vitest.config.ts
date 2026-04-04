import { createVitestConfig } from '../../configs/vitest/createVitestConfig.mjs';

export default createVitestConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
