import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import type { Training } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'

import TrainingResult from '.'

const training = note.note?.trainings?.[0] as Training

describe('TrainingResult', () => {
  it('should render props', async () => {
    render(<TrainingResult training={training} id={training.id} />)
    expect(screen.getAllByTestId('set')).toHaveLength(3)
    expect(screen.getAllByTestId('weight')).toHaveLength(3)
    expect(screen.getAllByTestId('reps')).toHaveLength(3)
    expect(screen.getAllByTestId('interval')).toHaveLength(3)
  })
})
