import { test, expect, Browser, Page, chromium, Locator } from '@playwright/test';
import { login } from './utils';

// Test for product configuration
test('product configuration', async () => {
    const browser: Browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    const context = await browser.newContext({ viewport: null, deviceScaleFactor: undefined });
    const page: Page = await context.newPage();
    await login(page);

    const searchQuery = 'DSNU-16-80-PPS-A';
    const searchInput = page.locator('input[data-testid="first-search-input"]');
    await searchInput.fill(searchQuery);
    await searchInput.press('Enter');
    await page.click('h3.product-name--FqJXX');

    // 4. Patikrinam ar pavadinimas puslapyje sutampa
    const productTitle = await page.locator('p.order-code--cBFy2').textContent();
    expect(productTitle?.trim()).toBe(searchQuery);

    // 5. Paspaudžiam "Configure your product"
    await page.getByRole('button', { name: 'Configure your product' }).click();

    // 6. Palaukiam, kol atsiras konfiguravimo blokas
    await page.waitForSelector('div.fweRadioCheckmark-WVuPuH', { state: 'visible' });

    // 8. Pasirenkam "Material properties" -> F1A (2-as ratio)
    const materialOption = page.locator('div.fweRadioCheckmark-WVuPuH').nth(1);
    await materialOption.waitFor({ state: 'visible' });
    await materialOption.click();

    // 9. Pasirenkam "Cushioning" (3-as ratio)
    const cushioningOption = page.locator('div.fweRadioCheckmark-WVuPuH').nth(2);
    await cushioningOption.waitFor({ state: 'visible' });
    await cushioningOption.click();

    // 10. Paspaudžiam "Options" sekciją
    await page.getByText('Options', { exact: true }).click();

    // 11. Paspaudžiam "Overview" sekciją
    await page.getByText('Overview', { exact: true }).click();

    // 12. Patikrinam ar "Piston diameter mm" ir "Stroke mm" yra teisingi
    const pistonText = await page.locator('text=Piston diameter mm').first().textContent();
    const strokeText = await page.locator('text=Stroke mm').first().textContent();

    expect(pistonText).toContain('16');   // Pvz. diametras 16 mm
    expect(strokeText).toContain('80');   // Pvz. eiga 80 mm

    // 13. Uždaryti naršyklę
    await browser.close();

});