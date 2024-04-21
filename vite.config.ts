import path from "path";
import colors from "./src/styles/colors";
import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "normalize.css";
          @import "./src/styles/fonts.scss";
          ${Object.entries(colors)
            .map(([key, value]) => `$${key}: ${value};`)
            .join("\n")}
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
