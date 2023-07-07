import type { StatData } from '@/types'

const getWeightGraphData = (
  normalizedStatData: StatData,
  round = 3,
  span = 30
) => {
  const statPerRound = [...Array(round)].map(
    () => [] as { weight: number; reps: number; interval: number }[]
  )

  normalizedStatData?.forEach((data) => {
    for (let index = 0; index < round; index++) {
      const round = data.rounds?.[index] ?? {
        weight: 0,
        unit: 'KG',
        repetition: 0,
        interval: 0,
      }

      statPerRound[index].push({
        weight: round.weight,
        reps: round.repetition,
        interval: round.interval ?? 0,
      })
    }
  })

  const weightsDatasets = statPerRound?.map((rounds, index) => ({
    label: `${index + 1}set`,
    data: rounds.map((round) => round.weight).slice(-span),
  }))

  const labels = weightsDatasets[0].data.map(() => '')
  const dates = normalizedStatData
    ?.map((data) => new Date(data.date as string))
    .slice(-span)

  return [weightsDatasets, labels, dates] as const
}

export default getWeightGraphData
