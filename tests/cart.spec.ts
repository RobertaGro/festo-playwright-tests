import { test, Browser, Page, chromium, expect } from '@playwright/test';
import { login } from './utils';

// Test to add/clear shopping cart
test('add/clear shopping cart', async () => {
    const browser: Browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await login(page);

    await page.waitForSelector('a.text-link--_f5q7', { state: 'visible' });
    await page.click('a.text-link--_f5q7:has-text("Products")');
    await page.waitForSelector('a.flyout-link--S43YN >> text=Motors and servo drives', { state: 'visible' });
    await page.click('a.flyout-link--S43YN >> text=Motors and servo drives');
    await page.waitForSelector('a.text-link--_f5q7 >> text=Servo motors', { state: 'visible' });
    await page.click('a.text-link--_f5q7 >> text=Servo motors');
    await expect(page).toHaveURL(/products\/motors-and-servo-drives.*/);
    await page.click('button.add-to-cart-button--egTAz');
    await expect(page.locator('text=The item has been successfully added to your cart.')).toBeVisible();

    

});