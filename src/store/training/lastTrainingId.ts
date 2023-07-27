import create from 'zustand'

type State = {
  lastTrainingId: string | null
  setLastTrainingId: (payload: string | null) => void
}

const useLastTrainingIdStore = create<State>((set, _) => ({
  lastTrainingId: null,
  setLastTrainingId: (payload) => set({ lastTrainingId: payload }),
}))

export default useLastTrainingIdStore
