import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addDays, subDays } from 'date-fns'
import React from 'react'

import { dateFormat } from '@/utils/dateFormat'

import TrainingHeader from '.'

const user = userEvent.setup()

describe('TrainingHeader', () => {
  it('should render props', async () => {
    render(<TrainingHeader />)
    expect(screen.getByTestId('currentDate').textContent).toBe(
      dateFormat(new Date())
    )
  })
  it('should open calender modal', async () => {
    render(<TrainingHeader />)
    await user.click(screen.getByTestId('currentDate'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
  it('should change currentDate when click chevron button', async () => {
    render(<TrainingHeader />)
    await user.click(screen.getByRole('button', { name: '前の日付へ' }))
    expect(screen.getByTestId('currentDate').textContent).toBe(
      dateFormat(subDays(new Date(), 1))
    )
    await user.click(screen.getByRole('button', { name: '次の日付へ' }))
    expect(screen.getByTestId('currentDate').textContent).toBe(
      dateFormat(new Date())
    )
    await user.click(screen.getByRole('button', { name: '次の日付へ' }))
    expect(screen.getByTestId('currentDate').textContent).toBe(
      dateFormat(addDays(new Date(), 1))
    )
  })
})
