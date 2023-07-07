import { useRecoilValue } from 'recoil'

import { useCreateNoteMutation } from '@/graphql/generated/operations-csr'
import { currentDateState } from '@/recoil/currentDate'

export const useCreateNote = (
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>,
  onCompleted: () => void
) => {
  const [createNoteMutation] = useCreateNoteMutation({
    onCompleted: (result) => {
      onCompleted()
      setNoteId(result.createNote.id)
    },
  })
  const currentDate = useRecoilValue(currentDateState)

  const handleCreateNote = () =>
    createNoteMutation({
      variables: { date: currentDate.toISOString() },
    })
  return handleCreateNote
}
