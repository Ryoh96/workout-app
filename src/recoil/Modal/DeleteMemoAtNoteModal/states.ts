import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const deleteMemoAtNoteModalState = atom({
  key: recoilKeyHashSet.deleteMemoAtNoteModal,
  default: false,
})
