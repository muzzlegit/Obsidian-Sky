import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#': resolve(__dirname, './src/'),
      '#client': resolve(__dirname, './src/client/'),
      '#server': resolve(__dirname, './src/server/'),
      '#store': resolve(__dirname, './src/store/'),
      '#game': resolve(__dirname, './src/game/'),
      '#shared': resolve(__dirname, './src/shared/'),
    },
  },
});
