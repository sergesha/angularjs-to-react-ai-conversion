# AngularJS to React Conversion - Testing Prompts

This document contains prompts designed to help with creating and running tests to validate the conversion from AngularJS to React.

## Setting Up Playwright for Comparison Testing

```prompt
I'm converting an AngularJS application to React and want to set up Playwright to validate the conversion. 
I need to:

1. Test both applications side-by-side
2. Compare functionality between AngularJS and React versions
3. Perform visual regression testing

Please help me set up Playwright with:
- Configuration to run both applications
- Test scripts to validate identical functionality
- Visual comparison tests
- A script to generate a comparison report

Here are the details of my applications:
- AngularJS app runs on port 8000
- React app runs on port 3000
- I need to test [describe specific functionality you want to test]
```

## Creating Functional Tests for React Components

```prompt
I need to create Playwright tests for my React application that was converted from AngularJS.
Please help me create tests for the following component: [component name]

The component should:
- [Describe expected behavior 1]
- [Describe expected behavior 2]
- [Describe expected behavior 3]

The component has these key UI elements:
- [Element 1] with selector [selector]
- [Element 2] with selector [selector]
- [Element 3] with selector [selector]

I want to test both basic functionality and edge cases.
```

## Creating Comparison Tests Between AngularJS and React

```prompt
I need to create Playwright tests that compare the behavior of my original AngularJS application with my new React conversion.

Specifically, I want to compare:
1. [Feature 1] which works by [description]
2. [Feature 2] which works by [description]
3. [Feature 3] which works by [description]

The AngularJS application uses these selectors:
- [Feature 1]: [selector]
- [Feature 2]: [selector]
- [Feature 3]: [selector]

The React application uses these selectors:
- [Feature 1]: [selector]
- [Feature 2]: [selector]
- [Feature 3]: [selector]

Please provide a Playwright test script that validates the functionality works identically in both applications.
```

## Visual Regression Testing

```prompt
I need to set up visual regression testing to compare my AngularJS and React applications.

Please help me create Playwright tests that:
1. Navigate to key pages in both applications:
   - Home/List page
   - Detail page for [specific item]
   - [Any other important pages]

2. Capture screenshots at the same viewport sizes
   - Desktop: 1280x800
   - Tablet: 768x1024
   - Mobile: 375x667

3. Perform key interactions before screenshots:
   - Searching for "[search term]"
   - Sorting by [sort option]
   - Clicking on [specific element]

4. Generate a report comparing the screenshots
```

## Creating Test Documentation

```prompt
I need to create documentation for my Playwright testing approach for my AngularJS to React conversion project.

Please create a comprehensive markdown document covering:
1. Setup instructions for the testing environment
2. Description of test files and their purpose
3. How to run the tests
4. How to interpret the results
5. Troubleshooting common issues
6. Examples of adding new tests

The testing suite includes:
- Functional tests for React components
- Comparison tests between AngularJS and React
- Visual regression tests
```

## Troubleshooting Playwright Tests

```prompt
I'm having issues with my Playwright tests for comparing my AngularJS and React applications.

The specific issue is:
[Describe the issue in detail]

Here's the test code that's failing:
```
[Your test code here]
```

The error message I'm getting is:
[Error message]

Please help me diagnose and fix this issue, considering that I'm testing across two different frameworks.
```

## Analyzing Test Results

```prompt
I've run my Playwright comparison tests between my AngularJS and React applications,
and I need help analyzing the results to identify any conversion issues.

Here's the test report summary:
[Paste report summary or describe results]

These tests failed:
[List failed tests]

Visual differences were detected in these areas:
[Describe visual differences]

Please help me understand:
1. What might be causing these differences
2. How critical these issues are
3. How to fix each type of issue
4. What additional tests might be needed
```

## Example Prompt for Phone List Component Testing

```prompt
I need to create Playwright tests for the phone list component in my React application that was converted from AngularJS.

The phone list component should:
- Display a list of phones with images and descriptions
- Allow filtering phones by typing in a search box
- Allow sorting phones by name or age
- Navigate to a detail page when a phone is clicked

The component has these key UI elements:
- Search input with data-testid="search-input"
- Sort select with data-testid="sort-select"
- Phone items in a list with class ".phones li"
- Phone names with class ".phones li .name"
- Phone images with class ".phones li img"

I want to test both basic functionality and edge cases like empty search results.
```