// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Phone Detail View', () => {
  test('should display the first phone image as the main phone image', async ({ page }) => {
    // Navigate to the Nexus S detail page
    await page.goto('/phones/nexus-s');
    
    // Check that the main image is displayed
    const mainImage = page.locator('.phone-images img.selected');
    await expect(mainImage).toBeVisible();
    
    // Verify it's the first image (nexus-s.0.jpg)
    const mainImageSrc = await mainImage.getAttribute('src');
    expect(mainImageSrc).toContain('nexus-s.0.jpg');
  });

  test('should swap main image if a thumbnail image is clicked', async ({ page }) => {
    // Navigate to the Nexus S detail page
    await page.goto('/phones/nexus-s');
    
    // Get the initial main image source
    const initialMainImageSrc = await page.locator('.phone-images img.selected').getAttribute('src');
    
    // Click on the second thumbnail
    await page.locator('.phone-thumbs li:nth-child(2) img').click();
    
    // Get the new main image source
    const newMainImageSrc = await page.locator('.phone-images img.selected').getAttribute('src');
    
    // Verify the main image has changed
    expect(newMainImageSrc).not.toEqual(initialMainImageSrc);
    expect(newMainImageSrc).toContain('nexus-s.1.jpg');
  });

  test('should display the phone name in the page title', async ({ page }) => {
    // Navigate to the Nexus S detail page
    await page.goto('/phones/nexus-s');
    
    // Check page title contains the phone name
    await expect(page).toHaveTitle(/Nexus S/);
  });

  test('should display the phone specifications', async ({ page }) => {
    // Navigate to the Nexus S detail page
    await page.goto('/phones/nexus-s');
    
    // Check that specifications are displayed
    await expect(page.locator('ul.specs')).toBeVisible();
    
    // Check for specific specifications
    const specs = await page.locator('ul.specs li').allTextContents();
    expect(specs.some(spec => spec.includes('Availability'))).toBeTruthy();
    expect(specs.some(spec => spec.includes('Battery'))).toBeTruthy();
    expect(specs.some(spec => spec.includes('Storage'))).toBeTruthy();
    expect(specs.some(spec => spec.includes('Connectivity'))).toBeTruthy();
    expect(specs.some(spec => spec.includes('Android'))).toBeTruthy();
    expect(specs.some(spec => spec.includes('Additional Features'))).toBeTruthy();
  });

  test('should display the back button and navigate to the phone list when clicked', async ({ page }) => {
    // Navigate to the Nexus S detail page
    await page.goto('/phones/nexus-s');
    
    // Check that the back button is displayed
    const backButton = page.locator('a:has-text("Back")');
    await expect(backButton).toBeVisible();
    
    // Click the back button
    await backButton.click();
    
    // Verify we're back on the phone list page
    await expect(page).toHaveURL('/');
    await expect(page.locator('.phones')).toBeVisible();
  });
});