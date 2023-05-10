import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import InputCounter from '.'

const user = userEvent.setup()

const TestComponent = ({
  text = '',
  max = 10,
}: {
  text?: string
  max?: number
}) => {
  const { register, control } = useForm({ defaultValues: { text } })
  const name = 'text'
  return (
    <>
      <input type="text" {...register(name)} />
      <InputCounter max={max} name={name} control={control} />
    </>
  )
}

describe('InputCounter', () => {
  test('should display desired initial state ', () => {
    render(<TestComponent />)
    expect(screen.getByText('0 / 10')).toBeInTheDocument()
  })

  test('should count up when input texts', async () => {
    render(<TestComponent />)
    await user.type(screen.getByRole('textbox'), 'a')
    expect(screen.getByText('1 / 10')).toBeInTheDocument()
    await user.type(screen.getByRole('textbox'), 'aaa')
    expect(screen.getByText('4 / 10')).toBeInTheDocument()
  })

  test('should count down when delete texts', async () => {
    render(<TestComponent />)
    await user.type(screen.getByRole('textbox'), 'aaa')
    expect(screen.getByText('3 / 10')).toBeInTheDocument()
    await user.type(screen.getByRole('textbox'), '{backspace}{backspace}')
    expect(screen.getByText('1 / 10')).toBeInTheDocument()
  })

  test('should not occurred underflow', async () => {
    render(<TestComponent />)
    expect(screen.getByText('0 / 10')).toBeInTheDocument()
    await user.type(screen.getByRole('textbox'), '{backspace}{backspace}')
    expect(screen.getByText('0 / 10')).toBeInTheDocument()
  })

  test('should occurred error when text overflow', async () => {
    render(<TestComponent max={5} />)
    await user.type(screen.getByRole('textbox'), 'aaaaaa')
    expect(screen.getByText('6 / 5')).toHaveAttribute('data-invalid', 'true')
  })
})
