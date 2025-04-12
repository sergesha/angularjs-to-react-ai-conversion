const { test, expect } = require('@playwright/test');
const fs = require('fs');

// Configuration for both applications
const angularApp = {
  baseUrl: 'http://localhost:8000',
  name: 'Angular'
};

const reactApp = {
  baseUrl: 'http://localhost:3000',
  name: 'React'
};

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Test suite for comparing functionality
test.describe('PhoneCat Functionality Comparison', () => {

  test.beforeEach(async () => {
    // Make sure tests/results directory exists
    ensureDirectoryExists('tests/results');
  });

  // Test the phone list page
  test('Phone list page comparison', async ({ page }) => {
    // Test the Angular app
    await page.goto(`${angularApp.baseUrl}/#!/phones`);
    await expect(page.locator('ul.phones li')).toHaveCount(20);

    // Search functionality
    await page.fill('input[ng-model="$ctrl.query"]', 'motorola');
    await expect(page.locator('ul.phones li')).toHaveCount(8);

    // Sorting functionality
    await page.selectOption('select[ng-model="$ctrl.orderProp"]', 'age');
    const angularFirstPhone = await page.locator('ul.phones li:first-child .name').textContent();

    // Screenshot for visual comparison
    await page.screenshot({ path: 'tests/results/angular-phone-list.png' });

    // Now test the React app
    await page.goto(`${reactApp.baseUrl}/phones`);
    await expect(page.locator('ul.phones li')).toHaveCount(20);

    // Search functionality
    await page.fill('input[data-testid="search-input"]', 'motorola');
    await expect(page.locator('ul.phones li')).toHaveCount(8);

    // Sorting functionality
    await page.selectOption('select[data-testid="sort-select"]', 'age');
    const reactFirstPhone = await page.locator('ul.phones li:first-child .name').textContent();

    // Screenshot for visual comparison
    await page.screenshot({ path: 'tests/results/react-phone-list.png' });

    // Compare results
    expect(angularFirstPhone).toEqual(reactFirstPhone);
  });

  // Test the phone detail page
  test('Phone detail page comparison', async ({ page }) => {
    // Test the Angular app
    await page.goto(`${angularApp.baseUrl}/#!/phones/motorola-xoom-with-wi-fi`);
    const angularPhoneName = await page.locator('phone-detail h1').textContent();

    // Test thumbnail functionality
    await page.locator('ul.phone-thumbs li:nth-child(2) img').click();
    const angularMainImageSrc = await page.locator('img.phone.selected').getAttribute('src');

    // Screenshot for visual comparison
    await page.screenshot({ path: 'tests/results/angular-phone-detail.png' });

    // Now test the React app
    await page.goto(`${reactApp.baseUrl}/phones/motorola-xoom-with-wi-fi`);
    const reactPhoneName = await page.locator('[data-testid="phone-name"]').textContent();

    // Test thumbnail functionality
    await page.locator('ul.phone-thumbs li:nth-child(2) img').click();
    const reactMainImageSrc = await page.locator('img.phone.selected').getAttribute('src');

    // Screenshot for visual comparison
    await page.screenshot({ path: 'tests/results/react-phone-detail.png' });

    // Compare results
    expect(angularPhoneName).toEqual(reactPhoneName);
    expect(angularMainImageSrc).toContain(reactMainImageSrc.split('/').pop());
  });
});
