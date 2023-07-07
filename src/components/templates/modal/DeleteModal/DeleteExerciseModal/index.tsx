import { useRecoilState } from 'recoil'

import { useDeleteExerciseMutation } from '@/graphql/generated/operations-csr'
import { deleteExerciseModalState } from '@/recoil/Modal/DeleteExerciseModal'

import DeleteModal from '..'

type Props = {
  onCompleted: () => void
  deleteId: string
}

const DeleteExerciseModal = ({ onCompleted, deleteId }: Props) => {
  const [deleteExercise] = useDeleteExerciseMutation({
    onCompleted,
  })

  const [isOpen, setIsOpen] = useRecoilState(deleteExerciseModalState)
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
