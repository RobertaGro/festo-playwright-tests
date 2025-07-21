import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://festo.com/');
  await expect(page).toHaveTitle(/Festo Worldwide/);
});

test('accept cookies', async ({ page }) => {
  await page.goto('https://festo.com/');
  await page.waitForSelector('#didomi-notice-agree-button');
  await expect(page.locator('#didomi-notice-agree-button')).toBeVisible();
  await page.click('#didomi-notice-agree-button');
  await expect(page.locator('#didomi-notice-agree-button')).not.toBeVisible();
});