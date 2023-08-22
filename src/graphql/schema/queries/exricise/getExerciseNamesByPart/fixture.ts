import type { GetExerciseNamesByPartQuery } from '@/graphql/generated/operations-type'

export const exerciseNamesByParts: GetExerciseNamesByPartQuery[] = [
  {
    part: {
      name: '胸',
      exercises: [
        {
          id: '2effca2f-70e8-44e4-8686-9855869e6132',
          name: 'ダンベルプレス',
        },
        {
          id: 'b7a83c50-55cf-4541-adb8-b41109f84743',
          name: 'ダンベルフライ',
        },
        {
          id: 'e0bfe133-edb9-46f4-b9c5-2ccf892275c5',
          name: 'インクラインダンベルプレス',
        },
        {
          id: '3369ee06-4a5b-4c38-81a2-57b53bcf67d1',
          name: 'hoge',
        },
      ],
    },
  },
]

export const noData: GetExerciseNamesByPartQuery[] = [
  {
    part: {
      name: '胸',
      exercises: [],
    },
  },
]
