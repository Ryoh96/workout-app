import { useRemoveTrainingMutation } from '@/graphql/generated/operations-csr'
import useDeleteTrainingModalStore from '@/store/modal/deleteTrainingModal'
import useDeleteTrainingIdStore from '@/store/training/deleteTrainingId'

import DeleteModal from '..'

type Props = {
  onDeleteCompleted: () => void
}

export const DeleteTrainingModal = ({ onDeleteCompleted }: Props) => {
  const [removeTrainingMutation] = useRemoveTrainingMutation({
    onCompleted: onDeleteCompleted,
  })
  const { isOpen, setIsOpen } = useDeleteTrainingModalStore((state) => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen,
  }))

  const { deleteId, setDeleteId } = useDeleteTrainingIdStore((state) => ({
    deleteId: state.deleteId,
    setDeleteId: state.setDeleteId,
  }))
  return (
    <>
      {deleteId && (
        <DeleteModal
          title="トレーニング"
          deleteMutation={async () =>
            await removeTrainingMutation({
              variables: { id: deleteId },
            })
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
