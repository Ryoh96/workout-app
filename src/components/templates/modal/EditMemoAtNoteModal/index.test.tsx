import { ApolloProvider } from '@apollo/client'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { S } from 'msw/lib/glossary-de6278a9'
import type { ReactNode } from 'react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { handleAddExercisesByPart } from '@/graphql/schema/mutations/exercise/addExerciseByPart/msw'
import { handleDeleteMemoAtNote } from '@/graphql/schema/mutations/note/deleteMemoAtNote/msw'
import { handleUpsertMemoAtNote } from '@/graphql/schema/mutations/note/upsertMemoAtNote/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { noteMemo } from '@/graphql/schema/queries/note/getNoteMemo/fixture'
import { handleGetNoteMemo } from '@/graphql/schema/queries/note/getNoteMemo/msw'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import useNoteIdStore from '@/store/note/noteId'
import { client, setupMockServer } from '@/tests/jest'
import type { ComboBoxOption } from '@/types'

import EditMemoAtNoteModal from '.'

const user = userEvent.setup()
const server = setupMockServer(
  handleGetNoteMemo(),
  handleUpsertMemoAtNote(),
  handleDeleteMemoAtNote()
)

const TestComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const id = note.note?.id as string
  const setIdState = useNoteIdStore((state) => state.setNoteId)
  setIdState(id)

  const openModal = () => setIsOpen(true)
  return (
    <ApolloProvider client={client}>
      <button onClick={openModal} data-testid="openModal">
        Click
      </button>
      <EditMemoAtNoteModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Toast />
    </ApolloProvider>
  )
}

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

const type = async (text: string) => {
  await user.type(screen.getByRole('textbox'), text)
}

const register = async () => {
  await user.click(screen.getByRole('button', { name: '保存' }))
}

describe('EditMemoAtNoteModal', () => {
  const memo0 = noteMemo.noteById!.memos![0]
  const memo1 = noteMemo.noteById!.memos![1]

  it('should open the modal on the modal', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('メモ')).toBeInTheDocument()
    expect(await screen.findByText(memo0)).toBeInTheDocument()

    // 新規作成
    await user.click(screen.getAllByRole('button', { name: '新規作成' })[0])
    expect(screen.getByText('メモの作成')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))

    // 編集
    await user.click(screen.getAllByRole('button', { name: '編集' })[0])
    expect(screen.getByText('メモの作成')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))

    // 削除
    expect(screen.queryByText('メモの作成')).not.toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: '削除' })[0])
    expect(screen.getByText('メモの削除')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))
  })

  it('should display default/no value when click edit/create button', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('メモ')).toBeInTheDocument()
    expect(await screen.findByText(memo0)).toBeInTheDocument()

    // 新規作成
    await user.click(screen.getAllByRole('button', { name: '新規作成' })[0])
    expect(screen.getByText('メモの作成')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('')
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))

    // 編集
    await user.click(screen.getAllByRole('button', { name: '編集' })[0])
    expect(screen.getByText('メモの作成')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue(memo0)
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))
    await user.click(screen.getAllByRole('button', { name: '編集' })[1])
    expect(screen.getByText('メモの作成')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue(memo1)
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))
  })

  it('should display error when send empty value ', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('メモ')).toBeInTheDocument()
    expect(await screen.findByText(memo0)).toBeInTheDocument()

    // 新規作成
    await user.click(screen.getAllByRole('button', { name: '新規作成' })[0])
    expect(screen.getByText('メモの作成')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('')
    await register()
    expect(
      await screen.findByText('文字を入力してください')
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))

    // 編集
    await user.click(screen.getAllByRole('button', { name: '編集' })[0])
    expect(screen.getByText('メモの作成')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue(memo0)
    await user.clear(screen.getByRole('textbox'))
    await register()
    expect(
      await screen.findByText('文字を入力してください')
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))
  })

  it('should display error when send char over 100 ', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('メモ')).toBeInTheDocument()
    expect(await screen.findByText(memo0)).toBeInTheDocument()

    // 新規作成
    await user.click(screen.getAllByRole('button', { name: '新規作成' })[0])
    expect(screen.getByText('メモの作成')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('')
    await type(
      '0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789'
    )
    await register()
    expect(
      await screen.findByText('入力できる文字数は100文字までです。')
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))

    // 編集
    await user.click(screen.getAllByRole('button', { name: '編集' })[0])
    expect(screen.getByText('メモの作成')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue(memo0)
    await type(
      '0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789'
    )
    await register()
    expect(
      await screen.findByText('入力できる文字数は100文字までです。')
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))
  })

  it('should pass validates: success', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('メモ')).toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: '新規作成' })[0])
    expect(screen.getByText('メモの作成')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('')
    await type('0123456789')
    await register()
    expect(await screen.findByText('登録完了')).toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: '削除' })[0])
    expect(screen.getByText('メモの削除')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '削除' }))
    expect(await screen.findByText('削除しました')).toBeInTheDocument()
  })

  it('should display error when send empty value ', async () => {
    server.use(handleGetNoteMemo({ status: 204 }))
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('メモ')).toBeInTheDocument()
    expect(screen.getByText('メモがありません')).toBeInTheDocument()
  })
})
