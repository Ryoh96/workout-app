import type { Maybe } from 'graphql/jsutils/Maybe'

import type { Memo, Round } from '@/graphql/generated/resolvers-types'
import type { DeepPartial } from '@/types/utils'

type Rounds = DeepPartial<Round>[]
const makeRoundsSummary = (
  rounds: Rounds
): { set: string; summary: string; memo?: string }[] => {
  return rounds.map((round) => ({
    set: `${round.setCount}set`,
    summary: `${round.weight}${round.unit!.toLocaleLowerCase()} × ${
      round.repetition
    }reps (I-V: ${round.interval ?? '--'}sec)`,
    memo: round.memo?.content,
  }))
}

export default makeRoundsSummary
