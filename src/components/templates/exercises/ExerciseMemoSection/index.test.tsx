import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import React from 'react'

import Toast from '@/components/atoms/Toast'
import { data as pinnedMemos } from '@/graphql/schema/queries/memo/getPinnedMemosByExercises/fixture'
import { handleGetPinnedMemos } from '@/graphql/schema/queries/memo/getPinnedMemosByExercises/msw'
import { client, setupMockServer } from '@/tests/jest'
import { dateFormat } from '@/utils/dateFormat'

import ExerciseMemoSection from '.'

const data = pinnedMemos.pinnedMemos
const server = setupMockServer(handleGetPinnedMemos())
const user = userEvent.setup()

describe('ExerciseMemoSection correct case', () => {
  it('should render values', async () => {
    const id = 'dummy'
    render(
      <ApolloProvider client={client}>
        <ExerciseMemoSection id={id} />
      </ApolloProvider>
    )
    expect(screen.getByText('メモ')).toBeInTheDocument()

    expect(
      await screen.findByText(data?.[0]?.content as string)
    ).toBeInTheDocument()
    expect(screen.getByText(data?.[1]?.content as string)).toBeInTheDocument()

    expect(
      screen.getByText(dateFormat(new Date(data?.[0]?.createdAt as string)))
    ).toBeInTheDocument()
    expect(
      screen.getByText(dateFormat(new Date(data?.[1]?.createdAt as string)))
    ).toBeInTheDocument()

    expect(screen.getAllByRole('button', { name: '固定' })).toHaveLength(
      data?.length as number
    )
    expect(screen.getAllByRole('button', { name: '削除' })).toHaveLength(
      data?.length as number
    )
  })

  it('should open pin dialog', async () => {
    const id = 'dummy'
    render(
      <ApolloProvider client={client}>
        <ExerciseMemoSection id={id} />
      </ApolloProvider>
    )
    expect(
      await screen.findByText(data?.[0]?.content as string)
    ).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: '固定' })[0])
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })

  it('should open delete dialog', async () => {
    const id = 'dummy'
    render(
      <ApolloProvider client={client}>
        <ExerciseMemoSection id={id} />
      </ApolloProvider>
    )
    expect(
      await screen.findByText(data?.[0]?.content as string)
    ).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: '削除' })[0])
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })

  it('should open help', async () => {
    const id = 'dummy'
    render(
      <ApolloProvider client={client}>
        <ExerciseMemoSection id={id} />
      </ApolloProvider>
    )
    expect(
      await screen.findByText(data?.[0]?.content as string)
    ).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: 'ヘルプ' })[0])
    expect(await screen.findByText('メモの固定解除')).toBeInTheDocument()
    expect(await screen.findByText('メモの削除')).toBeInTheDocument()
    server.resetHandlers()
  })
})

describe('ExerciseMemoSection loading case', () => {
  test('should render spinner', async () => {
    server.use(handleGetPinnedMemos({ status: 200 }))
    const id = 'dummy'
    render(
      <ApolloProvider client={client}>
        <ExerciseMemoSection id={id} />
      </ApolloProvider>
    )
    expect(
      screen.queryByText(data?.[0]?.content as string)
    ).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
    server.resetHandlers()
  })
})

describe('ExerciseMemoSection no data case', () => {
  test('should render empty message', async () => {
    server.use(handleGetPinnedMemos({ status: 204 }))
    const id = 'dummy'
    render(
      <ApolloProvider client={client}>
        <ExerciseMemoSection id={id} />
      </ApolloProvider>
    )
    expect(await screen.findByText('メモがありません')).toBeInTheDocument()
  })
})
