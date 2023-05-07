import type { Round } from '@/graphql/generated/resolvers-types'

type Rounds = Omit<Round, 'createdAt' | 'id' | 'training'>[]

const makeRoundsSummary = (
  rounds: Rounds
): [set: string, summary: string][] => {
  return rounds.map((round) => [
    `${round.setCount}set`,
    `${round.weight}kg × ${round.repetition}reps (I-V: ${
      round.interval ?? '--'
    }sec)`,
  ])
}

export default makeRoundsSummary
