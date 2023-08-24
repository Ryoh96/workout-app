import { useCallback } from 'react'
import { toast } from 'react-toastify'

import { useAddRoundMutation } from '@/graphql/generated/operations-csr'
import { Unit } from '@/graphql/generated/operations-type'
import type { UpsertRoundInput } from '@/libs/schema/upsertRound'
import useIsEditingStore from '@/store/note/isEditing'

const useAddRound = (onCompleted: () => void) => {
  const [addRoundMutation, { loading: addRoundMutationLoading }] =
    useAddRoundMutation({
      onCompleted,
    })
  const setIsEditing = useIsEditingStore((state) => state.setIsEditing)

  const handleAddRound = useCallback(
    async (
      trainingId: string,
      {
        weight,
        repetition,
        minutes,
        seconds,
        unit,
        memo,
        pin,
      }: UpsertRoundInput,
      exerciseId: string | undefined
    ) => {
      if (exerciseId === undefined) {
        throw new Error('種目が登録されていません')
      }
      const interval =
        minutes || seconds ? (minutes ?? 0) * 60 + (seconds ?? 0) : undefined
      try {
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
                  memo,
                  isPinned: pin,
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
            pending: '登録中',
          },
          {
            autoClose: 3000,
          }
        )
        setIsEditing(false)
      } catch (error) {
        console.error(error)
      }
    },
    [addRoundMutation, setIsEditing]
  )

  return [handleAddRound, addRoundMutationLoading] as const
}

export default useAddRound
