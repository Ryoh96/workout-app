import { ApolloProvider } from '@apollo/client'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { DeleteRoundModal } from '@/components/templates/modal/DeleteModal/DeleteRoundModal'
import EditRoundModal from '@/components/templates/modal/EditRoundModal'
import type { GetNoteQuery } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client, setupMockServer } from '@/tests/jest'

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
