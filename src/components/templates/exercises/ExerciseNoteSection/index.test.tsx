import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { trainingStat } from '@/graphql/schema/queries/training/getTrainingStat/fixture'
import getNormalizedStatData from '@/utils/exercise/getNormalizedStatData'

import ExerciseNoteSection from '.'

const data = trainingStat
const normalizedData = getNormalizedStatData(data)
const user = userEvent.setup()

describe('ExerciseNoteSection correct case', () => {
  it('should render values when correct case', async () => {
    render(
      <ExerciseNoteSection normalizedData={normalizedData} loading={false} />
    )
    expect(screen.getAllByRole('table')).toHaveLength(
      data.trainingsStat?.length as number
    )
  })

  it('should display spinner when loading', async () => {
    render(
      <ExerciseNoteSection normalizedData={normalizedData} loading={true} />
    )
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('should display nodata when data is empty', async () => {
    render(<ExerciseNoteSection normalizedData={[]} loading={false} />)
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getByText('データがありません')).toBeInTheDocument()
  })
})
