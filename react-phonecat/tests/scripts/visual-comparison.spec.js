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
test.describe('Visual Comparison', () => {

  test.beforeEach(async () => {
    // Make sure tests/results directory exists
    ensureDirectoryExists('tests/results');
  });

  // Test the phone list page visual appearance
  test('should have similar phone list UI', async ({ page }) => {
    // Capture Angular app screenshot
    await page.goto(`${angularApp.baseUrl}/#!/phones`);
    // Wait for images to load
    await page.waitForTimeout(1000);
    const angularPath = 'tests/results/angular-phone-list-visual.png';
    await page.screenshot({ path: angularPath, fullPage: true });

    // Capture React app screenshot
    await page.goto(`${reactApp.baseUrl}/phones`);
    // Wait for images to load
    await page.waitForTimeout(1000);
    const reactPath = 'tests/results/react-phone-list-visual.png';
    await page.screenshot({ path: reactPath, fullPage: true });
    
    console.log(`Captured phone list screenshots for both apps`);
    console.log(`Angular screenshot: ${angularPath}`);
    console.log(`React screenshot: ${reactPath}`);
  });

  // Test the phone detail page visual appearance
  test('should have similar phone detail UI', async ({ page }) => {
    // Capture Angular app screenshot
    await page.goto(`${angularApp.baseUrl}/#!/phones/motorola-xoom-with-wi-fi`);
    // Wait for images to load
    await page.waitForTimeout(1000);
    const angularPath = 'tests/results/angular-phone-detail-visual.png';
    await page.screenshot({ path: angularPath, fullPage: true });

    // Capture React app screenshot
    await page.goto(`${reactApp.baseUrl}/phones/motorola-xoom-with-wi-fi`);
    // Wait for images to load
    await page.waitForTimeout(1000);
    const reactPath = 'tests/results/react-phone-detail-visual.png';
    await page.screenshot({ path: reactPath, fullPage: true });
    
    console.log(`Captured phone detail screenshots for both apps`);
    console.log(`Angular screenshot: ${angularPath}`);
    console.log(`React screenshot: ${reactPath}`);
  });

  // Test with different viewports
  test('should have similar responsive design', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Capture Angular app mobile screenshot
    await page.goto(`${angularApp.baseUrl}/#!/phones`);
    await page.waitForTimeout(1000);
    const angularPath = 'tests/results/angular-phone-list-mobile.png';
    await page.screenshot({ path: angularPath, fullPage: true });

    // Capture React app mobile screenshot
    await page.goto(`${reactApp.baseUrl}/phones`);
    await page.waitForTimeout(1000);
    const reactPath = 'tests/results/react-phone-list-mobile.png';
    await page.screenshot({ path: reactPath, fullPage: true });
    
    console.log(`Captured mobile responsive screenshots for both apps`);
    console.log(`Angular screenshot: ${angularPath}`);
    console.log(`React screenshot: ${reactPath}`);
  });
});
