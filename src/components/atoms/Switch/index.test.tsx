import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Switch from '.'

const user = userEvent.setup()

describe('Switch', () => {
  test('should display initial state', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).not.toBeChecked()
  })
  test('should change value when select other items', async () => {
    render(<Switch />)
    await user.click(screen.getByRole('switch'))
    expect(screen.getByRole('switch')).toBeChecked()
  })
})
