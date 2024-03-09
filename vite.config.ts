import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@base', replacement: path.resolve(__dirname, 'src/base') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@constants', replacement: path.resolve(__dirname, 'src/constants') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
      { find: '@layouts', replacement: path.resolve(__dirname, 'src/layouts') },
    ],
  },
});
