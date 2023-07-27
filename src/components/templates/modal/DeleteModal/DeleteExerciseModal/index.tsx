import { useDeleteExerciseMutation } from '@/graphql/generated/operations-csr'
import useDeleteExerciseModalStore from '@/store/modal/deleteExerciseModal'

import DeleteModal from '..'

type Props = {
  onCompleted: () => void
  deleteId: string
}

const DeleteExerciseModal = ({ onCompleted, deleteId }: Props) => {
  const [deleteExercise] = useDeleteExerciseMutation({
    onCompleted,
  })

  const { isOpen, setIsOpen } = useDeleteExerciseModalStore((state) => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen,
  }))
  return (
    <DeleteModal
      title="種目"
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
