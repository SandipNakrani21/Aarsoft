import { test, expect } from '@playwright/test';

test('shared pages and long CTAs fit the viewport', async ({ page }) => {
  for (const route of ['/contact', '/careers', '/industries', '/solutions']) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    const dimensions = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: innerWidth }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
    for (const button of await page.locator('.btn-cut').all()) {
      if (!await button.isVisible()) continue;
      expect(await button.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBeTruthy();
    }
  }
});

test('mobile menu contains focus and releases the lock on resize', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 1920) >= 1024);
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open menu', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Main navigation' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Close menu', exact: true }).focus();
  await page.keyboard.press('Shift+Tab');
  expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBeTruthy();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close menu', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(dialog).not.toBeVisible();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('cross-page technology anchors reach the destination and focus it', async ({ page }) => {
  await page.goto('/services');
  await page.getByRole('link', { name: 'React & Angular', exact: true }).click();
  await expect(page).toHaveURL(/\/#technology$/);
  await expect(page.locator('#technology')).toBeFocused();
  await expect.poll(() => page.locator('#technology').evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(220);
});

test('search deep links and reset keep URL and results aligned', async ({ page }) => {
  await page.goto('/insights?q=automation');
  await expect(page.getByRole('searchbox', { name: 'Search articles' })).toHaveValue('automation');
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(page).not.toHaveURL(/q=automation/);
  await expect(page.getByRole('searchbox', { name: 'Search articles' })).toHaveValue('');
});

test('contact rejects a punctuation-only phone and focuses its error target', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Audit Example');
  await page.getByRole('textbox', { name: 'Work Email', exact: true }).fill('audit@example.com');
  await page.getByRole('textbox', { name: 'Phone optional', exact: true }).fill('-------');
  await page.getByRole('combobox', { name: 'Service', exact: true }).selectOption({ label: 'Web Development' });
  await page.getByRole('textbox', { name: 'Project Details', exact: true }).fill('A synthetic validation check that must not send an email.');
  await page.getByRole('button', { name: 'Prepare Email Enquiry' }).click();
  const error = page.getByRole('link', { name: 'Please enter a valid phone number, or leave this blank.' });
  await expect(error).toBeVisible();
  await error.click();
  await expect(page.locator('#field-phone')).toBeFocused();
  await expect(page.getByText('your enquiry is in', { exact: false })).toHaveCount(0);
});

test('server content survives blocked JavaScript and IDs are unique', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: process.env.TEST_BASE_URL || "http://localhost:3004" });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Navigation without JavaScript' })).toBeVisible();
  const ids = await page.locator('[id]').evaluateAll(nodes => nodes.map(el => el.id));
  expect(new Set(ids).size).toBe(ids.length);
  await context.close();
});
