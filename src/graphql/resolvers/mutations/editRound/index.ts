import type { Round } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  MutationEditRoundArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const editRound:
  | Resolver<
      Maybe<ResolverTypeWrapper<Round>>,
      {},
      Context,
      RequireFields<MutationEditRoundArgs, 'input'>
    >
  | undefined = async (_, { input }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザがログインしていません。')
  }
  const { id, roundInput } = input

  const { weight, repetition, interval, memo, unit, isPinned } = roundInput

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

  const roundData = {
    id,
    weight,
    unit,
    repetition,
    interval,
  } as any

  if (memo !== undefined) {
    roundData.memo = {
      create: {
        content: memo,
        pin: isPinned,
      },
    }
  }

  const round = await prisma.round.update({
    where: {
      id,
    },
    data: roundData,
  })

  return round
}
