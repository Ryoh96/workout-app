import type { Round } from '@/graphql/generated/resolvers-types'
import type { DeepPartial } from '@/types/utils'

import makeRoundsSummary from './makeRoundsSummary'

describe('makeRoundsSummary', () => {
  test('should get the desired value', () => {
    const rounds: DeepPartial<Round>[] = [
      {
        weight: 30,
        repetition: 10,
        interval: 90,
        unit: 'KG',
      },
      {
        weight: 30,
        repetition: 9,
        interval: 90,
        unit: 'LB',
      },
      {
        weight: 25,
        repetition: 8,
        unit: 'KG',
        memo: {
          content: 'content',
        },
      },
    ]

    const results = makeRoundsSummary(rounds)
    expect(results[0]).toEqual({
      set: '1set',
      summary: '30kg × 10reps (I-V: 90sec)',
    })
    expect(results[1]).toEqual({
      set: '2set',
      summary: '30lb × 9reps (I-V: 90sec)',
    })
    expect(results[2]).toEqual({
      set: '3set',
      summary: '25kg × 8reps (I-V: --sec)',
      memo: 'content',
    })
  })
})
