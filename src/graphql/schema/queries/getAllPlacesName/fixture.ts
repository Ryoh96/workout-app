import type { GetAllPlacesNameQuery } from '@/graphql/generated/operations-type'
import type { Place } from '@/graphql/generated/resolvers-types'

export const allPlacesName: GetAllPlacesNameQuery = {
  places: [
    {
      name: '自宅',
    },
    {
      name: 'エニタイム',
    },
    {
      name: 'ゴールドジム',
    },
  ],
}