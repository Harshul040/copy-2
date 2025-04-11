//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//export default defineConfig({
  //plugins: [react()],
//})
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No need for proxy since you're directly hitting the deployed backend URL
export default defineConfig({
  plugins: [react()],
});

