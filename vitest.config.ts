import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 30000,
    hookTimeout: 30000,
    env: {
      // Load .env file for tests
      NODE_ENV: 'test'
    },
    setupFiles: ['./tests/setup-env.ts'],
    include: [
      'src/**/*.test.ts',
      'tests/unit/**/*.test.ts',
      'tests/integration/**/*.test.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/fixtures/',
        '**/*.d.ts',
        'vitest.config.ts',
        'tsup.config.ts'
      ]
    }
  }
})