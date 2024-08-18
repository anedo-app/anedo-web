import path from "path";
import colors from "./src/styles/colors";
import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "normalize.css";
          @import "./src/styles/fonts.scss";
          @import "./src/styles/texts.scss";
          @import "./src/styles/transitions.scss";
          @import "./src/styles/resets.scss";
          ${Object.entries(colors)
            .map(([key, value]) => `$${key}: ${value};`)
            .join("\n")}
        `,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
