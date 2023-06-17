import type { Exercise } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  MutationRenameExerciseArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const renameExercise:
  | Resolver<
      ResolverTypeWrapper<Exercise>,
      {},
      Context,
      RequireFields<MutationRenameExerciseArgs, 'id' | 'name'>
    >
  | undefined = async (_, { id, name }, { currentUser, prisma }) => {
  if (!currentUser) {
    throw new Error('ユーザがログインしていません')
  }

  const user = await prisma.exercise.findUnique({ where: { id } }).user()

  if (!user || user.id !== currentUser.id) {
    throw new Error('アクセス権限がありません')
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
