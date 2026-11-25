import { defineConfig, devices } from "@playwright/test";

// BASE_URL points the suite at a deployed site; otherwise it runs against a local production build.
const baseURL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "tests/e2e",
  forbidOnly: !!process.env.CI,
  use: { baseURL },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run start",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
      },
});
