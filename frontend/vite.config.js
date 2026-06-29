import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // CRA emitted to build/ and firebase.json (`public: "frontend/build"`)
    // points there, so keep the same output dir instead of Vite's default dist/.
    outDir: 'build',
  },
});
