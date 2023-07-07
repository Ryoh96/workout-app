import { render, screen } from '@testing-library/react'

import { APP_TITLE } from '@/constants/env'

import Layout from '.'

const title = APP_TITLE as string

describe('Layout', () => {
  test('should render the header', () => {
    render(<Layout>content</Layout>)
    expect(screen.getByText(title)).toBeInTheDocument()
  })
  test('should render the footer', () => {
    render(<Layout>content</Layout>)
    expect(screen.getByText('copyright')).toBeInTheDocument()
  })
})
