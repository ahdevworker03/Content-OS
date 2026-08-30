import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Serve the workspace directory (sibling of the renderer) as static assets
  // so `/carousel.json` resolves in dev and is copied into builds. This is the
  // file Workflow 03 writes — the single source of truth for the renderer.
  publicDir: "../workspace",
  build: {
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        manualChunks: {
          "export-libs": ["jspdf", "jszip", "html-to-image"],
        },
      },
    },
  },
});