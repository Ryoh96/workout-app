import type { Part, Training } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryPreviousTrainingsArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const previousTrainings:
  | Resolver<
      Maybe<Maybe<ResolverTypeWrapper<Training>>[]>,
      {},
      Context,
      RequireFields<QueryPreviousTrainingsArgs, 'id' | 'limit'>
    >
  | undefined = async (_, { id, limit }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザーがログインしていません。')
  }
  const data = await prisma.training.findUnique({
    where: { id },
    include: { note: true },
  })

  if (!data) {
    throw new Error(`種目が存在しません。`)
  }

  if (data.note.userId !== currentUser.id) {
    throw new Error('アクセス権限がありません。')
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
