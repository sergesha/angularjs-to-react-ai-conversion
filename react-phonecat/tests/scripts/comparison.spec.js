// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Test to compare the phone list functionality between Angular and React versions
test('compare phone list functionality', async ({ browser }) => {
  // Ensure the results directory exists
  ensureDirectoryExists('tests/results/comparison-compare-phone-list-functionality-chromium');

  // Setup Angular app context
  const angularContext = await browser.newContext({
    baseURL: 'http://localhost:8000/#!/phones',
    viewport: { width: 1280, height: 800 }
  });
  const angularPage = await angularContext.newPage();
  await angularPage.goto('/');

  // Setup React app context
  const reactContext = await browser.newContext({
    baseURL: 'http://localhost:3000',
    viewport: { width: 1280, height: 800 }
  });
  const reactPage = await reactContext.newPage();
  await reactPage.goto('/');

  // Compare number of phones displayed
  const angularPhones = await angularPage.locator('.phones li').count();
  const reactPhones = await reactPage.locator('.phones li').count();
  expect(reactPhones).toBe(angularPhones);

  // Compare search functionality
  await angularPage.fill('input[ng-model="$ctrl.query"]', 'motorola');
  await reactPage.fill('[data-testid="search-input"]', 'motorola');

  // Wait for filtering to take effect
  await angularPage.waitForTimeout(500);
  await reactPage.waitForTimeout(500);

  const angularFilteredPhones = await angularPage.locator('.phones li').count();
  const reactFilteredPhones = await reactPage.locator('.phones li').count();
  expect(reactFilteredPhones).toBe(angularFilteredPhones);

  // Compare sorting functionality
  await angularPage.selectOption('select[ng-model="$ctrl.orderProp"]', 'age');
  await reactPage.selectOption('[data-testid="sort-select"]', 'age');

  // Wait for sorting to take effect
  await angularPage.waitForTimeout(500);
  await reactPage.waitForTimeout(500);

  // Get the first phone in each list after sorting
  const angularFirstPhone = await angularPage.locator('.phones li').first().textContent();
  const reactFirstPhone = await reactPage.locator('.phones li').first().textContent();

  // Compare the text content (should be similar if sorting works the same)
  expect(reactFirstPhone).toContain(angularFirstPhone.trim());

  // Take screenshots for visual comparison
  await angularPage.screenshot({ path: 'tests/results/comparison-compare-phone-list-functionality-chromium/angular-phone-list.png' });
  await reactPage.screenshot({ path: 'tests/results/comparison-compare-phone-list-functionality-chromium/react-phone-list.png' });
});

// Test to compare the phone detail functionality
test('compare phone detail functionality', async ({ browser }) => {
  // Ensure the results directory exists
  ensureDirectoryExists('tests/results/comparison-compare-phone-detail-functionality-chromium');

  // Setup Angular app context
  const angularContext = await browser.newContext({
    baseURL: 'http://localhost:8000',
    viewport: { width: 1280, height: 800 }
  });
  const angularPage = await angularContext.newPage();
  await angularPage.goto('/#!/phones');

  // Setup React app context
  const reactContext = await browser.newContext({
    baseURL: 'http://localhost:3000',
    viewport: { width: 1280, height: 800 }
  });
  const reactPage = await reactContext.newPage();
  await reactPage.goto('/');

  // Click on the first phone to view details
  await angularPage.locator('.phones li a').first().click();
  await reactPage.locator('.phones li a').first().click();

  // Wait for page transitions
  await angularPage.waitForURL('**/phones/**');
  await reactPage.waitForURL('**/phones/**');

  // Check if the phone name is displayed
  const angularPhoneName = await angularPage.locator('h1').textContent();
  const reactPhoneName = await reactPage.locator('h1').textContent();
  expect(reactPhoneName.trim()).toBe(angularPhoneName.trim());

  // Check if the thumbnails are displayed
  const angularThumbnailsCount = await angularPage.locator('.phone-thumbs img').count();
  const reactThumbnailsCount = await reactPage.locator('.phone-thumbs img').count();
  expect(reactThumbnailsCount).toBe(angularThumbnailsCount);

  // Check if clicking a thumbnail changes the main image
  const angularMainImageSrcBefore = await angularPage.locator('img.phone').getAttribute('src');
  const reactMainImageSrcBefore = await reactPage.locator('img.phone').getAttribute('src');

  // Click the second thumbnail
  await angularPage.locator('.phone-thumbs img').nth(1).click();
  await reactPage.locator('.phone-thumbs img').nth(1).click();

  // Wait for the image to update
  await angularPage.waitForTimeout(500);
  await reactPage.waitForTimeout(500);

  const angularMainImageSrcAfter = await angularPage.locator('img.phone').getAttribute('src');
  const reactMainImageSrcAfter = await reactPage.locator('img.phone').getAttribute('src');

  // Verify that the main image source changed
  expect(angularMainImageSrcAfter).not.toBe(angularMainImageSrcBefore);
  expect(reactMainImageSrcAfter).not.toBe(reactMainImageSrcBefore);

  // Take screenshots for visual comparison
  await angularPage.screenshot({ path: 'tests/results/comparison-compare-phone-detail-functionality-chromium/angular-phone-detail.png' });
  await reactPage.screenshot({ path: 'tests/results/comparison-compare-phone-detail-functionality-chromium/react-phone-detail.png' });
});

// Visual regression test
test('visual comparison', async ({ browser }) => {
  // Ensure the results directory exists
  ensureDirectoryExists('tests/results/comparison-visual-comparison-chromium');

  // Setup Angular app context
  const angularContext = await browser.newContext({
    baseURL: 'http://localhost:8000',
    viewport: { width: 1280, height: 800 }
  });
  const angularPage = await angularContext.newPage();

  // Setup React app context
  const reactContext = await browser.newContext({
    baseURL: 'http://localhost:3000',
    viewport: { width: 1280, height: 800 }
  });
  const reactPage = await reactContext.newPage();

  // Compare home page (phone list)
  await angularPage.goto('/#!/phones');
  await reactPage.goto('/');

  await angularPage.screenshot({ path: 'tests/results/comparison-visual-comparison-chromium/angular-home.png' });
  await reactPage.screenshot({ path: 'tests/results/comparison-visual-comparison-chromium/react-home.png' });

  // Filter results for comparison
  await angularPage.fill('input[ng-model="$ctrl.query"]', 'nexus');
  await reactPage.fill('[data-testid="search-input"]', 'nexus');

  await angularPage.waitForTimeout(500);
  await reactPage.waitForTimeout(500);

  await angularPage.screenshot({ path: 'tests/results/comparison-visual-comparison-chromium/angular-filtered.png' });
  await reactPage.screenshot({ path: 'tests/results/comparison-visual-comparison-chromium/react-filtered.png' });

  // Compare detail page
  await angularPage.goto('/#!/phones/nexus-s');
  await reactPage.goto('/phones/nexus-s');

  await angularPage.screenshot({ path: 'tests/results/comparison-visual-comparison-chromium/angular-detail.png' });
  await reactPage.screenshot({ path: 'tests/results/comparison-visual-comparison-chromium/react-detail.png' });

  // Compare after thumbnail click
  await angularPage.locator('.phone-thumbs img').nth(2).click();
  await reactPage.locator('.phone-thumbs img').nth(2).click();

  await angularPage.waitForTimeout(500);
  await reactPage.waitForTimeout(500);

  await angularPage.screenshot({ path: 'tests/results/comparison-visual-comparison-chromium/angular-detail-thumb-click.png' });
  await reactPage.screenshot({ path: 'tests/results/comparison-visual-comparison-chromium/react-detail-thumb-click.png' });
});
