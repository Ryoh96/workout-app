import type { GetNotesQuery } from '@/graphql/generated/operations-type'

export const notes: GetNotesQuery = {
  notes: [
    {
      __typename: 'Note',
      date: '2023-06-25T00:00:00.000Z',
      trainings: [
        {
          __typename: 'Training',
          totalLoad: 150,
          createdAt: '2023-06-25T07:52:47.573Z',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルカール',
            parts: [
              {
                __typename: 'Part',
                name: '二頭',
              },
            ],
          },
          rounds: [
            {
              __typename: 'Round',
              id: 'baf87713-6faa-4091-9503-4480ab83a53b',
              weight: 15,
              repetition: 10,
              interval: 90,
              unit: 'KG',
            },
          ],
        },
      ],
      createdAt: '2023-06-25T07:52:42.555Z',
    },
    {
      __typename: 'Note',
      date: '2023-06-23T00:00:00.000Z',
      trainings: [
        {
          __typename: 'Training',
          totalLoad: 0,
          createdAt: '2023-06-27T05:07:36.160Z',
          exercise: {
            __typename: 'Exercise',
            name: 'スクワット',
            parts: [
              {
                __typename: 'Part',
                name: '脚',
              },
            ],
          },
          rounds: [],
        },
      ],
      createdAt: '2023-06-27T05:07:00.622Z',
    },
    {
      __typename: 'Note',
      date: '2023-06-12T00:00:00.000Z',
      trainings: [
        {
          __typename: 'Training',
          totalLoad: 0,
          createdAt: '2023-06-27T06:06:59.964Z',
          exercise: {
            __typename: 'Exercise',
            name: 'hoge',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
              },
            ],
          },
          rounds: [],
        },
      ],
      createdAt: '2023-06-27T06:06:54.243Z',
    },
    {
      __typename: 'Note',
      date: '2023-06-11T00:00:00.000Z',
      trainings: [
        {
          __typename: 'Training',
          totalLoad: 902,
          createdAt: '2023-06-24T16:52:52.262Z',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルプレス',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
              },
            ],
          },
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
        },
        {
          __typename: 'Training',
          totalLoad: 644,
          createdAt: '2023-06-24T16:53:35.455Z',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルフライ',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
              },
            ],
          },
          rounds: [
            {
              __typename: 'Round',
              id: '0c79d8ea-c422-4153-927e-3ca2bceebf3f',
              weight: 22,
              repetition: 12,
              interval: 90,
              unit: 'KG',
            },
            {
              __typename: 'Round',
              id: '8783c6fc-ed37-4b07-9ce2-b3fb861c9838',
              weight: 20,
              repetition: 10,
              interval: 90,
              unit: 'KG',
            },
            {
              __typename: 'Round',
              id: 'f1566a68-2887-4a6c-b1ab-1be971b71429',
              weight: 18,
              repetition: 10,
              interval: 90,
              unit: 'KG',
            },
          ],
        },
      ],
      createdAt: '2023-06-24T16:52:42.166Z',
    },
    {
      __typename: 'Note',
      date: '2023-06-10T00:00:00.000Z',
      trainings: [
        {
          __typename: 'Training',
          totalLoad: 30430,
          createdAt: '2023-06-24T15:46:19.638Z',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルフライ',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
              },
            ],
          },
          rounds: [
            {
              __typename: 'Round',
              id: '0d8bf588-b267-44bc-93c4-0a8a89eb5c96',
              weight: 20,
              repetition: 12,
              interval: 90,
              unit: 'KG',
            },
            {
              __typename: 'Round',
              id: 'f1cd9c93-d30b-4a80-849a-8dd0efbe98e4',
              weight: 19,
              repetition: 10,
              interval: 90,
              unit: 'KG',
            },
            {
              __typename: 'Round',
              id: 'ce3691e2-2bb7-4d8f-b1fd-e0f46169a1b6',
              weight: 300,
              repetition: 100,
              interval: 610,
              unit: 'KG',
            },
          ],
        },
        {
          __typename: 'Training',
          totalLoad: 747,
          createdAt: '2023-06-24T15:47:55.539Z',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルプレス',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
              },
            ],
          },
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
        },
        {
          __typename: 'Training',
          totalLoad: 0,
          createdAt: '2023-06-24T15:57:23.327Z',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルカール',
            parts: [
              {
                __typename: 'Part',
                name: '二頭',
              },
            ],
          },
          rounds: [],
        },
      ],
      createdAt: '2023-06-24T15:46:17.772Z',
    },
    {
      __typename: 'Note',
      date: '2023-06-09T00:00:00.000Z',
      trainings: [
        {
          __typename: 'Training',
          totalLoad: 443,
          createdAt: '2023-06-24T15:45:20.823Z',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルフライ',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
              },
            ],
          },
          rounds: [
            {
              __typename: 'Round',
              id: '26b23406-32c5-4b41-a58d-25e80099af71',
              weight: 17,
              repetition: 10,
              interval: 90,
              unit: 'KG',
            },
            {
              __typename: 'Round',
              id: '50e99174-5f67-4dd2-ab32-f171834e7cf3',
              weight: 17,
              repetition: 9,
              interval: 90,
              unit: 'KG',
            },
            {
              __typename: 'Round',
              id: '226069fb-e4af-409d-a433-b53a84522125',
              weight: 15,
              repetition: 8,
              interval: 90,
              unit: 'KG',
            },
          ],
        },
        {
          __typename: 'Training',
          totalLoad: 688,
          createdAt: '2023-07-02T08:48:32.377Z',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルプレス',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
              },
            ],
          },
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
        },
      ],
      createdAt: '2023-06-24T15:44:33.318Z',
    },
    {
      __typename: 'Note',
      date: '2023-06-08T00:00:00.000Z',
      trainings: [
        {
          __typename: 'Training',
          totalLoad: 540,
          createdAt: '2023-06-24T15:42:36.604Z',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルプレス',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
              },
            ],
          },
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
        },
        {
          __typename: 'Training',
          totalLoad: 402,
          createdAt: '2023-06-24T15:43:41.005Z',
          exercise: {
            __typename: 'Exercise',
            name: 'ダンベルフライ',
            parts: [
              {
                __typename: 'Part',
                name: '胸',
              },
            ],
          },
          rounds: [
            {
              __typename: 'Round',
              id: 'ce36f791-d054-4076-9457-bb08f7d96153',
              weight: 15,
              repetition: 10,
              interval: 90,
              unit: 'KG',
            },
            {
              __typename: 'Round',
              id: '56b602de-d56e-4ad7-aeca-617ecb1c5958',
              weight: 15,
              repetition: 9,
              interval: 99,
              unit: 'KG',
            },
            {
              __typename: 'Round',
              id: '33c6d2ec-585d-4ee4-b876-ddff56fd18c9',
              weight: 12.5,
              repetition: 9,
              interval: 90,
              unit: 'KG',
            },
          ],
        },
        {
          __typename: 'Training',
          totalLoad: 150,
          createdAt: '2023-07-02T02:35:46.703Z',
          exercise: {
            __typename: 'Exercise',
            name: 'クランチ',
            parts: [
              {
                __typename: 'Part',
                name: '腹筋',
              },
            ],
          },
          rounds: [
            {
              __typename: 'Round',
              id: '1c7b24e0-f022-45d4-a25b-e9a934a32130',
              weight: 10,
              repetition: 15,
              interval: 90,
              unit: 'KG',
            },
          ],
        },
      ],
      createdAt: '2023-06-24T15:30:18.098Z',
    },
  ],
}
