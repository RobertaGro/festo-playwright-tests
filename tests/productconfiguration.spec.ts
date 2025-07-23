import { test, expect, Browser, Page, chromium, Locator } from '@playwright/test';
import { login } from './utils';

// Test for product configuration
test('product configuration', async () => {
    const browser: Browser = await chromium.launch({ headless: false,  args: ['--start-maximized']});
    const context = await browser.newContext({viewport: null, deviceScaleFactor: undefined});
    const page: Page = await context.newPage();
    await login(page);