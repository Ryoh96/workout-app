import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AccordionList from '.'

const user = userEvent.setup()

const data = [
  {
    title: 'accordion1',
    content: (
      <ul>
        <li>content1-1</li>
        <li>content1-2</li>
      </ul>
    ),
  },
  {
    title: 'accordion2',
    content: (
      <ul>
        <li>content2-1</li>
        <li>content2-2</li>
      </ul>
    ),
  },
]

describe('Accordion', () => {
  test('should render the title', () => {
    render(<AccordionList items={data} />)
    expect(
      screen.getByRole('button', { name: 'accordion1' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'accordion2' })
    ).toBeInTheDocument()
  })
  test('accordion should be open by default', () => {
    render(<AccordionList items={data} />)
    expect(screen.getByText('content1-1')).toBeInTheDocument()
    expect(screen.getByText('content2-1')).toBeInTheDocument()
  })
  test('accordion should be close when click button', async () => {
    render(<AccordionList items={data} />)
    expect(screen.getByText('content1-1')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'accordion1' }))
    expect(screen.queryByText('content1-1')).not.toBeInTheDocument()
    expect(screen.getByText('content2-1')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'accordion2' }))
    expect(screen.queryByText('content1-1')).not.toBeInTheDocument()
    expect(screen.queryByText('content2-1')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'accordion1' }))
    expect(screen.getByText('content1-1')).toBeInTheDocument()
    expect(screen.queryByText('content2-1')).not.toBeInTheDocument()
  })
})
