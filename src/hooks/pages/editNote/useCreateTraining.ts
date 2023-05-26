import type { ApolloQueryResult } from '@apollo/client/core/types'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'

import { useCreateTrainingMutation } from '@/graphql/generated/operations-csr'
import type {
  Exact,
  GetNoteByIdQuery,
} from '@/graphql/generated/operations-type'
import type { ComboBoxOption } from '@/types'

const useCreateTraining = (
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
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  setEditedTrainingId: React.Dispatch<React.SetStateAction<string | null>>,
  setLastTrainingId: React.Dispatch<React.SetStateAction<string | null>>,
  exercise: ComboBoxOption
) => {
  const [createTrainingMutation, { loading: createTrainingMutationLoading }] =
    useCreateTrainingMutation({
      onCompleted: () => refetch({ id: noteId as string }),
      onError: (error) => {
        console.error(error)
      },
    })

  const handleCreateTraining = async () => {
    const trainingId = uuid()
    if (!noteId) {
      throw new Error('ノートが存在しません')
    }

    await toast.promise(
      createTrainingMutation({
        variables: {
          id: trainingId,
          noteId,
          exerciseId: `${exercise.id}`,
        },
      }),
      {
        error: 'エラー',
        success: 'トレーニング登録完了',
      },
      {
        autoClose: 3000,
      }
    )

    setEditedTrainingId(trainingId)
    setLastTrainingId(trainingId)
    setIsEditing(true)
  }

  return [handleCreateTraining, createTrainingMutationLoading] as const
}

export default useCreateTraining
