import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/calendrier-vaccinal/',

  plugins: [react()],

  server: {
    open: true,
    port: 3000,
  },

  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
})