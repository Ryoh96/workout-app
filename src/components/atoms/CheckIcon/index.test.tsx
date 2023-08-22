import { BookmarkIcon } from '@heroicons/react/24/solid'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CheckedIcon from '.'

const user = userEvent.setup()

describe('CheckIcon', () => {
  test('should not checked default', () => {
    const text = 'button'
    render(<CheckedIcon icon={<BookmarkIcon />} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
  test('should check when icon clicked', async () => {
    render(<CheckedIcon icon={<BookmarkIcon />} />)
    await user.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})
