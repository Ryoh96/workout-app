import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'

import Home from '@/pages/index'

test('test', async () => {
  render(<Home />)
  // screen.debug()
  expect(screen.getByText('Workout app')).toBeInTheDocument()
})
