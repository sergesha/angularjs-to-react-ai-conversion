// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Phone List View', () => {
  test('should display the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Google Phone Gallery/);
  });

  test('should filter the phone list as a user types into the search box', async ({ page }) => {
    await page.goto('/');
    
    // Initially should list 20 phones
    const phoneCount = await page.locator('.phones li').count();
    expect(phoneCount).toBe(20);
    
    // Filter by 'motorola'
    await page.locator('input[ng-model="$ctrl.query"]').fill('motorola');
    
    // Should now display only motorola phones (8)
    const filteredCount = await page.locator('.phones li').count();
    expect(filteredCount).toBe(8);
    
    // Check that all visible phones contain 'motorola' in their name
    const visiblePhones = await page.locator('.phones li .name').allTextContents();
    for (const phoneName of visiblePhones) {
      expect(phoneName.toLowerCase()).toContain('motorola');
    }
  });

  test('should be able to sort the phone list', async ({ page }) => {
    await page.goto('/');
    
    // Default sort is by name
    let phoneNames = await page.locator('.phones li .name').allTextContents();
    const namesSortedAlphabetically = [...phoneNames].sort();
    expect(phoneNames).toEqual(namesSortedAlphabetically);
    
    // Change sort to 'Newest'
    await page.locator('select').selectOption('age');
    
    // Get the newly sorted names
    let phoneNamesNewOrder = await page.locator('.phones li .name').allTextContents();
    
    // Verify the order has changed
    expect(phoneNamesNewOrder).not.toEqual(namesSortedAlphabetically);
  });

  test('should navigate to phone details when phone name is clicked', async ({ page }) => {
    await page.goto('/');
    
    // Click on the first phone
    const firstPhoneName = await page.locator('.phones li .name').first().textContent();
    await page.locator('.phones li a').first().click();
    
    // Should navigate to detail view
    await expect(page).toHaveURL(/phones\/[^/]+$/);
    
    // Check that the phone name is displayed in the detail view
    const detailTitle = await page.locator('h1').textContent();
    expect(detailTitle).toContain(firstPhoneName);
  });
});