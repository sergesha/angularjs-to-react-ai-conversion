# Testing Conversion: AngularJS to React

This prompt guide focuses on converting AngularJS tests to React testing using Jest and React Testing Library, as well as setting up end-to-end tests with tools like Playwright.

## Unit Tests Conversion

Use this prompt to convert AngularJS unit tests to React:

```
Convert this AngularJS unit test to a React Jest test:

[AngularJS Test Code]
```

### Example Conversion

**AngularJS Component Test:**

```javascript
describe('PhoneList', function() {
  // Load the module that contains the `phoneList` component
  beforeEach(module('phoneList'));

  // Test the controller
  describe('PhoneListController', function() {
    var $httpBackend, ctrl;

    beforeEach(inject(function($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json')
                  .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      ctrl = $componentController('phoneList');
    }));

    it('should create a `phones` property with 2 phones fetched with `$http`', function() {
      expect(ctrl.phones).toBeUndefined();
      $httpBackend.flush();
      expect(ctrl.phones).toEqual([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });

    it('should set a default value for the `orderProp` property', function() {
      expect(ctrl.orderProp).toBe('age');
    });
  });
});
```

**React Component Test:**

```jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PhoneList from './PhoneList';
import { usePhoneService } from '../../services/PhoneService';

// Mock the phone service
jest.mock('../../services/PhoneService');

describe('PhoneList Component', () => {
  const mockPhones = [
    { name: 'Nexus S' }, 
    { name: 'Motorola DROID' }
  ];

  beforeEach(() => {
    // Setup mock implementation
    usePhoneService.mockReturnValue({
      query: jest.fn().mockResolvedValue(mockPhones),
      loading: false,
      error: null
    });
  });

  it('should display phones fetched from the service', async () => {
    render(<PhoneList />);
    
    // Verify loading state if applicable
    // expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for phones to load
    await waitFor(() => {
      expect(screen.getByText('Nexus S')).toBeInTheDocument();
      expect(screen.getByText('Motorola DROID')).toBeInTheDocument();
    });
  });

  it('should set a default value for the orderProp', async () => {
    render(<PhoneList />);
    
    // Check that the select has the default value 'age'
    await waitFor(() => {
      const selectElement = screen.getByLabelText(/sort by/i);
      expect(selectElement.value).toBe('age');
    });
  });
});
```

## Service Tests Conversion

Use this prompt to convert AngularJS service tests to React:

```
Convert this AngularJS service test to a React Jest test:

[AngularJS Service Test Code]
```

### Example Conversion

**AngularJS Service Test:**

```javascript
describe('Phone', function() {
  var Phone;
  var $httpBackend;
  var phonesData = [
    {name: 'Phone X'},
    {name: 'Phone Y'},
    {name: 'Phone Z'}
  ];

  // Add a custom equality tester
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Phone` service
  beforeEach(module('core.phone'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Phone_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('phones/phones.json').respond(phonesData);

    Phone = _Phone_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the phones data from `/phones/phones.json`', function() {
    var phones = Phone.query();

    expect(phones).toEqual([]);

    $httpBackend.flush();
    expect(phones).toEqual(phonesData);
  });
});
```

**React Hook Test:**

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { usePhoneService } from './PhoneService';

// Mock axios
jest.mock('axios');

describe('usePhoneService', () => {
  const phonesData = [
    {name: 'Phone X'},
    {name: 'Phone Y'},
    {name: 'Phone Z'}
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the phones data from `/phones/phones.json`', async () => {
    // Setup mock implementation
    axios.get.mockResolvedValueOnce({ data: phonesData });
    
    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => usePhoneService());
    
    // Execute the query method
    let phones;
    act(() => {
      phones = result.current.query();
    });
    
    // Verify loading state
    expect(result.current.loading).toBe(true);
    
    // Wait for the async operation to complete
    await waitForNextUpdate();
    
    // Verify data was fetched correctly
    expect(axios.get).toHaveBeenCalledWith('phones/phones.json');
    expect(await phones).toEqual(phonesData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle errors during data fetching', async () => {
    // Setup mock implementation for error
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    
    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => usePhoneService());
    
    // Execute the query method
    let phones;
    act(() => {
      phones = result.current.query();
    });
    
    // Wait for the async operation to complete
    await waitForNextUpdate();
    
    // Verify error handling
    expect(await phones).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });
});
```

## End-to-End Testing Conversion

Use this prompt to set up end-to-end tests for your React application:

```
Create end-to-end tests using Playwright for this React component converted from AngularJS:

[React Component Code]
```

### Example E2E Test with Playwright

```javascript
// tests/e2e/phoneList.spec.js
const { test, expect } = require('@playwright/test');

test.describe('PhoneList Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the phone list page
    await page.goto('http://localhost:3000/phones');
  });

  test('should display the phone list', async ({ page }) => {
    // Wait for the phone list to be visible
    await page.waitForSelector('.phones');
    
    // Check that multiple phones are displayed
    const phones = await page.$$('.phone-list-item');
    expect(phones.length).toBeGreaterThan(0);
  });

  test('should filter the phone list when searching', async ({ page }) => {
    // Get initial count of phones
    const initialPhones = await page.$$('.phone-list-item');
    const initialCount = initialPhones.length;
    
    // Enter search text
    await page.fill('input[type="text"]', 'motorola');
    
    // Wait for the filtered list
    await page.waitForTimeout(500); // Allow time for filtering
    
    // Get filtered count
    const filteredPhones = await page.$$('.phone-list-item');
    
    // Expect fewer phones after filtering
    expect(filteredPhones.length).toBeLessThan(initialCount);
    
    // Check that each visible phone contains the search text
    for (const phone of filteredPhones) {
      const text = await phone.textContent();
      expect(text.toLowerCase()).toContain('motorola');
    }
  });

  test('should sort the phone list by name', async ({ page }) => {
    // Select the sort option
    await page.selectOption('select', { value: 'name' });
    
    // Wait for the sorted list
    await page.waitForTimeout(500); // Allow time for sorting
    
    // Get all phone names
    const phoneNames = await page.$$eval('.phone-list-item a:not(.thumb)', 
      elements => elements.map(el => el.textContent.trim())
    );
    
    // Create a sorted copy to compare
    const sortedNames = [...phoneNames].sort();
    
    // Verify the names are in alphabetical order
    expect(phoneNames).toEqual(sortedNames);
  });
});
```

## Visual Regression Testing

Use this prompt to set up visual regression tests to compare AngularJS and React versions:

```
Create a visual regression test to compare the AngularJS and React versions of this component:

[Component Name and Description]
```

### Example Visual Regression Test

```javascript
// tests/visual/comparison.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Visual comparison tests', () => {
  test('PhoneList page should look the same in Angular and React', async ({ page }) => {
    // Capture screenshot of Angular version
    await page.goto('http://localhost:8000/#!/phones');
    await page.waitForSelector('.phones');
    
    // Wait for animations and images to load
    await page.waitForTimeout(1000);
    
    const angularScreenshot = await page.screenshot();
    
    // Capture screenshot of React version
    await page.goto('http://localhost:3000/phones');
    await page.waitForSelector('.phones');
    
    // Wait for animations and images to load
    await page.waitForTimeout(1000);
    
    const reactScreenshot = await page.screenshot();
    
    // Compare screenshots
    expect(reactScreenshot).toMatchSnapshot('phoneList-react.png');
    
    // Alternatively, use a more direct comparison
    // Requires additional visual comparison library
    // expect(compareScreenshots(angularScreenshot, reactScreenshot)).toBeLessThan(0.01);
  });

  test('PhoneDetail page should look the same in Angular and React', async ({ page }) => {
    // Define a test phone ID
    const testPhoneId = 'nexus-s';
    
    // Capture screenshot of Angular version
    await page.goto(`http://localhost:8000/#!/phones/${testPhoneId}`);
    await page.waitForSelector('.phone-images');
    
    // Wait for animations and images to load
    await page.waitForTimeout(1000);
    
    const angularScreenshot = await page.screenshot();
    
    // Capture screenshot of React version
    await page.goto(`http://localhost:3000/phones/${testPhoneId}`);
    await page.waitForSelector('.phone-images');
    
    // Wait for animations and images to load
    await page.waitForTimeout(1000);
    
    const reactScreenshot = await page.screenshot();
    
    // Compare screenshots
    expect(reactScreenshot).toMatchSnapshot('phoneDetail-react.png');
  });
});
```

## Setup Playwright Configuration

```javascript
// playwright.config.js
const { devices } = require('@playwright/test');

module.exports = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'visual-comparison',
      use: {
        ...devices['Desktop Chrome'],
        screenshot: 'on',
        video: 'on',
      },
      testMatch: /visual\/.*\.spec\.js/
    },
  ],
  outputDir: 'tests/results',
  webServer: [
    {
      command: 'npm run start:angular',
      port: 8000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run start:react',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    }
  ],
};
```