import type { GetPreviousTrainingsQuery } from '@/graphql/generated/operations-type'

export const previousTrainings: GetPreviousTrainingsQuery = {
  previousTrainings: [
    {
      id: '66e0ac86-a77b-4dab-83dc-f15d45980313',
      rounds: [
        {
          id: 'd0420777-dfd0-40a4-a34e-99555e437595',
          weight: 25,
          repetition: 10,
          interval: 90,
          unit: 'KG',
        },
        {
          id: '1f3c0220-a7e6-42db-beb9-aef2ab04c71d',
          weight: 20,
          repetition: 9,
          interval: 90,
          unit: 'KG',
        },
        {
          id: 'e9a483d9-3746-4399-a70c-6745079861e0',
          weight: 20,
          repetition: 8,
          interval: 90,
          unit: 'KG',
        },
      ],
      note: {
        date: '2023-06-09T00:00:00.000Z',
      },
    },
  ],
}
