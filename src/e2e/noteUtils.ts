import type { Page } from '@playwright/test'
import test, { expect } from '@playwright/test'
import { addDays, format, subDays } from 'date-fns'

import { dateFormat } from '../utils/dateFormat'

export const oneDay = new Date('2022-02-02')
export const formattedOneDay = format(oneDay, 'yyyy-MM-dd')

export const goToNotePage = async (page: Page) => {
  await page.goto(`/notes/${formattedOneDay}`)
}

export const createNote = async (page: Page) => {
  await expect(page.getByTestId('currentDate')).toHaveText(dateFormat(oneDay))
  await page.getByRole('button', { name: 'ノートを作成' }).click()
}

export const deleteNote = async (page: Page) => {
  await expect(page.getByTestId('currentDate')).toHaveText(dateFormat(oneDay))
  await page.getByTestId('noteMenu').click()
  await page.getByText('ノートの削除').click()
  await page.getByRole('button', { name: '削除' }).click()
}

export const createExercise = async (page: Page, exerciseName: string) => {
  await page.getByTestId('exerciseMenu').click()
  await page.getByText('種目の追加').click()
  await page.getByRole('textbox', { name: '新規種目名' }).fill(exerciseName)
  await page.getByRole('button', { name: '登録' }).click()
}

export const deleteExercise = async (page: Page) => {
  await page.getByTestId('exerciseMenu').click()
  await page.getByText('種目の削除').click()
  await expect(page.getByText('種目を削除しますか？')).toBeVisible()
  await page.getByRole('button', { name: '削除' }).click()
}

export const createTraining = async (page: Page) => {
  await page.getByText('トレーニング追加').click()
  await expect(page.getByText('トレーニング登録完了')).toBeVisible()
}

export const deleteTraining = async (page: Page) => {
  await page.getByTestId('trainingHeaderMenu').click()
  await page.getByTestId('trainingHeaderMenu').getByText('削除').click()
  await expect(page.getByText('トレーニングを削除しますか？')).toBeVisible()
  await page.getByTestId('modal').getByRole('button', { name: '削除' }).click()
}

export const createRound = async (page: Page) => {
  await page.getByRole('textbox', { name: '重量' }).fill('10')
  await page.getByRole('spinbutton', { name: '回数' }).fill('10')
  await page.getByRole('spinbutton', { name: '分' }).fill('10')
  await page.getByRole('spinbutton', { name: '秒' }).fill('10')
  await page.getByRole('button', { name: '完了' }).click()
}

export const removeRound = async (page: Page, round: number) => {
  await page
    .getByTestId('training-results')
    .getByRole('row')
    .nth(round)
    .getByTestId('remove-round')
    .click()
  await page.getByTestId('modal').getByRole('button', { name: '削除' }).click()
}
