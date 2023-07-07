import type { Training } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryTrainingsStatArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const trainingsStat:
  | Resolver<
      Maybe<Maybe<ResolverTypeWrapper<Training>>[]>,
      {},
      Context,
      RequireFields<QueryTrainingsStatArgs, 'exerciseId'>
    >
  | undefined = async (_, { exerciseId, limit }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザがログインしていません')
  }

  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
  })

  if (!exercise) {
    throw new Error(`種目が見つかりません`)
  }

  if (exercise.userId !== currentUser.id) {
    throw new Error('アクセス権限がありません')
  }

  const trainings = await prisma.exercise
    .findUnique({
      where: {
        id: exerciseId,
      },
    })
    .trainings({
      take: limit ?? undefined,
      include: {
        rounds: true,
        note: {
          select: {
            date: true,
          },
        },
      },
      orderBy: {
        note: {
          date: 'asc',
        },
      },
    })

  return trainings
}
