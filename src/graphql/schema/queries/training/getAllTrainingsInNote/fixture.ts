import type { GetAllTrainingsInNoteQuery } from '@/graphql/generated/operations-csr'

export const data: GetAllTrainingsInNoteQuery = {
  notes: [
    {
      trainings: [
        {
          exercise: {
            id: 'hoge',
          },
        },
        {
          exercise: {
            id: 'huga',
          },
        },
        {
          exercise: {
            id: 'piyo',
          },
        },
      ],
      date: '2023-06-08T00:00:00.000Z',
    },
    {
      trainings: [
        {
          exercise: {
            id: 'hoge',
          },
        },
        {
          exercise: {
            id: 'huga',
          },
        },
        {
          exercise: {
            id: 'piyo',
          },
        },
      ],
      date: '2023-06-07T00:00:00.000Z',
    },
    {
      trainings: [
        {
          exercise: {
            id: 'hoge',
          },
        },
        {
          exercise: {
            id: 'huga',
          },
        },
        {
          exercise: {
            id: 'piyo',
          },
        },
      ],
      date: '2023-06-06T00:00:00.000Z',
    },
    {
      trainings: [
        {
          exercise: {
            id: 'huge',
          },
        },
        {
          exercise: {
            id: 'piyo',
          },
        },
        {
          exercise: {
            id: 'hoge',
          },
        },
        {
          exercise: {
            id: 'boo',
          },
        },
      ],
      date: '2023-06-05T00:00:00.000Z',
    },
    {
      trainings: [
        {
          exercise: {
            id: 'huge',
          },
        },
        {
          exercise: {
            id: 'piyo',
          },
        },
        {
          exercise: {
            id: 'hoge',
          },
        },
        {
          exercise: {
            id: 'boo',
          },
        },
      ],
      date: '2023-06-04T00:00:00.000Z',
    },
    {
      trainings: [
        {
          exercise: {
            id: 'huge',
          },
        },
        {
          exercise: {
            id: 'piyo',
          },
        },
        {
          exercise: {
            id: 'hoge',
          },
        },
        {
          exercise: {
            id: 'boo',
          },
        },
      ],
      date: '2023-06-04T00:00:00.000Z',
    },
    {
      trainings: [
        {
          exercise: {
            id: 'huge',
          },
        },
        {
          exercise: {
            id: 'piyo',
          },
        },
        {
          exercise: {
            id: 'boo',
          },
        },
        {
          exercise: {
            id: 'hoge',
          },
        },
      ],
      date: '2023-06-04T00:00:00.000Z',
    },
  ],
}

export const noData: GetAllTrainingsInNoteQuery = {}
