import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // El dominio personalizado publica el sitio desde la raíz.
  base: '/',
  plugins: [react()],
})
