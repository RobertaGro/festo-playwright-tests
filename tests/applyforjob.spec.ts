import { test, expect, Browser, Page, chromium, Locator } from '@playwright/test';
import { login } from './utils';

// Test to apply for a job
test('apply for a job', async () => {
    const browser: Browser = await chromium.launch({ headless: false,  args: ['--start-maximized']});
    const context = await browser.newContext({viewport: null, deviceScaleFactor: undefined});
    const page: Page = await context.newPage();
    await login(page);
    await page.waitForSelector('a.text-link--_f5q7', { state: 'visible' });
    await page.click('a.text-link--_f5q7:has-text("Careers")');
    await page.waitForSelector('a.text-link--_f5q7 >> text=Vacancies and applications', { state: 'visible' });
    await page.click('a.text-link--_f5q7 >> text=Vacancies and applications');
    await expect(page).toHaveURL(/vacancies-and-applications.*/);

    const [newTab] = await Promise.all([
        context.waitForEvent('page'),            // wait for new tab
        page.click('text=Apply now'),            // your button or link
    ]);
    // Wait for it to load
    await newTab.waitForLoadState();

    // Check title and switch if it matches
    if ((await newTab.title()).includes('QA Engineer')) {
        await newTab.bringToFront();
    }
    await newTab.click('#cookie-accept');

    await newTab.click('a.jobTitle-link:has-text("QA Engineer")');
    await newTab.click('text=Apply now');

    const emailId: Locator = newTab.locator('[id="username"]');
    const password: Locator = newTab.locator('[id="password"]');

    await emailId.fill("testertom2025@gmail.com");
    await password.fill("iu|V#m4lZ9312_");
    await newTab.keyboard.press('Enter');

    await expect(newTab).toHaveTitle('Career Opportunities: QA Engineer');
    await browser.close();
});
