import type { LazyQueryExecFunction } from '@apollo/client'
import { useState } from 'react'
import { toast } from 'react-toastify'

import {
  useGetAllPartsNameQuery,
  useGetExerciseNamesByPartLazyQuery,
} from '@/graphql/generated/operations-csr'
import type { ComboBoxOption } from '@/types'
import { ManipulationError } from '@/utils/errors'

export const useExerciseSummaryByParts = () => {
  const [getExerciseName, { data: getExerciseNameData, refetch }] =
    useGetExerciseNamesByPartLazyQuery({
      onError: (error) => {
        if (error instanceof ManipulationError) toast.error(error.message)
      },
    })

  const [parts, setParts] = useState<ComboBoxOption | undefined>(undefined)
  const { data: partsData } = useGetAllPartsNameQuery({
    onCompleted: (result) => {
      getExerciseName({ variables: { partIds: `${result.parts?.[0].id}` } })
      setParts(result.parts?.[0])
    },
  })
  const partsOptions = partsData?.parts ?? ([] as ComboBoxOption[])

  const handleChange = async (id: string) => {
    try {
      const part = partsOptions.find((part) => part.id === id)
      if (!part) throw new ManipulationError('パーツが見つかりません')
      setParts(part)
      await refetch({
        partIds: `${id}`,
      })
    } catch (error) {
      if (error instanceof ManipulationError) {
        toast.error(error.message)
        console.error(error)
      }
    }
  }

  return [
    getExerciseNameData,
    parts,
    partsOptions,
    handleChange,
    refetch,
  ] as const
}
