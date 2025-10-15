import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  build: {
    target: 'esnext', // Changed from es2020 to esnext to support BigInt
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: ['@assemblyscript/loader'],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // Changed to esnext
      define: {
        global: 'globalThis',
      },
      supported: {
        bigint: true, // Explicitly enable BigInt support
      },
    },
  },
})