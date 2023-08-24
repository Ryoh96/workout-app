import { BookmarkIcon } from '@heroicons/react/24/solid'
import { render, screen } from '@testing-library/react'

import IconButton from '.'

describe('IconButton', () => {
  test('should render the disabled value', () => {
    const text = 'hoge'
    render(<IconButton icon={<BookmarkIcon />} text={text} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
