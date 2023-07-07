import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const deleteExerciseModalState = atom({
  key: recoilKeyHashSet.deleteExerciseModal,
  default: false,
})
