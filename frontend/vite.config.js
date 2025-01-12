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
        secure: false, // Allow insecure connections for development
        rewrite: (path) => {
          console.log(`Proxying request: ${path}`);
          return path.replace(/^\/url/, '');
        },
        onProxyReq: (proxyReq, req) => {
          // Forward cookies from frontend to backend
          if (req.headers.cookie) {
            proxyReq.setHeader('cookie', req.headers.cookie);
          }
        },
      },
    },
  },
})