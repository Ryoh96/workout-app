import type { Round } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryRoundsArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const rounds:
  | Resolver<
      Maybe<Maybe<ResolverTypeWrapper<Round>>[]>,
      {},
      Context,
      RequireFields<QueryRoundsArgs, 'trainingId'>
    >
  | undefined = async (_, { trainingId }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザーがログインしていません。')
  }

  const training = await prisma.training.findUnique({
    where: {
      id: trainingId,
    },
    include: {
      note: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!training || training.note.user.id !== currentUser.id) {
    throw new Error('アクセス権限がありません。')
  }

  const rounds = await prisma.round.findMany({
    where: {
      trainingId,
    },
    orderBy: {
      createdAt: "asc"
    }
  })
  return rounds
}
