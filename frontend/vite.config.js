import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
        // rewrite: (path) => path.replace(/^\/api\/v1/, ''), // Adjusted rewrite function
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor"; // all npm dependencies in one chunk
            }
            if (id.includes("src/components")) {
              return "components"; // all components in another chunk
            }
          },
        },
      },
    },
  },
  plugins: [react()],
});
