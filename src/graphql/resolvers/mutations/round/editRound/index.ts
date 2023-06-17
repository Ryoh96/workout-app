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

  const updatedRound = await prisma.round.update({
    where: { id },
    data: {
      weight,
      repetition,
      interval,
      unit,
    },
    include: {
      memo: true,
    },
  })

  // メモの更新
  if (memo) {
    const exercise = await prisma.round
      .findUnique({
        where: {
          id,
        },
      })
      .training()
      .exercise()

    const memos = await prisma.exercise
      .findUnique({
        where: {
          id: exercise.id,
        },
      })
      .memos({
        where: {
          pin: true,
        },
      })
    if (memo && memos !== null && memos.length >= 10) {
      const oldestMemo = memos[0]
      await prisma.memo.delete({
        where: {
          id: oldestMemo.id,
        },
      })
      // throw new Error(
      //   '固定できるメモは10個までです。不要なメモは削除してください。'
      // )
    }

    if (updatedRound.memo) {
      await prisma.memo.update({
        where: { id: updatedRound.memo.id },
        data: {
          content: memo,
          pin: isPinned ?? false,
        },
      })
    } else {
      await prisma.memo.create({
        data: {
          content: memo,
          pin: isPinned ?? false,
          round: {
            connect: { id: updatedRound.id },
          },
          exercise: {
            connect: { id: exercise.id },
          },
        },
      })
    }
  }

  return updatedRound
}
