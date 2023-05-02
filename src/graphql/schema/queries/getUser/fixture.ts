import type { User } from '@/graphql/generated/resolvers-types'
import { Gender } from '@/graphql/generated/resolvers-types'

export const user: User = {
  name: 'ももちゃん',
  gender: Gender.Female,
  height: 170,
  weight: 70,
}
