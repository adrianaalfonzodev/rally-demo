import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // Base public path used to reference built assets. Set ASSET_BASE when building
    // to emit URLs under a subpath, e.g. ASSET_BASE='/erp/build/' will produce
    // references like '/erp/build/assets/your-file.js' in the manifest.
    base: process.env.ASSET_BASE || '/',
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        origin: 'http://localhost:5173',
        cors: true,
        hmr: {
            host: 'localhost',
            port: 5173,
            // port: 5080
            protocol: 'ws'
        },
        watch: {
            usePolling: true,
            interval: 100
        }
    }
});
