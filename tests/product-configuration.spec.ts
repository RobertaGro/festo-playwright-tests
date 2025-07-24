import { test, expect, Browser, Page, chromium, Locator, FrameLocator } from '@playwright/test';
import { productConfigurationSelectors as s } from './selectors';
import { login } from './utils';

// Test for product configuration
test('product configuration', async () => {
    const browser: Browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    const context = await browser.newContext({ viewport: null, deviceScaleFactor: undefined });
    const page: Page = await context.newPage();
    const iframe: FrameLocator = page.frameLocator(s.iframeSelector);

    await login(page);

    const searchInput = page.locator(s.searchInputSelector);
    await searchInput.fill(s.searchQuery);
    await searchInput.press('Enter');
    await page.click(s.productNameSelector);

    const productTitle = await page.locator(s.productTitleSelector).textContent();
    expect(productTitle?.trim()).toBe(s.searchQuery);

    await page.getByRole('button', { name: 'Configure your product' }).click();

    const pistonDiameter = iframe.locator(s.radioButtonLabelSelector).nth(3);
    await pistonDiameter.waitFor({ state: 'visible' });
    await pistonDiameter.click();

    const materialOption = iframe.locator(s.radioButtonLabelSelector).nth(11);
    await materialOption.waitFor({ state: 'visible' });
    await materialOption.click();

    const cushioningOption = iframe.locator(s.radioButtonLabelSelector).nth(14);
    await cushioningOption.waitFor({ state: 'visible' });
    await cushioningOption.click();

    const optionsButton = iframe.locator(s.navButtonSelector).filter({ hasText: 'Options' });
    await optionsButton.waitFor({ state: 'visible' });
    await optionsButton.waitFor({ state: 'attached' });
    await optionsButton.click();

    const overviewButton = iframe.locator(s.navButtonSelector).filter({ hasText: 'Overview' });
    await overviewButton.waitFor({ state: 'visible' });
    await overviewButton.waitFor({ state: 'attached' });
    await overviewButton.click();

    const pistonContainer = iframe.locator(s.overviewResultsSelector).filter({ hasText: 'Piston diameter mm' });
    const pistonText = await pistonContainer.locator(s.overviewResultsValueSelector).textContent();

    const strokeContainer = iframe.locator(s.overviewResultsSelector).filter({ hasText: 'Stroke mm' });
    const strokeText = await strokeContainer.locator(s.overviewResultsValueSelector).textContent();

    expect(pistonText).toContain('16');   
    expect(strokeText).toContain('80');   

    await browser.close();
});