# AngularJS to React Conversion - Testing Prompts

This document contains prompts to help set up and implement testing for AngularJS to React conversions, particularly using Playwright for UI and functional testing.

## Installing Playwright

```
I need to set up Playwright for end-to-end testing of my React application that was converted from AngularJS. Please:

1. Add Playwright as a dev dependency
2. Create a basic playwright.config.js file
3. Set up scripts in package.json for running the tests
```

## Creating Basic Test Structure

```
I need to create Playwright tests for my React application that was converted from AngularJS. The application is a phone catalog with a list view and a detail view. Please:

1. Create a test file for the phone list page that tests:
   - Filtering phones by search text
   - Sorting phones by name and age
   - Navigation to the detail page

2. Create a test file for the phone detail page that tests:
   - Displaying phone specifications
   - Image carousel functionality
   - Back button navigation
```

## Comparison Testing Between Angular and React Versions

```
I need to create Playwright tests to compare my original AngularJS application and the new React conversion. Please:

1. Create test scripts that perform the same actions on both applications
2. Take screenshots of key screens in both applications for visual comparison
3. Compare functionality like filtering, sorting, and navigation
4. Create a script that runs both applications and executes the comparison tests
```

## Test Report Generation

```
I need to set up comprehensive test reporting for my Playwright tests comparing AngularJS and React versions. Please:

1. Configure the Playwright HTML reporter
2. Create a custom report that highlights differences between the applications
3. Add scripts to generate and view the reports
```

## Visual Regression Testing Setup

```
I need to set up visual regression testing to ensure my React conversion visually matches the original AngularJS application. Please:

1. Set up Playwright for visual comparison testing
2. Create a test that captures key screens in both applications
3. Implement comparison logic to identify visual differences
4. Generate a report showing any visual discrepancies
```

## Test Fixtures and Test Data Setup

```
I need to set up test fixtures and test data for my Playwright tests comparing AngularJS and React applications. Please:

1. Create reusable test fixtures for common test scenarios
2. Set up a mechanism to ensure both applications use the same test data
3. Implement before/after hooks for test setup and teardown
```

## Mobile Responsive Testing

```
I need to test how both my AngularJS original and React conversion behave on mobile devices. Please:

1. Configure Playwright to test on mobile viewport sizes
2. Create tests that verify responsive design functionality
3. Compare mobile behavior between the two versions
```

## Accessibility Testing

```
I need to add accessibility testing to my Playwright tests to ensure both AngularJS and React versions are accessible. Please:

1. Add Playwright accessibility testing capabilities
2. Create tests that check for WCAG compliance
3. Compare accessibility between the Angular and React versions
```