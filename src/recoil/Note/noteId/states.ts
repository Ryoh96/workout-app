import { atom } from 'recoil'

import { recoilKeyHashSet } from '../recoilKeys'

export const noteIdState = atom<string | null>({
  key: recoilKeyHashSet.noteId,
  default: null,
})
