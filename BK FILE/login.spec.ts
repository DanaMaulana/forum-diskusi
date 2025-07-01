
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display login page correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForURL('/login');
    await page.waitForLoadState('networkidle');

    // Update the expected text to match the actual heading if it's different (e.g., 'Masuk' or 'Sign In')
    await expect(page.locator('.text-2xl.font-bold.text-center')).toHaveText(/login/i);
    // If the heading is indeed 'Login', ensure your app displays 'Login' as the <h1> text on the login page.
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForURL('/login');
    await page.waitForLoadState('networkidle');

    await page.click('button[type="submit"]');

    // HTML5 validation should prevent submission
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute('required');
  });

  test('should navigate to register page from login', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForURL('/login');
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: 'Daftar disini' }).click();
    await page.waitForURL('/register');

    await expect(page).toHaveURL('/register');
    await expect(page.locator('.text-2xl.font-bold.text-center')).toHaveText(/register/i);
  });

  test('should show login form elements', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForURL('/login');
    await page.waitForLoadState('networkidle');

    // Check for form elements
    await expect(page.locator('label:has-text("Email")')).toBeVisible();
    await expect(page.locator('label:has-text("Password")')).toBeVisible();
    await expect(page.locator('input[placeholder*="nama@example.com"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="Masukkan password"]')).toBeVisible();
  });

  test('should handle login attempt with mock credentials', async ({ page }) => {
    await page.route('**/v1/login', (route) => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Invalid credentials' }),
      });
    });

    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForURL('/login');
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show loading state
    await expect(page.locator('button:has-text("Logging in...")')).toBeVisible();
  });
});
