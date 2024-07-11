import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';

dotenv.config();

const base = process.env.VITE_BASE_URL || '/';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? process.env.VITE_BASE_URL : '/',
  plugins: [react()],
  server: {
    host: true,
  },
});
