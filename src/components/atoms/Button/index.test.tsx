import { render, screen } from '@testing-library/react'

import Button from '.'

describe('Header', () => {
  test('should render the title', () => {
    const text = "button"
    render(<Button>{text}</Button>)
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
