import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function manualChunks(id: string) {
  if (id.includes("node_modules")) {
    return "vendor";
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
});
