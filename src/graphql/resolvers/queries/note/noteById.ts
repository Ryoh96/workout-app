import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryNoteByIdArgs,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const noteById:
  | Resolver<
      Maybe<ResolverTypeWrapper<Note>>,
      {},
      Context,
      Partial<QueryNoteByIdArgs>
    >
  | undefined = async (_, { id }, { prisma, currentUser }) => {
  if (!currentUser?.id) {
    throw new ManipulationError('ユーザーがログインしていません。')
  }

  if (!id) return null

  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  })

  if (note?.userId !== currentUser.id) {
    throw new ManipulationError('アクセス権限がありません')
  }

  return note
}
