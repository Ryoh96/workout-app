import type { Part, Training } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryPreviousTrainingsArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const previousTrainings:
  | Resolver<
      Maybe<Maybe<ResolverTypeWrapper<Training>>[]>,
      {},
      Context,
      RequireFields<QueryPreviousTrainingsArgs, 'id' | 'limit'>
    >
  | undefined = async (_, { id, limit }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザーがログインしていません。')
  }
  const data = await prisma.training.findFirst({
    where: { id },
    include: { note: true },
  })

  if (!data) {
    throw new ManipulationError(`種目が存在しません。`)
  }

  const user = await prisma.exercise
    .findUnique({
      where: {
        id: data.exerciseId,
      },
    })
    .user()

  if (data.note.userId !== currentUser.id || user?.id !== currentUser.id) {
    throw new ManipulationError('アクセス権限がありません。')
  }

  const previousTrainings = await prisma.exercise
    .findUnique({
      where: {
        id: data.exerciseId,
      },
    })
    .trainings({
      where: {
        note: {
          date: {
            lt: data.note.date,
          },
        },
      },
      orderBy: {
        note: {
          date: 'desc',
        },
      },
      take: limit,
    })

  return previousTrainings
}
