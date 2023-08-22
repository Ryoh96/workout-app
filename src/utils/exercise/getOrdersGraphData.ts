import type { GetAllTrainingsInNoteQuery } from '@/graphql/generated/operations-type'

import getOrders from './getOrders'

const getOrdersGraphData = (
  id: string,
  data?: GetAllTrainingsInNoteQuery,
  span = 30
) => {
  const ordersData =
    (span !== -1 ? getOrders(id, data)?.slice(0, span) : getOrders(id, data)) ??
    []
  const orders = ordersData.map((order) => order.order ?? 0)

  const countObj =
    orders?.reduce((obj: Record<number, number>, number) => {
      obj[number] = (obj[number] || 0) + 1
      return obj
    }, {}) ?? {}

  const labels = Object.keys(countObj).map((key) => `${Number(key) + 1}種目目`)
  const datasets = [
    {
      label: 'count',
      data: Object.values(countObj).map((value) => value),
    },
  ]
  return [datasets, labels, ordersData] as const
}

export default getOrdersGraphData
