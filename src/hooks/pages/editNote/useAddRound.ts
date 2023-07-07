import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'

import { useAddRoundMutation } from '@/graphql/generated/operations-csr'
import { Unit } from '@/graphql/generated/operations-type'
import type { UpsertRoundInput } from '@/libs/schema/upsertRound'
import { isEditingState } from '@/recoil/Note/isEditing'

const useAddRound = (onCompleted: () => void) => {
  const [addRoundMutation, { loading: addRoundMutationLoading }] =
    useAddRoundMutation({
      onCompleted: (result) => console.log(444, result),
    })
  const setIsEditing = useSetRecoilState(isEditingState)

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
