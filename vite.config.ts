// file configures Vite
// this is the build tool you're using. used to bundle code, optimize development experience, and handle tasks like live reloading

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
