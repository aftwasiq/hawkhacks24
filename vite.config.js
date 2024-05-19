import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [
    react(),
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
    }),
    inject({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  resolve: {
    alias: {
      '@': '/FrontEnd/src',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
});
