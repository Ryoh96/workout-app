import type { Training } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  MutationRemoveTrainingArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const removeTraining:
  | Resolver<
      Maybe<ResolverTypeWrapper<Training>>,
      {},
      Context,
      RequireFields<MutationRemoveTrainingArgs, 'id'>
    >
  | undefined = async (_, { id }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザーがログインしていません。')
  }

  const userId = await prisma.training
    .findUnique({
      where: {
        id,
      },
    })
    .note()
    .user({
      select: {
        id: true,
      },
    })

  if (currentUser.id !== userId.id) {
    throw new ManipulationError('アクセス権限がありません')
  }

  const training = await prisma.training.delete({
    where: {
      id,
    },
  })

  return training
}
