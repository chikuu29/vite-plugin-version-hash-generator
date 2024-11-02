import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: false, // Disables minification for easier debugging
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ViteImageOptimizer',
      formats: ['es', 'cjs'],
      fileName: 'index',// File names will be `index.es.js` and `index.cjs.js`
    },
    rollupOptions: {
      external: [
        // Specify external dependencies here
        'fs', 'path', 'vite' // Exclude Vite, fs, and path from the bundle
      ],
      output: {
        globals: {
          // Define global variables for UMD if you ever decide to add 'umd' format
          fs: 'fs',
          path: 'path',
          vite: 'vite',
        },
      },
    },
  },
});
