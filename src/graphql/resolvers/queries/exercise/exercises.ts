import type { Exercise } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryExercisesArgs,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const exercises:
  | Resolver<
      Maybe<ResolverTypeWrapper<Exercise>[]>,
      {},
      Context,
      Partial<QueryExercisesArgs>
    >
  | undefined = async (_, __, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザーがログインしていません。')
  }
  const exercise = await prisma.user
    .findUnique({
      where: {
        id: currentUser?.id,
      },
    })
    .exercises()
  return exercise
}
