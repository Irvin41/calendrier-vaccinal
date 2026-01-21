import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 1. Définissez la base pour le déploiement
  // Si vous déployez sur https://nom-utilisateur.github.io/mon-projet/
  // Remplacez 'mon-projet' par le nom exact de votre dépôt.
  // Si vous déployez sur un domaine racine (ex: Vercel ou Netlify), utilisez '/'
  base: '/nom-du-repo-github/',

  plugins: [react()],

  server: {
    // Optionnel : pour ouvrir automatiquement le navigateur en local
    open: true,
    port: 3000,
  },

  build: {
    // Optionnel : pour s'assurer que les assets sont bien générés
    outDir: 'dist',
    assetsDir: 'assets',
  }
})