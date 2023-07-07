import type { GetNoteQuery } from '@/graphql/generated/operations-type'

export const note: GetNoteQuery = {
  note: {
    id: '2213a079-0a77-43e0-af2c-3049a594b650',
    trainings: [
      {
        createdAt: '2023-06-24T15:42:36.604Z',
        id: '66e0ac86-a77b-4dab-83dc-f15d45980313',
        exercise: {
          id: '2effca2f-70e8-44e4-8686-9855869e6132',
          name: 'ダンベルプレス',
          parts: [
            {
              name: '胸',
            },
          ],
        },
        rounds: [
          {
            memo: {
              content: 'テスト',
              pin: true,
            },
            id: 'd0420777-dfd0-40a4-a34e-99555e437595',
            weight: 20,
            repetition: 10,
            interval: 90,
            unit: 'KG',
          },
          {
            memo: null,
            id: '1f3c0220-a7e6-42db-beb9-aef2ab04c71d',
            weight: 20,
            repetition: 9,
            interval: 90,
            unit: 'KG',
          },
          {
            memo: null,
            id: 'e9a483d9-3746-4399-a70c-6745079861e0',
            weight: 20,
            repetition: 8,
            interval: 90,
            unit: 'KG',
          },
        ],
        totalLoad: 540,
      },
      {
        createdAt: '2023-06-24T15:43:41.005Z',
        id: 'f1d11e58-f763-4ee2-97ea-cd7b6a9b7f77',
        exercise: {
          id: 'b7a83c50-55cf-4541-adb8-b41109f84743',
          name: 'ダンベルフライ',
          parts: [
            {
              name: '胸',
            },
          ],
        },
        rounds: [
          {
            memo: null,
            id: 'ce36f791-d054-4076-9457-bb08f7d96153',
            weight: 15,
            repetition: 10,
            interval: 90,
            unit: 'KG',
          },
          {
            memo: null,
            id: '56b602de-d56e-4ad7-aeca-617ecb1c5958',
            weight: 15,
            repetition: 9,
            interval: 99,
            unit: 'KG',
          },
          {
            memo: null,
            id: '33c6d2ec-585d-4ee4-b876-ddff56fd18c9',
            weight: 12.5,
            repetition: 9,
            interval: 90,
            unit: 'KG',
          },
        ],
        totalLoad: 402,
      },
      {
        createdAt: '2023-07-02T02:35:46.703Z',
        id: 'c338a1ec-02e1-4d2d-9066-caa16deedf34',
        exercise: {
          id: '8db8dde7-be54-4723-afc4-e8c44da4105b',
          name: 'クランチ',
          parts: [
            {
              name: '腹筋',
            },
          ],
        },
        rounds: [
          {
            memo: null,
            id: '1c7b24e0-f022-45d4-a25b-e9a934a32130',
            weight: 10,
            repetition: 15,
            interval: 90,
            unit: 'KG',
          },
        ],
        totalLoad: 150,
      },
    ],
    createdAt: '2023-06-24T15:30:18.098Z',
  },
}
