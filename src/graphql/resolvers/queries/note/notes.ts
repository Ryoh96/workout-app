import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryNotesArgs,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const notes:
  | Resolver<
      Maybe<ResolverTypeWrapper<Note>[]>,
      {},
      Context,
      Partial<QueryNotesArgs>
    >
  | undefined = async (_, { since, until }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザーがログインしていません。')
  }

  const data = await prisma.user
    .findUnique({
      where: {
        id: currentUser.id,
      },
    })
    .notes({
      where: {
        createdAt: {
          gte: since ?? undefined,
          lte: until ?? undefined,
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

  return data
}
