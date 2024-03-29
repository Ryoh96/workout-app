import type { Exercise } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  MutationDeleteExerciseArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const deleteExercise:
  | Resolver<
      ResolverTypeWrapper<Exercise>,
      {},
      Context,
      RequireFields<MutationDeleteExerciseArgs, 'id'>
    >
  | undefined = async (_, { id }, { currentUser, prisma }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザがログインしていません')
  }

  const user = await prisma.exercise.findUnique({ where: { id } }).user()

  if (!user || user.id !== currentUser.id) {
    throw new ManipulationError('アクセス権限がありません')
  }

  return prisma.exercise.delete({
    where: {
      id,
    },
  })
}
