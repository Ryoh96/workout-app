import { render, screen } from '@testing-library/react'

import Tag from '.'

describe('Tag', () => {
  test('should render the text', () => {
    const text = 'content'
    render(<Tag>{text}</Tag>)
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
