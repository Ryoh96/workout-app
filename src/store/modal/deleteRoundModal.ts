import create from 'zustand'

type State = {
  isOpen: boolean
  setIsOpen: (payload: boolean) => void
}

const useDeleteRoundModalStore = create<State>((set, _) => ({
  isOpen: false,
  setIsOpen: (payload) => set({ isOpen: payload }),
}))

export default useDeleteRoundModalStore
