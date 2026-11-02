import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  publicDir: "Public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./Src"),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
