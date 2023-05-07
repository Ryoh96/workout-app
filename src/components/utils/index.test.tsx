import makeRoundsSummary from './makeRoundsSummary'

describe('makeRoundsSummary', () => {
  test('should get the desired value', () => {
    const rounds = [
      {
        setCount: 1,
        weight: 30,
        repetition: 10,
        interval: 90,
      },
      {
        setCount: 2,
        weight: 30,
        repetition: 9,
        interval: 90,
      },
      {
        setCount: 3,
        weight: 25,
        repetition: 8,
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
    expect(results[2]).toEqual({
      set: '3set',
      summary: '25kg × 8reps (I-V: --sec)',
      memo: 'content',
    })
  })
})
