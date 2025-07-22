import { test, Browser, Page, chromium } from '@playwright/test';
import { login } from './utils';

// Test to add/clear shopping cart
test('add/clear shopping cart', async () => {
    const browser: Browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await login(page);

});