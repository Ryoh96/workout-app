import type { GetTrainingStatQuery } from '@/graphql/generated/operations-csr'
import type { StatData } from '@/types'

const getNormalizedStatData = (statData?: GetTrainingStatQuery) =>
  statData?.trainingsStat?.map((training) => ({
    rounds: training?.rounds,
    date: training?.note.date,
    totalLoad: training?.totalLoad,
  })) as StatData

export default getNormalizedStatData
