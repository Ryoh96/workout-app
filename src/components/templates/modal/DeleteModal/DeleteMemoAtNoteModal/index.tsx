import { useRecoilState } from 'recoil'

import { useDeleteMemoAtNoteMutation } from '@/graphql/generated/operations-csr'
import { deleteMemoAtNoteModalState } from '@/recoil/Modal/DeleteMemoAtNoteModal'

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
  const [isOpen, setIsOpen] = useRecoilState(deleteMemoAtNoteModalState)

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
