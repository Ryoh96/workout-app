import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TextArea from '.'

const user = userEvent.setup()

describe('TextArea', () => {
  test('should display initial state', () => {
    render(<TextArea />)
    expect(screen.getByRole('textbox')).not.toHaveValue()
  })
  test('should change value when select other items', async () => {
    render(<TextArea />)
    const input = 'hoge'
    await user.type(screen.getByRole('textbox'), input)
    expect(screen.getByRole('textbox')).toHaveDisplayValue(input)
  })
})
