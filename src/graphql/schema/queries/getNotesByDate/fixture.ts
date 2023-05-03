import type { GetNotesByDateQuery } from '@/graphql/generated/operations-type'

export const notesByDate: GetNotesByDateQuery = {
  notes: [
    {
      trainings: [
        {
          exercise: {
            name: 'ダンベルベンチプレス',
            parts: [
              {
                name: '胸',
              },
            ],
          },
          rounds: [
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
            },
          ],
        },
        {
          exercise: {
            name: 'ダンベルフライ',
            parts: [
              {
                name: '胸',
              },
            ],
          },
          rounds: [
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
              interval: 90,
            },
          ],
        },
      ],
      createdAt: '2023-01-01:10:10:10',
    },
    {
      trainings: [
        {
          exercise: {
            name: 'ダンベルカール',
            parts: [
              {
                name: '二頭',
              },
            ],
          },
          rounds: [
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
              interval: 90,
            },
          ],
        },
        {
          exercise: {
            name: 'スカルクラッシャー',
            parts: [
              {
                name: '三等',
              },
            ],
          },
          rounds: [
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
          ],
        },
      ],
      createdAt: '2023-01-02:10:10:10',
    },
  ],
}
