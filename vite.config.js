import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'global': 'globalThis',
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: [
        '@assemblyscript/loader',
        '@safe-globalThis/safe-ethers-adapters',
        '@safe-global/safe-ethers-adapters'
      ],
      onwarn(warning, warn) {
        // Suppress "Module level directive" warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        // Suppress unresolved import warnings for safe-global packages
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.message.includes('@safe-global')) {
          return
        }
        warn(warning)
      }
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      define: {
        global: 'globalThis',
      },
      supported: {
        bigint: true,
      },
    },
  },
})