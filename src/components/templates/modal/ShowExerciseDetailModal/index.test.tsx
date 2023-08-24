import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import type { Round } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { maxTotalLoad } from '@/graphql/schema/queries/scalar/getMaxTotalLoad/fixture'
import { handleGetMaxToalLoad } from '@/graphql/schema/queries/scalar/getMaxTotalLoad/msw'
import { maxWeight } from '@/graphql/schema/queries/scalar/getMaxWeight/fixture'
import { handleGetMaxWeight } from '@/graphql/schema/queries/scalar/getMaxWeight/msw'
import { trainingStat } from '@/graphql/schema/queries/training/getTrainingStat/fixture'
import { handleGetTrainingStat } from '@/graphql/schema/queries/training/getTrainingStat/msw'
import { client, setupMockServer } from '@/tests/jest'

import ShowExerciseDetailModal from '.'

const user = userEvent.setup()
const server = setupMockServer(
  handleGetMaxWeight(),
  handleGetMaxToalLoad(),
  handleGetTrainingStat()
)

const editRound = note.note?.trainings?.[0].rounds?.[0] as Round

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
      <ShowExerciseDetailModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id="hoge"
        name="hoge"
      />
      <Toast />
    </ApolloProvider>
  )
}

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

describe('ShowExerciseDetailModal', () => {
  it('should open the modal', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('種目詳細')).toBeInTheDocument()
  })

  it('should display each items', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('種目詳細')).toBeInTheDocument()

    const maxWeightValue = maxWeight.maxWeight!.maxWeight
    const maxTotalLoadValue = maxTotalLoad.maxTotalLoad!.maxTotalLoad
    const rounds = trainingStat.trainingsStat![0]!.rounds

    expect(await screen.findByTestId('maxWeight')).toHaveTextContent(
      `${maxWeightValue}`
    )
    expect(screen.getByTestId('maxTotalLoad')).toHaveTextContent(
      `${maxTotalLoadValue}`
    )
    expect(screen.getAllByTestId('average')).toHaveLength(3)
    expect(screen.getByTestId('weightTransition')).toBeInTheDocument()
    expect(screen.getByTestId('totalLoadTransition')).toBeInTheDocument()
  })

  it('should display each loader', async () => {
    server.use(
      handleGetMaxWeight({ status: 200 }),
      handleGetMaxToalLoad({ status: 200 }),
      handleGetTrainingStat({ status: 200 })
    )
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('種目詳細')).toBeInTheDocument()

    expect(screen.getAllByTestId('skelton')).toHaveLength(3)
    expect(screen.getAllByTestId('spinner')).toHaveLength(2)
  })

  it('should display error messages', async () => {
    server.use(
      handleGetMaxWeight({ status: 500 }),
      handleGetMaxToalLoad({ status: 500 }),
      handleGetTrainingStat({ status: 500 })
    )
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('種目詳細')).toBeInTheDocument()

    await screen.findAllByText('エラーが発生しました')
  })
})
