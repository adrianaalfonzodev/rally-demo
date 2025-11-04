import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Base path para producción, usa ASSET_BASE si está definido en .env
  base: process.env.ASSET_BASE || '/build/',

  plugins: [
    laravel({
      input: ['resources/js/app.tsx'], // tu entry point principal
      refresh: true, // hot reload para dev
    }),
    react(),
  ],

  build: {
    outDir: 'public/build', // donde se construyen los assets
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // asegura que los assets se pongan en /build/assets
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws',
    },
  },
});