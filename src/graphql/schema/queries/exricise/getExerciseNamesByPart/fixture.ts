import type { GetExerciseNamesByPartQuery } from '@/graphql/generated/operations-type'

export const exerciseNamesByPartsArray: GetExerciseNamesByPartQuery[] = [
  {
    part: {
      name: '胸',
      exercises: [
        {
          name: 'ダンベルベンチプレス',
        },
        {
          name: 'ダンベルフライ',
        },
        {
          name: 'ディップス',
        },
      ],
    },
  },
  {
    part: {
      name: '腕',
      exercises: [
        {
          name: 'アームカール',
        },
        {
          name: 'スカルクラッシャー',
        },
      ],
    },
  },
]
