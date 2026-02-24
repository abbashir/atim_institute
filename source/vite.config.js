import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: '0.0.0.0', // Essential: Allows outside access
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost', // Browser looks here for HMR
        },
        watch: {
            usePolling: true, // Fixes "file change not detected" on Windows/Mac
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: [
                'resources/routes/**',
                'routes/**',
                'resources/views/**',
                // Only watch specific PHP folders to prevent log spam
            ],
        }),
        react(),
    ],
});