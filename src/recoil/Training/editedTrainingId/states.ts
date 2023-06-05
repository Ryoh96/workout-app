import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const editedTrainingIdState = atom<string | null>({
  key: recoilKeyHashSet.editedTrainingId,
  default: null,
})
