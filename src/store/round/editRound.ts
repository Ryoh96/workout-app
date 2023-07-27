import create from 'zustand'

import type { Round } from '@/graphql/generated/operations-type'
import type { DeepPartial } from '@/types/utils'

type State = {
  editedRound: DeepPartial<Round> | null
  setEditRound: (payload: DeepPartial<Round> | null) => void
}

const useEditRoundStore = create<State>((set, _) => ({
  editedRound: null,
  setEditRound: (payload) => set({ editedRound: payload }),
}))

export default useEditRoundStore
