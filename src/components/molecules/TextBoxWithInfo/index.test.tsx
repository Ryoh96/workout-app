import { render, screen } from '@testing-library/react'

import TextBoxWithInfo from '.'

describe('TextBoxWithInfo', () => {
  test('should display initial state', () => {
    const label = 'label'
    render(<TextBoxWithInfo label={label} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.queryByText(label)).not.toHaveClass('sr-only')
  })

  test('should not display label', () => {
    const label = 'label'
    render(<TextBoxWithInfo label={label} labelVisible={false} />)
    expect(screen.queryByText(label)).toHaveClass('sr-only')
  })

  test('should display all props', () => {
    const label = 'label'
    const error = 'error'
    render(
      <TextBoxWithInfo
        label={label}
        error={error}
        inputCounter={<div data-testid="input-counter" />}
      />
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.queryByText(label)).not.toHaveClass('sr-only')
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByTestId('input-counter')).toBeInTheDocument()
  })
})
