// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Phone Detail Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a specific phone detail page
    await page.goto('/phones/nexus-s');
  });

  test('should display the phone details', async ({ page }) => {
    // Check if the phone name is displayed
    await expect(page.locator('h1')).toContainText('Nexus S');
    
    // Check if the main phone image is displayed
    await expect(page.locator('img.phone')).toBeVisible();
    
    // Check if the thumbnails are displayed
    await expect(page.locator('.phone-thumbs img').first()).toBeVisible();
    
    // Check if the specifications are displayed
    await expect(page.locator('#availability')).toBeVisible();
    await expect(page.locator('#battery')).toBeVisible();
    await expect(page.locator('#storage')).toBeVisible();
    await expect(page.locator('#connectivity')).toBeVisible();
    await expect(page.locator('#android')).toBeVisible();
    await expect(page.locator('#display')).toBeVisible();
    await expect(page.locator('#hardware')).toBeVisible();
    await expect(page.locator('#camera')).toBeVisible();
    await expect(page.locator('#additional-features')).toBeVisible();
  });

  test('should change the main image when a thumbnail is clicked', async ({ page }) => {
    // Get the current main image source
    const initialImageSrc = await page.locator('img.phone').getAttribute('src');
    
    // Click on the second thumbnail
    await page.locator('.phone-thumbs img').nth(1).click();
    
    // Wait for the image to update
    await page.waitForTimeout(500);
    
    // Get the new main image source
    const newImageSrc = await page.locator('img.phone').getAttribute('src');
    
    // Check if the main image has changed
    expect(newImageSrc).not.toBe(initialImageSrc);
  });

  test('should navigate back to the phone list', async ({ page }) => {
    // Click on the back link
    await page.locator('a').filter({ hasText: 'Back' }).click();
    
    // Check if we're back to the phone list page
    await expect(page).toHaveURL('/');
    await expect(page.locator('.phones')).toBeVisible();
  });
});