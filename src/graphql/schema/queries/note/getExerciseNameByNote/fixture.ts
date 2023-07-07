import type { GetExerciseNameByNoteQuery } from '@/graphql/generated/operations-csr'

export const exerciseNamesByNote: GetExerciseNameByNoteQuery = {
  notes: [
    {
      __typename: 'Note',
      trainings: [],
    },
    {
      __typename: 'Note',
      trainings: [
        {
          __typename: 'Training',
          id: 'a56a4bc3-6d9d-4467-bb20-6c27bb4293ce',
          exercise: {
            __typename: 'Exercise',
            name: 'hoge',
            id: '3369ee06-4a5b-4c38-81a2-57b53bcf67d1',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
                id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
              },
            ],
          },
        },
      ],
    },
    {
      __typename: 'Note',
      trainings: [
        {
          __typename: 'Training',
          id: '63776eb1-3cb0-43e2-bfe7-1e1c25ce2459',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルカール',
            id: '97c0890c-bb19-4b50-839f-0a81ffad3ed8',
            parts: [
              {
                __typename: 'Part',
                name: '二頭',
                id: 'ca0b7741-c846-47f4-a5d6-dc15ca6fb75e',
              },
            ],
          },
        },
      ],
    },
    {
      __typename: 'Note',
      trainings: [
        {
          __typename: 'Training',
          id: '98dbb853-10c6-48e9-bd63-51652a4f62e4',
          exercise: {
            __typename: 'Exercise',
            name: 'スクワット',
            id: '240b9cba-e9dd-4a9b-ad96-597676bd1b1d',
            parts: [
              {
                __typename: 'Part',
                name: '脚',
                id: '807efc89-02d2-4084-b32d-c5f5c03d1891',
              },
            ],
          },
        },
      ],
    },
    {
      __typename: 'Note',
      trainings: [
        {
          __typename: 'Training',
          id: '057ddc74-f54e-4af9-92e8-2d9984723588',
          exercise: {
            __typename: 'Exercise',
            name: 'hoge',
            id: '3369ee06-4a5b-4c38-81a2-57b53bcf67d1',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
                id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
              },
            ],
          },
        },
      ],
    },
    {
      __typename: 'Note',
      trainings: [
        {
          __typename: 'Training',
          id: '407d3d2f-10d4-4c15-8675-319784f3194a',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルプレス',
            id: '2effca2f-70e8-44e4-8686-9855869e6132',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
                id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
              },
            ],
          },
        },
        {
          __typename: 'Training',
          id: '1f838054-50c5-4e36-a95b-a072290761aa',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルフライ',
            id: 'b7a83c50-55cf-4541-adb8-b41109f84743',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
                id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
              },
            ],
          },
        },
      ],
    },
    {
      __typename: 'Note',
      trainings: [
        {
          __typename: 'Training',
          id: 'a8141157-9abd-416a-b0f4-79b04e5a4be3',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルフライ',
            id: 'b7a83c50-55cf-4541-adb8-b41109f84743',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
                id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
              },
            ],
          },
        },
        {
          __typename: 'Training',
          id: '1d5b6869-510a-4110-badc-7caece15c884',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルプレス',
            id: '2effca2f-70e8-44e4-8686-9855869e6132',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
                id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
              },
            ],
          },
        },
        {
          __typename: 'Training',
          id: '231f8fd2-d3d6-4df5-aaa4-fa6c0caf98fa',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルカール',
            id: '97c0890c-bb19-4b50-839f-0a81ffad3ed8',
            parts: [
              {
                __typename: 'Part',
                name: '二頭',
                id: 'ca0b7741-c846-47f4-a5d6-dc15ca6fb75e',
              },
            ],
          },
        },
      ],
    },
    {
      __typename: 'Note',
      trainings: [
        {
          __typename: 'Training',
          id: '8b1dd00d-02b0-4baf-b01f-749d932ccc3c',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルフライ',
            id: 'b7a83c50-55cf-4541-adb8-b41109f84743',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
                id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
              },
            ],
          },
        },
        {
          __typename: 'Training',
          id: 'a077a62d-6c51-433d-b633-f647ad4260d1',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルプレス',
            id: '2effca2f-70e8-44e4-8686-9855869e6132',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
                id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
              },
            ],
          },
        },
      ],
    },
    {
      __typename: 'Note',
      trainings: [
        {
          __typename: 'Training',
          id: '66e0ac86-a77b-4dab-83dc-f15d45980313',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルプレス',
            id: '2effca2f-70e8-44e4-8686-9855869e6132',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
                id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
              },
            ],
          },
        },
        {
          __typename: 'Training',
          id: 'f1d11e58-f763-4ee2-97ea-cd7b6a9b7f77',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルフライ',
            id: 'b7a83c50-55cf-4541-adb8-b41109f84743',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
                id: 'fc89280d-dbb5-4f2c-b214-26f00b72e33b',
              },
            ],
          },
        },
        {
          __typename: 'Training',
          id: 'c338a1ec-02e1-4d2d-9066-caa16deedf34',
          exercise: {
            __typename: 'Exercise',
            name: 'クランチ',
            id: '8db8dde7-be54-4723-afc4-e8c44da4105b',
            parts: [
              {
                __typename: 'Part',
                name: '腹筋',
                id: '667e8b4e-edf6-453d-a17a-4a1da728083d',
              },
            ],
          },
        },
      ],
    },
  ],
}
