import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Supprimez toute ligne qui importe tailwindcss ici
export default defineConfig({
  plugins: [react()],
})