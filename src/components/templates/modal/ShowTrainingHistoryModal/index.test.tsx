import { ApolloProvider } from '@apollo/client'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import { previousTrainings } from '@/graphql/schema/queries/training/getPreviousTrainings/fixture'
import { handleGetPreviousTrainings } from '@/graphql/schema/queries/training/getPreviousTrainings/msw'
import { client, setupMockServer } from '@/tests/jest'
import { dateFormat } from '@/utils/dateFormat'

import ShowTrainingHistoryModal from '.'

const user = userEvent.setup()
const server = setupMockServer(handleGetPreviousTrainings())

const data = previousTrainings.previousTrainings!

const TestComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ApolloProvider client={client}>
      <button onClick={() => setIsOpen(true)} data-testid="openModal">
        Click
      </button>
      <ShowTrainingHistoryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        trainingId={data[0]!.id as string}
      />
      <Toast />
    </ApolloProvider>
  )
}

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

describe('ShowTrainingHistoryModal', () => {
  it('should open the modal', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('種目の履歴')).toBeInTheDocument()
    const initialData = data[0]

    // initial data
    expect(
      await screen.findByText(dateFormat(new Date(initialData!.note.date)))
    ).toBeInTheDocument()
    expect(
      within(screen.getAllByTestId('tableBody')[0]).getAllByTestId('tableRow')
    ).toHaveLength(initialData!.rounds!.length)

    //whole data
    expect(screen.getAllByRole('table')).toHaveLength(data.length)
  })

  it('should display loader', async () => {
    server.use(handleGetPreviousTrainings({ status: 200 }))
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('種目の履歴')).toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('should display error toast', async () => {
    server.use(handleGetPreviousTrainings({ status: 500 }))
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('種目の履歴')).toBeInTheDocument()
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument()
    expect(screen.getByText('データがありません')).toBeInTheDocument()
  })

  it('should display no data message', async () => {
    server.use(handleGetPreviousTrainings({ status: 204 }))
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('種目の履歴')).toBeInTheDocument()
    expect(await screen.findByText('データがありません')).toBeInTheDocument()
  })
})
