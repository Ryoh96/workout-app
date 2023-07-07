import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const deleteNoteModalState = atom({
  key: recoilKeyHashSet.deleteNoteModal,
  default: false,
})
