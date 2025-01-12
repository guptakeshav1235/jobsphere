import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/url': {
        target: process.env.VITE_API_URL || 'http://localhost:5298',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(`Proxying request: ${path}`); // Log proxy paths
          return path.replace(/^\/url/, '');
        },
      }
    }
  }
})
