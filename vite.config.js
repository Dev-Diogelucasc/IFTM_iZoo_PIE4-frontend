import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/usuario': {
        target: 'https://iftm-izoo-pie4-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
