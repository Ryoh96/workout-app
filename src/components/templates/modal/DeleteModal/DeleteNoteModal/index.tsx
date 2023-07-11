import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue } from 'recoil'

import { useDeleteNoteMutation } from '@/graphql/generated/operations-csr'
import { deleteNoteModalState } from '@/recoil/Modal/DeleteNoteModal'
import { noteIdState } from '@/recoil/Note/noteId'
import { ManipulationError } from '@/utils/errors'

import DeleteModal from '..'

type Props = {
  onDeleteCompleted?: () => void
}

export const DeleteNoteModal = ({ onDeleteCompleted }: Props) => {
  const [deleteNoteMutation] = useDeleteNoteMutation({
    onCompleted: onDeleteCompleted,
  })
  const [isOpen, setIsOpen] = useRecoilState(deleteNoteModalState)
  const [id, setId] = useRecoilState(noteIdState)

  return (
    <DeleteModal
      title="ノート"
      deleteMutation={async () => {
        if (!id) throw new ManipulationError('ノートがありません')
        try {
          await deleteNoteMutation({ variables: { id } })
        } catch (error) {
          if (error instanceof ManipulationError) toast.error(error.message)
        } finally {
          setId(null)
        }
      }}
      closeModal={() => setIsOpen(false)}
      isOpen={isOpen}
      deleteId={id}
    />
  )
}
