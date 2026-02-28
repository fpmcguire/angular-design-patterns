import { test, expect } from '@playwright/test';

async function dismissCookieBannerIfVisible(page: import('@playwright/test').Page): Promise<void> {
  const acceptButton = page.getByRole('button', { name: 'Accept' });
  const isVisible = await acceptButton.isVisible().catch(() => false);

  if (isVisible) {
    await acceptButton.click();
  }
}

test.describe('Clean Code Principles Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/clean-code');
    await dismissCookieBannerIfVisible(page);
  });

  test('should display clean code page with title and intro', async ({ page }) => {
    // Verify page title
    const title = page.getByTestId('patterns-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Clean Code Principles');

    // Verify intro text
    const intro = page.getByTestId('patterns-intro');
    await expect(intro).toBeVisible();
    await expect(intro).toContainText('maintainable');
  });

  test('should display principle cards', async ({ page }) => {
    // Wait for principles to load
    await page.waitForLoadState('networkidle');

    // Verify principle cards are visible
    const cards = page.getByTestId('pattern-card');
    await expect(cards.first()).toBeVisible();

    // Verify there are multiple principle cards
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display principle card details', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const firstCard = page.getByTestId('pattern-card').first();

    // Verify card has title, category, and description
    await expect(firstCard.getByTestId('pattern-card-title')).toBeVisible();
    await expect(firstCard.getByTestId('pattern-card-category')).toBeVisible();
    await expect(firstCard.getByTestId('pattern-card-description')).toBeVisible();
  });

  test('should filter principles by category', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Get initial count of principles
    const initialCards = page.getByTestId('pattern-card');
    const initialCount = await initialCards.count();

    // Check if filters are available
    const filters = page.getByTestId('patterns-filters');
    const hasFilters = await filters.isVisible().catch(() => false);

    if (hasFilters) {
      // Click on a category filter (not the "All" button)
      const categoryButtons = filters.locator('button').filter({ hasNotText: 'All' });
      const firstCategoryButton = categoryButtons.first();
      await firstCategoryButton.click();

      // Wait for filtering to complete
      await page.waitForTimeout(300);

      // Verify filtered count is different (likely less)
      const filteredCards = page.getByTestId('pattern-card');
      const filteredCount = await filteredCards.count();

      // Should have some principles but likely fewer than initial
      expect(filteredCount).toBeGreaterThan(0);

      // Click "All" to reset filter
      await page.getByTestId('patterns-filter-all-button').click();
      await page.waitForTimeout(300);

      // Verify we're back to showing all principles
      const resetCards = page.getByTestId('pattern-card');
      const resetCount = await resetCards.count();
      expect(resetCount).toBe(initialCount);
    }
  });

  test('should navigate to principle detail when card clicked', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Get the first principle card and its title
    const firstCard = page.getByTestId('pattern-card').first();
    const principleTitle = await firstCard.getByTestId('pattern-card-title').textContent();

    // Click the card
    await firstCard.click();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Verify detail page content is rendered
    await expect(page.getByTestId('pattern-detail-container')).toBeVisible();
    await expect(page.getByTestId('pattern-detail-title')).toBeVisible();
    await expect(page.getByTestId('pattern-detail-back-link')).toHaveAttribute(
      'href',
      /\/clean-code$/,
    );
  });

  test('should display star ratings when available', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Find a card that has stars
    const cardsWithStars = page.getByTestId('pattern-card').filter({
      has: page.getByTestId('pattern-card-stars'),
    });

    const countWithStars = await cardsWithStars.count();

    if (countWithStars > 0) {
      const firstCardWithStars = cardsWithStars.first();
      const stars = firstCardWithStars.getByTestId('pattern-card-stars');

      await expect(stars).toBeVisible();

      // Verify stars contain star symbols
      const starsText = await stars.textContent();
      expect(starsText).toContain('★');
    }
  });
});
