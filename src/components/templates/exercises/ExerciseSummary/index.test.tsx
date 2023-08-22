import { ApolloProvider } from '@apollo/client'
import { findByRole, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import Toast from '@/components/atoms/Toast'
import { exerciseNamesByParts } from '@/graphql/schema/queries/exricise/getExerciseNamesByPart/fixture'
import { trainingStat } from '@/graphql/schema/queries/training/getTrainingStat/fixture'
import { handleGetTrainingStat } from '@/graphql/schema/queries/training/getTrainingStat/msw'
import { client, setupMockServer } from '@/tests/jest'
import { dateFormat } from '@/utils/dateFormat'

import ExerciseSummary from '.'

const server = setupMockServer(handleGetTrainingStat())

const index = 0
const exercise = exerciseNamesByParts[0].part?.exercises?.[index] as {
  id: string
  name: string
}

describe('ExerciseSummary loading', () => {
  it('should display noData when data is empty', async () => {
    server.use(handleGetTrainingStat({ status: 204 }))
    const onCompleted = jest.fn()
    render(
      <ApolloProvider client={client}>
        <ExerciseSummary
          exercise={exercise}
          index={index}
          onCompleted={onCompleted}
        />
      </ApolloProvider>
    )
    expect((await screen.findByTestId('trainingNum')).textContent).toBe(`${0}`)
    expect(screen.getByTestId('lastUpdatedAt').textContent).toBe(`--:--`)
  })
})

describe('ExerciseSummary', () => {
  it('should render props', async () => {
    const onCompleted = jest.fn()
    render(
      <ApolloProvider client={client}>
        <ExerciseSummary
          exercise={exercise}
          index={index}
          onCompleted={onCompleted}
        />
      </ApolloProvider>
    )
    expect(screen.getByText(exercise.name)).toBeInTheDocument()
    expect((await screen.findByTestId('trainingNum')).textContent).toBe(
      `${trainingStat.trainingsStat?.length}`
    )
    expect(screen.getByTestId('lastUpdatedAt').textContent).toBe(
      dateFormat(
        new Date(trainingStat.trainingsStat?.at(-1)?.note.date as string),
        true
      )
    )
  })

  it('should display skelton when loading', async () => {
    server.use(handleGetTrainingStat({ status: 200 }))
    const onCompleted = jest.fn()
    render(
      <ApolloProvider client={client}>
        <ExerciseSummary
          exercise={exercise}
          index={index}
          onCompleted={onCompleted}
        />
      </ApolloProvider>
    )
    expect(await screen.findAllByTestId('skelton')).toHaveLength(2)
  })
})
