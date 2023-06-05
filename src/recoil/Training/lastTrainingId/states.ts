import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const lastTrainingIdState = atom<string | null>({
  key: recoilKeyHashSet.lastTrainingId,
  default: null,
})
