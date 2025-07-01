import { test, expect } from '@playwright/test';

test.describe('Create Thread Flow', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/create-thread');
    await page.waitForLoadState('networkidle');

    // Should redirect to login page
    await expect(page).toHaveURL('/login');
  });

  test('should display create thread form when authenticated', async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'fake-token');
    });

    // Mock API calls
    await page.route('**/v1/users/me', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            user: {
              id: '1',
              name: 'Test User',
              email: 'test@example.com',
              avatar: 'avatar.jpg',
            },
          },
        }),
      });
    });

    await page.goto('/create-thread');
    await page.waitForLoadState('networkidle');

    // Wait for authentication to be processed
    await page.waitForTimeout(1000);

    await expect(page.locator('h1')).toHaveText(/buat thread/i);
    await expect(page.locator('input[placeholder*="Masukkan judul thread"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="javascript, react"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder*="Tulis detail thread"]')).toBeVisible();
  });
});