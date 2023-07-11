import type { Training } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  MutationCreateTrainingArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const createTraining:
  | Resolver<
      Maybe<ResolverTypeWrapper<Training>>,
      {},
      Context,
      RequireFields<MutationCreateTrainingArgs, 'id' | 'noteId' | 'exerciseId'>
    >
  | undefined = async (
  _,
  { id, noteId, exerciseId },
  { prisma, currentUser }
) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザーがログインしていません')
  }

  if (!exerciseId) {
    throw new ManipulationError('種目が選択されていません')
  }

  // ユーザの権限チェックなどの追加ロジック
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      userId: true,
      createdAt: true,
    },
  })

  const exercise = await prisma.exercise.findUnique({
    where: {
      id: exerciseId,
    },
    select: {
      userId: true,
    },
  })

  if (
    !note ||
    note.userId !== currentUser.id ||
    !exercise ||
    exercise.userId !== currentUser.id
  ) {
    throw new ManipulationError('アクセス権限がありません。')
  }

  const training = await prisma.training.create({
    data: {
      id,
      note: { connect: { id: noteId } },
      exercise: { connect: { id: exerciseId } },
    },
    include: {
      exercise: true,
      rounds: true,
    },
  })

  return training
}
