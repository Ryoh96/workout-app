import { render, screen } from '@testing-library/react'

import HorizontalTable from '.'

describe('HorizontalTable', () => {
  test('should render the title', () => {
    const props = {
      title: 'title',
      data: [{ heading: 'content1', content: 'content2' }],
    }
    render(<HorizontalTable {...props} />)
    expect(screen.getByText(props.title)).toBeInTheDocument()
  })
  test('should render tr, th, and td element', () => {
    const props = {
      title: 'title',
      data: [{ heading: 'content1', content: 'content2' }],
    }
    render(<HorizontalTable {...props} />)
    expect(screen.getByRole('rowgroup')).toBeInTheDocument()
    expect(screen.getByRole('row')).toBeInTheDocument()
    expect(
      screen.getByRole('rowheader', { name: 'content1' })
    ).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'content2' })).toBeInTheDocument()
  })
  test('should render all of tuple elements', () => {
    const props = {
      title: 'title',
      data: [{ heading: 'content1', content: 'content2', others: 'content3' }],
    }
    render(<HorizontalTable {...props} />)
    expect(screen.getByRole('rowgroup')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).not.toBeNull()
    expect(
      screen.getByRole('rowheader', { name: 'content1' })
    ).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'content2' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'content3' })).toBeInTheDocument()
  })
})
