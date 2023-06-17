import type { Training } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  MutationCreateTrainingArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

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
    throw new Error('ユーザーがログインしていません')
  }

  if (!exerciseId) {
    throw new Error('種目が選択されていません')
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
    throw new Error('アクセス権限がありません。')
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
