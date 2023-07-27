import { toast } from 'react-toastify'

import { useDeleteNoteMutation } from '@/graphql/generated/operations-csr'
import useDeleteNoteModalStore from '@/store/modal/deleteNoteModal'
import useNoteIdStore from '@/store/note/noteId'
import { ManipulationError } from '@/utils/errors'

import DeleteModal from '..'

type Props = {
  onDeleteCompleted?: () => void
}

export const DeleteNoteModal = ({ onDeleteCompleted }: Props) => {
  const [deleteNoteMutation] = useDeleteNoteMutation({
    onCompleted: onDeleteCompleted,
  })
  const { isOpen, setIsOpen } = useDeleteNoteModalStore((state) => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen,
  }))
  const { noteId: id, setNoteId: setId } = useNoteIdStore((state) => ({
    noteId: state.noteId,
    setNoteId: state.setNoteId,
  }))

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
