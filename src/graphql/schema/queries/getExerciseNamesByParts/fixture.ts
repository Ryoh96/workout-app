import type { Part } from '@/graphql/generated/resolvers-types'

export const exerciseNamesByPartsArray: Part[] = [
  {
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
  {
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
]
