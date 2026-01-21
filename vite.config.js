import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Configuration pour GitHub Pages avec le nom de ton dépôt
  base: '/calendrier-vaccinal/',

  plugins: [react()],

  server: {
    open: true,
    port: 3000,
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})