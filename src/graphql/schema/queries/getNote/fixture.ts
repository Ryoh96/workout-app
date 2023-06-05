import type { GetNoteQuery } from '@/graphql/generated/operations-type'

export const note: GetNoteQuery = {
  note: {
    id: 'hoge',
    trainings: [
      {
        createdAt: '2023-01-02:10:10:10',
        id: 'hoge',
        exercise: {
          id: 'hoge',
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
        id: 'hoge',
        exercise: {
          id: 'hoge',
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
    place: {
      name: '自宅',
    },
    createdAt: '2023-01-01:10:10:10',
  },
}
