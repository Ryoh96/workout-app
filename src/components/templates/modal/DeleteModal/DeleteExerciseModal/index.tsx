import { useDeleteExerciseMutation } from '@/graphql/generated/operations-csr'
import useDeleteExerciseModalStore from '@/store/modal/deleteExerciseModal'

import DeleteModal from '..'

type Props = {
  onCompleted: () => void
  deleteId: string
  deleteName: string
}

const DeleteExerciseModal = ({ onCompleted, deleteId, deleteName }: Props) => {
  const [deleteExercise] = useDeleteExerciseMutation({
    onCompleted,
  })

  const { isOpen, setIsOpen } = useDeleteExerciseModalStore((state) => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen,
  }))
  return (
    <DeleteModal
      title={deleteName}
      deleteMutation={async () =>
        await deleteExercise({
          variables: { id: deleteId },
        })
      }
      closeModal={() => setIsOpen(false)}
      isOpen={isOpen}
      deleteId={deleteId}
    />
  )
}

export default DeleteExerciseModal
