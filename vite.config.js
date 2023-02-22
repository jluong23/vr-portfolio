import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        templates: resolve(__dirname, "src/templates/menu.html"),
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
