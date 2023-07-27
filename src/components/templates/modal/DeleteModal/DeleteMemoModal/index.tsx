import { useDeleteMemoMutation } from '@/graphql/generated/operations-csr'

import DeleteModal from '..'

type Props = {
  onDeleteCompleted: () => void
  memoId: string | null
  setMemoId: React.Dispatch<React.SetStateAction<string | null>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteMemoModal = ({
  onDeleteCompleted,
  memoId,
  setMemoId,
  isOpen,
  setIsOpen,
}: Props) => {
  const [deleteMemoMutation] = useDeleteMemoMutation({
    onCompleted: onDeleteCompleted,
  })

  return (
    <DeleteModal
      title="メモ"
      deleteMutation={async () =>
        await deleteMemoMutation({ variables: { id: memoId ?? '' } })
      }
      closeModal={() => setIsOpen(false)}
      isOpen={isOpen}
      deleteId={memoId}
      setDeleteId={setMemoId}
      handleCancel={() => setMemoId(null)}
    />
  )
}
