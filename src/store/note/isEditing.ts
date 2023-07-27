import create from 'zustand'

type State = {
  isEditing: boolean
  setIsEditing: (payload: boolean) => void
}

const useIsEditingStore = create<State>((set, _) => ({
  isEditing: false,
  setIsEditing: (payload) => set({ isEditing: payload }),
}))

export default useIsEditingStore
