import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import Toast from '@/components/atoms/Toast'
import { client } from '@/tests/jest'

import TrainingFooter from '.'

const user = userEvent.setup()

describe('TrainingFooter', () => {
  it('should show the timer', async () => {
    render(
      <ApolloProvider client={client}>
        <TrainingFooter noteData={undefined} />
        <Toast />
      </ApolloProvider>
    )
    await user.click(screen.getByText('タイマー'))
    expect(screen.getByTestId('timer')).toBeInTheDocument()
  })
  it('should open the alarm modal', async () => {
    render(
      <ApolloProvider client={client}>
        <TrainingFooter noteData={undefined} />
        <Toast />
      </ApolloProvider>
    )
    await user.click(screen.getByText('アラーム'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
  it('should open the memo modal', async () => {
    render(
      <ApolloProvider client={client}>
        <TrainingFooter noteData={undefined} />
        <Toast />
      </ApolloProvider>
    )
    await user.click(screen.getByText('メモ'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
  it('should open the alarm modal', async () => {
    render(
      <ApolloProvider client={client}>
        <TrainingFooter noteData={undefined} />
        <Toast />
      </ApolloProvider>
    )
    await user.click(screen.getByText('データ'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
