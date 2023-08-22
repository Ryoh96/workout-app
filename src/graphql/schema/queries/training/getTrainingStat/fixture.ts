import type { GetTrainingStatQuery } from '@/graphql/generated/operations-type'

export const trainingStat: GetTrainingStatQuery = {
  trainingsStat: [
    {
      id: '66e0ac86-a77b-4dab-83dc-f15d45980313',
      createdAt: '2023-06-24T15:42:36.604Z',
      rounds: [
        {
          weight: 20,
          repetition: 10,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 20,
          repetition: 9,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 20,
          repetition: 8,
          interval: 90,
          unit: 'KG',
        },
      ],
      note: {
        date: '2023-06-08T00:00:00.000Z',
      },
      totalLoad: 540,
    },
    {
      id: '1d5b6869-510a-4110-badc-7caece15c884',
      createdAt: '2023-06-24T15:47:55.539Z',
      rounds: [
        {
          weight: 25,
          repetition: 12,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 24,
          repetition: 10,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 23,
          repetition: 9,
          interval: 90,
          unit: 'KG',
        },
      ],
      note: {
        date: '2023-06-10T00:00:00.000Z',
      },
      totalLoad: 747,
    },
    {
      id: '407d3d2f-10d4-4c15-8675-319784f3194a',
      createdAt: '2023-06-24T16:52:52.262Z',
      rounds: [
        {
          weight: 28,
          repetition: 12,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 28,
          repetition: 12,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 23,
          repetition: 10,
          interval: 90,
          unit: 'KG',
        },
      ],
      note: {
        date: '2023-06-11T00:00:00.000Z',
      },
      totalLoad: 902,
    },
    {
      id: '407d3d2f-10d4-4c15-8675-319784f3194b',
      createdAt: '2023-06-24T16:52:52.262Z',
      rounds: [
        {
          weight: 30,
          repetition: 14,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 30,
          repetition: 12,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 25,
          repetition: 10,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 25,
          repetition: 10,
          interval: 90,
          unit: 'KG',
        },
      ],
      note: {
        date: '2023-06-11T00:00:00.000Z',
      },
      totalLoad: 902,
    },
    {
      id: '407d3d2f-10d4-4c15-8675-319784f3194b',
      createdAt: '2023-06-24T16:52:52.262Z',
      rounds: [
        {
          weight: 30,
          repetition: 14,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 30,
          repetition: 12,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 25,
          repetition: 10,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 25,
          repetition: 10,
          interval: 90,
          unit: 'KG',
        },
      ],
      note: {
        date: '2023-06-11T00:00:00.000Z',
      },
      totalLoad: 902,
    },
    {
      id: '407d3d2f-10d4-4c15-8675-319784f3194b',
      createdAt: '2023-06-24T16:52:52.262Z',
      rounds: [
        {
          weight: 30,
          repetition: 14,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 30,
          repetition: 12,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 25,
          repetition: 10,
          interval: 90,
          unit: 'KG',
        },
        {
          weight: 30,
          repetition: 12,
          interval: 90,
          unit: 'KG',
        },
      ],
      note: {
        date: '2023-06-11T00:00:00.000Z',
      },
      totalLoad: 902,
    },
  ],
}

export const noData: GetTrainingStatQuery = {
  trainingsStat: [],
}
