import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'
import { v4 as uuid } from 'uuid'

import { useCreateTrainingMutation } from '@/graphql/generated/operations-csr'
import { isEditingState } from '@/recoil/Note/isEditing'
import { editedTrainingIdState } from '@/recoil/Training/editedTrainingId'
import { lastTrainingIdState } from '@/recoil/Training/lastTrainingId'
import type { ComboBoxOption } from '@/types'

const useCreateTraining = (
  noteId: string | null,
  onCompleted: () => void,
  existingTrainings: Set<string | number | undefined>,
  exercise?: ComboBoxOption
) => {
  const [createTrainingMutation, { loading: createTrainingMutationLoading }] =
    useCreateTrainingMutation({
      onCompleted,
    })
  const setEditedTrainingId = useSetRecoilState(editedTrainingIdState)
  const setLastTrainingId = useSetRecoilState(lastTrainingIdState)
  const setIsEditing = useSetRecoilState(isEditingState)

  const handleCreateTraining = async () => {
    const trainingId = uuid()
    try {
      if (!noteId) {
        throw new Error('ノートが存在しません')
      }

      if (!exercise) {
        throw new Error('種目が登録されていません')
      }

      if (existingTrainings.has(exercise.id)) {
        throw new Error(
          '既にその種目は本日行っています。別名で登録してください。'
        )
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
          error: {
            render({ data }) {
              //@ts-ignore
              return `${data.message}`
            },
          },
          success: 'トレーニング登録完了',
          pending: "トレーニング作成中"
        },
        {
          autoClose: 3000,
        }
      )

      setEditedTrainingId(trainingId)
      setLastTrainingId(trainingId)
      setIsEditing(true)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return [handleCreateTraining, createTrainingMutationLoading] as const
}

export default useCreateTraining
