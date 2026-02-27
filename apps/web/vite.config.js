import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'highway-changes-participated-coordinated.trycloudflare.com',
      '.trycloudflare.com'
    ],
  },
  build: {
    outDir: 'dist', // Explicitly set output directory
    emptyOutDir: true, // Clean dist before building
  }
})