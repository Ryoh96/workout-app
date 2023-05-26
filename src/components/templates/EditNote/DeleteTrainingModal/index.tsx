import type { ApolloQueryResult } from '@apollo/client/core/types'
import { toast } from 'react-toastify'

import Modal from '@/components/organisms/Modal'
import { useRemoveTrainingMutation } from '@/graphql/generated/operations-csr'
import type {
  Exact,
  GetNoteByIdQuery,
} from '@/graphql/generated/operations-type'

type Props = {
  deleteTrainingId: string | null
  noteId: string | null
  refetch: (
    variables?:
      | Partial<
          Exact<{
            id: string
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetNoteByIdQuery>>
  setDeleteTrainingId: React.Dispatch<React.SetStateAction<string | null>>
  setIsOpenDeleteTrainingModal: React.Dispatch<React.SetStateAction<boolean>>
  isOpenDeleteTrainingModal: boolean
}

export const DeleteTrainingModal = ({
  deleteTrainingId,
  refetch,
  noteId,
  setDeleteTrainingId,
  setIsOpenDeleteTrainingModal,
  isOpenDeleteTrainingModal,
}: Props) => {
  const [removeTrainingMutation] = useRemoveTrainingMutation({
    onCompleted: () => refetch({ id: noteId as string }),
    onError: (error) => {
      console.error(error)
    },
  })
  return (
    <Modal
      title="トレーニングの削除"
      content={<p>このトレーニングを削除しますか？</p>}
      handlers={[
        {
          name: '削除',
          handleClick: async () => {
            try {
              if (!deleteTrainingId) {
                throw new Error('トレーニングIDが見つかりません')
              }
              await toast.promise(
                removeTrainingMutation({
                  variables: { id: deleteTrainingId },
                }),
                {
                  error: 'エラー',
                  success: '削除しました',
                },
                {
                  autoClose: 3000,
                }
              )
            } catch (error) {
              if (error instanceof Error) {
                console.log(error)
              }
            } finally {
              setDeleteTrainingId(null)
            }
          },
        },
        {
          name: 'キャンセル',
        },
      ]}
      closeModal={() => setIsOpenDeleteTrainingModal(false)}
      isOpen={isOpenDeleteTrainingModal}
    />
  )
}
