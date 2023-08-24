import { useCreateNoteMutation } from '@/graphql/generated/operations-csr'
import useCurrentDateStore from '@/store/date/currentDate'

export const useCreateNote = (
  setNoteId: (payload: string | null) => void,
  onCompleted: () => void
) => {
  const [createNoteMutation, { loading: createNoteLoading }] =
    useCreateNoteMutation({
      onCompleted: (result) => {
        onCompleted()
        setNoteId(result.createNote.id)
      },
    })
  const currentDate = useCurrentDateStore((state) => state.currentDate)

  const handleCreateNote = () =>
    createNoteMutation({
      variables: { date: currentDate.toISOString() },
    })
  return { handleCreateNote, createNoteLoading }
}
