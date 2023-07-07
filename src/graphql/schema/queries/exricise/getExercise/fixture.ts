import type { GetExerciseQuery } from '@/graphql/generated/operations-type'

export const exercise: GetExerciseQuery = {
  exercise: {
    __typename: 'Exercise',
    name: 'ダンベルプレス',
    parts: [
      {
        __typename: 'Part',
        id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
        name: '胸',
      },
    ],
    trainings: [
      {
        __typename: 'Training',
        rounds: [
          {
            __typename: 'Round',
            id: 'd0420777-dfd0-40a4-a34e-99555e437595',
            weight: 20,
            repetition: 10,
            interval: 90,
            unit: 'KG',
          },
          {
            __typename: 'Round',
            id: '1f3c0220-a7e6-42db-beb9-aef2ab04c71d',
            weight: 20,
            repetition: 9,
            interval: 90,
            unit: 'KG',
          },
          {
            __typename: 'Round',
            id: 'e9a483d9-3746-4399-a70c-6745079861e0',
            weight: 20,
            repetition: 8,
            interval: 90,
            unit: 'KG',
          },
        ],
        createdAt: '2023-06-24T15:42:36.604Z',
      },
      {
        __typename: 'Training',
        rounds: [
          {
            __typename: 'Round',
            id: 'a1257bd5-cbd5-40c1-a847-ad2d71056679',
            weight: 25,
            repetition: 12,
            interval: 90,
            unit: 'KG',
          },
          {
            __typename: 'Round',
            id: '45c617b8-fc83-4172-b1a5-460b7936c305',
            weight: 24,
            repetition: 10,
            interval: 90,
            unit: 'KG',
          },
          {
            __typename: 'Round',
            id: '19df48be-643c-47ad-ae18-b3b8737ed33c',
            weight: 23,
            repetition: 9,
            interval: 90,
            unit: 'KG',
          },
        ],
        createdAt: '2023-06-24T15:47:55.539Z',
      },
      {
        __typename: 'Training',
        rounds: [
          {
            __typename: 'Round',
            id: '64bee2cd-5e12-4ff7-91e3-278f507ddc89',
            weight: 28,
            repetition: 12,
            interval: 90,
            unit: 'KG',
          },
          {
            __typename: 'Round',
            id: '5bc037c8-66a1-4cd8-ba76-53aff3d978db',
            weight: 28,
            repetition: 12,
            interval: 90,
            unit: 'KG',
          },
          {
            __typename: 'Round',
            id: 'aac838fe-77a4-43ec-be4c-4091736624d9',
            weight: 23,
            repetition: 10,
            interval: 90,
            unit: 'KG',
          },
        ],
        createdAt: '2023-06-24T16:52:52.262Z',
      },
      {
        __typename: 'Training',
        rounds: [
          {
            __typename: 'Round',
            id: '7fb57637-06c8-4b12-925f-774e90c1dce5',
            weight: 24,
            repetition: 12,
            interval: 90,
            unit: 'KG',
          },
          {
            __typename: 'Round',
            id: '2159cc7d-36a7-4b25-8e45-dbc390b6dd5a',
            weight: 22,
            repetition: 10,
            interval: 90,
            unit: 'KG',
          },
          {
            __typename: 'Round',
            id: '4c84bb83-6e8f-4636-9d36-b2b82a99d643',
            weight: 20,
            repetition: 9,
            interval: 90,
            unit: 'KG',
          },
        ],
        createdAt: '2023-07-02T08:48:32.377Z',
      },
    ],
    movieUrl: [],
    articleUrl: [],
    memos: [
      {
        __typename: 'Memo',
        content: 'テスト',
        round: {
          __typename: 'Round',
          createdAt: '2023-06-24T15:43:02.152Z',
        },
      },
      {
        __typename: 'Memo',
        content: 'うさぎさん',
        round: {
          __typename: 'Round',
          createdAt: '2023-06-24T15:48:14.769Z',
        },
      },
    ],
  },
}
