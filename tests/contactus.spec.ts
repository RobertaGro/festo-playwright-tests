import { test, expect, Browser, Page, chromium } from '@playwright/test';

test('contact us', async ({ }) => {
    const browser: Browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    const context = await browser.newContext({ viewport: null, deviceScaleFactor: undefined });
    const page: Page = await context.newPage();
    await page.goto("https://festo.com/");
    await page.waitForSelector('#didomi-notice-agree-button');
    await expect(page.locator('#didomi-notice-agree-button')).toBeVisible();
    await page.click('#didomi-notice-agree-button');
    await expect(page.locator('#didomi-notice-agree-button')).not.toBeVisible();
    await page.getByText('Lithuania').click();

    await page.locator('text=Contact us').click();

    await expect(page.locator('h1.main-headline')).toHaveText('Contact Festo');

    await page.fill('#firstname', 'Tom');
    await page.fill('#lastname', 'Tester');
    await page.fill('#company', 'LTD Testing company');
    await page.fill('#email', 'testertom2025@gmail.com');
    await page.fill('#comment', `Hello,

I am Tom from LTD Testing company, I am interested in your services for our new factory. Please contact us and send us a catalog of available cylinders.

Best regards, Tom`);

    await page.locator('label[for="dataPrivacy"]').click();

    await page.locator('label[for="dataPrivacy"]').click();

    await expect(page.locator('.form-control-feedback:visible')).toHaveText('Please fill in the required fields');

    await page.fill('#firstname', '');

    const firstNameFeedback = page.locator('#firstname + .form-control-feedback');
    await expect(firstNameFeedback).toHaveText('Please enter your first name.');
})