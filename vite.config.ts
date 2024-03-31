import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/everything': 'https://newsapi.org/v2',
      '/top-headlines': 'https://newsapi.org/v2',
    },
    host: true,
  },
  plugins: [react()],
});
