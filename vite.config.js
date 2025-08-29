import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['ai-cartoons.onrender.com'] // Добавь эту секцию
  }
})
