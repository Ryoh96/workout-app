import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const deleteTrainingModalState = atom({
  key: recoilKeyHashSet.deleteTrainingModal,
  default: false,
})
