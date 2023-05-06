import { render, screen } from '@testing-library/react'

import type { Headings } from '.'
import Title from '.'

describe('Title', () => {
  test.each<Headings>(['h1', 'h2', 'h3'])('should render the title', (as) => {
    const text = 'title'
    render(<Title as={as}>{text}</Title>)
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
