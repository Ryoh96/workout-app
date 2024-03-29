import type { Exercise } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  MutationRenameExerciseArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const renameExercise:
  | Resolver<
      ResolverTypeWrapper<Exercise>,
      {},
      Context,
      RequireFields<MutationRenameExerciseArgs, 'id' | 'name'>
    >
  | undefined = async (_, { id, name }, { currentUser, prisma }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザがログインしていません')
  }

  const user = await prisma.exercise.findUnique({ where: { id } }).user()

  if (!user || user.id !== currentUser.id) {
    throw new ManipulationError('アクセス権限がありません')
  }

  const existingExercise = await prisma.exercise.findFirst({
    where: { name, userId: currentUser.id },
  })

  if (existingExercise) {
    throw new ManipulationError('既に同じ名前の種目が登録されています')
  }

  return prisma.exercise.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })
}
