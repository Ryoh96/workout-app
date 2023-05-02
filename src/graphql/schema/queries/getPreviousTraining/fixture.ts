import type { Training } from '@/graphql/generated/resolvers-types'

export const previousTraining: Training = {
  rounds: [
    {
      setCount: 1,
      weight: 28,
      repetition: 12,
      interval: 90,
    },
    {
      setCount: 2,
      weight: 25,
      repetition: 10,
      interval: 90,
    },
    {
      setCount: 3,
      weight: 20,
      repetition: 10,
    },
  ],
}
