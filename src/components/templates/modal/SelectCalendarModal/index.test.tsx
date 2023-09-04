import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import { handleRenameExercise } from '@/graphql/schema/mutations/exercise/renameExercise/msw'
import type { RenameExerciseInput } from '@/libs/schema/renameExercise'
import { client, setupMockServer } from '@/tests/jest'

import SelectCalendarModal from '.'

const user = userEvent.setup()
const server = setupMockServer(handleRenameExercise())

type Props = {
  defaultValue?: Partial<RenameExerciseInput>
}
const date = '2022/02/02'
const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date(date))

  return (
    <ApolloProvider client={client}>
      <button onClick={() => setIsOpen(true)} data-testid="openModal">
        Click
      </button>
      <SelectCalendarModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleChange={jest.fn()}
        setCurrentDate={setCurrentDate}
      />
      <Toast />
    </ApolloProvider>
  )
}

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

describe('SelectCalendarModal', () => {
  it('should open the modal', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('日付を選択')).toBeInTheDocument()
  })
})
