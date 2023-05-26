import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryNoteArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const note:
  | Resolver<
      Maybe<ResolverTypeWrapper<Note>>,
      {},
      Context,
      RequireFields<QueryNoteArgs, 'date'>
    >
  | undefined = async (_, { date }, { prisma, currentUser }) => {
  if (!currentUser?.id) {
    throw new Error('ユーザーがログインしていません。')
  }

  const datetime = new Date(date)

  const existingNotes = await prisma.user
    .findUnique({
      where: {
        id: currentUser.id,
      },
    })
    .notes({
      where: {
        createdAt: {
          gte: date,
          lt: new Date(datetime.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })

  return existingNotes?.[0] ?? null
}
