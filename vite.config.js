import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
<<<<<<< HEAD
      '/api': {
        target: "http://localhost:5173",
=======
      '/api/springboot': {
        target: 'http://localhost:8080',
>>>>>>> 75349e722917801ff00cb1c7789a445c2c368578
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/springboot/, ''),
      },
      '/api/flask': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/flask/, ''),
      },
    },
  },
});
