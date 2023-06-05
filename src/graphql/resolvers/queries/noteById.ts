import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryNoteByIdArgs,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const noteById:
  | Resolver<
      Maybe<ResolverTypeWrapper<Note>>,
      {},
      Context,
      Partial<QueryNoteByIdArgs>
    >
  | undefined = async (_, { id }, { prisma, currentUser }) => {
  if (!currentUser?.id) {
    throw new Error('ユーザーがログインしていません。')
  }

  if (!id) return null

  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  })

  if (note?.userId !== currentUser.id) {
    throw new Error('アクセス権限がありません')
  }

  return note
}
