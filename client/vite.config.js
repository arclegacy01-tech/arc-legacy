import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // VITE_* may live in client/.env or server/.env (monorepo convenience)
  const fromServer = loadEnv(mode, path.resolve(__dirname, '../server'), 'VITE_');
  const fromClient = loadEnv(mode, __dirname, 'VITE_');
  const viteEnv = { ...fromServer, ...fromClient };

  return {
    plugins: [react()],
    envDir: __dirname,
    define: Object.fromEntries(
      Object.entries(viteEnv).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)])
    ),
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:5050',
          changeOrigin: true,
        },
      },
    },
  };
});
