import create from 'zustand'

type State = {
  deleteId: string | null
  setDeleteId: (payload: string | null) => void
}

const useDeleteRoundIdStore = create<State>((set, _) => ({
  deleteId: null,
  setDeleteId: (payload) => set({ deleteId: payload }),
}))

export default useDeleteRoundIdStore
