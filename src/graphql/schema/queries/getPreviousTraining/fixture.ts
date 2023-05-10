import type { GetPreviousTrainingQuery } from '@/graphql/generated/operations-type'

export const previousTraining: GetPreviousTrainingQuery = {
  training: {
    rounds: [
      {
        setCount: 1,
        weight: 28,
        repetition: 12,
        interval: 90,
        unit: 'KG',
      },
      {
        setCount: 2,
        weight: 25,
        repetition: 10,
        interval: 90,
        unit: 'KG',
      },
      {
        setCount: 3,
        weight: 20,
        repetition: 10,
        unit: 'KG',
      },
    ],
  },
}
