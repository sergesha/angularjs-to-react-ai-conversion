const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

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

// Helper function to compare two images
async function compareImages(img1Path, img2Path, diffPath, threshold = 0.1) {
  const img1 = PNG.sync.read(fs.readFileSync(img1Path));
  const img2 = PNG.sync.read(fs.readFileSync(img2Path));

  // Make sure dimensions match
  if (img1.width !== img2.width || img1.height !== img2.height) {
    console.error('Image dimensions do not match!');
    console.log(`Angular: ${img1.width}x${img1.height}`);
    console.log(`React: ${img2.width}x${img2.height}`);

    // Create an output image with the larger dimensions
    const width = Math.max(img1.width, img2.width);
    const height = Math.max(img1.height, img2.height);
    const diff = new PNG({ width, height });

    // Create a visual diff by filling with a distinctive color
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Color pixels beyond original dimensions red
        const idx = (diff.width * y + x) << 2;
        if (x >= img1.width || y >= img1.height || x >= img2.width || y >= img2.height) {
          diff.data[idx] = 255;     // R
          diff.data[idx + 1] = 0;   // G
          diff.data[idx + 2] = 0;   // B
          diff.data[idx + 3] = 255; // A
        } else {
          // For overlapping regions, show actual differences
          const idx1 = (img1.width * y + x) << 2;
          const idx2 = (img2.width * y + x) << 2;

          if (img1.data[idx1] !== img2.data[idx2] ||
              img1.data[idx1 + 1] !== img2.data[idx2 + 1] ||
              img1.data[idx1 + 2] !== img2.data[idx2 + 2] ||
              img1.data[idx1 + 3] !== img2.data[idx2 + 3]) {
            diff.data[idx] = 255;     // R
            diff.data[idx + 1] = 0;   // G
            diff.data[idx + 2] = 0;   // B
            diff.data[idx + 3] = 255; // A
          } else {
            diff.data[idx] = img1.data[idx1];       // R
            diff.data[idx + 1] = img1.data[idx1 + 1]; // G
            diff.data[idx + 2] = img1.data[idx1 + 2]; // B
            diff.data[idx + 3] = img1.data[idx1 + 3]; // A
          }
        }
      }
    }

    // Write the diff image
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    return { diffPixelCount: width * height, totalPixels: width * height }; // Return 100% difference
  }

  // Create an output image
  const diff = new PNG({ width: img1.width, height: img1.height });

  // Compare pixel by pixel
  const diffPixelCount = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    img1.width,
    img1.height,
    { threshold }
  );

  // Write the diff image
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  return { diffPixelCount, totalPixels: img1.width * img1.height };
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

    // Compare screenshots
    const diffPath = 'tests/results/phone-list-diff.png';
    const { diffPixelCount, totalPixels } = await compareImages(angularPath, reactPath, diffPath);

    // Calculate difference percentage
    const diffPercentage = (diffPixelCount / totalPixels) * 100;
    console.log(`Phone list difference: ${diffPercentage.toFixed(2)}%`);

    // Check if the difference is within acceptable range (e.g., 1%)
    expect(diffPercentage).toBeLessThan(1.0);
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

    // Compare screenshots
    const diffPath = 'tests/results/phone-detail-diff.png';
    const { diffPixelCount, totalPixels } = await compareImages(angularPath, reactPath, diffPath);

    // Calculate difference percentage
    const diffPercentage = (diffPixelCount / totalPixels) * 100;
    console.log(`Phone detail difference: ${diffPercentage.toFixed(2)}%`);

    // Check if the difference is within acceptable range
    expect(diffPercentage).toBeLessThan(1.0);
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

    // Compare screenshots
    const diffPath = 'tests/results/phone-list-mobile-diff.png';
    const { diffPixelCount, totalPixels } = await compareImages(angularPath, reactPath, diffPath);

    // Calculate difference percentage
    const diffPercentage = (diffPixelCount / totalPixels) * 100;
    console.log(`Mobile responsive difference: ${diffPercentage.toFixed(2)}%`);

    // Check if the difference is within acceptable range
    expect(diffPercentage).toBeLessThan(1.0);
  });
});
