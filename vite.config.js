import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const process = require('process');

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api/springboot': {
          target: env.VITE_SPRINGBOOT_TARGET || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\/springboot/, ''),
        },
        '/api/flask': {
          target: env.VITE_FLASK_TARGET || 'http://localhost:5000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\/flask/, ''),
        },
      },
      hmr: {
        overlay: false,
      },
    },
  });
};
