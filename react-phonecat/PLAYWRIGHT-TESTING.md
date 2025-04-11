# Playwright Testing for PhoneCat Conversion

This document outlines the Playwright testing approach used to validate the conversion from AngularJS to React.

## Overview

We use Playwright to:
- Test functionality of the React application
- Compare functionality between the AngularJS and React versions
- Perform visual regression testing

## Test Structure

The tests are organized into three main files:

1. `phone-list.spec.js` - Tests for the phone list component
2. `phone-detail.spec.js` - Tests for the phone detail component
3. `comparison.spec.js` - Comparison tests between AngularJS and React versions

## Running the Tests

### Prerequisites

- Both the AngularJS and React applications need to be set up
- Node.js and npm installed

### Installation

Playwright is installed as a dev dependency:

```bash
npm install -D @playwright/test
```

### Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/phone-list.spec.js
```

View test report:

```bash
npx playwright show-report
```

## Test Configuration

The `playwright.config.js` file configures the testing environment:

- Sets up two web servers (React on port 3000, Angular on port 8000)
- Configures three test projects:
  - chromium - General Chromium browser tests
  - react-app - Tests specific to the React application
  - angular-app - Tests specific to the AngularJS application
- Sets timeouts and retries

## Visual Comparison

The tests capture screenshots of both applications for visual comparison. Screenshots are saved in the `screenshots` directory with naming conventions:

- `angular-*.png` - Screenshots of the AngularJS application
- `react-*.png` - Screenshots of the React application

## Validation Approach

Our tests verify that:

1. The React application renders the same number of phones
2. Search functionality works identically
3. Sorting functionality works identically
4. Detail pages show the same information
5. Thumbnail click behavior works the same
6. UI elements appear visually similar

## Reviewing Results

After running the tests, check:

1. Test pass/fail results
2. Visual comparison screenshots
3. Error messages for any failing tests