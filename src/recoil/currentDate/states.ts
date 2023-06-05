import { atom } from 'recoil'

import { recoilKeyHashSet } from '../recoilKeys'

export const currentDateState = atom({
  key: recoilKeyHashSet.currentDate,
  default: new Date(),
})
