# How to Run PhoneCat Comparison Tests

This guide explains how to run the Playwright tests that compare the original AngularJS PhoneCat application with our React conversion.

## Prerequisites

1. Node.js and npm installed on your system
2. Both applications set up on your local machine

## Setup

### 1. Install Playwright Dependencies

```bash
# From the react-phonecat directory
npm install

# Install Playwright browsers
npx playwright install
```

### 2. Prepare the AngularJS Application

Make sure the original AngularJS PhoneCat application is set up:

```bash
# From the angular-phonecat directory
npm install
```

## Running Tests

### Run All Tests

```bash
npm run test:e2e
```

### Run Just the Comparison Tests

```bash
npm run test:comparison
```

### Run Tests with UI Mode

```bash
npm run test:ui
```

### View Test Report

After running tests, you can view the report:

```bash
npm run test:report
```

## Comparing Screenshots

The tests automatically take screenshots of both applications for visual comparison. These screenshots are stored in the `screenshots` directory:

- `angular-home.png` - AngularJS home page
- `react-home.png` - React home page
- `angular-filtered.png` - AngularJS with search filter applied
- `react-filtered.png` - React with search filter applied
- `angular-detail.png` - AngularJS detail page
- `react-detail.png` - React detail page
- `angular-detail-thumb-click.png` - AngularJS after thumbnail click
- `react-detail-thumb-click.png` - React after thumbnail click

Compare these screenshots to identify any visual differences between the applications.

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure no other applications are using ports 3000 or 8000
2. **Missing dependencies**: Run `npm install` in both project directories
3. **Timeout errors**: Increase the timeout values in the test files if needed
4. **Screenshot folder missing**: Create the `screenshots` directory if it doesn't exist

### Debugging Failed Tests

You can debug failed tests by:

1. Running with UI mode: `npm run test:ui`
2. Checking the HTML report: `npm run test:report`
3. Adding `--debug` flag: `npx playwright test --debug`