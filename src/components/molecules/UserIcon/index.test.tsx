import { render, screen } from '@testing-library/react'

import UserIcon from '.'

describe('UserIcon', () => {
  test('should render image when user is login and has icon ', () => {
    render(<UserIcon src="/vercel.svg" isLogin={true} />)
    // screen.debug()
    expect(screen.getByAltText('icon')).toBeInTheDocument()
    expect(screen.queryByTestId('default-icon')).not.toBeInTheDocument()
  })
  test('should not render image when user is not login', () => {
    render(<UserIcon isLogin={false} />)
    expect(screen.queryByAltText('icon')).not.toBeInTheDocument()
    expect(screen.getByTestId('default-icon')).toBeInTheDocument()
  })
  test('should not render image when user is login and does not have icon', () => {
    render(<UserIcon isLogin={false} />)
    expect(screen.queryByAltText('icon')).not.toBeInTheDocument()
    expect(screen.getByTestId('default-icon')).toBeInTheDocument()
  })
})
