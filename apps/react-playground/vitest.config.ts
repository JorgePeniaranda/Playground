import react from '@vitejs/plugin-react';
import { createVitestConfig } from '../../configs/vitest/createVitestConfig.mjs';

export default createVitestConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
