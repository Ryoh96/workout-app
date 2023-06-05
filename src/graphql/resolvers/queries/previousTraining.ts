import type { Part, Training } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryPreviousTrainingArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const previousTraining:
  | Resolver<
      Maybe<ResolverTypeWrapper<Training>>,
      {},
      Context,
      RequireFields<QueryPreviousTrainingArgs, 'id'>
    >
  | undefined = async (_, { id }, { prisma, currentUser }) => {
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

  const previousData = await prisma.training.findFirst({
    where: {
      exerciseId: data.exerciseId,
      createdAt: {
        lt: data.createdAt,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return previousData
}
