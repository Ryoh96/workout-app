import type { Maybe } from 'graphql/jsutils/Maybe'

import type { Memo, Round } from '@/graphql/generated/resolvers-types'

type Rounds = (Omit<Round, 'createdAt' | 'id' | 'training' | 'memo'> & {
  memo?: Maybe<Partial<Memo>>
})[]

const makeRoundsSummary = (
  rounds: Rounds
): { set: string; summary: string; memo?: string }[] => {
  return rounds.map((round) => ({
    set: `${round.setCount}set`,
    summary: `${round.weight}kg × ${round.repetition}reps (I-V: ${
      round.interval ?? '--'
    }sec)`,
    memo: round.memo?.content,
  }))
}

export default makeRoundsSummary
