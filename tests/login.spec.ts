import { test, expect, Browser, Page, Locator, chromium } from '@playwright/test';

test('log in', async ({ }) => {
    const browser: Browser = await chromium.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto("https://festo.com/");
    await page.waitForSelector('#didomi-notice-agree-button');
    await expect(page.locator('#didomi-notice-agree-button')).toBeVisible();
    await page.click('#didomi-notice-agree-button');
    await expect(page.locator('#didomi-notice-agree-button')).not.toBeVisible();
    await page.getByText('Lithuania').click();
    await page.click('.login-icon--D0yN8');
    
    const emailId:Locator = await page.locator('[id="username"]');
    const continueButton:Locator = await page.locator('[id="btnContinue"]');
    const password:Locator = await page.locator('[id="password"]');
    const loginButton:Locator = await page.locator('[id="btnSignIn"]');

    await emailId.fill("testertom2025@gmail.com");
    await continueButton.click();
    await password.fill("iu|V#m4lZ9312_");
    await loginButton.click();

});
