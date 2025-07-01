
import { test, expect } from '@playwright/test';

test.describe('Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('should display registration form correctly', async ({ page }) => {
    await expect(page.locator('.text-2xl.font-bold.text-center')).toHaveText(/register/i);
    await expect(page.locator('input[placeholder*="Nama lengkap"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should navigate to login page from register', async ({ page }) => {
    await page.getByRole('link', { name: 'Login disini' }).click();
    await page.waitForURL('/login');

    await expect(page).toHaveURL('/login');
    await expect(page.locator('.text-2xl.font-bold.text-center')).toHaveText(/login/i);
  });

  test('should show validation for required fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    // HTML5 validation should prevent submission
    const nameInput = page.locator('input[placeholder*="Nama lengkap"]');
    await expect(nameInput).toHaveAttribute('required');
  });
});
