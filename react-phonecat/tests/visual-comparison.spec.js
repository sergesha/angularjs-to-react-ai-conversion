const { test, expect } = require('@playwright/test');

test.describe('Visual Comparison Tests', () => {
  test('should have similar phone list UI', async ({ page }) => {
    // Go to the Angular version
    await page.goto('http://localhost:8000/#!/phones');
    
    // Wait for content to load
    await page.waitForSelector('.phones li');
    
    // Take a screenshot of the Angular phone list
    const angularScreenshot = await page.screenshot({ 
      fullPage: true,
      path: './test-results/angular-phone-list.png'
    });
    
    // Go to the React version
    await page.goto('http://localhost:3000/phones');
    
    // Wait for content to load
    await page.waitForSelector('.phones li');
    
    // Take a screenshot of the React phone list
    const reactScreenshot = await page.screenshot({ 
      fullPage: true,
      path: './test-results/react-phone-list.png'
    });
    
    // Basic comparison - sizes should be roughly similar
    const angularSize = angularScreenshot.length;
    const reactSize = reactScreenshot.length;
    
    // Allow a 25% difference in size due to rendering differences
    const sizeRatio = Math.max(angularSize, reactSize) / Math.min(angularSize, reactSize);
    expect(sizeRatio).toBeLessThan(1.25);
  });
  
  test('should have similar phone detail UI', async ({ page }) => {
    // Go to the Angular version
    await page.goto('http://localhost:8000/#!/phones/nexus-s');
    
    // Wait for content to load
    await page.waitForSelector('h1');
    await page.waitForSelector('.phone-thumbs');
    
    // Take a screenshot of the Angular phone detail
    const angularScreenshot = await page.screenshot({ 
      fullPage: true,
      path: './test-results/angular-phone-detail.png'
    });
    
    // Go to the React version
    await page.goto('http://localhost:3000/phones/nexus-s');
    
    // Wait for content to load
    await page.waitForSelector('h1');
    await page.waitForSelector('.phone-thumbs');
    
    // Take a screenshot of the React phone detail
    const reactScreenshot = await page.screenshot({ 
      fullPage: true,
      path: './test-results/react-phone-detail.png'
    });
    
    // Basic comparison - sizes should be roughly similar
    const angularSize = angularScreenshot.length;
    const reactSize = reactScreenshot.length;
    
    // Allow a 25% difference in size due to rendering differences
    const sizeRatio = Math.max(angularSize, reactSize) / Math.min(angularSize, reactSize);
    expect(sizeRatio).toBeLessThan(1.25);
  });
});