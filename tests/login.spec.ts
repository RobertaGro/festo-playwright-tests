import { test, Browser, Page, Locator, chromium } from '@playwright/test';
import { loginSelectors as s } from './selectors';
import { handleCookieAccept } from './utils';

test('log in', async () => {
    const browser: Browser = await chromium.launch({ headless: false,  args: ['--start-maximized']});
    const context = await browser.newContext({viewport: null, deviceScaleFactor: undefined});
    const page: Page = await context.newPage();

    await handleCookieAccept(page);
    await page.click(s.loginIconSelector);
    
    const emailId: Locator = page.locator(s.emailId);
    const continueButton: Locator = page.locator(s.continueButton);
    const password: Locator = page.locator(s.password);
    const loginButton: Locator = page.locator(s.loginButton);

    await emailId.fill("testertom2025@gmail.com");
    await continueButton.click();
    await password.fill("iu|V#m4lZ9312_");
    await loginButton.click();
});
