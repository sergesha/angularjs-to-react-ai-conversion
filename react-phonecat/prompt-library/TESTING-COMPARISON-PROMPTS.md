# Testing and Comparison Prompts for AngularJS to React Conversion

This document provides prompts and guidance for setting up testing and comparison workflows when converting AngularJS applications to React.

## Table of Contents

1. [Setting Up Playwright for Comparison Testing](#setting-up-playwright-for-comparison-testing)
2. [Creating Visual Comparison Tests](#creating-visual-comparison-tests)
3. [Functionality Comparison Tests](#functionality-comparison-tests)
4. [Fixing Visual Differences](#fixing-visual-differences)

## Setting Up Playwright for Comparison Testing

**Prompt:**
```
I need to set up Playwright to compare an AngularJS application and its React conversion. The setup should:
1. Run both applications concurrently
2. Perform the same user actions on both applications
3. Compare the visual output and functionality
4. Generate a report highlighting differences

Please provide the necessary configuration code and test structure.
```

**Example - Playwright Config:**
```javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/scripts',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: [
    ['html', { outputFolder: 'tests/report' }],
    ['list']
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
      path: './tests/results'
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'cd react-phonecat && npm start',
      port: 3000,
      reuseExistingServer: true,
    },
    {
      command: 'cd angular-phonecat && npm start',
      port: 8000,
      reuseExistingServer: true,
    }
  ],
});
```

**Example - Test Structure:**
```javascript
// tests/scripts/comparison.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Application Comparison', () => {
  const angularUrl = 'http://localhost:8000/';
  const reactUrl = 'http://localhost:3000/';
  
  test('Home pages look similar', async ({ page }) => {
    // Test Angular page
    await page.goto(angularUrl);
    await page.waitForLoadState('networkidle');
    const angularScreenshot = await page.screenshot();
    
    // Test React page
    await page.goto(reactUrl);
    await page.waitForLoadState('networkidle');
    const reactScreenshot = await page.screenshot();
    
    // Compare screenshots
    // This requires a visual comparison library
    expect(await compareImages(angularScreenshot, reactScreenshot))
      .toBeLessThan(0.05); // 5% difference tolerance
  });
});
```

## Creating Visual Comparison Tests

**Prompt:**
```
Create Playwright tests to perform visual comparisons between an AngularJS and React version of the same application. The tests should:
1. Capture screenshots of key screens in both applications
2. Verify layouts, component positioning, and styling
3. Check responsive design across different viewports
4. Identify specific visual differences for further fixes

Focus on the following key screens: [LIST KEY SCREENS]
```

**Example - Visual Comparison Test:**
```javascript
// tests/scripts/visual-comparison.spec.js
const { test, expect } = require('@playwright/test');
const fs = require('fs');

test.describe('Visual Comparison', () => {
  const angularUrl = 'http://localhost:8000/';
  const reactUrl = 'http://localhost:3000/';
  
  test('Applications have similar phone list UI', async ({ page }) => {
    // Angular page
    await page.goto(angularUrl);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/results/angular-phone-list.png' });
    
    // React page
    await page.goto(reactUrl);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/results/react-phone-list.png' });
    
    // A simple check for now - later we can add actual pixel comparison
    // This test is mostly to generate screenshots for manual comparison
    expect(await page.title()).toContain('React PhoneCat');
  });
  
  test('Applications have similar phone detail UI', async ({ page }) => {
    // Angular page - navigate to a specific phone
    await page.goto(angularUrl + '#!/phones/motorola-xoom-with-wi-fi');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/results/angular-phone-detail.png' });
    
    // React page - navigate to the same phone
    await page.goto(reactUrl + '/phones/motorola-xoom-with-wi-fi');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/results/react-phone-detail.png' });
    
    // Check for similar structure - later we can add more sophisticated checks
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('img.phone')).toBeVisible();
  });
  
  // Add test for responsive design
  test('Applications have similar mobile layout', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test Angular mobile layout
    await page.goto(angularUrl);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/results/angular-phone-list-mobile.png' });
    
    // Test React mobile layout
    await page.goto(reactUrl);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/results/react-phone-list-mobile.png' });
  });
});
```

## Functionality Comparison Tests

**Prompt:**
```
Create Playwright tests to compare functionality between AngularJS and React versions of the same application. Focus on:
1. Form interactions (input, validation, submission)
2. Search/filter functionality
3. Sorting and pagination
4. Navigation behavior
5. Dynamic content updates

Please test the following key functions: [LIST KEY FUNCTIONS]
```

**Example - Functionality Comparison Test:**
```javascript
// tests/scripts/functionality-comparison.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Functionality Comparison', () => {
  const angularUrl = 'http://localhost:8000/';
  const reactUrl = 'http://localhost:3000/';
  
  test('Search filtering should work the same way', async ({ page }) => {
    // Test Angular search
    await page.goto(angularUrl);
    await page.waitForLoadState('networkidle');
    await page.fill('input[ng-model="$ctrl.query"]', 'motorola');
    await page.waitForTimeout(500); // Wait for filtering
    const angularResults = await page.$$eval('ul.phones li', items => items.length);
    
    // Test React search
    await page.goto(reactUrl);
    await page.waitForLoadState('networkidle');
    await page.fill('[data-testid="search-input"]', 'motorola');
    await page.waitForTimeout(500); // Wait for filtering
    const reactResults = await page.$$eval('ul.phones li', items => items.length);
    
    // Compare results
    expect(reactResults).toEqual(angularResults);
  });
  
  test('Phone detail navigation should work the same way', async ({ page }) => {
    // Test Angular navigation
    await page.goto(angularUrl);
    await page.click('ul.phones li:first-child a');
    await page.waitForSelector('img.phone.selected');
    const angularPhoneName = await page.$eval('h1', el => el.textContent);
    
    // Test React navigation
    await page.goto(reactUrl);
    await page.click('ul.phones li:first-child a');
    await page.waitForSelector('img.phone.selected');
    const reactPhoneName = await page.$eval('h1', el => el.textContent);
    
    // Compare results
    expect(reactPhoneName).toEqual(angularPhoneName);
  });
  
  test('Thumbnail clicking should work the same way', async ({ page }) => {
    // Test Angular thumbnail behavior
    await page.goto(angularUrl + '#!/phones/motorola-xoom-with-wi-fi');
    await page.waitForLoadState('networkidle');
    const initialAngularImgSrc = await page.$eval('img.phone.selected', img => img.src);
    await page.click('ul.phone-thumbs li:nth-child(2) img');
    await page.waitForTimeout(500);
    const newAngularImgSrc = await page.$eval('img.phone.selected', img => img.src);
    const angularChanged = initialAngularImgSrc !== newAngularImgSrc;
    
    // Test React thumbnail behavior
    await page.goto(reactUrl + '/phones/motorola-xoom-with-wi-fi');
    await page.waitForLoadState('networkidle');
    const initialReactImgSrc = await page.$eval('img.phone.selected', img => img.src);
    await page.click('ul.phone-thumbs li:nth-child(2) img');
    await page.waitForTimeout(500);
    const newReactImgSrc = await page.$eval('img.phone.selected', img => img.src);
    const reactChanged = initialReactImgSrc !== newReactImgSrc;
    
    // Compare behavior
    expect(reactChanged).toEqual(angularChanged);
  });
});
```

## Fixing Visual Differences

**Prompt:**
```
Based on the visual differences identified in the comparison testing between the AngularJS and React versions, provide CSS and component fixes to make the React version match the AngularJS styling.

The main differences are:
1. [LIST SPECIFIC DIFFERENCES]
2. [...]

Please provide specific CSS fixes and component adjustments to address these differences.
```

**Example - Visual Fixes:**
```css
/* Fix for phone list layout differences */
.phones {
  list-style: none;
  padding: 0;
}

.phones li {
  clear: both;
  height: 115px;
  padding-top: 15px;
  border-bottom: 1px solid #ccc;
}

/* Fix for thumbnail images in phone detail */
.phone-thumbs {
  list-style: none;
  margin: 0;
  padding: 0;
}

.phone-thumbs img {
  height: 100px;
  width: 100px;
  padding: 1px;
  margin: 0.2em;
  border: 1px solid #ccc;
  cursor: pointer;
}

/* Fix for spec list formatting */
.specs {
  margin: 0;
  padding: 0;
  list-style: none;
}

.specs dt {
  font-weight: bold;
  width: 100px;
  float: left;
  clear: left;
}

.specs dd {
  margin-left: 110px;
  padding-bottom: 0.5em;
}
```

**Example - Component Adjustment:**
```jsx
// Fix for phone detail component structure
import React, { useState, useEffect } from 'react';
import './PhoneDetail.css';

const PhoneDetail = ({ phone }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  
  // Match the exact structure of the Angular template
  return (
    <div className="phone-detail">
      <img className="phone selected" 
           src={phone.images[mainImageIndex]} 
           alt={phone.name} 
           data-testid="main-image" />
           
      <h1 data-testid="phone-name">{phone.name}</h1>
      
      <p>{phone.description}</p>

      <ul className="phone-thumbs">
        {phone.images.map((img, index) => (
          <li key={index}>
            <img src={img}
                 data-testid={`thumbnail-${index}`}
                 alt={`Phone thumbnail ${index}`}
                 onClick={() => setMainImageIndex(index)} />
          </li>
        ))}
      </ul>

      <ul className="specs">
        <li>
          <span>Availability and Networks</span>
          <dl>
            <dt>Availability</dt>
            <dd>{phone.availability}</dd>
          </dl>
        </li>
        {/* Additional specs would be here */}
      </ul>
    </div>
  );
};

export default PhoneDetail;
```