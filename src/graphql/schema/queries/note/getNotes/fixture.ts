import type { GetNotesQuery } from '@/graphql/generated/operations-type'

export const notesByDate: GetNotesQuery = {
  notes: [
    {
      trainings: [
        {
          createdAt: '2023-01-02:10:10:10',
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
              id: 'hoge',
              weight: 30,
              repetition: 10,
              interval: 90,
              unit: 'KG',
            },
            {
              id: 'piyo',
              weight: 30,
              repetition: 9,
              interval: 90,
              unit: 'KG',
            },
            {
              id: 'fuga',
              weight: 25,
              repetition: 8,
              unit: 'KG',
            },
          ],
        },
        {
          createdAt: '2023-01-02:10:10:10',
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
              id: 'hoge',
              weight: 30,
              repetition: 10,
              interval: 90,
              unit: 'KG',
            },
            {
              id: 'piyo',
              weight: 30,
              repetition: 9,
              interval: 90,
              unit: 'KG',
            },
            {
              id: 'fuga',
              weight: 25,
              repetition: 8,
              unit: 'KG',
            },
          ],
        },
      ],
      createdAt: '2023-01-01:10:10:10',
    },
    {
      trainings: [
        {
          createdAt: '2023-01-02:10:10:10',
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
              id: 'hoge',
              weight: 30,
              repetition: 10,
              interval: 90,
              unit: 'KG',
            },
            {
              id: 'piyo',
              weight: 30,
              repetition: 9,
              interval: 90,
              unit: 'KG',
            },
            {
              id: 'fuga',
              weight: 25,
              repetition: 8,
              unit: 'KG',
            },
          ],
        },
        {
          createdAt: '2023-01-02:10:10:10',
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
              id: 'hoge',
              weight: 30,
              repetition: 10,
              interval: 90,
              unit: 'KG',
            },
            {
              id: 'piyo',
              weight: 30,
              repetition: 9,
              interval: 90,
              unit: 'KG',
            },
            {
              id: 'fuga',
              weight: 25,
              repetition: 8,
              unit: 'KG',
            },
          ],
        },
      ],
      createdAt: '2023-01-02:10:10:10',
    },
  ],
}
