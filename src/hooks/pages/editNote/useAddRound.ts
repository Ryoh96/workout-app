import type { ApolloQueryResult } from '@apollo/client/core/types'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

import { useAddRoundMutation } from '@/graphql/generated/operations-csr'
import type {
  Exact,
  GetNoteByIdQuery,
} from '@/graphql/generated/operations-type'
import { Unit } from '@/graphql/generated/operations-type'
import type { UpsertRoundInput } from '@/libs/schema/upsertRound'

const useAddRound = (
  noteId: string | null,
  refetch: (
    variables?:
      | Partial<
          Exact<{
            id: string
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetNoteByIdQuery>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [addRoundMutation, { loading: addRoundMutationLoading }] =
    useAddRoundMutation({
      onCompleted: () => refetch({ id: noteId as string }),
      onError: (error) => {
        console.error(error)
      },
    })

  const handleAddRound = useCallback(
    async (
      trainingId: string,
      { weight, repetition, minutes, seconds, unit }: UpsertRoundInput,
      exerciseId: string | undefined
    ) => {
      if (exerciseId === undefined) {
        throw new Error('種目が登録されていません')
      }
      const interval =
        minutes || seconds ? (minutes ?? 0) * 60 + (seconds ?? 0) : undefined
      console.log(trainingId.slice(0, 5), exerciseId.slice(0, 5))
      await toast.promise(
        addRoundMutation({
          variables: {
            input: {
              exerciseId,
              trainingId,
              roundInput: {
                weight,
                repetition,
                interval,
                unit: unit == 'kg' ? Unit.Kg : Unit.Lb,
              },
            },
          },
        }),
        {
          error: {
            render({ data }) {
              //@ts-ignore
              return `${data.message}`
            },
          },
          success: '登録完了',
        },
        {
          autoClose: 3000,
        }
      )
      setIsEditing(false)
    },
    [addRoundMutation, setIsEditing]
  )

  return [handleAddRound, addRoundMutationLoading] as const
}

export default useAddRound
