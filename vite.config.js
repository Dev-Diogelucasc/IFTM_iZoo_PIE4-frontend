import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "./", "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/usuario": {
          target:
            env.VITE_API_URL || "https://iftm-izoo-pie4-backend.onrender.com",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
