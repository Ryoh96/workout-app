import { ApolloProvider } from '@apollo/client'
import { findByRole, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import type { GetAllTrainingsInNoteQuery } from '@/graphql/generated/operations-csr'
import { data } from '@/graphql/schema/queries/training/getAllTrainingsInNote/fixture'
import { handleGetAllTrainingsInNote } from '@/graphql/schema/queries/training/getAllTrainingsInNote/msw'
import { client, setupMockServer } from '@/tests/jest'
import getOrders from '@/utils/exercise/getOrders'

import OrderAverageData from '.'

const server = setupMockServer(handleGetAllTrainingsInNote())
const user = userEvent.setup()

function calculateAverageIndex(id: string, span: number) {
  let totalIndex = 0
  let totalCount = 0

  const notes = span !== -1 ? data.notes!.slice(0, span) : data.notes!

  notes.forEach((note) => {
    note.trainings!.forEach((training, index) => {
      if (training.exercise!.id === id) {
        totalIndex += index
        totalCount++
      }
    })
  })

  if (totalCount === 0) {
    return '0'
  }

  return `${Number(totalIndex / totalCount + 1).toFixed(2)}`
}

describe('OrderAverageData', () => {
  it('should render default props', async () => {
    const id = data.notes?.at(-1)?.trainings?.at(1)?.exercise?.id as string
    const orders = getOrders(id, data)
      ?.map((order) => order.order ?? 0)
      .slice(0, 30)
    const ordersAverage = orders
      ? orders.reduce((acc, num) => acc + num, 0) / orders.length
      : 0
    const result = Number(ordersAverage + 1).toFixed(2)

    render(
      <ApolloProvider client={client}>
        <OrderAverageData id={id} />
      </ApolloProvider>
    )
    expect((await screen.findByTestId('ordersAverage')).textContent).toBe(
      `${result}`
    )
  })

  it('should render selected value', async () => {
    const id = data.notes?.at(0)?.trainings?.at(0)?.exercise?.id as string //hoge
    render(
      <ApolloProvider client={client}>
        <OrderAverageData id={id} />
      </ApolloProvider>
    )

    // 3日間の平均
    const average3Days = calculateAverageIndex(id, 3)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '3' },
    })
    await user.click(screen.getByRole('button', { name: '閉じる' }))
    expect(screen.getByTestId('ordersAverage').textContent).toBe(average3Days)

    // 5日間の平均
    const average5Days = calculateAverageIndex(id, 5)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '5' },
    })
    await user.click(screen.getByRole('button', { name: '閉じる' }))
    expect(screen.getByTestId('ordersAverage').textContent).toBe(average5Days)

    // 全期間の平均
    const averageAllDays = calculateAverageIndex(id, -1)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '-1' },
    })
    await user.click(screen.getByRole('button', { name: '閉じる' }))
    expect(screen.getByTestId('ordersAverage').textContent).toBe(averageAllDays)
  })

  it('should render selected value when selected other id', async () => {
    const id = data.notes?.at(-1)?.trainings?.at(1)?.exercise?.id as string
    render(
      <ApolloProvider client={client}>
        <OrderAverageData id={id} />
      </ApolloProvider>
    )

    // 3日間の平均
    const average3Days = calculateAverageIndex(id, 3)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '3' },
    })
    await user.click(screen.getByRole('button', { name: '閉じる' }))
    expect(screen.getByTestId('ordersAverage').textContent).toBe(average3Days)

    // 5日間の平均
    const average5Days = calculateAverageIndex(id, 5)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '5' },
    })
    await user.click(screen.getByRole('button', { name: '閉じる' }))
    expect(screen.getByTestId('ordersAverage').textContent).toBe(average5Days)

    // 全期間の平均
    const averageAllDays = calculateAverageIndex(id, -1)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '-1' },
    })
    await user.click(screen.getByRole('button', { name: '閉じる' }))
    expect(screen.getByTestId('ordersAverage').textContent).toBe(averageAllDays)
  })
})

describe('OrderAverageData no data', () => {
  it('should display skelton when loading', async () => {
    server.use(handleGetAllTrainingsInNote())
    const id = 'dummy'
    render(
      <ApolloProvider client={client}>
        <OrderAverageData id={id} />
      </ApolloProvider>
    )
    expect((await screen.findByTestId('ordersAverage')).textContent).toBe('--')
  })
})

describe('OrderAverageData loading', () => {
  it('should display skelton when loading', async () => {
    server.use(handleGetAllTrainingsInNote({ status: 200 }))
    const id = data.notes?.at(-1)?.trainings?.at(1)?.exercise?.id as string
    render(
      <ApolloProvider client={client}>
        <OrderAverageData id={id} />
      </ApolloProvider>
    )
    expect(await screen.findByTestId('skelton')).toBeInTheDocument()
  })
})
