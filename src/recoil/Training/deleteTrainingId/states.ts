import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const deleteTrainingIdState = atom<string | null>({
  key: recoilKeyHashSet.deleteTrainingId,
  default: null,
})
