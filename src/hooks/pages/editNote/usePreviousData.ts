import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useGetPreviousTrainingsQuery } from '@/graphql/generated/operations-csr'

const usePreviousData = (id: string) => {
  const { data: previousData, loading: previousLoading } =
    useGetPreviousTrainingsQuery({
      variables: { id, limit: 1 },
      onError: (error) => toast.error(error.message),
    })

  const [previousTotalLoad, setPreviousTotalLoad] = useState(0)

  useEffect(() => {
    if (!previousData) return
    setPreviousTotalLoad(
      previousData.previousTrainings?.[0]?.rounds?.reduce(
        (accumulator, round) => accumulator + round.repetition * round.weight,
        0
      ) ?? 0
    )
  }, [previousData, setPreviousTotalLoad])

  return { previousTotalLoad, previousData, previousLoading }
}

export default usePreviousData
