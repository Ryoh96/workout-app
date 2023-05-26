import type { Round } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  MutationRemoveRoundArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const removeRound:
  | Resolver<
      Maybe<ResolverTypeWrapper<Round>>,
      {},
      Context,
      RequireFields<MutationRemoveRoundArgs, 'id'>
    >
  | undefined = async (_, { id }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザーがログインしていません。')
  }

  const user = await prisma.round
    .findUnique({
      where: {
        id,
      },
    })
    .training()
    .note()
    .user()

  if (user.id !== currentUser.id) {
    throw new Error('アクセス権限がありません。')
  }

  const round = await prisma.round.delete({
    where: {
      id,
    },
  })

  return round
}
