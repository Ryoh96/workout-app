import type { GetNoteQuery } from '@/graphql/generated/operations-type'

export const note: GetNoteQuery = {
  note: {
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
            memo: {
              content: '腰を上げてデクライン気味にする。肩甲骨を寄せる。',
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
            interval: 90,
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
