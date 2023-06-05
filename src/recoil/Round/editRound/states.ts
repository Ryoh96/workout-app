import { atom } from 'recoil'

import type { Round } from '@/graphql/generated/operations-type'
import type { DeepPartial } from '@/types/utils'

import { recoilKeyHashSet } from '../../recoilKeys'

export const editRoundState = atom<DeepPartial<Round> | null>({
  key: recoilKeyHashSet.editRound,
  default: null,
})
