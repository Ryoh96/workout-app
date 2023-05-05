import { render, screen } from '@testing-library/react'

import { APP_TITLE } from '@/constants/env'

import Footer from '.'

describe('Footer', () => {
  test('should render the title', () => {
    render(<Footer />)
    expect(screen.getByText('copyright')).toBeInTheDocument()
  })
})
