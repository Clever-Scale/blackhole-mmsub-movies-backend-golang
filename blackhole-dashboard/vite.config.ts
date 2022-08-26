import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@localization": path.resolve(__dirname, "./src/localization"),
      "@atoms": path.resolve(__dirname, "./src/atoms"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@components": path.resolve(__dirname, "./src/Components"),
      "@libs": path.resolve(__dirname, "./src/libs"),
      "@apis": path.resolve(__dirname, "./src/apis"),
    },
  },
});
