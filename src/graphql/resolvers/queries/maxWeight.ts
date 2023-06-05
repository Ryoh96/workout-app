import type { Context } from '@/graphql/context'
import type {
  MaxWeightResult,
  Maybe,
  QueryMaxWeightArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const maxWeight:
  | Resolver<
      Maybe<ResolverTypeWrapper<MaxWeightResult>>,
      {},
      Context,
      RequireFields<QueryMaxWeightArgs, 'exerciseId'>
    >
  | undefined = async (_, { exerciseId }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザーがログインしていません。')
  }
  const trainings = await prisma.training.findMany({
    where: {
      exerciseId,
      rounds: {
        some: {
          weight: {
            not: undefined,
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
    select: {
      noteId: true,
      rounds: {
        where: {
          weight: {
            not: undefined,
          },
        },
        orderBy: {
          weight: 'desc',
        },
        take: 1,
        skip: 1,
        select: {
          weight: true,
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

  for (let i = 1; i < trainings[0].rounds.length; i++) {
    if (trainings[0].rounds[i].weight > maxWeight) {
      maxWeight = trainings[0].rounds[i].weight
    }
  }

  const noteId = trainings[0].noteId
  const data = await prisma.note.findUnique({ where: { id: noteId } })
  const createdAt = data?.createdAt

  return { maxWeight, createdAt } as MaxWeightResult
}
