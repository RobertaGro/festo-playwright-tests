import { test, expect, Browser, Page, chromium } from '@playwright/test';
import { footerSelectors as s } from './selectors';
import { handleCookieAccept } from './utils';

test('footer check', async () => {
    const browser: Browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    const context = await browser.newContext({ viewport: null, deviceScaleFactor: undefined });
    const page: Page = await context.newPage();

    await handleCookieAccept(page);

    const footerSelectors = [
        'text=Imprint',
        'text=Data privacy',
        'text=Cookie settings',
        'text=Terms and conditions'
    ];
    
    for (const selector of footerSelectors) {
        await expect(page.locator(selector)).toBeVisible();
    }

    await page.locator('text=Imprint').click();
    await expect(page.locator(s.mainHeadlineSelector)).toHaveText('Imprint');
    await page.goBack();

    await page.locator('text=Data privacy').click();
    await expect(page.locator(s.mainHeadlineSelector)).toHaveText('Data Protection Statement');
    await page.goBack();

    await page.locator('text=Cookie settings').click();
    await expect(page.locator('span', { hasText: 'Festo Uses Cookies' })).toBeVisible();
    await page.locator('#btn-toggle-save').click();


    await page.locator('text=Terms and conditions').click();
    await expect(page.locator(s.mainHeadlineSelector)).toHaveText('Terms and Conditions of Sale');

    await browser.close();
})