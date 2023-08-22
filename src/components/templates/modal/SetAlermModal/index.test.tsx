import { ApolloProvider } from '@apollo/client'
import {
  findByAltText,
  findByText,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import type { Exercise } from '@/graphql/generated/operations-type'
import { handleAddExercisesByPart } from '@/graphql/schema/mutations/exercise/addExerciseByPart/msw'
import { handleChangeExercisePart } from '@/graphql/schema/mutations/exercise/changeExercisePart/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { handleGetAllPartName } from '@/graphql/schema/queries/part/getAllPartsName/msw'
import { client, setupMockServer } from '@/tests/jest'

import SetAlermModal from '.'

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

const type = async (target: string, text: string) => {
  await user.type(screen.getByRole('spinbutton', { name: target }), text)
}

const clear = async (target: string) => {
  await user.clear(screen.getByRole('spinbutton', { name: target }))
}

const register = async () => {
  await user.click(screen.getByRole('button', { name: '設定' }))
}

const user = userEvent.setup()

const TestComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ApolloProvider client={client}>
      <button onClick={() => setIsOpen(true)} data-testid="openModal">
        Click
      </button>
      <SetAlermModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Toast />
    </ApolloProvider>
  )
}

describe('AddExercise', () => {
  it('should render span and round filter', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('アラームの時間')).toBeInTheDocument()
  })

  it('should show error messages when send empty value', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await register()
    expect(screen.getByTestId('minutes-errorMessage')).toHaveTextContent(
      '数値を入力してください'
    )
    expect(screen.getByTestId('seconds-errorMessage')).toHaveTextContent(
      '数値を入力してください'
    )

    await type('分', '0')
    await type('秒', '0')
    expect(screen.queryByTestId('minutes-errorMessage')).not.toBeInTheDocument()
    expect(screen.queryByTestId('seconds-errorMessage')).not.toBeInTheDocument()
  })

  it('should show error messages when send upper limit number value', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // 100/60
    await type('分', '100')
    await type('秒', '60')
    await register()
    expect(screen.getByTestId('minutes-errorMessage')).toHaveTextContent(
      '桁数が大きすぎます'
    )
    expect(screen.getByTestId('seconds-errorMessage')).toHaveTextContent(
      '入力できる数字は59秒までです'
    )

    // 99/59
    await clear('分')
    await clear('秒')
    await type('分', '99')
    await type('秒', '59')
    expect(screen.queryByTestId('minutes-errorMessage')).not.toBeInTheDocument()
    expect(screen.queryByTestId('seconds-errorMessage')).not.toBeInTheDocument()
  })

  it('should show error messages when send lower limit number value', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // 100/60
    await type('分', '-1')
    await type('秒', '-1')
    await register()
    expect(screen.getByTestId('minutes-errorMessage')).toHaveTextContent(
      '0以上の値を入力してください'
    )
    expect(screen.getByTestId('seconds-errorMessage')).toHaveTextContent(
      '0以上の値を入力してください'
    )

    // 99/59
    await clear('分')
    await clear('秒')
    await type('分', '0')
    await type('秒', '0')
    expect(screen.queryByTestId('minutes-errorMessage')).not.toBeInTheDocument()
    expect(screen.queryByTestId('seconds-errorMessage')).not.toBeInTheDocument()
  })

  it('should pass validations', async () => {
    window.AudioContext = jest.fn()
    render(<TestComponent />)
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // 100/60
    await type('分', '1')
    await type('秒', '30')
    await register()
    expect(await screen.findByText('01:30')).toBeInTheDocument()
  })
})
