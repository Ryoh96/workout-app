import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import { handleAddExercisesByPart } from '@/graphql/schema/mutations/exercise/addExerciseByPart/msw'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { client, setupMockServer } from '@/tests/jest'
import type { ComboBoxOption } from '@/types'

import AddExerciseModal from '.'

const user = userEvent.setup()
const server = setupMockServer(handleAddExercisesByPart())

const partsOptions = allPartsName.parts as ComboBoxOption[]

const TestComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [parts, setParts] = useState(partsOptions[0])

  const openModal = () => setIsOpen(true)
  return (
    <ApolloProvider client={client}>
      <button onClick={openModal} data-testid="openModal">
        Click
      </button>
      <AddExerciseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCompleted={() => console.log('completed')}
        parts={parts}
        partsOptions={partsOptions}
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

const register = async () => {
  await user.click(screen.getByRole('button', { name: '登録' }))
}

describe('AddExercise', () => {
  it('should open the modal', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('部位')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('新規種目名')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should validate min(1)', async () => {
    render(<TestComponent />)
    await openModal()
    await register()
    expect(screen.getByTestId('errorMessage')).toHaveTextContent(
      '1文字以上を入力して下さい'
    )
    await type('hoge')
    await register()
    expect(screen.queryByTestId('errorMessage')).not.toBeInTheDocument()
    expect(screen.queryByText('登録完了')).not.toBeInTheDocument()
  })

  it('should validate max(30)', async () => {
    render(<TestComponent />)
    await openModal()
    await type('1234567890123456789012345678901')
    await register()
    expect(screen.getByTestId('errorMessage')).toHaveTextContent(
      '入力できる文字数は30文字までです'
    )
    expect(screen.queryByText('登録完了')).not.toBeInTheDocument()
  })

  it('should pass the validate: success', async () => {
    render(<TestComponent />)
    await openModal()
    await type('12345')
    await register()
    expect(await screen.findByText('登録完了')).toBeInTheDocument()
    expect(screen.queryByTestId('errorMessage')).not.toBeInTheDocument()
  })

  it('should pass the validate: pending', async () => {
    server.use(handleAddExercisesByPart({ status: 200 }))
    render(<TestComponent />)
    await openModal()
    await type('12345')
    await register()
    expect(await screen.findByText('登録中')).toBeInTheDocument()
  })

  it('should pass the validate: error', async () => {
    server.use(handleAddExercisesByPart({ status: 500 }))
    render(<TestComponent />)
    await openModal()
    await type('12345')
    await register()
    expect(await screen.findByText(/500/)).toBeInTheDocument()
  })
})
