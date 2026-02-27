import { test, expect } from '@playwright/test';

type RouteSmokeCase = {
  route: string;
  headingTestId: string;
  expectedHeading: string;
};

const patternRoutes: RouteSmokeCase[] = [
  {
    route: '/patterns',
    headingTestId: 'patterns-title',
    expectedHeading: 'Angular Design Patterns',
  },
  {
    route: '/classic',
    headingTestId: 'patterns-title',
    expectedHeading: 'Classic Design Patterns (GoF)',
  },
  {
    route: '/solid',
    headingTestId: 'patterns-title',
    expectedHeading: 'S.O.L.I.D. Principles',
  },
  {
    route: '/grasp',
    headingTestId: 'patterns-title',
    expectedHeading: 'GRASP Principles',
  },
  {
    route: '/clean-code',
    headingTestId: 'patterns-title',
    expectedHeading: 'Clean Code Principles',
  },
  {
    route: '/frontend-architecture',
    headingTestId: 'patterns-title',
    expectedHeading: 'Frontend Architecture Principles',
  },
  {
    route: '/reactive',
    headingTestId: 'patterns-title',
    expectedHeading: 'Reactive Principles',
  },
];

async function dismissCookieBannerIfVisible(page: import('@playwright/test').Page): Promise<void> {
  const acceptButton = page.getByRole('button', { name: 'Accept' });
  const isVisible = await acceptButton.isVisible().catch(() => false);

  if (isVisible) {
    await acceptButton.click();
  }
}

test.describe('App Routes Smoke', () => {
  test('should redirect root path to patterns', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await dismissCookieBannerIfVisible(page);

    expect(page.url()).toContain('/patterns');
    await expect(page.getByTestId('patterns-title')).toHaveText('Angular Design Patterns');
  });

  for (const routeCase of patternRoutes) {
    test(`should render ${routeCase.route} route`, async ({ page }) => {
      await page.goto(routeCase.route);
      await page.waitForLoadState('networkidle');
      await dismissCookieBannerIfVisible(page);

      await expect(page.getByTestId(routeCase.headingTestId)).toBeVisible();
      await expect(page.getByTestId(routeCase.headingTestId)).toHaveText(routeCase.expectedHeading);
      await expect(page.getByTestId('pattern-card').first()).toBeVisible();
    });

    test(`should open detail page from ${routeCase.route} list`, async ({ page }) => {
      await page.goto(routeCase.route);
      await page.waitForLoadState('networkidle');
      await dismissCookieBannerIfVisible(page);

      const firstCard = page.getByTestId('pattern-card').first();
      await expect(firstCard).toBeVisible();
      await firstCard.click();
      await page.waitForLoadState('networkidle');

      await expect(page.getByTestId('pattern-detail-container')).toBeVisible();
      await expect(page.getByTestId('pattern-detail-title')).toBeVisible();
      await expect(page.getByTestId('pattern-detail-back-link')).toHaveAttribute(
        'href',
        new RegExp(`${routeCase.route}$`),
      );
    });
  }

  test('should render architecture route from sidebar navigation', async ({ page }) => {
    await page.goto('/patterns');
    await dismissCookieBannerIfVisible(page);

    const sidebar = page.getByTestId('app-sidebar-nav');
    await expect(sidebar).toBeVisible();

    await page.getByTestId('app-sidebar-architecture-link').click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/architecture');
    await expect(page.getByTestId('architecture-page-title')).toHaveText(
      'Angular Software Architecture',
    );
  });
});
