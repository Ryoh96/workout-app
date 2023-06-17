import type { Memo } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryMemosArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const memos:
  | Resolver<
      Maybe<Maybe<ResolverTypeWrapper<Memo>>[]>,
      {},
      Context,
      RequireFields<QueryMemosArgs, 'id'>
    >
  | undefined = async (_, { id }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザがログインしていません')
  }

  const exercise = await prisma.exercise.findUnique({
    where: {
      id,
    },
  })

  if (exercise?.userId !== currentUser.id) {
    throw new Error('アクセス権限がありません')
  }

  return await prisma.exercise
    .findUnique({
      where: {
        id,
      },
    })
    .memos()
}
