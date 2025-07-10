import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],

    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
    },
  },
  resolve: {
    alias: {
      '#src': path.resolve(__dirname, './src'),
      '#db': path.resolve(__dirname, './db'),
    },
  },
});
