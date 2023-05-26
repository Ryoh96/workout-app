import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  QueryNoteByIdArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const noteById:
  | Resolver<
      ResolverTypeWrapper<Note>,
      {},
      Context,
      RequireFields<QueryNoteByIdArgs, 'id'>
    >
  | undefined = async (_, { id }, { prisma, currentUser }) => {
  if (!currentUser?.id) {
    throw new Error('ユーザーがログインしていません。')
  }

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
