import { render, screen } from '@testing-library/react'

import SubIconButton from '.'

describe('SubIconButton', () => {
  test('should render props', () => {
    const text = 'hoge'
    render(<SubIconButton text={text} />)
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
