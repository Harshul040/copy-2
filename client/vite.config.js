//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//export default defineConfig({
  //plugins: [react()],
//})
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      //'/api': 'http://localhost:8800',
      '/api': {
      target: 'http://localhost:8800',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''), // Ensures the Host header matches the target
    },
    },
  },
});
