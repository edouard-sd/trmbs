import { defineConfig } from 'vite';

export default defineConfig({
  // ⚠️ Change 'trombinoscope-app' par le nom exact de ton repo GitHub
  base: '/trmbs/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true,
  },
});
