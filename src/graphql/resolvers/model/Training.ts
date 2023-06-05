import type { Resolvers } from '@/graphql/generated/resolvers-types'

export const Training: Resolvers['Training'] = {
  exercise: async (parent, args, { prisma, currentUser }) => {
    return await prisma.training
      .findUnique({ where: { id: parent.id } })
      .exercise()
  },
  rounds: async (parent, args, { prisma, currentUser }) => {
    return await prisma.training
      .findUnique({ where: { id: parent.id } })
      .rounds({
        orderBy: {
          createdAt: 'asc',
        },
      })
  },
  totalLoad: async (parent, args, { prisma, currentUser }) => {
    if (!currentUser) {
      throw new Error('ユーザーがログインしていません。')
    }
    const trainingId = parent.id
    const user = await prisma.training
      .findUnique({
        where: {
          id: trainingId,
        },
      })
      .note()
      .user()

    if (user.id !== currentUser.id) {
      throw new Error('アクセス権限がありません。')
    }

    const rounds = await prisma.training
      .findUnique({
        where: {
          id: trainingId,
        },
      })
      .rounds()

    if (!rounds || rounds.length === 0) {
      return 0
    }

    // 各セットの重量と反復回数を計算して合計する
    const total = rounds.reduce((acc, round) => {
      const weight = Math.round(
        round.weight * (round.unit === 'LB' ? 2.2046 : 1)
      )
      const repetition = round.repetition
      return acc + weight * repetition
    }, 0)

    return total
  },
}
