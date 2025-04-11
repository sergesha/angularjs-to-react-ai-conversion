// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'react-app',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'angular-app',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:8000',
      },
    },
  ],

  webServer: [
    {
      command: 'npm start',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd ../angular-phonecat && npm start',
      url: 'http://localhost:8000',
      reuseExistingServer: !process.env.CI,
    }
  ],
});