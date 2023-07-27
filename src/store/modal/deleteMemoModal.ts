import create from 'zustand'

type State = {
  isOpen: boolean
  setIsOpen: (payload: boolean) => void
}

const useDeleteMemoModalStore = create<State>((set, _) => ({
  isOpen: false,
  setIsOpen: (payload) => set({ isOpen: payload }),
}))

export default useDeleteMemoModalStore
