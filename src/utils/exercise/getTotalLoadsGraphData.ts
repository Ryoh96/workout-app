import type { StatData } from '@/types'

const getTotalLoadGraphData = (normalizedStatData: StatData, span = 30) => {
  const totalLoadGraphData = [
    {
      label: '総負荷量',
      data:
        normalizedStatData?.map((data) => data.totalLoad ?? 0).slice(-span) ??
        [],
    },
  ]

  const labels = totalLoadGraphData[0].data?.map(() => '') ?? ['']

  const dates = normalizedStatData
    ?.map((data) => new Date(data.date as string))
    .slice(-span)

  return [totalLoadGraphData, labels, dates] as const
}

export default getTotalLoadGraphData
