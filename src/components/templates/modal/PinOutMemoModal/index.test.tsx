import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import type { Exercise } from '@/graphql/generated/operations-type'
import { handlePinOutMemo } from '@/graphql/schema/mutations/memo/pinOutMemo/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client, setupMockServer } from '@/tests/jest'

import PinOutMemoModal from '.'

const user = userEvent.setup()
const exercise = note.note?.trainings?.[0].exercise as Exercise
const server = setupMockServer(handlePinOutMemo())

type Props = {
  setSpan?: React.Dispatch<React.SetStateAction<number>>
  setRound?: React.Dispatch<React.SetStateAction<number>>
}

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  return (
    <ApolloProvider client={client}>
      <button onClick={openModal} data-testid="openModal">
        Click
      </button>
      <PinOutMemoModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        id="hoge"
        onPinOutCompleted={jest.fn()}
      />
      <Toast />
    </ApolloProvider>
  )
}

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

describe('AddExercise', () => {
  it('should render modal: success', async () => {
    render(<TestComponent setRound={jest.fn()} setSpan={jest.fn()} />)
    await openModal()
    expect(screen.getByText('メモの固定解除')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '解除' }))
    expect(await screen.findByText('解除しました')).toBeInTheDocument()
  })

  it('should render modal: pending', async () => {
    server.use(handlePinOutMemo({ status: 200 }))
    render(<TestComponent setRound={jest.fn()} setSpan={jest.fn()} />)
    await openModal()
    expect(screen.getByText('メモの固定解除')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '解除' }))
    expect(await screen.findByText('解除中')).toBeInTheDocument()
  })

  it('should render modal: error', async () => {
    server.use(handlePinOutMemo({ status: 500 }))
    render(<TestComponent setRound={jest.fn()} setSpan={jest.fn()} />)
    await openModal()
    expect(screen.getByText('メモの固定解除')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '解除' }))
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument()
  })
})
