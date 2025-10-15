import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
      external: (id) => {
        // Externalize all @safe-global packages (with or without 'This' suffix)
        if (id.includes('@safe-global')) return true
        if (id.includes('@assemblyscript/loader')) return true
        return false
      },
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.message.includes('@safe-global')) return
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