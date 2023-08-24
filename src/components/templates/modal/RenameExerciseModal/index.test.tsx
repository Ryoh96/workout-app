import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import { handleRenameExercise } from '@/graphql/schema/mutations/exercise/renameExercise/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import type { RenameExerciseInput } from '@/libs/schema/renameExercise'
import { client, setupMockServer } from '@/tests/jest'

import RenameExerciseModal from '.'

const user = userEvent.setup()
const server = setupMockServer(handleRenameExercise())

type Props = {
  defaultValue?: Partial<RenameExerciseInput>
}
const id = note.note?.id as string
const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ApolloProvider client={client}>
      <button onClick={() => setIsOpen(true)} data-testid="openModal">
        Click
      </button>
      <RenameExerciseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCompleted={() => console.log('completed')}
        id={id}
        defaultValue={props.defaultValue}
      />
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

const clear = async () => {
  await user.clear(screen.getByRole('textbox'))
}

const register = async () => {
  await user.click(screen.getByRole('button', { name: '保存' }))
}

const exercise = 'hoge'

describe('RenameExerciseModal', () => {
  it('should open the modal', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('種目名')).toBeInTheDocument()
  })
  it('should display default value', async () => {
    render(<TestComponent defaultValue={{ exercise }} />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('種目名')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue(exercise)
  })
  it('should display error message when validate', async () => {
    const name = 'hoge'
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('種目名')).toBeInTheDocument()

    // empty
    await register()
    expect(screen.getByText('1文字以上入力してください')).toBeInTheDocument()

    // over 30
    await type('0123456789012345678901234567891')
    expect(
      screen.getByText('入力できる文字数は30文字までです')
    ).toBeInTheDocument()

    // just 29
    await clear()
    await type('012345678901234567890123456789')
    expect(
      screen.queryByTestId('renameExercise-errorMessage')
    ).not.toBeInTheDocument()
  })

  it('should pass validates: success', async () => {
    render(<TestComponent defaultValue={{ exercise }} />)
    await openModal()
    await register()
    expect(await screen.findByText('登録完了')).toBeInTheDocument()
  })

  it('should pass validates: pending', async () => {
    server.use(handleRenameExercise({ status: 500 }))
    render(<TestComponent defaultValue={{ exercise }} />)
    await openModal()
    await register()
    expect(await screen.findByText(/500/)).toBeInTheDocument()
  })
})
