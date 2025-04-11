const { test, expect } = require('@playwright/test');

test.describe('Functionality Comparison Tests', () => {
  test('search functionality should work the same way', async ({ page }) => {
    // Test in Angular
    await page.goto('http://localhost:8000/#!/phones');
    await page.waitForSelector('.phones li');
    
    // Count initial phones
    const angularInitialCount = await page.locator('.phones li').count();
    
    // Search for 'motorola'
    await page.locator('input[ng-model="$ctrl.query"]').fill('motorola');
    await page.waitForTimeout(500);
    
    // Count filtered phones
    const angularFilteredCount = await page.locator('.phones li').count();
    
    // Test in React
    await page.goto('http://localhost:3000/phones');
    await page.waitForSelector('.phones li');
    
    // Count initial phones
    const reactInitialCount = await page.locator('.phones li').count();
    
    // Search for 'motorola'
    await page.getByTestId('phone-list-search').fill('motorola');
    await page.waitForTimeout(500);
    
    // Count filtered phones
    const reactFilteredCount = await page.locator('.phones li').count();
    
    // Compare results
    expect(angularInitialCount).toBe(reactInitialCount);
    expect(angularFilteredCount).toBe(reactFilteredCount);
  });
  
  test('sorting functionality should work the same way', async ({ page }) => {
    // Function to get phone names from a page
    async function getPhoneNames(page) {
      return await page.$$eval('.phones li a:nth-child(2)', elements => {
        return elements.map(el => el.textContent);
      });
    }
    
    // Test Angular sorting
    await page.goto('http://localhost:8000/#!/phones');
    await page.waitForSelector('.phones li');
    
    // Sort by name
    await page.locator('select[ng-model="$ctrl.orderProp"]').selectOption('name');
    await page.waitForTimeout(500);
    const angularNameSorted = await getPhoneNames(page);
    
    // Sort by age
    await page.locator('select[ng-model="$ctrl.orderProp"]').selectOption('age');
    await page.waitForTimeout(500);
    const angularAgeSorted = await getPhoneNames(page);
    
    // Test React sorting
    await page.goto('http://localhost:3000/phones');
    await page.waitForSelector('.phones li');
    
    // Sort by name
    await page.getByTestId('phone-list-sort').selectOption('name');
    await page.waitForTimeout(500);
    const reactNameSorted = await getPhoneNames(page);
    
    // Sort by age
    await page.getByTestId('phone-list-sort').selectOption('age');
    await page.waitForTimeout(500);
    const reactAgeSorted = await getPhoneNames(page);
    
    // Compare results - names should be in the same order
    expect(reactNameSorted).toEqual(angularNameSorted);
    expect(reactAgeSorted).toEqual(angularAgeSorted);
  });
  
  test('thumbnail clicking should work the same way', async ({ page }) => {
    // Function to get main image src
    async function getMainImageSrc(page) {
      return await page.locator('.phone.selected').getAttribute('src');
    }
    
    // Test Angular thumbnail clicking
    await page.goto('http://localhost:8000/#!/phones/nexus-s');
    await page.waitForSelector('.phone-thumbs li');
    
    const angularInitialSrc = await getMainImageSrc(page);
    await page.locator('.phone-thumbs li').nth(1).click();
    await page.waitForTimeout(500);
    const angularNewSrc = await getMainImageSrc(page);
    
    // Test React thumbnail clicking
    await page.goto('http://localhost:3000/phones/nexus-s');
    await page.waitForSelector('.phone-thumbs li');
    
    const reactInitialSrc = await getMainImageSrc(page);
    await page.locator('.phone-thumbs li').nth(1).click();
    await page.waitForTimeout(500);
    const reactNewSrc = await getMainImageSrc(page);
    
    // Verify the behavior is the same
    expect(angularInitialSrc).not.toBe(angularNewSrc);
    expect(reactInitialSrc).not.toBe(reactNewSrc);
    
    // The images should point to the same file (regardless of path differences)
    expect(angularInitialSrc.split('/').pop()).toBe(reactInitialSrc.split('/').pop());
    expect(angularNewSrc.split('/').pop()).toBe(reactNewSrc.split('/').pop());
  });
});