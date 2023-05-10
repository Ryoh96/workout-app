import type { GetExerciseMaxByPartsQuery } from '@/graphql/generated/operations-type'

export const exerciseMaxByParts: GetExerciseMaxByPartsQuery = {
  part: {
    exercises: [
      {
        name: 'ダンベルベンチプレス',
        maxWeight: 30,
        maxTotalLoad: 900,
        maxWeightUnit: 'KG',
      },
      {
        name: 'ダンベルフライ',
        maxWeight: 30,
        maxTotalLoad: 900,
        maxWeightUnit: 'KG',
      },
      {
        name: 'ディップス',
        maxWeight: 10,
        maxTotalLoad: 900,
        maxWeightUnit: 'KG',
      },
      {
        name: 'インクラインダンベルベンチプレス',
        maxWeight: 30,
        maxTotalLoad: 900,
        maxWeightUnit: 'KG',
      },
    ],
  },
}
