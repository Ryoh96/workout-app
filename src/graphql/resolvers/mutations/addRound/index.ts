import type { Round } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  MutationAddRoundArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

import { updateTotalLoad } from '../../utils/updateTotalLoad'

export const addRound:
  | Resolver<
      Maybe<ResolverTypeWrapper<Round>>,
      {},
      Context,
      RequireFields<MutationAddRoundArgs, 'input'>
    >
  | undefined = async (_, { input }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザがログインしていません')
  }
  const { trainingId, roundInput, exerciseId } = input

  const { weight, repetition, interval, memo, unit, isPinned } = roundInput

  const user = await prisma.exercise
    .findUnique({
      where: {
        id: exerciseId,
      },
    })
    .user()

  if (!user || user.id !== currentUser.id) {
    throw new Error('アクセス権限がありません。')
  }

  const roundData = {
    training: {
      connect: {
        id: trainingId,
      },
    },
    weight,
    unit,
    repetition,
    interval,
  } as any

  if (memo !== undefined) {
    roundData.memo = {
      create: {
        content: memo,
        exercise: {
          connect: {
            id: exerciseId,
          },
        },
        pin: isPinned,
      },
    }
  }

  const createdRound = await prisma.round.create({
    data: roundData,
    include: {
      memo: true,
    },
  })

  const trainingUser = await prisma.training
    .findUnique({
      where: {
        id: trainingId,
      },
    })
    .note()
    .user()

  if (!trainingUser || trainingUser.id !== currentUser.id) {
    throw new Error('アクセス権限がありません。')
  }

  return createdRound
}
