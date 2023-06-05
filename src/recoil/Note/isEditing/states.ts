import { atom } from 'recoil'

import { recoilKeyHashSet } from '../../recoilKeys'

export const isEditingState = atom({
  key: recoilKeyHashSet.isEditing,
  default: false,
})
