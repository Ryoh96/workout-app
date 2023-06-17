import type { GetAllExercisesMaxQuery } from '@/graphql/generated/operations-type'

export const allExercisesMax: GetAllExercisesMaxQuery = {
  exercises: [
    {
      id: 'hoge',
      name: 'ダンベルベンチプレス',
      maxWeight: 30,
      maxTotalLoad: 900,
      maxWeightUnit: 'KG',
      updatedAt: '2022-05-01',
    },
    {
      id: 'fuga',
      name: 'ダンベルフライ',
      maxWeight: 30,
      maxTotalLoad: 900,
      maxWeightUnit: 'KG',
      updatedAt: '2022-06-01',
    },
    {
      id: 'piyo',
      name: 'ディップス',
      maxWeight: 10,
      maxTotalLoad: 900,
      maxWeightUnit: 'KG',
      updatedAt: '2022-06-01',
    },
    {
      id: 'foo',
      name: 'インクラインダンベルベンチプレス',
      maxWeight: 30,
      maxTotalLoad: 900,
      maxWeightUnit: 'KG',
      updatedAt: '2022-06-01',
    },
    {
      id: 'bar',
      name: 'アームカール',
      maxWeight: 30,
      maxTotalLoad: 900,
      maxWeightUnit: 'KG',
      updatedAt: '2022-06-01',
    },
    {
      id: 'poo',
      name: 'チンニング',
      maxWeight: 30,
      maxTotalLoad: 900,
      maxWeightUnit: 'KG',
      updatedAt: '2022-06-01',
    },
  ],
}
