import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(projectRoot, 'index.html'),
        menu: resolve(projectRoot, 'menu/index.html'),
        story: resolve(projectRoot, 'story/index.html'),
        visit: resolve(projectRoot, 'visit/index.html'),
      },
    },
  },
});
