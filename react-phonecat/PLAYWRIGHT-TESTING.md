# Playwright Testing

This guide explains how to use Playwright to test and compare the AngularJS and React versions of the PhoneCat application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Install additional dependencies for the Angular app:
   ```bash
   cd ../angular-phonecat
   npm install
   cd ../react-phonecat
   ```

## Running Tests

### Test React Application Only

```bash
# Run all tests on the React application
npm run test:e2e

# Run tests with UI mode for debugging
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug

# View the HTML report of the last test run
npm run test:e2e:report
```

### Compare Angular and React Applications

To run the comparison tests between the Angular and React applications:

```bash
npm run test:compare
```

This command will:
1. Start both the React app (on port 3000) and Angular app (on port 8000)
2. Wait for both apps to be available
3. Run the comparison tests that navigate through both apps and take screenshots

## Test Reports

After running the tests, Playwright generates HTML reports with details about test results, including screenshots of failures. You can view these reports by running:

```bash
npm run test:e2e:report
```

## Test Files

- `phone-list.spec.js`: Tests for the phone list page functionality
- `phone-detail.spec.js`: Tests for the phone detail page functionality
- `compare-angular-react.spec.js`: Comparison tests between Angular and React versions

## Screenshot Comparison

When running comparison tests, screenshots will be saved in the project root directory for both the Angular and React versions. These screenshots can be manually compared to see visual differences between the applications.

## Troubleshooting

- If you see EADDRINUSE errors, make sure ports 3000 and 8000 are not already in use by other applications.
- If the Angular app fails to start, try running it manually from its directory with `npm start` to see any specific errors.
- For more debugging options, see the [Playwright documentation](https://playwright.dev/docs/debug).