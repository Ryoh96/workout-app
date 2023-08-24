import { useEffect, useState } from 'react'

import { useGetExerciseNamesByPartLazyQuery } from '@/graphql/generated/operations-csr'
import type { ComboBoxOption } from '@/types'

const useExerciseName = (partIds: string) => {
  const [exercise, setExercise] = useState<ComboBoxOption | null>(null)

  const [
    getExerciseName,
    {
      data: exerciseNames,
      loading: exerciseNameLoading,
      refetch: refetchExerciseNames,
    },
  ] = useGetExerciseNamesByPartLazyQuery({
    variables: { partIds },
  })

  useEffect(() => {
    getExerciseName().then((res) =>
      setExercise(res.data?.part?.exercises?.[0] ?? null)
    )
  }, [])

  return {
    exercise,
    setExercise,
    exerciseNames,
    getExerciseName,
    exerciseNameLoading,
    refetchExerciseNames,
  }
}

export default useExerciseName
