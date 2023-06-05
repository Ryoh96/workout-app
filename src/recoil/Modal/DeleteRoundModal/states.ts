import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const deleteRoundModalState = atom({
  key: recoilKeyHashSet.deleteRoundModal,
  default: false,
})
