# Prompt: Setup Testing Workflow for AngularJS to React Conversion

This prompt guides the setup of a testing workflow focused on comparing the original AngularJS application with the new React conversion, aiming for functional and visual parity.

**Goal:** Implement a "test-compare-fix-retest" loop using Playwright for automated visual regression testing and comparison.

**Prerequisites:**

*   The React project skeleton is set up (see `PROJECT-SETUP.md`).
*   The original AngularJS application is available (ideally runnable locally, perhaps via the submodule).

**Steps:**

1.  **Install Playwright:**
    *   Navigate to your React application's directory (e.g., `react-app` or the project root).
    *   Install Playwright and its dependencies:
        ```bash
        npm init playwright@latest
        # Follow the interactive prompts. Choose TypeScript or JavaScript.
        # This will set up configuration files (playwright.config.ts/js), example tests, and install necessary browsers.
        ```

2.  **Configure Playwright:**
    *   Open `playwright.config.ts` (or `.js`).
    *   Define two `baseURL` configurations within the `projects` array (or `use` section if not using projects), one for the running AngularJS app and one for the running React app:
        ```typescript
        import { defineConfig, devices } from '@playwright/test';

        export default defineConfig({
          testDir: './tests', // Or wherever your tests will live
          /* Maximum time one test can run for. */
          timeout: 30 * 1000,
          expect: {
            timeout: 5000
          },
          fullyParallel: true,
          reporter: 'html',
          use: {
            /* Base URL to use in actions like `await page.goto('/')`. */
            // baseURL: 'http://localhost:3000', // Set per project below
            trace: 'on-first-retry',
          },

          projects: [
            {
              name: 'react-app',
              use: { 
                ...devices['Desktop Chrome'],
                baseURL: 'http://localhost:3000' // Adjust port if needed
              },
            },
            {
              name: 'angularjs-app',
              use: { 
                ...devices['Desktop Chrome'],
                baseURL: 'http://localhost:8000' // Adjust port for your AngularJS setup
               },
            },
            // Add other browsers/devices if needed
          ],

          /* Run your local dev server before starting the tests */
          // webServer: { // Configure if needed, might run servers separately
          //   command: 'npm run start',
          //   port: 3000,
          // },
        });
        ```
    *   Adjust ports (`3000`, `8000`) according to how you run your development servers for React and AngularJS.

3.  **Create Comparison Test Structure:**
    *   Create a test file (e.g., `tests/visual-comparison.spec.ts`).
    *   Structure tests to perform the same actions on both applications and take screenshots for comparison.

4.  **Example Comparison Test (e.g., Homepage):**
    ```typescript
    import { test, expect } from '@playwright/test';

    test.describe('Visual Comparison: Homepage', () => {
      
      test('Compare Homepage - AngularJS vs React', async ({ page }, testInfo) => {
        // --- AngularJS Step ---
        // Navigate to the AngularJS app (Playwright uses baseURL from the 'angularjs-app' project)
        await page.goto('/'); 
        await expect(page).toHaveTitle(/AngularJS App Title/); // Verify title or key element
        // Add waits if necessary for elements to load
        await page.waitForSelector('your-angular-main-element'); 
        const angularScreenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach('angularjs-homepage', { body: angularScreenshot, contentType: 'image/png' });

        // --- React Step ---
        // This requires running the test specifically against the 'react-app' project.
        // You'd typically run tests twice, once for each project, or structure differently.
        // *Alternatively*, navigate explicitly if not using projects:
        // await page.goto('http://localhost:3000/'); 

        // *Assuming running with --project=react-app*:
        await page.goto('/'); // Navigates to React app baseURL
        await expect(page).toHaveTitle(/React App Title/);
        await page.waitForSelector('your-react-main-element');
        
        // Take screenshot for visual comparison
        await expect(page).toHaveScreenshot('homepage-react.png', { fullPage: true, maxDiffPixels: 100 }); // Adjust threshold

        // Optional: Compare with AngularJS screenshot (requires more setup)
        // Playwright's toHaveScreenshot handles visual regression against snapshots.
        // For direct A/B comparison, you might need image comparison libraries.
      });

      // Add more tests for different pages/states
      test('Compare Phone List Page', async ({ page }) => {
         // Navigate to phone list in AngularJS, take screenshot
         // Navigate to phone list in React, use toHaveScreenshot
      });
    });
    ```

5.  **Running Tests and Workflow:**
    *   **Run Original App:** Start the development server for the original AngularJS application (e.g., `npm start` in its directory).
    *   **Run React App:** Start the development server for the new React application (e.g., `npm start` in its directory).
    *   **Run Playwright Tests:**
        *   Update snapshots (first run or when changes are intentional):
            ```bash
            npx playwright test --project=react-app --update-snapshots
            ```
        *   Run tests to check for regressions:
            ```bash
            npx playwright test --project=react-app
            ```
        *   To manually *see* the AngularJS version for comparison (using the attach mechanism):
            ```bash
            npx playwright test --project=angularjs-app
            # Then review the attached screenshots in the HTML report.
            ```
    *   **Review Report:** Check the Playwright HTML report (`playwright-report/index.html`) for failures, screenshot diffs, and attached images.
    *   **Fix and Retest:** Identify discrepancies, fix the React code, and rerun the tests until visual and functional parity is achieved (within acceptable thresholds).

**Expected Outcome:**

*   Playwright installed and configured for the project.
*   Separate Playwright project configurations pointing to the running AngularJS and React applications.
*   A suite of visual regression tests comparing key pages/components of the React app against baseline snapshots.
*   A workflow established to run both dev servers, execute tests, review reports, fix issues in React, and retest.
*   Mechanism (like attachments or separate test runs) to capture screenshots of the *original* AngularJS app for reference during the comparison process.
