import type { GetUserQuery } from '@/graphql/generated/operations-type'
import type { Gender } from '@/graphql/generated/resolvers-types'

export const user: GetUserQuery = {
  user: {
    name: 'ももちゃん',
    gender: 'FEMALE',
    height: 170,
    weight: 70,
  },
}
