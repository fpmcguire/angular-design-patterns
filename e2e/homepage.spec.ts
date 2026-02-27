import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main header', async ({ page }) => {
    // Verify the page title
    await expect(page).toHaveTitle(/Angular Design Patterns/);

    // Verify the header using data-testid
    const header = page.getByTestId('app-header-title');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Angular Design Patterns and Principles');
  });

  test('should display the subtitle', async ({ page }) => {
    const subtitle = page.getByTestId('app-header-subtitle');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('Angular 21');
  });

  test('should have navigation sidebar', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Verify the sidebar component is present
    const sidebar = page.locator('.sidebar').first();
    await expect(sidebar).toBeVisible();
  });
});
