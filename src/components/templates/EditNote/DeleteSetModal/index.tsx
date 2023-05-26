import type { ApolloQueryResult } from '@apollo/client/core/types'
import { toast } from 'react-toastify'

import Modal from '@/components/organisms/Modal'
import type { Exact } from '@/graphql/generated/operations-csr'
import { useRemoveRoundMutation } from '@/graphql/generated/operations-csr'
import type { GetNoteByIdQuery } from '@/graphql/generated/operations-type'

type Props = {
  deleteRoundId: string | null
  setDeleteRoundId: React.Dispatch<React.SetStateAction<string | null>>
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
  isOpenDeleteRoundModal: boolean
  setIsOpenDeleteRoundModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteSetModal = ({
  deleteRoundId,
  noteId,
  refetch,
  setDeleteRoundId,
  isOpenDeleteRoundModal,
  setIsOpenDeleteRoundModal,
}: Props) => {
  const [removeRoundMutation] = useRemoveRoundMutation({
    onCompleted: () => refetch({ id: noteId as string }),
    onError: (error) => {
      console.error(error)
    },
  })

  return (
    <Modal
      title="セットの削除"
      content={<p>このセットを削除しますか？</p>}
      handlers={[
        {
          name: '削除',
          handleClick: async () => {
            try {
              if (!deleteRoundId) {
                throw new Error('セットIDが見つかりません')
              }
              await toast.promise(
                removeRoundMutation({
                  variables: { id: deleteRoundId },
                }),
                {
                  success: '削除しました',
                  error: {
                    render({ data }) {
                      //@ts-ignore
                      return `${data.message}`
                    },
                  },
                },
                {
                  autoClose: 3000,
                }
              )
            } catch (error) {
              if (error instanceof Error) {
                console.error(error)
              }
            } finally {
              setDeleteRoundId(null)
            }
          },
        },
        {
          name: 'キャンセル',
        },
      ]}
      closeModal={() => setIsOpenDeleteRoundModal(false)}
      isOpen={isOpenDeleteRoundModal}
    />
  )
}
