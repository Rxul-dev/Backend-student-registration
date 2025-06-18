import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/students': 'http://localhost:3000',
      '/courses': 'http://localhost:3000',
      '/enrollments': 'http://localhost:3000',
    },
  },
})
