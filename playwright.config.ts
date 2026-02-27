import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e', // Directory for E2E tests
  timeout: 30000, // Timeout for each test
  retries: 2, // Retry failed tests
  use: {
    baseURL: 'http://localhost:4200', // Base URL for your app
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure', // Record video on failure
  },
});
