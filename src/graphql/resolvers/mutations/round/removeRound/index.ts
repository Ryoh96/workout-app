import type { Round } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  MutationRemoveRoundArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const removeRound:
  | Resolver<
      Maybe<ResolverTypeWrapper<Round>>,
      {},
      Context,
      RequireFields<MutationRemoveRoundArgs, 'id'>
    >
  | undefined = async (_, { id }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザーがログインしていません。')
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
    throw new ManipulationError('アクセス権限がありません。')
  }

  const round = await prisma.round.delete({
    where: {
      id,
    },
  })

  return round
}
