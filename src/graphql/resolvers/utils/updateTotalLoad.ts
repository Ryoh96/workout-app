import type { Prisma, PrismaClient } from '@prisma/client'

export const updateTotalLoad = async (
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  trainingId?: string
) => {
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
    const weight = Math.round(round.weight * (round.unit === 'LB' ? 2.2046 : 1))
    const repetition = round.repetition
    return acc + weight * repetition
  }, 0)

  await prisma.training.update({
    data: {
      totalLoad: total,
    },
    where: {
      id: trainingId,
    },
  })
}
