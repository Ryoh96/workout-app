import { BookmarkIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import Modal from '@/components/organisms/Modal'
import { usePinOutMemoMutation } from '@/graphql/generated/operations-csr'

type Props = {
  onPinOutCompleted: () => void
  id: string | null
  isOpen: boolean
  closeModal: () => void
}

const PinOutMemoModal = ({
  onPinOutCompleted,
  isOpen,
  closeModal,
  id,
}: Props) => {
  const [pinOutMemo] = usePinOutMemoMutation({ onCompleted: onPinOutCompleted })

  return (
    <Modal
      title="メモの固定解除"
      titleIcon={<BookmarkIcon />}
      content={<p>メモの固定を解除しますか？</p>}
      handlers={[
        {
          name: '解除',
          handleClick: async () => {
            if (!id) return
            try {
              await toast.promise(
                pinOutMemo({
                  variables: {
                    id,
                  },
                }),
                {
                  success: '解除しました',
                  pending: '解除中',
                  error: {
                    render({ data }) {
                      //@ts-ignore
                      console.error(data.message)
                      return `エラーが発生しました`
                    },
                  },
                },
                {
                  autoClose: 3000,
                }
              )
            } catch (error) {
              console.error(error)
            }
          },
        },
        {
          name: 'キャンセル',
        },
      ]}
      isOpen={isOpen}
      closeModal={closeModal}
    />
  )
}

export default PinOutMemoModal
