import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // ou autre port si nécessaire
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        coverage: {
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: './coverage',
            include: ['src/**/*.{js,jsx}'], // inclure tous les fichiers source dans src/
            exclude: ['node_modules', 'tests/**/*'], // optionnel : exclure tests et node_modules
        },
    },
});