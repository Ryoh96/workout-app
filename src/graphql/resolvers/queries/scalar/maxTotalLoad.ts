import type { Context } from '@/graphql/context'
import type {
  MaxTotalLoadResult,
  Maybe,
  QueryMaxTotalLoadArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import calcTotalLoad from '@/utils/calcTotalLoad'

export const maxTotalLoad:
  | Resolver<
      Maybe<ResolverTypeWrapper<MaxTotalLoadResult>>,
      {},
      Context,
      RequireFields<QueryMaxTotalLoadArgs, 'exerciseId'>
    >
  | undefined = async (_, { exerciseId }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザーがログインしていません。')
  }

  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
    include: {
      trainings: {
        include: { rounds: true },
      },
    },
  })

  if (!exercise) {
    throw new Error('種目が存在しません')
  }

  const userId = await exercise.userId

  if (userId !== currentUser.id) {
    throw new Error('アクセス権限がありません')
  }

  let maxTotalLoad = 0
  let noteId: string | undefined = undefined

  for (const training of exercise.trainings) {
    const totalLoad = calcTotalLoad(training.rounds)
    if (totalLoad > maxTotalLoad) {
      maxTotalLoad = totalLoad
      noteId = training.noteId
    }
  }

  if (!noteId) {
    return null
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
