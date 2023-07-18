import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryNotesArgs,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const notes:
  | Resolver<
      Maybe<ResolverTypeWrapper<Note>[]>,
      {},
      Context,
      Partial<QueryNotesArgs>
    >
  | undefined = async (_, { since, until }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザーがログインしていません。')
  }

  const data = await prisma.user
    .findUnique({
      where: {
        id: currentUser.id,
      },
    })
    .notes({
      where: {
        date: {
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
