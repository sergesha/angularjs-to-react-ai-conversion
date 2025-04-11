// @ts-check
const { test, expect } = require('@playwright/test');

// Test configuration 
const reactAppUrl = 'http://localhost:3000'; // React App
const angularAppUrl = 'http://localhost:8000/app/'; // Angular App

test.describe('Angular vs React Comparison', () => {
  test('should have similar phone list layout and functionality', async ({ page }) => {
    // Test Angular version
    await page.goto(angularAppUrl);
    // Get list of phones from Angular
    const angularPhoneNames = await page.locator('.phones li .name').allTextContents();
    
    // Take screenshot of Angular phone list
    await page.screenshot({ path: 'angular-phone-list.png', fullPage: true });
    
    // Filter by 'motorola' in Angular
    await page.locator('input[ng-model="$ctrl.query"]').fill('motorola');
    const angularFilteredCount = await page.locator('.phones li').count();
    
    // Take screenshot of filtered Angular phone list
    await page.screenshot({ path: 'angular-filtered-list.png', fullPage: true });
    
    // Test React version
    await page.goto(reactAppUrl);
    // Get list of phones from React
    const reactPhoneNames = await page.locator('.phones li .name').allTextContents();
    
    // Take screenshot of React phone list
    await page.screenshot({ path: 'react-phone-list.png', fullPage: true });
    
    // Filter by 'motorola' in React
    await page.locator('input[ng-model="$ctrl.query"]').fill('motorola');
    const reactFilteredCount = await page.locator('.phones li').count();
    
    // Take screenshot of filtered React phone list
    await page.screenshot({ path: 'react-filtered-list.png', fullPage: true });
    
    // Compare results
    expect(angularPhoneNames).toEqual(reactPhoneNames);
    expect(angularFilteredCount).toEqual(reactFilteredCount);
  });

  test('should have similar phone detail pages', async ({ page }) => {
    // Specific phones to test
    const phones = ['nexus-s', 'motorola-xoom-with-wi-fi'];
    
    for (const phone of phones) {
      // Test Angular version
      await page.goto(`${angularAppUrl}#!/phones/${phone}`);
      // Wait for page to load fully
      await page.waitForSelector('.phone-images img.selected');
      
      // Get phone details from Angular
      const angularTitle = await page.locator('h1').textContent();
      const angularMainImageSrc = await page.locator('.phone-images img.selected').getAttribute('src');
      const angularSpecTitles = await page.locator('ul.specs .specs-title').allTextContents();
      
      // Take screenshot of Angular detail page
      await page.screenshot({ path: `angular-${phone}-detail.png`, fullPage: true });
      
      // Test React version
      await page.goto(`${reactAppUrl}/phones/${phone}`);
      // Wait for page to load fully
      await page.waitForSelector('.phone-images img.selected');
      
      // Get phone details from React
      const reactTitle = await page.locator('h1').textContent();
      const reactMainImageSrc = await page.locator('.phone-images img.selected').getAttribute('src');
      const reactSpecTitles = await page.locator('ul.specs .specs-title').allTextContents();
      
      // Take screenshot of React detail page
      await page.screenshot({ path: `react-${phone}-detail.png`, fullPage: true });
      
      // Compare results
      expect(angularTitle).toEqual(reactTitle);
      expect(angularSpecTitles).toEqual(reactSpecTitles);
      
      // Image paths might be different, but should contain the same filename part
      expect(angularMainImageSrc.split('/').pop()).toEqual(reactMainImageSrc.split('/').pop());
    }
  });

  test('should have similar thumbnail image functionality', async ({ page }) => {
    // Test on Nexus S phone
    const phone = 'nexus-s';
    
    // Test Angular version
    await page.goto(`${angularAppUrl}#!/phones/${phone}`);
    
    // Get initial main image
    const angularInitialImage = await page.locator('.phone-images img.selected').getAttribute('src');
    
    // Click on the second thumbnail
    await page.locator('.phone-thumbs li:nth-child(2) img').click();
    
    // Get new main image
    const angularNewImage = await page.locator('.phone-images img.selected').getAttribute('src');
    
    // Take screenshot after thumbnail click
    await page.screenshot({ path: `angular-${phone}-thumbnail-click.png` });
    
    // Test React version
    await page.goto(`${reactAppUrl}/phones/${phone}`);
    
    // Get initial main image
    const reactInitialImage = await page.locator('.phone-images img.selected').getAttribute('src');
    
    // Click on the second thumbnail
    await page.locator('.phone-thumbs li:nth-child(2) img').click();
    
    // Get new main image
    const reactNewImage = await page.locator('.phone-images img.selected').getAttribute('src');
    
    // Take screenshot after thumbnail click
    await page.screenshot({ path: `react-${phone}-thumbnail-click.png` });
    
    // Verify both apps changed the image
    expect(angularInitialImage).not.toEqual(angularNewImage);
    expect(reactInitialImage).not.toEqual(reactNewImage);
    
    // Verify both apps show the same new image (might be different paths but same file)
    expect(angularNewImage.split('/').pop()).toEqual(reactNewImage.split('/').pop());
  });
});