import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { APP_TITLE } from '@/constants/env'

import Header from '.'

const title = APP_TITLE as string
const user = userEvent.setup()

describe('Header', () => {
  test('should render the title', () => {
    render(<Header />)
    expect(screen.getByText(title)).toBeInTheDocument()
  })
  test('should render UserIconMenu', () => {
    render(<Header />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('should open icon menu', async () => {
    render(<Header />)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByText('登録種目一覧')).toBeInTheDocument()
  })
})
