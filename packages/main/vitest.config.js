import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/unit/**.test.js'],
    globals: true,
    environment: 'jsdom',
  },
});