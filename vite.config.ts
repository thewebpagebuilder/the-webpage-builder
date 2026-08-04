import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fix for Windows MIME type issue (forces correct JS MIME types locally)
const fixMimeTypesPlugin = () => ({
  name: 'fix-mime-types',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (req.url && (req.url.endsWith('.tsx') || req.url.endsWith('.ts') || req.url.endsWith('.jsx') || req.url.endsWith('.js'))) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      next();
    });
  }
});

// Plugin to copy index.html to 404.html for GitHub Pages SPA routing
const copy404Plugin = () => ({
  name: 'copy-404',
  writeBundle() {
    const distPath = path.resolve(__dirname, 'dist');
    const indexPath = path.join(distPath, 'index.html');
    const notFoundPath = path.join(distPath, '404.html');
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath);
    }
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), copy404Plugin(), fixMimeTypesPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          react: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion']
        }
      }
    }
  }
});
