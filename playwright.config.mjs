import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  workers: 4,
  use: {
    baseURL: "http://127.0.0.1:4174",
    headless: true,
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm start",
    url: "http://127.0.0.1:4174",
    reuseExistingServer: !process.env.CI,
  },
  reporter: "list",
});
