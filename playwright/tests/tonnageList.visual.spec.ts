import { test, expect } from '@playwright/test';
import { debounceDom } from '../helpers/common';
import tonnageList from '../fixtures/tonnageList.json';
import tce from '../fixtures/tce.json';

test('Signal Platform - Tonnage List', async ({ page }) => {
    await page.route('/api/tonnageList?basisPortID**', async (route) => {
        await route.fulfill({ json: tonnageList });
    });
    await page.route('/api/tonnageList/tce?tabId**', async (route) => {
        await route.fulfill({ json: tce });
    });

    await page.goto('/');
    await page.fill("#enterEmailFormEmail", "user1@stresstest.com");
    await page.click("#enterEmailFormSubmit");
    await page.fill("#password", "Qweasd12@");
    await page.click("#submitLogin");
    await page.getByRole("button", { name: "Accept" }).click();
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')
    await page.goto('/tonnagelist');
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')
    await debounceDom(page)
    await page.getByText('Favourites').click();
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')
    await debounceDom(page)
    await expect(page).toHaveScreenshot(({ mask: [page.locator('.tw-flex-shrink-0'), page.locator('img.tw-h-4.tw-w-4')] }));
});