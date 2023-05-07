import { render, screen } from '@testing-library/react'

import HorizontalTable from '.'

describe('HorizontalTable', () => {
  test('should render the title', () => {
    const props = {
      title: 'title',
      array: [['content1', 'content2']] as [string, string][],
    }
    render(<HorizontalTable {...props} />)
    expect(screen.getByText(props.title)).toBeInTheDocument()
  })
  test('should render tr, th, and td element', () => {
    const props = {
      title: 'title',
      array: [['content1', 'content2', 'content3']] as [string, ...string[]][],
    }
    render(<HorizontalTable {...props} />)
    expect(screen.getByRole('rowgroup')).toBeInTheDocument()
    expect(screen.getByRole('row')).toBeInTheDocument()
    expect(
      screen.getByRole('rowheader', { name: 'content1' })
    ).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'content2' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'content3' })).toBeInTheDocument()
  })
})
