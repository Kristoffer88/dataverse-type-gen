import { defineConfig } from 'tsup'

export default defineConfig([
  // Main library build
  {
    entry: { index: 'src/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    target: 'es2022',
    outDir: 'dist',
    clean: true,
    treeshake: true,
    external: ['commander', '@azure/msal-node', '@azure/identity'],
    outExtension({ format }) {
      return {
        js: format === 'esm' ? '.mjs' : '.js'
      }
    }
  },
  // CLI build (CommonJS only for executable)
  {
    entry: { 'bin/cli': 'src/bin/cli.ts' },
    format: ['cjs'],
    sourcemap: true,
    target: 'es2022',
    outDir: 'dist',
    clean: false,
    treeshake: true,
    external: ['commander', '@azure/msal-node', '@azure/identity'],
    outExtension() {
      return {
        js: '.cjs'
      }
    }
  }
])