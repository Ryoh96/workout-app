import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getPage } from 'next-page-tester'

const user = userEvent.setup()

describe('index page', () => {
  it('otherにページ遷移する', async () => {
    const { page } = await getPage({
      route: '/index',
    })

    render(page)

    await user.click(screen.getByRole('link'))
    await screen.findByText('other page')
  })
})
