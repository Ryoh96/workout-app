import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import type { UpsertRoundInput } from '@/lib/schema/upsertRound'

import InputTime from '.'

type Props = {
  label: string
  info?: ReactNode
}

const TestComponent = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useForm<UpsertRoundInput>()

  return <InputTime register={register} errors={errors} {...props} />
}

const user = userEvent.setup()

describe('InputTime', () => {
  test('should display initial value', () => {
    const label = 'label'
    render(<TestComponent label={label} />)
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('分')).toBeInTheDocument()
    expect(screen.getByText(':')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('秒')).toBeInTheDocument()
  })
  test('should type only number', () => {
    const label = 'label'
    render(<TestComponent label={label} />)
    fireEvent.change(screen.getByPlaceholderText('分'), {
      target: { value: 'abcde' },
    })
    expect(screen.getByPlaceholderText('分')).not.toHaveValue()
    fireEvent.change(screen.getByPlaceholderText('分'), {
      target: { value: 12345 },
    })
    expect(screen.getByPlaceholderText('分')).toHaveValue(12345)
    fireEvent.change(screen.getByPlaceholderText('秒'), {
      target: { value: 'abcde' },
    })
    expect(screen.getByPlaceholderText('秒')).not.toHaveValue()
    fireEvent.change(screen.getByPlaceholderText('秒'), {
      target: { value: 12345 },
    })
    expect(screen.getByPlaceholderText('秒')).toHaveValue(12345)
  })

  test('should display info', () => {
    const label = 'label'
    const text = 'text'
    render(<TestComponent label={label} info={<p>{text}</p>} />)
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
