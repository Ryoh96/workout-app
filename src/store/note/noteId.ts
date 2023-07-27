import create from 'zustand'

type State = {
  noteId: string | null
  setNoteId: (payload: string | null) => void
}

const useNoteIdStore = create<State>((set, _) => ({
  noteId: null,
  setNoteId: (payload) => set({ noteId: payload }),
}))

export default useNoteIdStore
