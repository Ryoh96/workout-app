import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/tests/jest'

import TrainingList from '.'

const noteData = note

const onCompleted = jest.fn()

const props = {
  onCompleted,
  noteData,
}

describe('TrainingList', () => {
  it('should render initial values', async () => {
    render(
      <ApolloProvider client={client}>
        <TrainingList {...props} />
      </ApolloProvider>
    )
    expect(screen.getAllByTestId('training-item')).toHaveLength(
      noteData.note!.trainings!.length
    )
  })
})
