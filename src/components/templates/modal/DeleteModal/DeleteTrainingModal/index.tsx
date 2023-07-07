import { useRecoilState } from 'recoil'

import { useRemoveTrainingMutation } from '@/graphql/generated/operations-csr'
import { deleteTrainingModalState } from '@/recoil/Modal/DeleteTrainingModal'
import { deleteTrainingIdState } from '@/recoil/Training/deleteTrainingId'

import DeleteModal from '..'

type Props = {
  onDeleteCompleted: () => void
}

export const DeleteTrainingModal = ({ onDeleteCompleted }: Props) => {
  const [removeTrainingMutation] = useRemoveTrainingMutation({
    onCompleted: onDeleteCompleted,
  })
  const [isOpen, setIsOpen] = useRecoilState(deleteTrainingModalState)
  const [deleteId, setDeleteId] = useRecoilState(deleteTrainingIdState)
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
