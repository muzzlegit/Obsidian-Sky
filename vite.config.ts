import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

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
      '#transport': resolve(__dirname, './src/transport/'),
      '#shared': resolve(__dirname, './src/shared/'),
    },
  },
});
