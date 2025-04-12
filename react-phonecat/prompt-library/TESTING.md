# AngularJS to React: Testing Strategy Conversion

## Core Concepts

| AngularJS Testing | React Testing | Key Differences |
|-------------------|---------------|-----------------|
| Karma + Jasmine | Jest / React Testing Library | React uses component-based testing |
| Angular mocks | Jest mocks / MSW | React testing relies on JavaScript mocking |
| Controller testing | Hooks testing | Test hooks rather than controllers |
| Directive testing | Component testing | Test component behavior and rendering |
| E2E with Protractor | Cypress / Playwright | Modern E2E tools are framework-agnostic |

## Unit Testing Equivalents

### Component Testing

**AngularJS:**
```javascript
describe('PhoneListController', function() {
  var ctrl, scope, $httpBackend;
  
  beforeEach(module('phoneListModule'));
  
  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('phones/phones.json').respond([{name: 'Phone 1'}]);
    
    scope = $rootScope.$new();
    ctrl = $controller('PhoneListController', {$scope: scope});
  }));
  
  it('should create a phones model with 1 phone', function() {
    $httpBackend.flush();
    expect(scope.phones.length).toBe(1);
    expect(scope.phones[0].name).toBe('Phone 1');
  });
});
```

**React with React Testing Library:**
```javascript
import { render, screen, waitFor } from '@testing-library/react';
import PhoneList from './PhoneList';

// Mock the fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ name: 'Phone 1' }]),
  })
);

describe('PhoneList', () => {
  it('should display a list of phones', async () => {
    render(<PhoneList />);
    
    // Wait for async data fetching
    await waitFor(() => {
      expect(screen.getByText('Phone 1')).toBeInTheDocument();
    });
    
    // Additional assertions
    expect(fetch).toHaveBeenCalledWith('phones/phones.json');
  });
});
```

### Service Testing

**AngularJS:**
```javascript
describe('Phone service', function() {
  var Phone, $httpBackend;
  
  beforeEach(module('phoneServices'));
  
  beforeEach(inject(function(_Phone_, _$httpBackend_) {
    Phone = _Phone_;
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('phones/phones.json').respond([{name: 'Phone 1'}]);
  }));
  
  it('should fetch the phones data from the server', function() {
    var phones = Phone.query();
    $httpBackend.flush();
    expect(phones.length).toBe(1);
    expect(phones[0].name).toBe('Phone 1');
  });
});
```

**React Custom Hook Testing:**
```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import { usePhoneService } from './usePhoneService';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ name: 'Phone 1' }]),
  })
);

describe('usePhoneService', () => {
  it('should fetch phones data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePhoneService());
    
    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.phones).toEqual([]);
    
    // Wait for the async operation to complete
    await waitForNextUpdate();
    
    // Check results
    expect(result.current.loading).toBe(false);
    expect(result.current.phones).toEqual([{ name: 'Phone 1' }]);
    expect(fetch).toHaveBeenCalledWith('phones/phones.json');
  });
});
```

## E2E Testing Conversion

### Protractor to Playwright

**AngularJS with Protractor:**
```javascript
describe('PhoneCat App', function() {
  it('should redirect to /phones', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toBe('/phones');
  });

  describe('Phone list view', function() {
    it('should filter the phone list as a user types into the search box', function() {
      var phoneList = element.all(by.repeater('phone in $ctrl.phones'));
      var query = element(by.model('$ctrl.query'));

      expect(phoneList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(8);
    });
  });
});
```

**React with Playwright:**
```javascript
const { test, expect } = require('@playwright/test');

test.describe('PhoneCat App', () => {
  test('should redirect to /phones', async ({ page }) => {
    await page.goto('/');
    expect(page.url()).toContain('/phones');
  });

  test.describe('Phone list view', () => {
    test('should filter the phone list as a user types into the search box', async ({ page }) => {
      await page.goto('/phones');
      
      // Check initial number of phones
      const initialPhones = await page.locator('.phone-list-item').count();
      expect(initialPhones).toBe(20);
      
      // Test filtering by 'nexus'
      await page.fill('input[type="search"]', 'nexus');
      await page.waitForTimeout(300); // Wait for filter to apply
      const nexusPhones = await page.locator('.phone-list-item').count();
      expect(nexusPhones).toBe(1);
      
      // Test filtering by 'motorola'
      await page.fill('input[type="search"]', '');
      await page.fill('input[type="search"]', 'motorola');
      await page.waitForTimeout(300); // Wait for filter to apply
      const motorolaPhones = await page.locator('.phone-list-item').count();
      expect(motorolaPhones).toBe(8);
    });
  });
});
```

## Visual Regression Testing

For visual comparison between AngularJS and React versions:

```javascript
const { test, expect } = require('@playwright/test');

test('phone list visual comparison', async ({ page }) => {
  // Load the AngularJS version and take a screenshot
  await page.goto('http://localhost:8000/#!/phones');
  await page.waitForLoadState('networkidle');
  const angularScreenshot = await page.screenshot();
  
  // Load the React version and take a screenshot
  await page.goto('http://localhost:3000/phones');
  await page.waitForLoadState('networkidle');
  const reactScreenshot = await page.screenshot();
  
  // Compare screenshots (using Playwright's built-in comparison)
  expect(reactScreenshot).toMatchSnapshot('angular-phone-list.png', {
    threshold: 0.2, // Allow for minor differences
  });
});
```

## Common Testing Patterns

### 1. Mocking API Calls

**Using Jest:**
```javascript
// Global mock
global.fetch = jest.fn();

// Mock implementation for a specific test
fetch.mockImplementationOnce(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData)
  })
);
```

**Using Mock Service Worker (MSW):**
```javascript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Setup request handlers
const server = setupServer(
  rest.get('/api/phones', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: 'Phone 1' }]));
  })
);

// Start server before tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### 2. Testing User Interactions

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('search input filters the list', async () => {
  render(<PhoneList />);
  
  // More realistic user typing simulation
  const searchInput = screen.getByPlaceholderText('Search');
  await userEvent.type(searchInput, 'nexus');
  
  // Check filtered results
  expect(screen.getAllByTestId('phone-item')).toHaveLength(1);
});
```

## Common Pitfalls

1. **Async Testing:**
   - Always wait for data fetching in React components
   - Use waitFor or findBy methods for async operations

2. **Component State:**
   - Test component behavior, not implementation details
   - Focus on what the user sees and can interact with

3. **Testing Hooks:**
   - Use renderHook for custom hooks
   - Test the interface of your hooks, not internals

4. **Routing:**
   - Wrap components in MemoryRouter for route testing
   - Test navigation and route parameters

## Checklist

- [ ] Set up Jest and React Testing Library
- [ ] Convert service tests to custom hook tests
- [ ] Convert controller tests to component tests
- [ ] Set up mocking strategy for API calls
- [ ] Configure E2E testing with Playwright or Cypress
- [ ] Add visual regression tests if needed
- [ ] Ensure test coverage for core functionality
- [ ] Validate both unit and integration tests pass