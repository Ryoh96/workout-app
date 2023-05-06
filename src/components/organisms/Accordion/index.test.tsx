import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Accordion from '.'

const user = userEvent.setup()

const data = {
  title: 'accordion',
  content: (
    <ul>
      <li>content1</li>
      <li>content2</li>
    </ul>
  ),
}

describe('Accordion', () => {
  test('should render the title', () => {
    render(<Accordion title={data.title}>{data.content}</Accordion>)
    expect(
      screen.getByRole('button', { name: 'accordion' })
    ).toBeInTheDocument()
  })
  test('accordion should be open by default', () => {
    render(<Accordion title={data.title}>{data.content}</Accordion>)
    expect(screen.getByText('content1')).toBeInTheDocument()
  })
  test('accordion should be close when click button', async () => {
    render(<Accordion title={data.title}>{data.content}</Accordion>)
    expect(screen.getByText('content1')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'accordion' }))
    expect(screen.queryByText('content1')).not.toBeInTheDocument()
  })
  test('accordion should be open when click button twice', async () => {
    render(<Accordion title={data.title}>{data.content}</Accordion>)
    expect(screen.getByText('content1')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'accordion' }))
    expect(screen.queryByText('content1')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'accordion' }))
    expect(screen.getByText('content1')).toBeInTheDocument()
  })
})
