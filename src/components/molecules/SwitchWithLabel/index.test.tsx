import { render, screen } from '@testing-library/react'

import SwitchWithLabel from '.'

describe('SwitchWithLabel', () => {
  test('should display initial state', () => {
    const label = 'label'
    render(<SwitchWithLabel label={label} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.queryByText(label)).not.toHaveClass('sr-only')
  })

  test('should not display label', () => {
    const label = 'label'
    render(<SwitchWithLabel label={label} labelVisible={false} />)
    expect(screen.queryByText(label)).toHaveClass('sr-only')
  })
})
