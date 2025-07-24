import { test, Browser, Page, chromium, expect } from '@playwright/test';
import { cartSelectors as s} from './selectors';
import { login } from './utils';

const emptyCart = async (page: Page) => {
    await page.locator(s.button, { hasText: "Cart" }).click();
    const deleteAllButton = page.locator(s.cartButtonSelector, { hasText: 'Delete all' });
    await deleteAllButton.waitFor({ state: 'visible' });

    const classAttribute = await deleteAllButton.getAttribute('class');
    const isDisabled = classAttribute?.includes(s.cartButtonDisabledSelector);

    if (!isDisabled) {
        console.log('Cart is not empty, clearing it...');
        await deleteAllButton.click();
        await page.locator('button:has-text("Yes")').click();
    } else {
        console.log('Cart is already empty.');
    }
}

test('add/clear shopping cart', async () => {
    const browser: Browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    const context = await browser.newContext({ viewport: null, deviceScaleFactor: undefined });
    const page: Page = await context.newPage();

    await login(page);
    await emptyCart(page);

    await page.waitForSelector(s.productPopupSelector, { state: 'visible' });
    await page.click(s.productPopupSelectorHasProducts);
    await page.locator(s.motorsAndServoDrivesSelector).first().click();
    await page.getByText('Servo drive', { exact: true }).click();
    await expect(page).toHaveURL(/products\/motors-and-servo-drives.*/);
    await page.click(s.addToCartButtonSelector);
    await expect(page.locator('text=The item has been successfully added to your cart.')).toBeVisible();

    await page.waitForSelector(s.productPopupSelector, { state: 'visible' });
    await page.click(s.productPopupSelectorHasProducts);
    await page.locator(s.motionTerminalSelector).first().click();

    const motionTerminalContainer = page.locator(s.singleProductContainerSelector).filter({hasText: 'Motion terminal'});
    const motionTerminalAddToCartButton = motionTerminalContainer.locator(s.motionTerminalAddToCartButtonSelector); 

    await motionTerminalAddToCartButton.click();

    await expect(page.locator('text=The item has been successfully added to your cart.')).toBeVisible();

    emptyCart(page);

    await expect(page.locator('text=No items in your cart yet')).toBeVisible();
    await browser.close();
})