import test, { expect } from '@playwright/test'
import { addDays, format, subDays } from 'date-fns'

import { note } from '@/graphql/schema/queries/note/getNote/fixture'

import { APP_NAME } from '../constants'
import { dateFormat } from '../utils/dateFormat'
import { url } from './util'

test.describe('Note Page Navigation', () => {
  const today = format(new Date(), 'yyyy-MM-dd')

  test("should navigate to previous/next date note page when click chveron icon'", async ({
    page,
  }) => {
    //go to note page
    const previousDay = format(subDays(new Date(), 1), 'yyyy-MM-dd')
    const nextDay = format(addDays(new Date(), 1), 'yyyy-MM-dd')

    await page.goto(`/notes/${today}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ノート')
    await expect(page.getByTestId('currentDate')).toHaveText(
      dateFormat(new Date())
    )

    //previous date page
    await page.getByRole('button', { name: '前の日付' }).click()
    await page.waitForURL(`/notes/${previousDay}`)
    await expect(page.getByTestId('currentDate')).toHaveText(
      dateFormat(new Date(previousDay))
    )

    //back to today page by chveron button
    await page.getByRole('button', { name: '次の日付' }).click()
    await page.waitForURL(`/notes/${today}`)
    await expect(page.getByTestId('currentDate')).toHaveText(
      dateFormat(new Date())
    )

    //next date page
    await page.getByRole('button', { name: '次の日付' }).click()
    await page.waitForURL(`/notes/${nextDay}`)
    await expect(page.getByTestId('currentDate')).toHaveText(
      dateFormat(new Date(nextDay))
    )
  })

  test("should navigate to any date note page when click calender'", async ({
    page,
  }) => {
    //go to note page
    const thisYear = new Date().getFullYear()
    const thisMonth = new Date().getMonth() + 1

    await page.goto(`/notes/${today}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ノート')
    await expect(page.getByTestId('currentDate')).toHaveText(
      dateFormat(new Date())
    )

    await page.getByTestId('currentDate').click()
    await page.locator(`[aria-label="${thisYear}年${thisMonth}月10日"]`).click()
    await page.waitForURL(
      `/notes/${thisYear}-${String(thisMonth).padStart(2, '0')}-10`
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ノート')
    await expect(page.getByTestId('currentDate')).toHaveText(
      dateFormat(new Date(`${thisYear}-${thisMonth}-10`))
    )
  })

  test("should navigate to today note page when click menu'", async ({
    page,
  }) => {
    //go to note page
    const thisYear = new Date().getFullYear()
    const thisMonth = new Date().getMonth() + 1

    await page.goto(
      `/notes/${thisYear}-${String(thisMonth).padStart(2, '0')}-10`
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ノート')
    await expect(page.getByTestId('currentDate')).toHaveText(
      dateFormat(new Date(`${thisYear}-${thisMonth}-10`))
    )

    await page.getByTestId('noteMenu').click()
    await page.getByText('今日のノート').click()
    await expect(page.getByTestId('currentDate')).toHaveText(
      dateFormat(new Date())
    )
  })
})
