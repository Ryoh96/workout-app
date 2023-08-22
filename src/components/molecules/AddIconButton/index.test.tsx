import { render, screen } from '@testing-library/react'

import AddIconButton from '.'

describe('AddIconButton', () => {
  test('should render props', () => {
    const text = 'hoge'
    render(<AddIconButton text={text} />)
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
