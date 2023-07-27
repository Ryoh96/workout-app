import create from 'zustand'

type State = {
  currentDate: Date
  setCurrentDate: (payload: Date) => void
}

const useCurrentDateStore = create<State>((set, _) => ({
  currentDate: new Date(),
  setCurrentDate: (payload) => set({ currentDate: payload }),
}))

export default useCurrentDateStore
