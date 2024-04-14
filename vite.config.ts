import path from "path";
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
          @import "./src/styles/colors.scss";
          @import "./src/styles/fonts.scss";
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
