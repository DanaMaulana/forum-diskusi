/** Skenario pengujian alur login:
*   Skenario 1: Menampilkan halaman login dengan benar
*     - Form login memiliki input email, password, dan tombol submit
*   Skenario 2: Validasi error untuk field kosong
*     - HTML5 validation mencegah submit form kosong
*   Skenario 3: Navigasi ke halaman register dari login
*     - Link "Daftar disini" mengarahkan ke `/register`
*   Skenario 4: Menampilkan elemen form login
*     - Label dan placeholder sesuai untuk input email dan password
*   Skenario 5: Menangani percobaan login dengan mock credentials
*     - Mock API dengan delay untuk menangkap loading state
*     - Menampilkan tombol "Logging in..." saat proses login
*/

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

    await expect(page.locator('.text-2xl.font-bold.text-center')).toHaveText(/login/i);
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
    // Mock API with delay to catch loading state
    await page.route('**/v1/login', async (route) => {
      // Add delay to ensure loading state is visible
      await new Promise((resolve) => setTimeout(resolve, 1000));
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

    // Click submit and immediately check for loading state
    const submitPromise = page.click('button[type="submit"]');

    // Check for loading state with shorter timeout
    await expect(page.locator('button:has-text("Logging in...")')).toBeVisible({ timeout: 3000 });

    // Wait for the submit to complete
    await submitPromise;
  });
});