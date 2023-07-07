import type { Exercise } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryExerciseArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const exercise:
  | Resolver<
      Maybe<ResolverTypeWrapper<Exercise>>,
      {},
      Context,
      RequireFields<QueryExerciseArgs, 'id'>
    >
  | undefined = async (_, { id }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザーがログインしていません。')
  }

  const user = await prisma.exercise
    .findUnique({
      where: {
        id,
      },
    })
    .user()

  if (!user || user?.id !== currentUser.id) {
    throw new Error('アクセス権限がありません')
  }

  return prisma.exercise.findUnique({
    where: {
      id,
    },
    include: {
      parts: true,
      trainings: {
        include: {
          rounds: true,
        },
      },
      memos: {
        include: {
          round: true,
        },
      },
    },
  })
}
