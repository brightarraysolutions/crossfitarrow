import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src/assets',
  build: {
    outDir: '../../dist/assets', // Best to isolate Vite output inside dist
    emptyOutDir: false,
    manifest: true,
    rollupOptions: {
      input: {
        style: path.resolve(__dirname, 'src/assets/style.scss'),
        script: path.resolve(__dirname, 'src/assets/script.js')  // Add your JS entry here
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ''
      }
    }
  }
});
