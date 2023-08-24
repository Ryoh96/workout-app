import { ApolloProvider } from '@apollo/client'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import type { Exercise } from '@/graphql/generated/operations-type'
import { handleChangeExercisePart } from '@/graphql/schema/mutations/exercise/changeExercisePart/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { handleGetAllPartName } from '@/graphql/schema/queries/part/getAllPartsName/msw'
import { client, setupMockServer } from '@/tests/jest'

import ChangeExercisePartModal from '.'

const user = userEvent.setup()
const exercise = note.note?.trainings?.[0].exercise as Exercise
const server = setupMockServer(
  handleChangeExercisePart(),
  handleGetAllPartName()
)

const TestComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  return (
    <ApolloProvider client={client}>
      <button onClick={openModal} data-testid="openModal">
        Click
      </button>
      <ChangeExercisePartModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCompleted={() => console.log('completed')}
        exerciseId={exercise.id}
        selected={exercise.id}
      />
      <Toast />
    </ApolloProvider>
  )
}

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

const change = async (value: string) => {
  await fireEvent.change(screen.getByRole('combobox'), { target: { value } })
}

const register = async () => {
  await user.click(screen.getByRole('button', { name: '保存' }))
}

describe('AddExercise', () => {
  it('should change combobox values', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('部位')).toBeInTheDocument()
    await change('胸')
    await register()
    expect(await screen.findByText('登録完了')).toBeInTheDocument()
  })
  it('should change combobox values: pending', async () => {
    server.use(handleChangeExercisePart({ status: 200 }))
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('部位')).toBeInTheDocument()
    await change('胸')
    await register()
    expect(await screen.findByText('登録中')).toBeInTheDocument()
  })
  it('should change combobox values', async () => {
    server.use(handleChangeExercisePart({ status: 500 }))
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('部位')).toBeInTheDocument()
    await change('胸')
    await register()
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument()
  })
})
