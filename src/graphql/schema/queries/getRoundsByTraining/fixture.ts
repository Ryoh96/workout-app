import type { Training } from '@/graphql/generated/resolvers-types'

export const roundsByTraining: Training = {
  rounds: [
    {
      setCount: 1,
      weight: 30,
      repetition: 10,
      interval: 90,
      memo: {
        content: '曲げすぎない',
      },
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
        content: '伸ばしすぎない',
      },
    },
  ],
}
