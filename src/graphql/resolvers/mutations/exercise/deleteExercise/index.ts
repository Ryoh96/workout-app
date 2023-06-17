import type { Exercise } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  MutationDeleteExerciseArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const deleteExercise:
  | Resolver<
      ResolverTypeWrapper<Exercise>,
      {},
      Context,
      RequireFields<MutationDeleteExerciseArgs, 'id'>
    >
  | undefined = async (_, { id }, { currentUser, prisma }) => {
  if (!currentUser) {
    throw new Error('ユーザがログインしていません')
  }

  const user = await prisma.exercise.findUnique({ where: { id } }).user()

  if (!user || user.id !== currentUser.id) {
    throw new Error('アクセス権限がありません')
  }

  return prisma.exercise.delete({
    where: {
      id,
    },
  })
}
