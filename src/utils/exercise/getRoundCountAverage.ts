import type { StatData } from '@/types'

const getRoundCountAverage = (normalizedStatData: StatData, span = 30) => {
  const statData =
    span !== -1 ? normalizedStatData?.slice(-span) : normalizedStatData
  return statData
    ? statData.reduce(
        (accumulator, data) => accumulator + (data.rounds?.length ?? 0),
        0
      ) / statData.length
    : 0
}

export default getRoundCountAverage
