import type { GetExerciseQuery } from '@/graphql/generated/operations-type'

export const exercise: GetExerciseQuery = {
  exercise: {
    name: 'ダンベルベンチプレス',
    parts: [
      {
        name: '胸',
      },
    ],
    trainings: [
      {
        createdAt: '2023-01-01:10:10:10',
        rounds: [
          {
            setCount: 1,
            weight: 30,
            repetition: 10,
            interval: 90,
            unit: 'KG',
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
            interval: 90,
            unit: 'KG',
          },
        ],
      },
      {
        createdAt: '2023-02-01:10:10:10',
        rounds: [
          {
            setCount: 1,
            weight: 30,
            repetition: 10,
            interval: 90,
            unit: 'KG',
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
            interval: 90,
            unit: 'KG',
          },
        ],
      },
    ],
    movieUrl: ['https://example.com'],
    articleUrl: ['https://example.com'],
    memos: [
      {
        content: '対象筋を意識',
        round: {
          setCount: 1,
          createdAt: '2023-01-01:10:10:10',
        },
      },
      {
        content: '対象筋を意識',
        round: {
          setCount: 1,
          createdAt: '2023-01-01:10:10:10',
        },
      },
      {
        content: '対象筋を意識',
        round: {
          setCount: 1,
          createdAt: '2023-01-01:10:10:10',
        },
      },
    ],
    maxWeight: 30,
    maxTotalLoad: 1000,
  },
}
