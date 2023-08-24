import type { Context } from '@/graphql/context'
import type {
  MaxWeightResult,
  Maybe,
  QueryMaxWeightArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const maxWeight:
  | Resolver<
      Maybe<ResolverTypeWrapper<MaxWeightResult>>,
      {},
      Context,
      RequireFields<QueryMaxWeightArgs, 'exerciseId'>
    >
  | undefined = async (_, { exerciseId }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザーがログインしていません。')
  }

  const user = await prisma.exercise
    .findUnique({
      where: {
        id: exerciseId,
      },
    })
    .user()

  if (!user || user.id !== currentUser.id) {
    throw new ManipulationError('アクセス権限がありません')
  }

  const trainings = await prisma.training.findMany({
    where: {
      exerciseId,
    },
    select: {
      noteId: true,
      rounds: {
        select: {
          weight: true,
          unit: true,
        },
      },
    },
  })

  if (
    !trainings ||
    trainings.length === 0 ||
    !trainings[0].rounds ||
    trainings[0].rounds.length === 0
  ) {
    return null
  }

  let maxWeight = trainings[0].rounds[0].weight
  let maxWeightIndex = 0
  let currentIndex = 0

  for (const training of trainings) {
    for (let i = 0; i < training.rounds.length; i++) {
      const weight = Math.round(
        training.rounds[i].weight *
          (training.rounds[i].unit === 'LB' ? 2.2046 : 1)
      )
      if (weight > maxWeight) {
        maxWeight = weight
        maxWeightIndex = currentIndex
      }
    }
    currentIndex++
  }

  const noteId = trainings[maxWeightIndex].noteId
  const data = await prisma.note.findUnique({ where: { id: noteId } })
  const createdAt = data?.date

  return { maxWeight, createdAt } as MaxWeightResult
}
