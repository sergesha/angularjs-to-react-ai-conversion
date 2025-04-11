// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Phone List Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render phone list', async ({ page }) => {
    // Check if the phone list is rendered
    await expect(page.locator('.phones')).toBeVisible();
    
    // Check if there are 20 phones in the list
    await expect(page.locator('.phones li')).toHaveCount(20);
  });

  test('should filter the phone list as a user types into the search box', async ({ page }) => {
    // Type 'nexus' into search box
    await page.fill('[data-testid="search-input"]', 'nexus');
    
    // Check if the list is filtered to 1 phone
    await expect(page.locator('.phones li')).toHaveCount(1);
    
    // Check if the name is correct
    await expect(page.locator('.phones li .name')).toContainText('Nexus S');
    
    // Clear and type 'motorola'
    await page.fill('[data-testid="search-input"]', '');
    await page.fill('[data-testid="search-input"]', 'motorola');
    
    // Check if the list is filtered to 8 phones
    await expect(page.locator('.phones li')).toHaveCount(8);
  });

  test('should sort the phone list by name or age', async ({ page }) => {
    // Check default sorting (by name)
    let firstPhone = await page.locator('.phones li').first().locator('.name').textContent();
    expect(firstPhone).toContain('DROID');
    
    // Change sorting to age
    await page.selectOption('[data-testid="sort-select"]', 'age');
    
    // Check if the list is now sorted by age
    firstPhone = await page.locator('.phones li').first().locator('.name').textContent();
    expect(firstPhone).toContain('Nexus S');
  });

  test('should navigate to the phone detail page when a phone name is clicked', async ({ page }) => {
    // Click on the first phone
    await page.locator('.phones li a').first().click();
    
    // Check if the URL changed to the phone detail page
    await expect(page).toHaveURL(/\/phones\/.+/);
    
    // Check if the phone detail page is loaded
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.phone-images')).toBeVisible();
  });
});