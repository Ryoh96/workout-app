import { render, screen } from '@testing-library/react'

import { APP_TITLE } from '@/constants/env'

import Header from '.'

const title = APP_TITLE as string

describe('Header', () => {
  test('should render the title', () => {
    render(<Header />)
    expect(screen.getByText(title)).toBeInTheDocument()
  })
  test("should render UserIconMenu", () => {
    render(<Header />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
