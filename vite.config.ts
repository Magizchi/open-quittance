import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
  server: {
    hmr: {
      port: 5173,
    },
    host: true,
    watch: {
      usePolling: true,
    },
  },
});
