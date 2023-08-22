import { ApolloClient, ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { DeleteTrainingModal } from '@/components/templates/modal/DeleteModal/DeleteTrainingModal'
import type { Part, Training } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/tests/jest'

import ExerciseHeader from '.'

const user = userEvent.setup()

const removeTraining = jest.fn()
const editTraining = jest.fn()
const onCompleted = jest.fn()
const training = note.note?.trainings?.[0] as Training
const index = 0

const props = {
  removeTraining,
  editTraining,
  onCompleted,
  training,
  index,
}

describe('ExerciseHeader', () => {
  it('should render props', async () => {
    render(
      <ApolloProvider client={client}>
        <ExerciseHeader {...props} />
      </ApolloProvider>
    )
    expect(screen.getByText('1.')).toBeInTheDocument()
    expect(screen.getByText(training.exercise!.name)).toBeInTheDocument()
    expect(screen.getByTestId('tag').textContent).toBe(
      training.exercise!.parts![0].name
    )
    expect(screen.getByText(training.totalLoad!)).toBeInTheDocument()
  })
  it('should open dropdown', async () => {
    render(
      <ApolloProvider client={client}>
        <ExerciseHeader {...props} />
      </ApolloProvider>
    )
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'メニュー' }))
    expect(screen.getByTestId('dropdown')).toBeInTheDocument()
  })
  it.each<string>(['固定メモを見る', '種目詳細', '種目履歴'])(
    'should open modals in dropdown',
    async (name) => {
      render(
        <ApolloProvider client={client}>
          <ExerciseHeader {...props} />
        </ApolloProvider>
      )
      expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'メニュー' }))
      expect(screen.getByTestId('dropdown')).toBeInTheDocument()
      await user.click(screen.getByText(name))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'close' }))
    }
  )
  it('should called props', async () => {
    render(
      <ApolloProvider client={client}>
        <ExerciseHeader {...props} />
      </ApolloProvider>
    )
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'メニュー' }))
    expect(screen.getByTestId('dropdown')).toBeInTheDocument()
    await user.click(screen.getByText('編集'))
    expect(editTraining).toBeCalledTimes(1)
    await user.click(screen.getByRole('button', { name: 'メニュー' }))
    expect(screen.getByTestId('dropdown')).toBeInTheDocument()
    await user.click(screen.getByText('削除'))
    expect(removeTraining).toBeCalledTimes(1)
  })
})
