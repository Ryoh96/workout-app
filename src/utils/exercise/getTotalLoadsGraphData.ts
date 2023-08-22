import type { StatData } from '@/types'

const getTotalLoadGraphData = (normalizedStatData: StatData, span = 30) => {
  const totalLoadGraphData = [
    {
      label: '総負荷量',
      data:
        (span !== -1
          ? normalizedStatData?.map((data) => data.totalLoad ?? 0).slice(-span)
          : normalizedStatData?.map((data) => data.totalLoad ?? 0)) ?? [],
    },
  ]

  const labels = totalLoadGraphData[0].data?.map(() => '') ?? ['']

  const dates =
    span !== -1
      ? normalizedStatData
          ?.map((data) => new Date(data.date as string))
          .slice(-span)
      : normalizedStatData?.map((data) => new Date(data.date as string))

  return [totalLoadGraphData, labels, dates] as const
}

export default getTotalLoadGraphData
