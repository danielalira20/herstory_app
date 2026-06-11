import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/chat": {
    target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
      "/api/match": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
      "/api": "http://localhost:3000",
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      strategies: "injectManifest",   
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "icons/*.svg", "icons/*.png"],
      manifest: {
        name: "Calculadora",
        short_name: "Calc",
        description: "Calculadora",
        theme_color: "#1C1C1E",
        background_color: "#1C1C1E",
        display: "standalone",
        orientation: "portrait",
        start_url: "/calc",
        scope: "/",
        icons: [
          { src: "/icons/calc-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icons/calc-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
  injectManifest: {
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
    globPatterns: ["**/*.{js,css,html,ico,svg,png,jpeg,jpg,woff2}"],
  },
  devOptions: {
  enabled: true,
  type: "module",
},

}),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));