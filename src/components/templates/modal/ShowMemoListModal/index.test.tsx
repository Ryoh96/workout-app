import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { c } from 'msw/lib/glossary-de6278a9'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import type { Round } from '@/graphql/generated/operations-type'
import { handleDeleteMemo } from '@/graphql/schema/mutations/memo/deleteMemo/msw'
import { handlePinOutMemo } from '@/graphql/schema/mutations/memo/pinOutMemo/msw'
import { handleEditRound } from '@/graphql/schema/mutations/round/editRoundInput/msw'
import { data } from '@/graphql/schema/queries/memo/getPinnedMemosByExercises/fixture'
import { handleGetPinnedMemos } from '@/graphql/schema/queries/memo/getPinnedMemosByExercises/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import useEditRoundStore from '@/store/round/editRound'
import { client, setupMockServer } from '@/tests/jest'
import { dateFormat } from '@/utils/dateFormat'

import ShowMemoListModal from '.'

const user = userEvent.setup()
const server = setupMockServer(
  handleDeleteMemo(),
  handleGetPinnedMemos(),
  handlePinOutMemo()
)

type Props = {
  editRound?: Partial<Round>
}

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ApolloProvider client={client}>
      <button onClick={() => setIsOpen(true)} data-testid="openModal">
        Click
      </button>
      <ShowMemoListModal
        isOpenExerciseMemoModal={isOpen}
        setIsOpenExerciseMemoModal={setIsOpen}
        onPinOutMemoCompleted={jest.fn()}
        id="hoge"
      />
      <Toast />
    </ApolloProvider>
  )
}

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

const memo = data.pinnedMemos![0]!.content
const createdAt = dateFormat(new Date(data.pinnedMemos![0]!.createdAt))
describe('ShowMemoListModal', () => {
  it('should open the modal', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('固定メモ')).toBeInTheDocument()
  })

  it('should display the memo list', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('固定メモ')).toBeInTheDocument()

    expect(await screen.findByText(memo)).toBeInTheDocument()
    expect(screen.getByText(createdAt)).toBeInTheDocument()
  })

  it('should display a loader', async () => {
    server.use(
      handleDeleteMemo(),
      handleGetPinnedMemos({ status: 200 }),
      handlePinOutMemo()
    )
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('固定メモ')).toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('should display a error message', async () => {
    server.use(
      handleDeleteMemo(),
      handleGetPinnedMemos({ status: 500 }),
      handlePinOutMemo()
    )
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('固定メモ')).toBeInTheDocument()
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument()
  })

  it('should delete memo: success', async () => {
    server.use(handleDeleteMemo(), handleGetPinnedMemos(), handlePinOutMemo())
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('固定メモ')).toBeInTheDocument()
    expect(await screen.findByText(memo)).toBeInTheDocument()

    await user.click(screen.getAllByTestId('deleteButton')[0])
    expect(await screen.findByText('メモの削除')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '削除' }))
    expect(await screen.findByText('削除しました')).toBeInTheDocument()
  })

  it('should delete memo: pending', async () => {
    server.use(
      handleDeleteMemo({ status: 200 }),
      handleGetPinnedMemos(),
      handlePinOutMemo()
    )
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('固定メモ')).toBeInTheDocument()
    expect(await screen.findByText(memo)).toBeInTheDocument()

    await user.click(screen.getAllByTestId('deleteButton')[0])
    expect(await screen.findByText('メモの削除')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '削除' }))
    expect(await screen.findByText('削除中')).toBeInTheDocument()
  })

  it('should delete memo: error', async () => {
    server.use(
      handleDeleteMemo({ status: 500 }),
      handleGetPinnedMemos(),
      handlePinOutMemo()
    )
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('固定メモ')).toBeInTheDocument()
    expect(await screen.findByText(memo)).toBeInTheDocument()

    await user.click(screen.getAllByTestId('deleteButton')[0])
    expect(await screen.findByText('メモの削除')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '削除' }))
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument()
  })

  it('should pin out memo: pending', async () => {
    server.use(
      handleDeleteMemo(),
      handleGetPinnedMemos(),
      handlePinOutMemo({ status: 200 })
    )
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('固定メモ')).toBeInTheDocument()
    expect(await screen.findByText(memo)).toBeInTheDocument()

    await user.click(screen.getAllByTestId('pinOutButton')[0])
    expect(await screen.findByText('メモの固定解除')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '解除' }))
    expect(await screen.findByText('解除中')).toBeInTheDocument()
  })

  it('should pin out memo: error', async () => {
    server.use(
      handleDeleteMemo(),
      handleGetPinnedMemos(),
      handlePinOutMemo({ status: 500 })
    )
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('固定メモ')).toBeInTheDocument()
    expect(await screen.findByText(memo)).toBeInTheDocument()

    await user.click(screen.getAllByTestId('pinOutButton')[0])
    expect(await screen.findByText('メモの固定解除')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '解除' }))
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument()
  })
})
