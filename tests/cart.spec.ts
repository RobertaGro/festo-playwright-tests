import { test, Browser, Page, chromium, expect } from '@playwright/test';
import { login } from './utils';

// Test to add/clear shopping cart
test('add/clear shopping cart', async () => {
    const browser: Browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    const context = await browser.newContext({ viewport: null, deviceScaleFactor: undefined });
    const page: Page = await context.newPage();
    await login(page);

    await page.waitForSelector('a.text-link--_f5q7', { state: 'visible' });
    await page.click('a.text-link--_f5q7:has-text("Products")');
    await page.locator('div.flyout-link--S43YN:has-text("Motors and servo drives")').first().click();
    await page.getByText('Servo drive', { exact: true }).click();
    await expect(page).toHaveURL(/products\/motors-and-servo-drives.*/);
    await page.click('button.add-to-cart-button--egTAz');
    await expect(page.locator('text=The item has been successfully added to your cart.')).toBeVisible();

    await page.waitForSelector('a.text-link--_f5q7', { state: 'visible' });
    await page.click('a.text-link--_f5q7:has-text("Products")');
    await page.locator('div.flyout-link--S43YN:has-text("Motion Terminal")').first().click();
    await page.click('a:has-text("Input module CTMM")');
    const productName = await page.textContent('h3.product-name--FqJXX');
    await page.click('button.add-to-cart-button--egTAz');
    await expect(page.locator('text=The item has been successfully added to your cart.')).toBeVisible();

    await page.locator('[data-testid="button"]', { hasText: "Cart" }).click();
    const cartProductNames = await page.locator('a.article-name--SISb0').allTextContents();
    expect(cartProductNames.map(n => n.trim())).toContain(productName?.trim());

    await page.locator('span.cart-icon-bar-element-text--fqKIx', { hasText: 'Delete all' }).click();
    await page.locator('button:has-text("Yes")').click();
    await expect(page.locator('text=No items in your cart yet')).toBeVisible();
    await browser.close();
})