import { ApolloProvider } from '@apollo/client'
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import Toast from '@/components/atoms/Toast'
import { handleAddExercisesByPart } from '@/graphql/schema/mutations/exercise/addExerciseByPart/msw'
import { handleRenameExercise } from '@/graphql/schema/mutations/exercise/renameExercise/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import type { RenameExerciseInput } from '@/libs/schema/renameExercise'
import useCurrentDateStore from '@/store/date/currentDate'
import { client, setupMockServer } from '@/tests/jest'
import { dateFormat } from '@/utils/dateFormat'

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
