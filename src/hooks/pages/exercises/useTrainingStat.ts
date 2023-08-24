import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useGetTrainingStatQuery } from '@/graphql/generated/operations-csr'
import { ManipulationError } from '@/utils/errors'
import getNormalizedStatData from '@/utils/exercise/getNormalizedStatData'

export const useTrainingStat = (id: string) => {
  const {
    data: statData,
    loading: statLoading,
    refetch: statDataRefetch,
  } = useGetTrainingStatQuery({
    variables: {
      exerciseId: id,
    },
    onError: (error) => {
      if (error instanceof ManipulationError) toast.error(error.message)
    },
  })

  useEffect(() => {
    statDataRefetch()
  }, [statDataRefetch])

  const normalizedStatData = getNormalizedStatData(statData)

  return [normalizedStatData, statLoading] as const
}
