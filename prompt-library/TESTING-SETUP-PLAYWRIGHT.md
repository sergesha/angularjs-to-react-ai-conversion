# Prompt: Setup Testing Infrastructure with Playwright for Visual Comparison

**Goal:** Establish a testing environment using Playwright to visually compare the original AngularJS application and the new React application side-by-side, facilitating a "test-compare-fix-retest" loop.

**Context:** You have the initial React project set up alongside the original AngularJS application (ideally as a Git submodule in `source-angularjs-app`). Now you need a way to systematically test and compare the visual output and behavior of both applications during the conversion process.

**Assumptions:**
*   Both the original AngularJS app and the new React app can be run locally.
*   You have Node.js and npm/yarn installed.

**Steps:**

1.  **Install Playwright:**
    *   Add Playwright as a development dependency to your React project.
    ```bash
    npm install --save-dev @playwright/test
    # or
    # yarn add --dev @playwright/test
    ```
    *   Install the necessary browser binaries.
    ```bash
    npx playwright install
    ```

2.  **Configure Playwright:**
    *   Initialize Playwright configuration (if you don't have one).
    ```bash
    npx playwright init
    ```
    *   Modify the `playwright.config.ts` (or `.js`) file:
        *   Define two `webServer` configurations within the `projects` array (or adjust the default `webServer`): one to serve the original AngularJS app and one to serve the new React app. Specify different ports for each.
        *   Ensure the `baseURL` is correctly set for tests targeting the React app (e.g., `http://localhost:3000`).
        *   You might need separate Playwright projects configured if running both servers simultaneously via Playwright's `webServer` proves difficult. Alternatively, manage server startup outside of Playwright (recommended: run servers in separate terminals).

3.  **Create Comparison Test Structure:**
    *   Create a dedicated directory for comparison tests (e.g., `e2e-comparison`).
    *   Inside this directory, create your first test file (e.g., `phone-list.spec.ts`).

4.  **Write Initial Comparison Test:**
    *   Import necessary modules from `@playwright/test`.
    *   Write a test suite (using `test.describe`) for a specific page or component (e.g., 'Phone List Page Comparison').
    *   Inside the suite, write a test case (using `test`) that performs visual comparison using snapshots:
        *   Define the URLs for the AngularJS page and the React page.
        *   **AngularJS Baseline:** Navigate to the AngularJS page, wait for stability, and take a snapshot. This establishes the "correct" look.
          ```typescript
          test('Compare Phone List Page', async ({ page }) => {
            // Baseline Snapshot (AngularJS)
            await page.goto('http://localhost:8000/#!/phones'); // Adjust port/path if needed
            // Add waits if necessary for dynamic content
            await page.waitForSelector('.phones li', { state: 'visible' });
            await expect(page).toHaveScreenshot('phone-list-baseline.png');

            // React Comparison
            await page.goto('http://localhost:3000/phones'); // Adjust port/path if needed (React URL)
            await page.waitForSelector('.phone-item', { state: 'visible' }); // Use React app's selector
            // Compare React app screenshot against the baseline snapshot
            await expect(page).toHaveScreenshot('phone-list-baseline.png');
          });
          ```
        *   The first time `toHaveScreenshot` runs, it saves the snapshot (`phone-list-baseline.png`). Subsequent runs compare the current page state against this saved snapshot.

5.  **Establish Test Execution Workflow:**
    *   Define `npm` scripts in your `package.json` to easily run:
        *   The AngularJS development server.
        *   The React development server.
        *   The Playwright comparison tests.
    ~~~json
    // package.json (example scripts)
    "scripts": {
      "start": "react-scripts start", // Or your React dev server command
      "start:angularjs": "cd source-angularjs-app && npm start", // Adjust path/command if needed
      "test:e2e": "npx playwright test --project=chromium", // Or your specific test command
      "test:e2e:update": "npx playwright test --update-snapshots" // To update snapshots when intended
      // ... other scripts
    }
    ~~~
    *   **Workflow:**
        1.  In one terminal, start the AngularJS server (`npm run start:angularjs`).
        2.  In another terminal, start the React server (`npm start`).
        3.  Run the Playwright tests (`npm run test:e2e`).
        4.  Analyze failures (Playwright provides visual diffs).
        5.  Fix issues in the React code.
        6.  Repeat steps 3-5 until the React component/page visually matches the AngularJS version (test passes).
        7.  If a visual change in the React version is intentional or an accepted improvement, update the baseline snapshot (`npm run test:e2e:update`).

**Expected Outcome:**
*   Playwright installed and configured in the React project.
*   A testing structure (`e2e-comparison` directory) for visual comparison tests.
*   An initial test case using `toHaveScreenshot` for comparing a specific view.
*   `npm` scripts to manage the servers and run the comparison tests.
*   A repeatable workflow for testing, comparing, fixing, and retesting components during the conversion using visual regression.
