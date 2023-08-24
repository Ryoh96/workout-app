import { toast } from 'react-toastify'

import { useGetNoteQuery } from '@/graphql/generated/operations-csr'
import { ManipulationError } from '@/utils/errors'

export const useGetNote = (
  date: Date,
  setNoteId: (payload: string | null) => void
) => {
  const {
    data: noteData,
    loading: noteDataLoading,
    refetch,
  } = useGetNoteQuery({
    variables: {
      date: new Date(date).toISOString(),
    },
    onCompleted: (data) => {
      setNoteId(data.note?.id ?? null)
    },
    onError: (error) => {
      if (error instanceof ManipulationError) {
        toast.error(error.message)
        return
      }
      console.error(error)
    },
  })

  return [noteData, noteDataLoading, refetch] as const
}
