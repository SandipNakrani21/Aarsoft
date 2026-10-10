import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: process.env.TEST_BASE_URL || 'http://localhost:3004', trace: 'retain-on-failure' },
  projects: [320, 390, 768, 1024, 1440, 1920].map(width => ({
    name: `chromium-${width}`,
    use: { browserName: 'chromium', viewport: { width, height: width < 768 ? 844 : 900 } },
  })),
  webServer: process.env.TEST_BASE_URL ? undefined : {
    command: 'npm run start -- --port 3004',
    url: 'http://localhost:3004',
    reuseExistingServer: !process.env.CI,
  },
});
