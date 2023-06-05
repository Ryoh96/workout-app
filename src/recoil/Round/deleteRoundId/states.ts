import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const deleteRoundIdState = atom<string | null>({
  key: recoilKeyHashSet.deleteRoundId,
  default: null,
})
