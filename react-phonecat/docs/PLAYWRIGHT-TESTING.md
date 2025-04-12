# Playwright Testing for PhoneCat Application

This document outlines how to use Playwright to compare the AngularJS and React versions of the PhoneCat application.

## Setup

1. Install dependencies:
   ```bash
   cd react-phonecat
   npm install
   npx playwright install
   ```

2. Make sure both applications can run:
   ```bash
   # In angular-phonecat directory
   npm install
   
   # In react-phonecat directory
   npm install
   ```

## Running Tests

### Running All Tests

To run all tests:
```bash
cd react-phonecat
npm run test:e2e
```

### Running Specific Tests

To run only the functionality comparison tests:
```bash
npm run test:comparison
```

To run only the visual comparison tests:
```bash
npm run test:visual
```

### Running Tests with UI

To run tests with the Playwright UI (useful for debugging):
```bash
npm run test:ui
```

### Viewing Test Reports

To view the HTML report after running tests:
```bash
npm run test:report
```

## Test Structure

The tests are organized into two main categories:

1. **Functionality Comparison Tests** - These tests verify that both applications behave the same way:
   - Phone list page functionality (search, sort)
   - Phone detail page functionality (thumbnails, specifications)

2. **Visual Comparison Tests** - These tests capture screenshots of both applications for visual comparison:
   - Phone list page layout
   - Phone detail page layout
   - Responsive design for mobile viewports

## Test Results

After running the tests, you'll find screenshots in the `tests/results` directory that you can use for visual comparison:

- `angular-phone-list.png` vs `react-phone-list.png`
- `angular-phone-detail.png` vs `react-phone-detail.png`
- `angular-phone-list-mobile.png` vs `react-phone-list-mobile.png`

The HTML report will show which tests passed and which failed.

## Analyzing Differences

If you find differences between the applications, you should:

1. Check the CSS styles to ensure they match
2. Verify component structures are aligned
3. Ensure animations work the same way
4. Check that data loading and display are consistent

## Common Issues and Fixes

1. **Selection Differences** - Angular and React may use different selectors:
   - Angular: `ng-model="$ctrl.query"`
   - React: `data-testid="search-input"`

2. **Timing Issues** - Add appropriate waits:
   ```javascript
   await page.waitForTimeout(1000); // wait for animations or data to load
   ```

3. **Image Loading** - Ensure images are fully loaded:
   ```javascript
   await page.waitForLoadState('networkidle');
   ```

4. **Element Visibility** - Check if elements are visible:
   ```javascript
   await expect(page.locator('selector')).toBeVisible();
   ```
