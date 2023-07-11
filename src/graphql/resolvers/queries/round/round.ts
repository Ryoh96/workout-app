import type { Round } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryRoundArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const round:
  | Resolver<
      Maybe<ResolverTypeWrapper<Round>>,
      {},
      Context,
      RequireFields<QueryRoundArgs, 'id'>
    >
  | undefined = async (_, { id }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザーがログインしていません')
  }
  const round = await prisma.round.findUnique({
    where: {
      id,
    },
    include: {
      training: {
        include: {
          note: true,
        },
      },
    },
  })

  if (!round) {
    throw new ManipulationError('セットがありません')
  }

  if (round.training.note.userId !== currentUser.id) {
    throw new ManipulationError('アクセス権限がありません')
  }

  return round
}
