import type { Exercise } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryExerciseByDateArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const exerciseByDate:
  | Resolver<
      Maybe<Maybe<ResolverTypeWrapper<Exercise>>[]>,
      {},
      Context,
      RequireFields<QueryExerciseByDateArgs, 'date'>
    >
  | undefined = async (_, { date }, { prisma, currentUser }) => {
  if (!currentUser?.id) {
    throw new Error('ユーザーがログインしていません。')
  }

  const datetime = new Date(date)

  const exercise = await prisma.user
    .findUnique({
      where: {
        id: currentUser.id,
      },
    })
    .exercises({
      where: {
        createdAt: {
          gte: date,
          lt: new Date(datetime.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })

  if (!exercise) {
    throw new Error('エクササイズがありません。')
  }

  return exercise ?? []
}
