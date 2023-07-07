import { useRecoilState } from 'recoil'

import { useRemoveRoundMutation } from '@/graphql/generated/operations-csr'
import { deleteRoundModalState } from '@/recoil/Modal/DeleteRoundModal'
import { deleteRoundIdState } from '@/recoil/Round/deleteRoundId'

import DeleteModal from '..'

type Props = {
  onDeleteCompleted: () => void
}

export const DeleteRoundModal = ({ onDeleteCompleted }: Props) => {
  const [removeRoundMutation] = useRemoveRoundMutation({
    onCompleted: onDeleteCompleted,
  })
  const [isOpen, setIsOpen] = useRecoilState(deleteRoundModalState)
  const [deleteId, setDeleteId] = useRecoilState(deleteRoundIdState)

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
