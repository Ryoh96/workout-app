import type { GetNoteQuery } from '@/graphql/generated/operations-type'

export const note: GetNoteQuery = {
  note: {
    id: 'hoge',
    trainings: [
      {
        id: 'fuga',
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
            unit: 'KG',
          },
        ],
      },
      {
        id: 'piyo',
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
            unit: 'KG',
            memo: {
              content: '腰を上げてデクライン気味にする。肩甲骨を寄せる。',
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
            interval: 90,
            unit: 'KG',
            memo: {
              content: '腰に負担がかからないように気をつける',
            },
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
