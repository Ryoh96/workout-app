import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getPage } from 'next-page-tester'

const user = userEvent.setup()

describe('index page', () => {
  it('should navigate to edit page', async () => {
    const { page } = await getPage({
      route: '/index',
    })

    render(page)

    await user.click(screen.getByRole('link', { name: 'ノートの追加' }))
    expect(await screen.findByText('新規ノート')).toBeInTheDocument()
  })
})
