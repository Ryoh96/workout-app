import { TrashIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import type { SetterOrUpdater } from 'recoil'

import Modal from '@/components/organisms/Modal'

type Props = {
  title: string
  deleteMutation: () => Promise<any>
  isOpen: boolean
  closeModal: () => void
  deleteId: string | number | null
  setDeleteId?: SetterOrUpdater<string | null>
  handleCancel?: () => void
}

const DeleteModal = ({
  title,
  deleteMutation,
  isOpen,
  closeModal,
  deleteId,
  setDeleteId,
  handleCancel,
}: Props) => {
  return (
    <Modal
      title={`${title}の削除`}
      titleIcon={<TrashIcon />}
      content={<p>{title}を削除しますか？</p>}
      handlers={[
        {
          name: '削除',
          handleClick: async () => {
            try {
              if (deleteId === null || deleteId === undefined) {
                throw new Error(`${title}が見つかりません`)
              }
              await toast.promise(
                deleteMutation,
                {
                  success: '削除しました',
                  error: {
                    render({ data }) {
                      //@ts-ignore
                      return `${data.message}`
                    },
                  },
                  pending: '削除中',
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
              setDeleteId?.(null)
            }
          },
        },
        {
          name: 'キャンセル',
          handleClick: () => handleCancel?.(),
        },
      ]}
      closeModal={closeModal}
      isOpen={isOpen}
    />
  )
}

export default DeleteModal
