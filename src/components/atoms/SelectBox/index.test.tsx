import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SelectBox from '.'

const options = [
  {
    name: 'kg',
    value: 'KG',
  },
  {
    name: 'lb',
    value: 'LB',
  },
]

const user = userEvent.setup()

describe('SelectBox', () => {
  test('should display initial state', () => {
    render(<SelectBox options={options} />)
    expect(screen.getByRole('combobox')).toHaveValue(options[0].value)
    expect(screen.getByRole('combobox')).not.toHaveValue(options[1].value)
  })
  test('should change value when select other items', async () => {
    render(<SelectBox options={options} />)
    await user.selectOptions(screen.getByRole('combobox'), options[1].value)
    expect(screen.getByRole('combobox')).toHaveValue(options[1].value)
    expect(screen.getByRole('combobox')).not.toHaveValue(options[0].value)
  })
  test('should selected props value when given selected props', () => {
    render(<SelectBox options={options} selected={options[1].value} />)
    expect(screen.getByRole('combobox')).toHaveValue(options[1].value)
    expect(screen.getByRole('combobox')).not.toHaveValue(options[0].value)
  })
})
