import test, { expect } from '@playwright/test'
import { format } from 'date-fns'

import { APP_NAME } from '../constants'
import { dateFormat } from '../utils/dateFormat'
import { url } from './util'

test.describe('Top Page', () => {
  test("should navigate to note edit page when click 'add notes'", async ({
    page,
  }) => {
    //go to note page
    const today = format(new Date(), 'yyyy-MM-dd')
    await page.goto('/')
    await page.getByRole('button', { name: 'ノートの追加' }).click()
    await page.waitForURL(`/notes/${today}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ノート')
    await expect(page.getByTestId('currentDate')).toHaveText(
      dateFormat(new Date())
    )

    //back to top page
    await page.locator(`[aria-label="ロゴ"]`).click()
    await page.waitForURL(`/`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(APP_NAME)
  })

  test("should navigate to note edit page when click 'see notes'", async ({
    page,
  }) => {
    //go to note page
    const thisYear = new Date().getFullYear()
    const thisMonth = new Date().getMonth() + 1

    await page.goto('/')
    await page.getByRole('button', { name: 'ノートを見る' }).click()
    await page.locator(`[aria-label="${thisYear}年${thisMonth}月10日"]`).click()
    await page.waitForURL(
      `/notes/${thisYear}-${String(thisMonth).padStart(2, '0')}-10`
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ノート')
    await expect(page.getByTestId('currentDate')).toHaveText(
      dateFormat(new Date(`${thisYear}-${thisMonth}-10`))
    )

    //back to top page
    await page.locator(`[aria-label="ロゴ"]`).click()
    await page.waitForURL(`/`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(APP_NAME)
  })

  test("should navigate to exercise list page when click 'exercise list'", async ({
    page,
  }) => {
    //go to exercise page
    const thisYear = new Date().getFullYear()
    const thisMonth = new Date().getMonth() + 1

    await page.goto('/')
    await page.getByRole('button', { name: '種目一覧' }).click()
    await page.waitForURL(`/exercises`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      '登録種目一覧'
    )

    //back to top page
    await page.locator(`[aria-label="ロゴ"]`).click()
    await page.waitForURL(`/`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(APP_NAME)
  })
})
