import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA} from "vite-plugin-pwa"
import path from "path";

function manualChunks(id: string) {
  if (id.includes("node_modules")) {
    return id.toString().split("node_modules/")[1].split("/")[0].toString();
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "Monange",
        name: "Monange",
        description: "An app for managing your money.",
        icons: [
          {
            src: "monange-white.svg",
            sizes: "80x80",
            type: "image/svg+xml",
          },
          {
            src: "monange-white.svg",
            sizes: "48x48 72x72 80x80 96x96 128x128 144x144 256x256 512x512",
            type: "image/svg+xml",
          },
        ],
        start_url: "/",
        display_override: ["fullscreen", "minimal-ui"],
        display: "standalone",
        background_color: "hsl(224 71.4% 4.1%)",
        theme_color: "hsl(263.4 70% 50.4%)",
        screenshots: [
          {
            src: "screenshots/account-iPhone-12-Pro.jpg",
            type: "image/jpg",
            sizes: "390x844",
            form_factor: "narrow",
          },
          {
            src: "screenshots/depts-iPad-mini.jpg",
            type: "image/jpg",
            sizes: "768x1024",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
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
