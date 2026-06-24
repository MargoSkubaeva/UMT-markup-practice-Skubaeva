import { defineConfig } from 'vite';

export default defineConfig({
  base: '/UMT-markup-practice-Skubaeva/',
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
