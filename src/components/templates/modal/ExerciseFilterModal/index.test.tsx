import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import { handleChangeExercisePart } from '@/graphql/schema/mutations/exercise/changeExercisePart/msw'
import { handleGetAllPartName } from '@/graphql/schema/queries/part/getAllPartsName/msw'
import { client, setupMockServer } from '@/tests/jest'

import ExerciseFilterModal from '.'

const user = userEvent.setup()
const server = setupMockServer(
  handleChangeExercisePart(),
  handleGetAllPartName()
)

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
      <ExerciseFilterModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setRound={props.setRound}
        setSpan={props.setSpan}
      />
      <Toast />
    </ApolloProvider>
  )
}

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

describe('AddExercise', () => {
  it('should render span and round filter', async () => {
    render(<TestComponent setRound={jest.fn()} setSpan={jest.fn()} />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('期間')).toBeInTheDocument()
    expect(screen.getByText('セット数')).toBeInTheDocument()
  })

  it('should render only span filter', async () => {
    render(<TestComponent setSpan={jest.fn()} />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('期間')).toBeInTheDocument()
    expect(screen.queryByText('セット数')).not.toBeInTheDocument()
  })
})
