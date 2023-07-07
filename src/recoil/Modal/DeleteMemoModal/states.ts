import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const deleteMemoModalState = atom({
  key: recoilKeyHashSet.deleteMemoModal,
  default: false,
})
