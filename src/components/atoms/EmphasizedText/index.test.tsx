import { render, screen } from '@testing-library/react'

import EmphasizedText from '.'

describe('EmphasizedText', () => {
  test('should render the text', () => {
    const content = 'Content'
    const unit = 'Unit'
    render(<EmphasizedText content={content} unit={unit} />)
    expect(screen.getByText(content)).toBeInTheDocument()
    expect(screen.getByText(unit)).toBeInTheDocument()
    expect(screen.getByText('前回')).toBeInTheDocument()
  })
})
