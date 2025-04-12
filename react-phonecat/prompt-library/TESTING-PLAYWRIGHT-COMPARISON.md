# Prompt: Testing AngularJS to React Conversion with Playwright

## Context
When converting an AngularJS application to React, it's crucial to verify that both applications behave and appear the same. Playwright is an excellent tool for automated testing that can help us validate our conversion.

## Prompt
Create a comprehensive testing suite using Playwright to compare the AngularJS and React versions of our application. The tests should verify both functional equivalence and visual similarity.

## Components to Include

### 1. Test Configuration

```javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

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
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'cd react-app && npm start',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd angular-app && npm start',
      port: 8000,
      reuseExistingServer: !process.env.CI,
    }
  ],
});
```

### 2. Functionality Comparison Tests

```javascript
// functionality-comparison.spec.js
const { test, expect } = require('@playwright/test');

// Configuration for both applications
const angularApp = {
  baseUrl: 'http://localhost:8000',
  name: 'Angular'
};

const reactApp = {
  baseUrl: 'http://localhost:3000',
  name: 'React'
};

test.describe('Functionality Comparison', () => {
  test('Navigation and routing should work the same', async ({ page }) => {
    // Test Angular navigation
    await page.goto(angularApp.baseUrl);
    const angularInitialTitle = await page.title();
    
    // Navigate to a detail page
    await page.click('ul.phones li:first-child a');
    const angularDetailUrl = page.url();
    
    // Test React navigation
    await page.goto(reactApp.baseUrl);
    const reactInitialTitle = await page.title();
    
    // Navigate to a detail page
    await page.click('ul.phones li:first-child a');
    const reactDetailUrl = page.url();
    
    // Compare behavior
    expect(angularInitialTitle).toEqual(reactInitialTitle);
    expect(reactDetailUrl).toContain('/phones/');
  });
  
  test('Search functionality should work the same', async ({ page }) => {
    // Angular search test
    await page.goto(`${angularApp.baseUrl}/#!/phones`);
    await page.fill('input[ng-model="$ctrl.query"]', 'motorola');
    const angularResults = await page.locator('ul.phones li').count();
    
    // React search test
    await page.goto(`${reactApp.baseUrl}/phones`);
    await page.fill('input[data-testid="search-input"]', 'motorola');
    const reactResults = await page.locator('ul.phones li').count();
    
    // Compare results
    expect(angularResults).toEqual(reactResults);
  });
});
```

### 3. Visual Comparison Tests

```javascript
// visual-comparison.spec.js
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Configuration for both applications
const angularApp = {
  baseUrl: 'http://localhost:8000',
  name: 'Angular'
};

const reactApp = {
  baseUrl: 'http://localhost:3000',
  name: 'React'
};

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

test.describe('Visual Comparison', () => {
  test.beforeEach(async () => {
    ensureDirectoryExists('tests/results');
  });
  
  test('Phone list page should look the same', async ({ page }) => {
    // Capture Angular screenshot
    await page.goto(`${angularApp.baseUrl}/#!/phones`);
    await page.waitForTimeout(1000); // Wait for images to load
    await page.screenshot({ path: 'tests/results/angular-list.png', fullPage: true });
    
    // Capture React screenshot
    await page.goto(`${reactApp.baseUrl}/phones`);
    await page.waitForTimeout(1000); // Wait for images to load
    await page.screenshot({ path: 'tests/results/react-list.png', fullPage: true });
    
    // Implement screenshot comparison (requires additional library)
    expect(fs.existsSync('tests/results/angular-list.png')).toBeTruthy();
    expect(fs.existsSync('tests/results/react-list.png')).toBeTruthy();
  });
});
```

### 4. Package.json Scripts

```json
"scripts": {
  "test:e2e": "playwright test",
  "test:ui": "playwright test --ui",
  "test:comparison": "playwright test functionality-comparison.spec.js",
  "test:visual": "playwright test visual-comparison.spec.js",
  "test:report": "npx playwright show-report"
}
```

## Implementation Steps

1. Set up Playwright in your project:
   ```bash
   npm install -D @playwright/test
   npx playwright install
   ```

2. Create the test directory structure:
   ```bash
   mkdir -p tests/screenshots
   ```

3. Implement the test files as shown above.

4. Add the scripts to your package.json file.

5. Run the tests:
   ```bash
   npm run test:e2e
   ```

6. View the report:
   ```bash
   npm run test:report
   ```

## Expected Outcome

The tests will identify any differences between the AngularJS and React implementations, including:

1. Functional differences (navigation, search, sorting)
2. Visual differences (layout, styling, animations)
3. Performance differences (loading times, rendering speed)

By addressing these differences, you can ensure that your React implementation faithfully reproduces the behavior and appearance of the original AngularJS application.

## Common Issues to Watch For

1. URL pattern differences (AngularJS often uses hash-based routing)
2. Event handling differences (click behavior, form submissions)
3. Animation timing and implementation differences
4. CSS class naming and specificity differences
5. Data loading and state management differences

Adjusting for these differences will help achieve a more accurate conversion.
