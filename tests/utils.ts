import { Page, Locator } from '@playwright/test';

// Helper function to log in
export async function login(page: Page) {
    await page.goto("https://festo.com/");
    await page.waitForSelector('#didomi-notice-agree-button');
    await page.click('#didomi-notice-agree-button');
    await page.getByText('Lithuania').click();
    await page.click('.login-icon--D0yN8');
    
    const emailId: Locator = page.locator('[id="username"]');
    const continueButton: Locator = page.locator('[id="btnContinue"]');
    const password: Locator = page.locator('[id="password"]');
    const loginButton: Locator = page.locator('[id="btnSignIn"]');

    await emailId.fill("testertom2025@gmail.com");
    await continueButton.click();
    await password.fill("iu|V#m4lZ9312_");
    await loginButton.click();
}