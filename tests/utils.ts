import { Page, Locator } from '@playwright/test';
import { commonSelectors as s } from './selectors';
// Helper function to log in
export async function login(page: Page) {
    handleCookieAccept(page);
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


export async function handleCookieAccept(page: Page) {
    await page.goto("https://festo.com/");
    await page.waitForSelector(s.didomiNoticeAgreeButton);
    await page.click(s.didomiNoticeAgreeButton);
    await page.getByText('Lithuania').click();
}
