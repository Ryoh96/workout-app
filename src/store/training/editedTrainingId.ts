import create from 'zustand'

type State = {
  editedTrainingId: string | null
  setEditedTrainingId: (payload: string | null) => void
}

const useEditedTrainingIdStore = create<State>((set, _) => ({
  editedTrainingId: null,
  setEditedTrainingId: (payload) => set({ editedTrainingId: payload }),
}))

export default useEditedTrainingIdStore
