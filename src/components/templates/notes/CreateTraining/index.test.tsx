import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { handleGetExerciseNamesByPart } from '@/graphql/schema/queries/exricise/getExerciseNamesByPart/msw'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { client, setupMockServer } from '@/tests/jest'
import type { ComboBoxOption } from '@/types'

import CreateTraining from '.'

const partsOptions = allPartsName.parts as ComboBoxOption[]
const existingTrainings = new Set('')

const user = userEvent.setup()

const server = setupMockServer(handleGetExerciseNamesByPart())

describe('CreateTraining', () => {
  it('should render static values', async () => {
    const onCompleted = jest.fn()
    render(
      <ApolloProvider client={client}>
        <CreateTraining
          onCompleted={onCompleted}
          partsOptions={partsOptions}
          existingTrainings={existingTrainings}
        />
      </ApolloProvider>
    )
    expect(screen.getByText('新規トレーニング')).toBeInTheDocument()
    expect(screen.getByText('部位:')).toBeInTheDocument()
    expect(screen.getByText('種目:')).toBeInTheDocument()
    expect(await screen.findByTestId('menuButton')).toBeInTheDocument()

    expect(screen.getAllByRole('combobox')).toHaveLength(2)
  })
  it('should render no data', async () => {
    server.use(handleGetExerciseNamesByPart({ status: 204 }))
    const onCompleted = jest.fn()
    render(
      <ApolloProvider client={client}>
        <CreateTraining
          onCompleted={onCompleted}
          partsOptions={partsOptions}
          existingTrainings={existingTrainings}
        />
      </ApolloProvider>
    )

    expect(
      await screen.findByPlaceholderText('右の点々ボタンから種目を追加')
    ).toBeInTheDocument()
  })

  it('should display loader', async () => {
    server.use(handleGetExerciseNamesByPart({ status: 200 }))
    const onCompleted = jest.fn()
    render(
      <ApolloProvider client={client}>
        <CreateTraining
          onCompleted={onCompleted}
          partsOptions={partsOptions}
          existingTrainings={existingTrainings}
        />
      </ApolloProvider>
    )

    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })
})
