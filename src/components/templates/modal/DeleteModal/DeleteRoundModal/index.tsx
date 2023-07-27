import { useRemoveRoundMutation } from '@/graphql/generated/operations-csr'
import useDeleteRoundModalStore from '@/store/modal/deleteRoundModal'
import useDeleteRoundIdStore from '@/store/round/deleteRoundId'

import DeleteModal from '..'

type Props = {
  onDeleteCompleted: () => void
}

export const DeleteRoundModal = ({ onDeleteCompleted }: Props) => {
  const [removeRoundMutation] = useRemoveRoundMutation({
    onCompleted: onDeleteCompleted,
  })
  const { isOpen, setIsOpen } = useDeleteRoundModalStore((state) => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen,
  }))
  const { deleteId, setDeleteId } = useDeleteRoundIdStore((state) => ({
    deleteId: state.deleteId,
    setDeleteId: state.setDeleteId,
  }))

  return (
    <>
      {deleteId && (
        <DeleteModal
          title="セット"
          deleteMutation={async () =>
            await removeRoundMutation({ variables: { id: deleteId } })
          }
          closeModal={() => setIsOpen(false)}
          isOpen={isOpen}
          deleteId={deleteId}
          setDeleteId={setDeleteId}
        />
      )}
    </>
  )
}
