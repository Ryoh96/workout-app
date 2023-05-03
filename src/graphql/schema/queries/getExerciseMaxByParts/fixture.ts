import type { GetExerciseMaxByPartsQuery } from '@/graphql/generated/operations-type'

export const exerciseMaxByParts: GetExerciseMaxByPartsQuery = {
  part: {
    exercises: [
      {
        name: 'ダンベルベンチプレス',
        maxWeight: 30,
        maxTotalLoad: 900,
      },
      {
        name: 'ダンベルフライ',
        maxWeight: 30,
        maxTotalLoad: 900,
      },
    ],
  },
}
