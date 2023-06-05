import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const editRoundModalState = atom({
  key: recoilKeyHashSet.editRoundModal,
  default: false,
})
