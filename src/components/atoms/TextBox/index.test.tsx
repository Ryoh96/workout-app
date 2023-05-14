import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TextBox from '.'

const user = userEvent.setup()

describe('TextBox', () => {
  test('should display initial state', () => {
    render(<TextBox />)
    expect(screen.getByRole('textbox')).not.toHaveValue()
  })
  test('should change value when select other items', async () => {
    render(<TextBox />)
    const input = 'hoge'
    await user.type(screen.getByRole('textbox'), input)
    expect(screen.getByRole('textbox')).toHaveDisplayValue(input)
  })
})
