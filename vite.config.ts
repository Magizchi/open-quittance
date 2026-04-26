import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
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
  optimizeDeps: {
    exclude: ['nodemailer']
  },
  ssr: {
    noExternal: []
  }
});
