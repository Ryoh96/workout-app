import create from 'zustand'

type State = {
  isOpen: boolean
  setIsOpen: (payload: boolean) => void
}

const useDeleteNoteModalStore = create<State>((set, _) => ({
  isOpen: false,
  setIsOpen: (payload) => set({ isOpen: payload }),
}))

export default useDeleteNoteModalStore
