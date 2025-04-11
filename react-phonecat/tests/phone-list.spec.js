const { test, expect } = require('@playwright/test');

test.describe('PhoneList Component', () => {
  test('should display the correct number of phones', async ({ page }) => {
    // Go to the Angular version
    await page.goto('http://localhost:8000/#!/phones');
    
    // Wait for the phone list to be displayed
    await page.waitForSelector('.phones li');
    
    // Get the count of phones in the Angular version
    const angularPhoneCount = await page.locator('.phones li').count();
    
    // Go to the React version
    await page.goto('http://localhost:3000/phones');
    
    // Wait for the phone list to be displayed
    await page.waitForSelector('.phones li');
    
    // Get the count of phones in the React version
    const reactPhoneCount = await page.locator('.phones li').count();
    
    // Compare the counts
    expect(reactPhoneCount).toBe(angularPhoneCount);
  });
  
  test('should filter the phone list as a user types into the search box', async ({ page }) => {
    // Go to the React version
    await page.goto('http://localhost:3000/phones');
    
    // Wait for the phone list to be displayed
    await page.waitForSelector('.phones li');
    
    // Get the initial count of phones
    const initialCount = await page.locator('.phones li').count();
    
    // Type 'motorola' into the search box
    await page.getByTestId('phone-list-search').fill('motorola');
    
    // Wait for the filtered list
    await page.waitForTimeout(500);
    
    // Get the filtered count
    const filteredCount = await page.locator('.phones li').count();
    
    // Check that the list is filtered
    expect(filteredCount).toBeLessThan(initialCount);
    
    // Check that all visible phones contain 'motorola' in their name or description
    const visiblePhones = await page.locator('.phones li').all();
    for (const phone of visiblePhones) {
      const text = await phone.textContent();
      expect(text.toLowerCase()).toContain('motorola');
    }
    
    // Now do the same for the Angular version to compare
    await page.goto('http://localhost:8000/#!/phones');
    
    // Wait for the phone list to be displayed
    await page.waitForSelector('.phones li');
    
    // Type 'motorola' into the search box
    await page.locator('input[ng-model="$ctrl.query"]').fill('motorola');
    
    // Wait for the filtered list
    await page.waitForTimeout(500);
    
    // Get the filtered count
    const angularFilteredCount = await page.locator('.phones li').count();
    
    // Compare the filtered counts
    expect(filteredCount).toBe(angularFilteredCount);
  });
  
  test('should be able to sort the phone list by name and age', async ({ page }) => {
    // Go to the React version
    await page.goto('http://localhost:3000/phones');
    
    // Wait for the phone list to be displayed
    await page.waitForSelector('.phones li');
    
    // Select 'Alphabetical' sort
    await page.getByTestId('phone-list-sort').selectOption('name');
    
    // Get the first phone name
    const firstPhoneNameAlpha = await page.locator('.phones li a').nth(1).textContent();
    
    // Select 'Newest' sort
    await page.getByTestId('phone-list-sort').selectOption('age');
    
    // Get the first phone name after sorting by newest
    const firstPhoneNameAge = await page.locator('.phones li a').nth(1).textContent();
    
    // The names should be different if sorting works
    expect(firstPhoneNameAlpha).not.toBe(firstPhoneNameAge);
    
    // Now do the same for the Angular version to compare
    await page.goto('http://localhost:8000/#!/phones');
    
    // Wait for the phone list to be displayed
    await page.waitForSelector('.phones li');
    
    // Select 'Alphabetical' sort
    await page.locator('select[ng-model="$ctrl.orderProp"]').selectOption('name');
    
    // Get the first phone name
    const angularFirstPhoneNameAlpha = await page.locator('.phones li a').nth(1).textContent();
    
    // Select 'Newest' sort
    await page.locator('select[ng-model="$ctrl.orderProp"]').selectOption('age');
    
    // Get the first phone name after sorting by newest
    const angularFirstPhoneNameAge = await page.locator('.phones li a').nth(1).textContent();
    
    // Compare the sorted results with Angular version
    expect(firstPhoneNameAlpha).toBe(angularFirstPhoneNameAlpha);
    expect(firstPhoneNameAge).toBe(angularFirstPhoneNameAge);
  });
});