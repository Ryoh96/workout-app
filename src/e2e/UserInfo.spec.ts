import test, { expect } from '@playwright/test'

import { url } from './util'

test.describe('UserInfo', () => {
  test('should show user icon when use login', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(url('/'))
    await expect(page.locator(`[aria-label="メニュー"]`)).toBeVisible()
  })
})
