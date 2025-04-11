const { test, expect } = require('@playwright/test');

test.describe('PhoneDetail Component', () => {
  test('should display the selected phone details', async ({ page }) => {
    // Go to the Angular version of a specific phone
    await page.goto('http://localhost:8000/#!/phones/nexus-s');
    
    // Wait for the phone details to be displayed
    await page.waitForSelector('h1');
    
    // Get the phone name from Angular version
    const angularPhoneName = await page.locator('h1').textContent();
    
    // Go to the React version of the same phone
    await page.goto('http://localhost:3000/phones/nexus-s');
    
    // Wait for the phone details to be displayed
    await page.waitForSelector('h1');
    
    // Get the phone name from React version
    const reactPhoneName = await page.locator('h1').textContent();
    
    // Compare the names
    expect(reactPhoneName).toBe(angularPhoneName);
    
    // Check if the thumbnails are displayed in both versions
    const angularThumbnailsCount = await page.goto('http://localhost:8000/#!/phones/nexus-s')
      .then(() => page.locator('.phone-thumbs li').count());
    
    const reactThumbnailsCount = await page.goto('http://localhost:3000/phones/nexus-s')
      .then(() => page.locator('.phone-thumbs li').count());
    
    // Compare the thumbnail counts
    expect(reactThumbnailsCount).toBe(angularThumbnailsCount);
  });
  
  test('should display the first phone image as the main phone image', async ({ page }) => {
    // Go to the React version
    await page.goto('http://localhost:3000/phones/nexus-s');
    
    // Wait for the phone details to be displayed
    await page.waitForSelector('.phone.selected');
    
    // Get the source of the selected main image
    const mainImageSrc = await page.locator('.phone.selected').getAttribute('src');
    
    // Get the source of the first thumbnail
    const firstThumbnailSrc = await page.locator('.phone-thumbs li img').first().getAttribute('src');
    
    // The main image should match the first thumbnail
    expect(mainImageSrc).toContain(firstThumbnailSrc);
    
    // Now check the Angular version
    await page.goto('http://localhost:8000/#!/phones/nexus-s');
    
    // Wait for the phone details to be displayed
    await page.waitForSelector('.phone.selected');
    
    // Get the source of the selected main image in Angular
    const angularMainImageSrc = await page.locator('.phone.selected').getAttribute('src');
    
    // The two main images should point to the same image
    expect(mainImageSrc.split('/').pop()).toBe(angularMainImageSrc.split('/').pop());
  });
  
  test('should swap main image if a thumbnail is clicked', async ({ page }) => {
    // Go to the React version
    await page.goto('http://localhost:3000/phones/nexus-s');
    
    // Wait for the phone details to be displayed
    await page.waitForSelector('.phone-thumbs li');
    
    // Get the initial main image source
    const initialMainImageSrc = await page.locator('.phone.selected').getAttribute('src');
    
    // Click on the second thumbnail
    await page.locator('.phone-thumbs li').nth(1).click();
    
    // Wait for the main image to update
    await page.waitForTimeout(500);
    
    // Get the new main image source
    const newMainImageSrc = await page.locator('.phone.selected').getAttribute('src');
    
    // The main image should have changed
    expect(newMainImageSrc).not.toBe(initialMainImageSrc);
    
    // Now check if the same behavior occurs in the Angular version
    await page.goto('http://localhost:8000/#!/phones/nexus-s');
    
    // Wait for the phone details to be displayed
    await page.waitForSelector('.phone-thumbs li');
    
    // Get the initial main image source
    const angularInitialMainImageSrc = await page.locator('.phone.selected').getAttribute('src');
    
    // Click on the second thumbnail
    await page.locator('.phone-thumbs li').nth(1).click();
    
    // Wait for the main image to update
    await page.waitForTimeout(500);
    
    // Get the new main image source
    const angularNewMainImageSrc = await page.locator('.phone.selected').getAttribute('src');
    
    // The behavior should be the same as in the React version
    expect(angularNewMainImageSrc).not.toBe(angularInitialMainImageSrc);
    expect(newMainImageSrc.split('/').pop()).toBe(angularNewMainImageSrc.split('/').pop());
  });
});