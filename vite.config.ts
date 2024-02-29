import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@base', replacement: path.resolve(__dirname, 'src/base') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
    ],
  },
});
