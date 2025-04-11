# AngularJS to React Conversion - Testing Prompt

## Context
When converting an AngularJS application to React, it's important to verify that the React version correctly implements all functionality and maintains the same user experience. Playwright is an excellent tool for creating automated tests that compare both applications.

## Prompt

Convert the following AngularJS test to a Playwright test that can verify the same functionality in both the AngularJS and React versions of the application:

```javascript
// Example AngularJS E2E test
describe('PhoneCat Application', function() {
  it('should filter the phone list as a user types into the search box', function() {
    browser.get('index.html');
    
    var phoneList = element.all(by.repeater('phone in $ctrl.phones'));
    var query = element(by.model('$ctrl.query'));
    
    expect(phoneList.count()).toBe(20);
    
    query.sendKeys('motorola');
    expect(phoneList.count()).toBe(8);
    
    query.clear();
    query.sendKeys('nexus');
    expect(phoneList.count()).toBe(1);
  });
});
```

Convert this to a Playwright test that:
1. Tests the same functionality in both the AngularJS and React versions
2. Compares the results between the two implementations
3. Uses modern async/await syntax
4. Follows Playwright best practices
5. Includes appropriate selectors for both applications

## Response Template

```javascript
const { test, expect } = require('@playwright/test');

test.describe('PhoneCat Application', () => {
  test('should filter the phone list as a user types into the search box in both Angular and React versions', async ({ page }) => {
    // Angular version test
    // ...
    
    // React version test
    // ...
    
    // Compare results
    // ...
  });
});
```

## Additional Instructions

1. Create selectors that work for both the Angular and React versions of the application
2. Include appropriate waiting mechanisms for each application
3. Take screenshots of key states for visual comparison
4. Handle any known differences between the implementations
5. Add clear comments explaining the testing approach

## Example Selectors
- AngularJS: Input with ng-model="$ctrl.query"
- React: Input with data-testid="phone-list-search"

## Important Testing Areas
- Search functionality
- Sorting functionality
- Phone detail navigation
- Thumbnail image switching
- Filtering by phone properties