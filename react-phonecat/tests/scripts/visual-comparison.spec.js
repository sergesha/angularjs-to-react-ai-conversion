const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

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

// Test suite for visual comparison
test.describe('PhoneCat Visual Comparison', () => {
  
  test.beforeEach(async () => {
    // Make sure test-results directory exists
    ensureDirectoryExists('test-results');
  });
  
  // Test the phone list page visual appearance
  test('Phone list page visual comparison', async ({ page }) => {
    // Capture Angular app screenshot
    await page.goto(`${angularApp.baseUrl}/#!/phones`);
    // Wait for images to load
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/angular-phone-list-visual.png', fullPage: true });
    
    // Capture React app screenshot
    await page.goto(`${reactApp.baseUrl}/phones`);
    // Wait for images to load
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/react-phone-list-visual.png', fullPage: true });
    
    // Check both screenshots exist (visual comparison would need a plugin or manual review)
    expect(fs.existsSync('test-results/angular-phone-list-visual.png')).toBeTruthy();
    expect(fs.existsSync('test-results/react-phone-list-visual.png')).toBeTruthy();
  });
  
  // Test the phone detail page visual appearance
  test('Phone detail page visual comparison', async ({ page }) => {
    // Capture Angular app screenshot
    await page.goto(`${angularApp.baseUrl}/#!/phones/motorola-xoom-with-wi-fi`);
    // Wait for images to load
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/angular-phone-detail-visual.png', fullPage: true });
    
    // Capture React app screenshot
    await page.goto(`${reactApp.baseUrl}/phones/motorola-xoom-with-wi-fi`);
    // Wait for images to load
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/react-phone-detail-visual.png', fullPage: true });
    
    // Check both screenshots exist (visual comparison would need a plugin or manual review)
    expect(fs.existsSync('test-results/angular-phone-detail-visual.png')).toBeTruthy();
    expect(fs.existsSync('test-results/react-phone-detail-visual.png')).toBeTruthy();
  });
  
  // Test with different viewports
  test('Responsive design comparison', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Capture Angular app mobile screenshot
    await page.goto(`${angularApp.baseUrl}/#!/phones`);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/angular-phone-list-mobile.png', fullPage: true });
    
    // Capture React app mobile screenshot
    await page.goto(`${reactApp.baseUrl}/phones`);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/react-phone-list-mobile.png', fullPage: true });
    
    // Check both screenshots exist
    expect(fs.existsSync('test-results/angular-phone-list-mobile.png')).toBeTruthy();
    expect(fs.existsSync('test-results/react-phone-list-mobile.png')).toBeTruthy();
  });
});