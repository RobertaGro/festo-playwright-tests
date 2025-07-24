import { test, expect, Browser, Page, chromium } from '@playwright/test';
import {commonSelectors as s} from './selectors';
import { handleCookieAccept } from './utils';

test('contact us', async () => {
    const browser: Browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    const context = await browser.newContext({ viewport: null, deviceScaleFactor: undefined });
    const page: Page = await context.newPage();
    
    await handleCookieAccept(page);

    await page.locator('text=Contact us').click();

    await expect(page.locator('h1.main-headline')).toHaveText('Contact Festo');

    await page.fill('#firstname', 'Tom');
    await page.fill('#lastname', 'Tester');
    await page.fill('#company', 'LTD Testing company');
    await page.fill('#email', "testertom2025@gmail.com");
    await page.fill('#comment', `Hello,

I am Tom from LTD Testing company, I am interested in your services for our new factory. Please contact us and send us a catalog of available cylinders.

Best regards, Tom`);

    await page.locator('label[for="dataPrivacy"]').click();

    await page.locator('label[for="dataPrivacy"]').click();

    await expect(page.locator('.form-control-feedback:visible').last()).toHaveText('Please fill in the required fields');

    await page.fill('#firstname', '');

    const firstNameFeedback = page.locator('#firstname + .form-control-feedback');
    await expect(firstNameFeedback).toHaveText('Please enter your first name.');
})