import type { GetRoundByTrainingQuery } from '@/graphql/generated/operations-type'

export const roundsByTraining: GetRoundByTrainingQuery = {
  training: {
    rounds: [
      {
        setCount: 1,
        weight: 30,
        repetition: 10,
        interval: 90,
        unit: 'KG',
        memo: {
          content: '曲げすぎない',
        },
      },
      {
        setCount: 2,
        weight: 30,
        repetition: 9,
        interval: 90,
        unit: 'KG',
      },
      {
        setCount: 3,
        weight: 25,
        repetition: 8,
        unit: 'KG',
        memo: {
          content: '伸ばしすぎない',
        },
      },
    ],
  },
}
