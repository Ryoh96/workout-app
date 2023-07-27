import { useDeleteMemoAtNoteMutation } from '@/graphql/generated/operations-csr'
import useDeleteMemoAtModalStore from '@/store/modal/deleteMemoAtNoteModal'

import DeleteModal from '..'

type Props = {
  onDeleteCompleted: () => void
  index: number
  id: string
}

export const DeleteMemoAtNoteModal = ({
  onDeleteCompleted,
  index,
  id,
}: Props) => {
  const [removeRoundMutation] = useDeleteMemoAtNoteMutation({
    onCompleted: onDeleteCompleted,
  })
  const { isOpen, setIsOpen } = useDeleteMemoAtModalStore((state) => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen,
  }))

  return (
    <DeleteModal
      title="メモ"
      deleteMutation={async () =>
        await removeRoundMutation({ variables: { id, index } })
      }
      closeModal={() => setIsOpen(false)}
      isOpen={isOpen}
      deleteId={index}
    />
  )
}
