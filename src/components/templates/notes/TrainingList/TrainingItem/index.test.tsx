import { ApolloProvider } from '@apollo/client'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { DeleteRoundModal } from '@/components/templates/modal/DeleteModal/DeleteRoundModal'
import EditRoundModal from '@/components/templates/modal/EditRoundModal'
import type { GetNoteQuery } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client, setupMockServer } from '@/tests/jest'

import TrainingItem from '.'

const trainings = note.note?.trainings as NonNullable<
  NonNullable<GetNoteQuery['note']>['trainings']
>
const training = trainings?.[0]

const onCompleted = jest.fn()
const index = 0

const props = {
  training,
  onCompleted,
  index,
}
const user = userEvent.setup()

describe('TrainingItem', () => {
  it('should render initial values', async () => {
    render(
      <ApolloProvider client={client}>
        <TrainingItem {...props} />
      </ApolloProvider>
    )
    expect(screen.getByTestId('exercise-header')).toBeInTheDocument()
    expect(screen.getByTestId('training-results')).toBeInTheDocument()
    expect(screen.queryByTestId('round-doing')).not.toBeInTheDocument()
    expect(screen.queryByText('セット追加')).not.toBeInTheDocument()
  })
  it('should render edit mode values', async () => {
    render(
      <ApolloProvider client={client}>
        <TrainingItem {...props} />
      </ApolloProvider>
    )
    await user.click(screen.getByRole('button', { name: 'メニュー' }))
    await user.click(within(screen.getByTestId('dropdown')).getByText('編集'))
    expect(
      screen.getByRole('button', { name: 'セット追加' })
    ).toBeInTheDocument()
    expect(
      within(screen.getByTestId('training-results')).getAllByTestId(
        'edit-round'
      )
    ).toHaveLength(training.rounds!.length)
    expect(
      within(screen.getByTestId('training-results')).getAllByTestId(
        'remove-round'
      )
    ).toHaveLength(training.rounds!.length)
    expect(screen.queryByTestId('round-doing')).not.toBeInTheDocument()
  })
  it('should show round form when click add set button', async () => {
    render(
      <ApolloProvider client={client}>
        <TrainingItem {...props} />
      </ApolloProvider>
    )
    await user.click(screen.getByRole('button', { name: 'メニュー' }))
    await user.click(within(screen.getByTestId('dropdown')).getByText('編集'))
    expect(
      screen.getByRole('button', { name: 'セット追加' })
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'セット追加' }))
    expect(screen.getByTestId('round-doing')).toBeInTheDocument()
  })

  it('should open the modal when click round edit/remove button', async () => {
    render(
      <ApolloProvider client={client}>
        <TrainingItem {...props} />
        <DeleteRoundModal onDeleteCompleted={jest.fn()} />
        <EditRoundModal onCompleted={jest.fn()} />
      </ApolloProvider>
    )
    await user.click(screen.getByRole('button', { name: 'メニュー' }))
    await user.click(within(screen.getByTestId('dropdown')).getByText('編集'))
    await user.click(
      within(screen.getByTestId('training-results')).getAllByTestId(
        'edit-round'
      )[0]
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.click(screen.getByText('キャンセル'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(
      within(screen.getByTestId('training-results')).getAllByTestId(
        'remove-round'
      )[0]
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
