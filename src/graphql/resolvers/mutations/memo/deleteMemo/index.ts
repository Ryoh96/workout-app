import type { Memo } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  MutationDeleteMemoArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const deleteMemo:
  | Resolver<
      Maybe<ResolverTypeWrapper<Memo>>,
      {},
      Context,
      RequireFields<MutationDeleteMemoArgs, 'id'>
    >
  | undefined = async (_, { id }, { currentUser, prisma }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザがログインしていません')
  }

  const user = await prisma.memo
    .findUnique({
      where: {
        id,
      },
    })
    .exercise()
    .user()

  if (user.id !== currentUser.id) {
    throw new ManipulationError('アクセス権限がありません')
  }

  return prisma.memo.delete({
    where: {
      id,
    },
  })
}
