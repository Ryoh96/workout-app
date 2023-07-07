import type { ReactNode } from 'react'

import type { Round } from '@/graphql/generated/resolvers-types'
import type { DeepPartial } from '@/types/utils'

type Rounds = DeepPartial<Round>[]
const makeRoundsSummary = (
  rounds: Rounds
): { heading: string; content: ReactNode; others?: string }[] => {
  return rounds.map((round, index) => ({
    heading: `${index + 1}set`,
    content: (
      <p>
        <span>
          <span className="font-bold mr-1">{round.weight ?? '--'}</span>
          <span className="text-sm">
            {round.unit?.toLocaleLowerCase() ?? 'kg'}
          </span>
        </span>
        <span className="mx-1">&times;</span>
        <span>
          <span className="font-bold mr-1">{round.repetition ?? '--'}</span>
          <span className="text-sm">reps</span>
        </span>
        <span className="ml-1">
          <span className="mr-1 text-sm">(I-V:</span>
          <span className="font-bold">
            {round.interval
              ? `${Math.floor(round.interval / 60)}:` +
                `${round.interval % 60}`.padStart(2, '0')
              : '--'}
          </span>
          )
        </span>
      </p>
    ),
    others: round.memo?.content,
  }))
}

export default makeRoundsSummary
