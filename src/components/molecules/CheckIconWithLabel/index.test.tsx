import { BookmarkIcon } from '@heroicons/react/24/solid'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { abort } from 'process'

import CheckedIconWithLabel from '.'

const user = userEvent.setup()

describe('CheckIcon', () => {
  test('should render props', () => {
    const text = 'button'
    render(<CheckedIconWithLabel icon={<BookmarkIcon />} label={text} />)
    expect(screen.getByText(text)).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
  test('should hidden the label', () => {
    const text = 'button'
    render(
      <CheckedIconWithLabel
        icon={<BookmarkIcon />}
        label={text}
        labelHidden={true}
      />
    )
    expect(screen.getByText(text)).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
  test('should checked when click label text', async () => {
    const text = 'button'
    render(<CheckedIconWithLabel icon={<BookmarkIcon />} label={text} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
    await user.click(screen.getByText(text))
    expect(screen.getByRole('checkbox')).toBeChecked()
    await user.click(screen.getByText(text))
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
})
