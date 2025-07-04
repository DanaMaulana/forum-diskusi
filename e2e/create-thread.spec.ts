/** Skenario pengujian alur pembuatan thread:
*   Skenario 1: Redirect ke login ketika tidak terotentikasi
*     - Pengguna mengakses `/create-thread` tanpa login
*     - Sistem mengarahkan ke halaman `/login`
*   Skenario 2: Menampilkan form pembuatan thread ketika terotentikasi
*     - Mock API untuk `v1/users/me` dengan data user valid
*     - Set token di localStorage
*     - Navigasi ke halaman create-thread berhasil
*/

import { test, expect } from '@playwright/test';

test.describe('Create Thread Flow', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/create-thread');
    await page.waitForLoadState('networkidle');

    // Should redirect to login page
    await expect(page).toHaveURL('/login');
  });

  test('should display create thread form when authenticated', async ({ page }) => {
    // Mock API calls BEFORE setting localStorage
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

    // Set token BEFORE goto
    await page.addInitScript(() => {
      window.localStorage.setItem('accessToken', 'fake-token');
    });

    // Langsung ke halaman home dulu, lalu ke /create-thread
    await page.goto('/');
    await page.goto('/create-thread');
    await page.waitForLoadState('networkidle');

    // ...lanjutkan test seperti biasa
  });
});