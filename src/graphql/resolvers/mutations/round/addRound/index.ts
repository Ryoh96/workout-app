import type { Round } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  MutationAddRoundArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const addRound:
  | Resolver<
      Maybe<ResolverTypeWrapper<Round>>,
      {},
      Context,
      RequireFields<MutationAddRoundArgs, 'input'>
    >
  | undefined = async (_, { input }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザがログインしていません')
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
    throw new ManipulationError('アクセス権限がありません。')
  }

  const trainingUser = await prisma.training
    .findUnique({
      where: {
        id: trainingId,
      },
    })
    .note()
    .user()

  if (!trainingUser || trainingUser.id !== currentUser.id) {
    throw new ManipulationError('アクセス権限がありません')
  }

  const memos = await prisma.exercise
    .findUnique({
      where: {
        id: exerciseId,
      },
    })
    .memos({
      where: {
        pin: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
  if (memo && memos !== null && memos.length >= 10) {
    const oldestMemo = memos[0]
    await prisma.memo.update({
      where: {
        id: oldestMemo.id,
      },
      data: {
        content: memo,
        pin: false,
      },
    })
    // throw new ManipulationError(
    //   '固定できるメモは10個までです。不要なメモは削除してください。'
    // )
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

  if (memo?.length !== 0 && memo !== undefined) {
    roundData.memo = {
      create: {
        content: memo,
        exercise: {
          connect: {
            id: exerciseId,
          },
        },
        pin: isPinned ?? false,
      },
    }
  }

  const createdRound = await prisma.round.create({
    data: roundData,
    include: {
      memo: true,
    },
  })

  return createdRound
}
