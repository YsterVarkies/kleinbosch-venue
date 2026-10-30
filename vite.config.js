import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/kleinbosch-venue/' : '/',
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 5190 },
  preview: { port: 4190 },
  build: { target: 'es2020', chunkSizeWarningLimit: 1500 }
});
