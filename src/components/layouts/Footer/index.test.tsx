import { render, screen } from '@testing-library/react'

import Footer from '.'

describe('Footer', () => {
  test('should render the footer', () => {
    render(<Footer />)
    expect(screen.getByText(/copyright/)).toBeInTheDocument()
  })
})
