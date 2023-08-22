import { findByRole, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import {
  fixture as data,
  noDataFixture as noData,
} from '@/utils/exercise/getNormalizedStatData/fixture'

import RoundAverageData from '.'

const user = userEvent.setup()

function calculateRoundAverage(span: number) {
  const statData = span !== -1 ? data?.slice(-span) : data
  const result = statData
    ? statData.reduce(
        (accumulator, data) => accumulator + (data.rounds?.length ?? 0),
        0
      ) / statData.length
    : 0

  return Number(result).toFixed(2)
}

describe('OrderAverageData', () => {
  it('should render default props', async () => {
    render(<RoundAverageData normalizedStatData={data} loading={false} />)
    const average = calculateRoundAverage(30)
    expect(screen.getByTestId('roundAverage').textContent).toBe(average)
  })

  it('should render selected value', async () => {
    render(<RoundAverageData normalizedStatData={data} loading={false} />)

    // 3日間の平均
    const average3Days = calculateRoundAverage(3)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '3' },
    })
    await user.click(screen.getByRole('button', { name: '閉じる' }))
    expect(screen.getByTestId('roundAverage').textContent).toBe(average3Days)

    // 5日間の平均
    const average5Days = calculateRoundAverage(5)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '5' },
    })
    await user.click(screen.getByRole('button', { name: '閉じる' }))
    expect(screen.getByTestId('roundAverage').textContent).toBe(average5Days)

    // 全期間の平均
    const averageAllDays = calculateRoundAverage(-1)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '-1' },
    })
    await user.click(screen.getByRole('button', { name: '閉じる' }))
    expect(screen.getByTestId('roundAverage').textContent).toBe(averageAllDays)
  })
})

describe('OrderAverageData loading', () => {
  it('should display skelton when loading', async () => {
    render(<RoundAverageData normalizedStatData={data} loading={true} />)
    expect(await screen.findByTestId('skelton')).toBeInTheDocument()
  })
})

describe('OrderAverageData No Data', () => {
  it('should display no data', async () => {
    render(<RoundAverageData normalizedStatData={noData} loading={false} />)
    expect((await screen.findByTestId('roundAverage')).textContent).toBe('--')
  })
})
