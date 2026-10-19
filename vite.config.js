import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    copyPublicDir: !isSsrBuild,
    ...(isSsrBuild ? {} : {
      rolldownOptions: {
        input: {
          home: resolve(import.meta.dirname, 'index.html'),
          privacy: resolve(import.meta.dirname, 'politica-de-privacidade/index.html'),
        },
      },
    }),
  },
}));
