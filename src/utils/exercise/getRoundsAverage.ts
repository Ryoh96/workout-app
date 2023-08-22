import { LB_VALUE } from '@/constants'
import type { StatData } from '@/types'

const getRoundsAverage = (
  normalizedStatData: StatData,
  round = 3,
  span = 30
) => {
  const totalAndCount = [...Array(round)].map(() => ({
    totalWeight: 0,
    totalReps: 0,
    totalInterval: 0,
    count: 0,
  }))

  const statData =
    span !== -1 ? normalizedStatData?.slice(-span) : normalizedStatData
  statData?.forEach((data) => {
    for (let index = 0; index < round; index++) {
      if (data.rounds?.[index] === undefined) continue
      const round = data.rounds?.[index] ?? {
        weight: 0,
        unit: 'KG',
        repetition: 0,
        interval: 0,
      }

      totalAndCount[index].totalWeight +=
        round.weight * (round.unit === 'LB' ? LB_VALUE : 1)
      totalAndCount[index].totalReps += round.repetition
      totalAndCount[index].totalInterval += round.interval ?? 0

      totalAndCount[index].count += 1
    }
  })
  const averages = totalAndCount.map((stat) => ({
    weight: stat.totalWeight / stat.count,
    reps: stat.totalReps / stat.count,
    interval: stat.totalInterval / stat.count,
  }))

  return averages
}

export default getRoundsAverage
