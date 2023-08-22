import {
  noData,
  trainingStat,
} from '@/graphql/schema/queries/training/getTrainingStat/fixture'

import getNormalizedStatData from '.'

export const fixture = getNormalizedStatData(trainingStat)
export const noDataFixture = getNormalizedStatData(noData)
