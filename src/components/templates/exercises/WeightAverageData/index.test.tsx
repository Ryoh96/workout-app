import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import {
  fixture as data,
  noDataFixture as noData,
} from '@/utils/exercise/getNormalizedStatData/fixture'
import getRoundsAverage from '@/utils/exercise/getRoundsAverage'

import WeightAverageData from '.'

const user = userEvent.setup()

describe('WeightAverageData', () => {
  it('should render default props', async () => {
    render(<WeightAverageData normalizedStatData={data} loading={false} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })
  it('should change values when select span filter', async () => {
    render(<WeightAverageData normalizedStatData={data} loading={false} />)
    await user.click(screen.getByRole('button', { name: 'フィルター' }))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox', { name: 'セット数' }), {
      target: { value: '5' },
    })
    await user.click(screen.getByRole('button', { name: '閉じる' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })
  it('should change values when select set filter', async () => {
    render(<WeightAverageData normalizedStatData={data} loading={false} />)
    const weightAverage3Days = `${Number(
      getRoundsAverage(data, 3, 30)[0].weight
    ).toFixed(2)}`
    expect(screen.getAllByTestId('weightAverage')[0]).toHaveTextContent(
      weightAverage3Days
    )
    await user.click(screen.getByRole('button', { name: 'フィルター' }))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox', { name: '期間' }), {
      target: { value: '5' },
    })
    const averages = getRoundsAverage(data, 3, 5)[0].weight
    expect(screen.getAllByTestId('weightAverage')[0]).toHaveTextContent(
      `${averages}`
    )
  })
})

describe('WeightAverageData loading', () => {
  it('should display skelton when loading', async () => {
    render(<WeightAverageData normalizedStatData={data} loading={true} />)
    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })
})

describe('WeightAverageData No Data', () => {
  it('should display no data', async () => {
    render(<WeightAverageData normalizedStatData={noData} loading={false} />)
    expect(screen.getAllByTestId('weightAverage')[0]).toHaveTextContent(`--`)
  })
})
