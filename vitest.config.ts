import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  configFile: false,
  plugins: [react()],
  define: {
    "import.meta.env.VITE_SOCKET_URL": JSON.stringify("http://localhost:3001"),
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "tests/e2e/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/components/**",
        "src/services/**",
        "src/routes/**",
        "src/lib/ops.functions.ts",
        "src/lib/error-capture.ts",
        "src/lib/error-page.ts",
        "src/lib/error-reporting.ts",
        "src/lib/utils.ts",
        "src/**/*.d.ts",
        "src/routeTree.gen.ts",
        "src/start.ts",
        "src/router.tsx",
        "src/**/*.test.{ts,tsx}",
        "src/**/__tests__/**",
      ],
      thresholds: {
        lines: 65,
        statements: 60,
        functions: 55,
        branches: 65,
      },
    },
  },
});
