import test, { expect } from '@playwright/test'
import { addDays, format, subDays } from 'date-fns'

import { note } from '@/graphql/schema/queries/note/getNote/fixture'

import { APP_NAME } from '../constants'
import { dateFormat } from '../utils/dateFormat'
import {
  createExercise,
  createNote,
  createRound,
  createTraining,
  deleteExercise,
  deleteNote,
  deleteTraining,
  formattedOneDay,
  goToNotePage,
  oneDay,
  removeRound,
} from './noteUtils'
import { url } from './util'

test.describe('Note Page CRUD', () => {
  const chestExercise = 'ダンベルプレス'

  // test("should create/delete note'", async ({ page }) => {
  //   // create
  //   await goToNotePage(page)
  //   await createNote(page)
  //   await expect(page.getByText("要約")).toBeVisible()
  //   await expect(page.getByText("新規トレーニング")).toBeVisible()

  //   // delete
  //   await deleteNote(page)
  //   await expect(page.getByText("要約")).not.toBeVisible()
  //   await expect(page.getByText("新規トレーニング")).not.toBeVisible()
  //   await expect(page.getByRole("button", { name: "ノートを作成" })).toBeVisible()
  // })

  // test("should create/delete exercise'", async ({ page }) => {
  //   // create
  //   await goToNotePage(page)
  //   await createNote(page)
  //   await createExercise(page, chestExercise)
  //   await expect(page.getByText("登録完了")).toBeVisible()

  //   // delete
  //   await deleteExercise(page)
  //   await expect(page.getByText("削除しました")).toBeVisible()

  //   await deleteNote(page)
  // })

  //  test("should create/delete training'", async ({ page }) => {
  //   // create
  //   await goToNotePage(page)
  //   await createNote(page)
  //   await createExercise(page, chestExercise)
  //   await createTraining(page)
  //   await expect(page.getByRole("heading", { level: 3, name: chestExercise })).toBeVisible()

  //   // delete
  //   await deleteTraining(page)
  //   await expect(page.getByText("削除しました")).toBeVisible()

  //   await deleteExercise(page)
  //   await deleteNote(page)

  // })

  test("should create/delete rounds'", async ({ page }) => {
    // create
    await goToNotePage(page)
    await createNote(page)
    await createExercise(page, chestExercise)
    await createTraining(page)

    // create 1st round
    await createRound(page)
    await expect(page.getByText('登録完了')).toBeVisible()
    await expect(
      page.getByTestId('training-results').getByRole('row')
    ).toBeVisible()

    // create 2nd round
    await page.getByRole('button', { name: 'セット追加' }).click()
    await createRound(page)
    await expect(page.getByText('登録完了')).toBeVisible()
    await expect(
      page.getByTestId('training-results').getByRole('row').nth(1)
    ).toBeVisible()

    // create 3rd round
    await page.getByRole('button', { name: 'セット追加' }).click()
    await createRound(page)
    await expect(page.getByText('登録完了')).toBeVisible()
    await expect(
      page.getByTestId('training-results').getByRole('row').nth(2)
    ).toBeVisible()

    // delete 3rd round
    await removeRound(page, 2)
    await expect(page.getByText('削除しました')).toBeVisible()
    await expect(
      page.getByTestId('training-results').getByRole('row').nth(2)
    ).not.toBeVisible()

    // delete
    await deleteTraining(page)
    await deleteExercise(page)
    await deleteNote(page)
  })
})
