import type { Context } from '@/graphql/context'
import type {
  MaxTotalLoadResult,
  Maybe,
  QueryMaxTotalLoadArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const maxTotalLoad:
  | Resolver<
      Maybe<ResolverTypeWrapper<MaxTotalLoadResult>>,
      {},
      Context,
      RequireFields<QueryMaxTotalLoadArgs, 'exerciseId'>
    >
  | undefined = async (_, { exerciseId }, { prisma }) => {
  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
    include: {
      trainings: {
        include: { rounds: true },
      },
    },
  })

  if (!exercise) {
    throw new Error('Exercise not found')
  }

  let maxTotalLoad = 0
  let noteId: string | undefined = undefined

  for (const training of exercise.trainings) {
    const totalLoad = training.rounds.reduce((acc, round) => {
      const weight = Math.round(
        round.weight * (round.unit === 'LB' ? 2.2046 : 1)
      )
      const repetition = round.repetition
      return acc + weight * repetition
    }, 0)

    if (totalLoad > maxTotalLoad) {
      maxTotalLoad = totalLoad
      noteId = training.noteId
    }
  }

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      createdAt: true,
    },
  })

  const createdAt = note?.createdAt

  return { maxTotalLoad, createdAt } as MaxTotalLoadResult
}
